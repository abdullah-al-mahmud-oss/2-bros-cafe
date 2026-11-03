# SEO checklist

## Implemented

- Unique page titles and descriptions, viewport metadata, semantic page headings, descriptive internal links, and Open Graph title/description/image metadata.
- Local context and visible business contact details on the site.
- Home-page `CafeOrCoffeeShop` JSON-LD with supplied name, address, phone, email, coordinates, and social profiles only.
- Favicon and robots rules. No fake production hostname is used.

## Complete when the owner confirms the domain

- [ ] Configure the final HTTPS origin in `js/site-config.js`; also write static canonical and `og:url` tags into each HTML page.
- [ ] Add absolute sitemap URLs for each indexable page, including any GitHub Pages project path.
- [ ] Add a `Sitemap:` directive to `robots.txt`, deploy, and verify both files return successfully.
- [ ] Validate JSON-LD with Google's Rich Results Test or Schema.org Validator after deployment.
- [ ] Preview Open Graph images using the final public URLs and test common sharing platforms.
- [ ] Set up Google Search Console with owner access, verify the site, and submit the sitemap.
- [ ] Confirm the business's Google Business Profile details independently; do not assume website information updates it.
- [ ] Check indexing, HTTPS, mobile usability, image loading, and page titles on the live site.

Canonical URLs and sitemap page URLs are deliberately absent until the real domain and deployment path are known. Search Console and external business profiles require account access.
