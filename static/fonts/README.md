# Self-hosted fonts

This directory holds the self-hosted web fonts. The previous Mintlify
configuration loaded both files from the Webflow CDN:

- `CalSans-SemiBold.woff2` — headings
- `Aeonik-Regular.woff2` — body

## Legal review required before merge

Both fonts were being hotlinked from `cdn.prod.website-files.com` under
Mintlify. Before switching to self-hosting we need written confirmation that
Civic has a license for both fonts that permits redistribution from
`docs.civic.com`. The files are intentionally absent from this commit so CI
won't ship unlicensed binaries.

The filenames the CSS expects are:

- `static/fonts/CalSans-SemiBold.woff2`
- `static/fonts/Aeonik-Regular.woff2`

Drop the approved woff2 files into this directory, commit, and the CSS
`@font-face` declarations in `src/css/custom.css` will pick them up. Until
then the browser falls back to the stack declared on `:root` (Geist → system
UI), matching the look of the current Mintlify site with default Geist.

The `@font-face` declarations use `font-display: swap` so the cascade never
blocks rendering on the missing files.
