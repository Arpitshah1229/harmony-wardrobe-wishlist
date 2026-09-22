# Clone the supplied homepage

## What will be built
- Replace the current `/` redirect with a real homepage matching the supplied ZIP’s active page.
- Recreate the content in the same order: full-screen collection introduction, the three-part pattern statement, the Bahaar/GulRaaz/Kinara image grid, and the closing image-and-video feature.
- Preserve the supplied wording, imagery, proportions, overlays, and editorial styling while adapting the layout cleanly for phones and larger screens.
- Use the project’s existing shared Header, announcement strip, and Footer instead of the ZIP’s header and footer.

## Links
- Add **HOME** to the shared header and footer, pointing to `/`.
- Keep **COLLECTION**, **ABOUT**, **FOUNDER**, account, wishlist, and cart connected to their existing pages.
- Connect homepage collection calls-to-action to `/collections` and each featured shirt to its matching product page.
- Connect the philosophy and craft-related calls-to-action to `/about-us`.

## Images and video
- Bring the homepage-specific image and video files from the supplied ZIP into the project.
- Use the supplied hero, philosophy artwork, three shirt images, sepia background, process video, and brand icon.
- Configure videos to autoplay silently, loop, and play inline, with still-image fallbacks where appropriate.

## Technical details
- Build the homepage as the TanStack React route at `src/routes/index.tsx`; no additional framework or duplicate router will be introduced.
- Add homepage-specific styles through semantic project colors and responsive utility classes, preserving the existing brand typography.
- Add unique homepage title, description, Open Graph, and Twitter metadata.
- Verify the finished page at desktop and mobile sizes, including navigation, image loading, video loading, and overflow.
