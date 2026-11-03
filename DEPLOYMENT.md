# Deployment

The website is a plain collection of static files. Publish the contents of this folder without a build command and without installing dependencies.

## GitHub Pages

1. Add the files to a GitHub repository and enable Pages for the intended branch and folder.
2. Keep links and asset references relative (for example `css/style.css`, `Assets/banner.jpg`) so they work on a project site such as `https://account.github.io/repository/`.
3. If using a project site, configure the eventual site origin in `js/site-config.js`, and include the repository path when creating canonical URLs and sitemap entries. Root sites and custom domains use a different base path.
4. Confirm the custom 404 page is deployed at the published root.
5. Test all page paths after publishing; confirm HTTPS and social preview image URLs.

GitHub Pages does not run a backend for this site. Its `404.html` is used for not-found routes. Ensure domain and path values match the actual deployment before adding SEO URLs.

## Netlify

1. Create a new site from the repository or manually deploy this folder.
2. Leave the build command empty and set the publish directory to the project root.
3. Netlify serves `404.html` for not-found pages. Add a `_headers` file only if you choose to configure the recommended response headers in `SECURITY-CHECKLIST.md`.
4. Verify the deployed site, HTTPS, contact links, and image loading.

## Before launch

- Confirm the production domain and deployment base path.
- Update `js/site-config.js`; add static canonical and Open Graph URL metadata and absolute URLs for every sitemap entry.
- Update `robots.txt` with the final sitemap location.
- Replace menu highlights with owner-approved current menu and prices if supplied.
- Validate structured data and social sharing after deployment.

No deployment has been performed as part of this project.
