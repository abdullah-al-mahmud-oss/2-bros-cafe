# Security and privacy checklist

## Implemented

- Static HTML/CSS/JavaScript only; no server endpoints, account forms, secrets, analytics, ads, or third-party scripts.
- No remote fonts or embedded map. External service links open in new tabs with `rel="noopener noreferrer"`.
- Gallery labels and image alt text are set via `textContent`/attributes, not HTML string injection.
- Privacy policy describes hosting logs and third-party links without claiming the host collects nothing.

## Hosting configuration

HTML files cannot set HTTP response headers. Configure these at the host and test compatibility before rollout:

- Content-Security-Policy: `default-src 'self'; img-src 'self' data:; style-src 'self'; script-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- Enable HTTPS and the host's HTTP-to-HTTPS redirect.

If adding third-party embeds, fonts, analytics, or other resources, update the CSP and privacy notice to match the actual integrations. Do not add analytics until the owner provides account details and approves the privacy implications.
