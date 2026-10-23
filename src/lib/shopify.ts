import { useQuery } from "@tanstack/react-query";
import type { Product } from "@/lib/products";

const SHOPIFY_API_VERSION = "2026-10";
const SHOPIFY_STORE_PERMANENT_DOMAIN = "3xf5gq-1k.myshopify.com";
const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
// Storefront tokens are public by design (read-only catalog + cart access).
const SHOPIFY_STOREFRONT_TOKEN = "75b633c84fdc756b969bd7a3e1278b5d";

export async function storefrontApiRequest<T = any>(
  query: string,
  variables: Record<string, unknown> = {},
): Promise<T | null> {
  const res = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  if (res.status === 402) {
    console.error("Shopify: an active Shopify plan is required for storefront access.");
    return null;
  }
  if (!res.ok) throw new Error(`Shopify HTTP ${res.status}`);
  const data = await res.json();
  if (data.errors) throw new Error(data.errors.map((e: { message: string }) => e.message).join(", "));
  return data as T;
}

export type LiveVariant = { id: string; size: string; price: number; available: boolean };
export type LiveProduct = {
  handle: string;
  title: string;
  description: string;
  price: number;
  available: boolean;
  variants: LiveVariant[];
};

const PRODUCTS_QUERY = `
  query Catalog($first: Int!) {
    products(first: $first) {
      edges { node {
        handle title description availableForSale
        priceRange { minVariantPrice { amount } }
        variants(first: 20) { edges { node {
          id availableForSale price { amount }
          selectedOptions { name value }
        } } }
      } }
    }
  }
`;

async function fetchCatalog(): Promise<Record<string, LiveProduct>> {
  const data = await storefrontApiRequest(PRODUCTS_QUERY, { first: 100 });
  const map: Record<string, LiveProduct> = {};
  for (const { node } of data?.data?.products?.edges ?? []) {
    map[node.handle] = {
      handle: node.handle,
      title: node.title,
      description: node.description,
      price: Number(node.priceRange.minVariantPrice.amount),
      available: node.availableForSale,
      variants: node.variants.edges.map(({ node: v }: any) => ({
        id: v.id,
        size: v.selectedOptions.find((o: any) => o.name === "Size")?.value ?? v.selectedOptions[0]?.value,
        price: Number(v.price.amount),
        available: v.availableForSale,
      })),
    };
  }
  return map;
}

export function useLiveCatalog() {
  return useQuery({ queryKey: ["shopify-catalog"], queryFn: fetchCatalog, staleTime: 60_000 });
}

export function formatINR(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

/** Local design content + live Shopify price and stock (falls back to local data while loading). */
export function useLiveProduct(product: Product | undefined) {
  const { data } = useLiveCatalog();
  const live = product ? data?.[product.slug] : undefined;
  const priceText = live ? formatINR(live.price) : product?.price ?? "";
  const isSoldOut = (size: string) => {
    const v = live?.variants.find((x) => x.size === size);
    return live ? !v || !v.available : false;
  };
  const variantFor = (size: string) => live?.variants.find((x) => x.size === size);
  return { live, priceText, isSoldOut, variantFor, soldOut: live ? !live.available : false };
}

/** Lookup for lists (collections, wishlist): returns live price text by slug. */
export function useLivePrices() {
  const { data } = useLiveCatalog();
  return (p: Product) => (data?.[p.slug] ? formatINR(data[p.slug].price) : p.price);
}

const CART_CREATE = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) { cart { checkoutUrl } userErrors { message } }
  }
`;

/** Creates a Shopify cart with every bag line and returns its hosted checkout link. */
export async function createCheckout(
  lines: { slug: string; size: string; qty: number }[],
): Promise<string> {
  const catalog = await fetchCatalog();
  const cartLines = lines.map((l) => {
    const v = catalog[l.slug]?.variants.find((x) => x.size === l.size);
    if (!v) throw new Error(`${l.slug} size ${l.size} is not available`);
    return { merchandiseId: v.id, quantity: l.qty };
  });
  const data = await storefrontApiRequest(CART_CREATE, { input: { lines: cartLines } });
  const errs = data?.data?.cartCreate?.userErrors ?? [];
  if (errs.length) throw new Error(errs.map((e: { message: string }) => e.message).join(", "));
  const url = data?.data?.cartCreate?.cart?.checkoutUrl;
  if (!url) throw new Error("Checkout could not be created");
  const u = new URL(url);
  u.searchParams.set("channel", "online_store");
  return u.toString();
}
