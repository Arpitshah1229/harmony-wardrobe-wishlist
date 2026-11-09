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

- Anchor the mobile gratitude signature to proportional coordinates of the photo section, independent of paragraph wrapping, so its position stays consistent across phone widths.

- Coordinate navigation through TanStack Router's native view transitions, not pathname-keyed remounts or live-page fades, so the previous page remains visible during the crossfade and fixed headers stay stable.

- Keep the phone product photo viewer separate from the desktop lightbox and use react-zoom-pan-pinch for gesture handling so mobile presentation changes preserve desktop behavior.

- Render storefront photos through StoreImage and the image-delivery registry; keep original asset pointers for full-detail zoom so responsive WebP delivery never changes uploaded artwork or framing.
- Defer the homepage process video until its section approaches the viewport so off-screen playback does not compete with first-screen images.
- Use the shared Select controls for Collections filters so dropdown highlights follow brand tokens rather than browser-owned menu colours.
- Scope wide-screen Collections sizing to its page at widths above 1500px, retaining the smaller layouts and shared chrome so approved phone and laptop presentations remain stable.
- Scope wide-screen homepage sizing above 1500px and cap its square featured grid independently of full-width backgrounds so approved smaller layouts and photo framing remain stable.

- Use the shared `site-chrome` Header, Footer, and AnnouncementBar across content pages so navigation, store state, and branding remain consistent.
- Keep shared header sizing consistent between overlay and in-flow presentations, while preserving the Collections header exception, so page navigation retains consistent dimensions.
- Founder story photos use stretching grid-cell wrappers with positioned images so taller chapter text cannot leave gaps between adjacent photo corners.
- Keep model fit-reference data in the shared size-chart-models module so all product size charts use the same tested sizing facts and uploaded photo pointers.
- Shopify is the source of truth for price, stock and checkout (src/lib/shopify.ts, product handle = local slug); src/lib/products.ts keeps the design content (copy, colours, styling photos) plus a fallback price used only while live data is missing, so the bespoke layout survives while commerce data stays live.
- Scope wide-screen Product and Founder sizing above 1500px via page wrapper classes so approved smaller layouts remain stable.
