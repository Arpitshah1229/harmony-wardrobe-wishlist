import { useQuery } from "@tanstack/react-query";
import { products as localProducts, DYED_NOTE, type Product } from "@/lib/products";

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
  images: string[];
  tags: string[];
  /** Values typed into the shirt's custom fields in Shopify Admin. */
  meta: Partial<Record<MetaKey, string>>;
};

const META_KEYS = ["tagline", "fabric_colour", "embroidery_colour", "fabric", "handwork", "buttons", "fit"] as const;
type MetaKey = (typeof META_KEYS)[number];

const PRODUCTS_QUERY = `
  query Catalog($first: Int!) {
    products(first: $first) {
      edges { node {
        handle title description descriptionHtml productType tags availableForSale
        metafields(identifiers: [${META_KEYS.map((k) => `{ namespace: "custom", key: "${k}" }`).join(", ")}]) { key value }
        images(first: 12) { edges { node { url altText } } }
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
    // Shopify handles may omit the "-shirt" suffix used by the designed pages.
    const slug = localProducts.some((p) => p.slug === node.handle)
      ? node.handle
      : localProducts.some((p) => p.slug === `${node.handle}-shirt`)
        ? `${node.handle}-shirt`
        : node.handle;
    map[slug] = {
      handle: slug,
      title: node.title,
      description: node.description,
      price: Number(node.priceRange.minVariantPrice.amount),
      available: node.availableForSale,
      images: (node.images?.edges ?? []).map((e: any) => e.node.url),
      tags: node.tags ?? [],
      meta: Object.fromEntries(
        (node.metafields ?? [])
          .filter((m: any) => m && typeof m.value === "string" && m.value.trim())
          .map((m: any) => [m.key, m.value.trim()]),
      ),
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

/** Turns a shirt that exists only in Shopify Admin into the storefront's product shape. */
export function liveToProduct(l: LiveProduct): Product {
  const paras = l.description.split(/\n\s*\n|(?<=\.)\s{2,}/).map((t) => t.trim()).filter(Boolean);
  return {
    slug: l.handle,
    name: l.title.replace(/\s*shirt$/i, "") || l.title,
    title: l.title,
    tagline: "",
    price: formatINR(l.price),
    images: l.images,
    colorName: "",
    colorHex: "#ECE4DB",
    colorStory: "",
    fabricColour: "",
    embroideryColour: "",
    detailImg: "",
    description: paras.length ? paras : [l.description],
    details: [],
    handmadeNote: DYED_NOTE,
    altText: l.title,
    metaTitle: `${l.title} | Notions in Pattern`,
    metaDescription: l.description.slice(0, 155) || "Hand embroidered chikankari shirt from Notions in Pattern.",
    tags: l.tags,
  };
}

/** Lays Shopify's tagline, description, colours and detail values over a shirt; blanks keep the site's own text. */
export function withShopifyDetails(product: Product, live: LiveProduct | undefined): Product {
  if (!live) return product;
  const m = live.meta ?? {};
  const base = new Map(product.details);
  const details: [string, string][] = (["Fabric", "Handwork", "Buttons", "Fit"] as const)
    .map((label): [string, string] => [label, m[label.toLowerCase() as MetaKey] ?? base.get(label) ?? ""])
    .filter(([, v]) => v);
  const paras = live.description.split(/\n\s*\n|(?<=\.)\s{2,}/).map((t) => t.trim()).filter(Boolean);
  return {
    ...product,
    tagline: m.tagline ?? product.tagline,
    fabricColour: m.fabric_colour ?? product.fabricColour,
    embroideryColour: m.embroidery_colour ?? product.embroideryColour,
    details,
    description: paras.length ? paras : product.description,
  };
}

/** Designed shirts first, then any shirt added later in Shopify Admin (with photos). */
export function useAllProducts(): Product[] {
  const { data } = useLiveCatalog();
  if (!data) return localProducts;
  const known = new Set(localProducts.map((p) => p.slug));
  const extra = Object.values(data)
    .filter((l) => !known.has(l.handle) && l.images.length > 0 && l.price > 0)
    .map(liveToProduct);
  return [...localProducts, ...extra];
}

export function formatINR(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

/** Local design content + live Shopify price and stock (falls back to local data while loading). */
export function useLiveProduct(product: Product | undefined) {
  const { data } = useLiveCatalog();
  const live = product ? data?.[product.slug] : undefined;
  const priceText = live && live.price > 0 ? formatINR(live.price) : product?.price ?? "";
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
  return (p: Product) => (data?.[p.slug] && data[p.slug].price > 0 ? formatINR(data[p.slug].price) : p.price);
}

const CART_CREATE = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) { cart { checkoutUrl } userErrors { message } }
  }
`;

/** Creates a Shopify cart with every bag line and returns its hosted checkout link. */
export async function createCheckout(
  lines: { slug: string; size: string; qty: number }[],
  discountCodes: string[] = [],
): Promise<string> {
  const catalog = await fetchCatalog();
  const cartLines = lines.map((l) => {
    const v = catalog[l.slug]?.variants.find((x) => x.size === l.size);
    if (!v) throw new Error(`${l.slug} size ${l.size} is not available`);
    return { merchandiseId: v.id, quantity: l.qty };
  });
  const data = await storefrontApiRequest(CART_CREATE, { input: { lines: cartLines, discountCodes } });
  const errs = data?.data?.cartCreate?.userErrors ?? [];
  if (errs.length) throw new Error(errs.map((e: { message: string }) => e.message).join(", "));
  const url = data?.data?.cartCreate?.cart?.checkoutUrl;
  if (!url) throw new Error("Checkout could not be created");
  const u = new URL(url);
  u.searchParams.set("channel", "online_store");
  return u.toString();
}
