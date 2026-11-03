# 2 Bros Cafe website

A lightweight, static website for 2 Bros Cafe in Gulshan, Dhaka. It uses HTML, CSS, vanilla JavaScript, and the supplied photographs in `Assets/`. No build step, framework, backend, or package installation is required.

## Pages and files

- `index.html`, `menu.html`, `about.html`, `gallery.html`, `contact.html`, `privacy.html`, and `404.html`
- `css/` — shared design system, responsive rules, menu styles
- `js/` — accessible mobile navigation, optional canonical URL configuration, and gallery lightbox
- `Assets/` — original café photography and logo
- `robots.txt` and `sitemap.xml` — deployment SEO files; sitemap URLs require the real domain

## Run locally

Use any static HTTP server. For example, with Python installed:

```powershell
python -m http.server 8000
```

Open `http://localhost:8000`. Stop the server with Ctrl+C. There are no npm dependencies.

## Updating the site

- **Photographs:** put new files in `Assets/`, use descriptive alt text, and keep width/height attributes in the HTML. Update `ASSET-INVENTORY.md` when assets change.
- **Menu:** update `menu.html` from an owner-approved, current menu. Do not infer prices or bestsellers from photographs.
- **Business details:** update the repeated contact details in page footers and `contact.html`, plus structured data in `index.html`; verify the details before publishing.
- **Domain:** set `productionOrigin` in `js/site-config.js` to the final HTTPS origin, without a path. Then add canonical URLs to the sitemap using the final deployment path and add a sitemap directive to `robots.txt`. For reliable social previews and indexing, also set static canonical and `og:url` metadata in each HTML page after the domain is known.
- **Analytics:** none is enabled. Add only an owner-provided provider/account configuration and update `privacy.html` before enabling it.

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for GitHub Pages and Netlify instructions. This site has not been deployed.

## Domain-dependent SEO

The production domain and GitHub Pages path are not known. Canonical URLs and sitemap entries are intentionally not fabricated. Finish those items before calling production SEO complete.
