# Roadmap

## Current requested adjustments
- [x] Check contact email opening: correct recipient; standalone browser opens Gmail sign-in. Embedded preview may block external tabs; no link rewrite needed.
- [x] Login on phones: retained smaller left card and original photo zoom; shifted framing left while filling the entire width with photo, no right-side blur. Verified 320/393/1280px, no overflow. Desktop and register unchanged.

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
- [x] Collection page (phones): hero reverted to the desktop presentation — photo full-bleed with the title overlaid (user: "should same same as desktop only"); CATEGORY and SORT BY still share one line — verified 393px/844px/768px/1280px, no overflow, build OK (2026-10-27)
- [x] Collection page (phones): undo the condensed hero text — restored the pre-condensing hero (label text-[11px], title text-4xl, subtitle text-xl, body text-[13px], block max-w-lg px-8 pt-32 pb-16); user said "NO revert back" to the small text fitted into the wall area — verified 393px and 1280px, build OK (2026-10-28)
- [x] Collection page hero: the phone treatment (shorter photo, smaller title) now stops at 600px wide instead of 768px, so a narrower laptop/preview window gets the full desktop hero again — verified 393/430/599 phone treatment and 635/768/1280/1920 desktop treatment (title 48px, copy 14px, right edge 144px in, 780px tall), no sideways overflow anywhere (2026-10-28)
- [x] Collection page hero (phones only): wording nudged right (inner right padding 16px -> 4px) and upward (top padding 112px -> 64px, title ~24px higher); desktop rules untouched — verified 393/430/599 phone treatment and 1280/1920 desktop (780px tall, 60px title, text 144px in from the right edge), no sideways overflow, build OK (2026-10-28)
- [x] Collection page hero (phones only): photo slid left (`object-[-170px_center]`, a constant 170px crop from its left edge) so the man and his chair sit clear of the wording at every phone width; wording itself untouched, desktop keeps `object-center` — verified 320/360/393/430/599 phone treatment and 635/768/1280/1920 desktop (780px tall, 60px title, text 144px in from the right edge), build OK (2026-10-28)
- [x] Collection page (phones): the "Hand-embroidered in Lucknow | Hand-dyed, small batch" strip below the marquee now uses a centred flex row so the divider sits with equal gaps (20px) on both sides and the labels sit equally far (32px) from the screen edges; desktop keeps the original grid with the divider at the exact centre — verified 393/768/1280, build OK (2026-10-29)
- [x] Founder page (phones only): hero row (photo 1 beside the name) unchanged; Ch 1 and Ch 2 now sit side by side in one full-width row with the founder2 photo full width below it; every following chapter shows its text full width with its photo full width directly beneath it (Ch 3→photo, Ch 4→photo, … Ch 7+Ch 8 side by side→photo, Ch 9→photo) — verified 393/768/1280, no overflow, build OK (2026-10-29)
- [ ] Known, pre-existing: on a 320px-wide phone the Collections page scrolls sideways by ~23px — caused by the announcement marquee ticker below the hero, not by the hero photo (photo rect is exactly 0-320). Not yet fixed; user not asked.
- [x] Mobile menu (hamburger, phones/tablets): full-height cream sheet redesign was REVERTED at user request ("Please revert back", 2026-10-29) — the menu is back to the original simple dropdown list under the header (COLLECTION / ABOUT / FOUNDER, then ACCOUNT / WISHLIST / CART); do not re-propose the sheet. Verified at 393px, build OK.
- [x] Login phone: photo ends at marked line (superseded)
- [x] Login phone: photo covers full background edge to edge, no blank strip; man fully in frame — verified 393px (2026-11-02)
