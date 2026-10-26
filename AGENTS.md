<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

# Project Architecture Rules

- Render storefront photos through StoreImage and the image-delivery registry; keep original asset pointers for full-detail zoom so responsive WebP delivery never changes uploaded artwork or framing.
- Defer the homepage process video until its section approaches the viewport so off-screen playback does not compete with first-screen images.
- Use the shared Select controls for Collections filters so dropdown highlights follow brand tokens rather than browser-owned menu colours.

- Use the shared `site-chrome` Header, Footer, and AnnouncementBar across content pages so navigation, store state, and branding remain consistent.
- Keep shared header sizing consistent between overlay and in-flow presentations, while preserving the Collections header exception, so page navigation retains consistent dimensions.
- Founder story photos use stretching grid-cell wrappers with positioned images so taller chapter text cannot leave gaps between adjacent photo corners.
- Keep model fit-reference data in the shared size-chart-models module so all product size charts use the same tested sizing facts and uploaded photo pointers.- Shopify is the source of truth for price, stock and checkout (src/lib/shopify.ts, product handle = local slug); src/lib/products.ts keeps only the design content (copy, colours, styling photos) so the bespoke layout survives while commerce data stays live.
