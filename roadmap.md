- [x] Collection page (phones): hero reverted to the desktop presentation — photo full-bleed with the title overlaid (user: "should same same as desktop only"); CATEGORY and SORT BY still share one line — verified 393px/844px/768px/1280px, no overflow, build OK (2026-10-27)

## Image loading performance
- [x] Founder logo: needle aligned above the ampersand; verified at 393px and 1280px.
- [x] Collections filter dropdown: brown/beige hover and sorting verified.
- [x] Measured oversized photo payloads and early video download.
- [x] Responsive WebP photos across the storefront; original-detail zoom retained; off-screen video deferred with WebM/MP4 fallback.
- [x] Verified photos on Home, Collections, Founder, About, product, Login, Register and Wishlist at phone/desktop widths; tests pass.

- [x] Size chart: added both full model photos and reference captions (M, 5’11”; S, 5’8”); checked photo loading, captions, closing, and mobile overflow.

## Responsive design for every screen size (plan approved 2026-10-05)

Process: audit page at phone/tablet/laptop/desktop/landscape widths → propose changes → wait for user approval → implement → verify at all widths.

- [x] 1. Shared header, announcement bar, footer — done: added hamburger menu (phones/tablets); footer & announcement bar needed no changes
- [x] 2. Homepage — done: "Crafted by hand" panels now shrink to fit on tablets (were cut off at the right edge); verified at phone/tablet/laptop/desktop/landscape, no overflow anywhere
- [x] 3. Collection page — done: hero content made smaller (headline, subtitle and text reduced one step), filter row rebuilt as tidy stacked rows on phones/tablets and unchanged one-row layout on computers, products one per row on phones (2→1) with computers untouched; also fixed the footer email overflowing sideways at tablet width by extending the tidy 2×2 footer to tablets — verified phone/landscape/tablet/laptop/desktop, no overflow anywhere (2026-10-27)
- [ ] 4. Product page
- [ ] 5. Cart
- [ ] 6. Wishlist
- [ ] 7. Login
- [ ] 8. Register / Create account
- [ ] 9. Orders
- [x] 10. About Us — done (done early at user request): hero stacks below laptop width (was clipping behind the photo on tablets/landscape phones), Our Story 2 columns at tablet (was 4 cramped columns), Gratitude text sits on a soft ivory panel on phones (was unreadable over the photo); desktop unchanged, verified at phone/tablet/laptop/desktop/landscape, no overflow anywhere
- [ ] 11. Founder
- [ ] 12. Privacy
- [x] Footer logo: make it a little smaller — done (144px wide)
- [x] Login & Register: visible gap between logo wordmark and heading, same on both pages — done
- [x] Product page perks row: "Store Credits" settled inside the first card's title ("Easy Exchange / Store Credits", no separate card), and the three cards centred as a group with equal gaps — verified 320/393/768/1280 (2026-10-17)

- [x] Product signup refinement: larger centred heading and three larger, centre-aligned benefits in equally spaced columns — verified at 393/768/867/1280/1920 with no overflow.
- [x] Product "Get on the list" heading: matched to the "Looking for a little help?" title size (24px on phones, 30px on larger screens) — verified 393/867/1280.
- [x] Product FABRIC & DETAILS: removed "Thread" and "Colour" rows on every shirt; each now ends with "Fabric Colour" and "Embroidery colour" rows — done 2026-10-21.
- [x] Product "Looking for a little help?": added Instagram as a fourth contact card (@notionsinpattern.nipstories, same footer URL) — done 2026-10-21.
- [x] Product colour lines: "Fabric Colour" / "Embroidery colour" moved out of FABRIC & DETAILS and placed directly above "Size:"; the "Colour: … fabric with … embroidery." sentence removed — verified on every shirt, build OK 2026-10-21.
- [x] Instagram icon: replaced the plain outline camera with the colourful brand gradient mark (product help card + footer CONNECT) — verified 2026-10-21.
- [x] Product "A note from founder": box background changed to the warm cream used above it (#ECE4DB) — verified 2026-10-21.
- [x] Product photo zoom: zoomed photo stays centred and can't slide off to one side (2026-10-26).
- [x] Product pages: removed the extra second line under SHIPPING & PROCESSING (2026-10-26).
- [x] Mobile footer: back to the tidy 2×2 grid (HELP+SHOP row 1, CONNECT+ABOUT row 2) with the original gap between columns; rows share their left/right edges, logo centred above, email on one line — verified 393px and 1280px, desktop untouched (2026-10-27)
- [x] Collection page (phones): CATEGORY and SORT BY now share one line, and the hero shows the whole photograph with the title below it — verified 393px/768px/1280px, laptop and desktop untouched (2026-10-27)
