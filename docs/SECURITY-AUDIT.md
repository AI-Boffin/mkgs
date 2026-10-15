# Security and upload audit — 15 October 2026

## Scope and findings

The audit covers this Next.js source repository, GitHub's `main` branch and its reachable commit history, the generated static website, and installed production dependencies. It is not a penetration test or a guarantee of complete security.

- Gitleaks 8.30.1, downloaded from its official release and checked against the published SHA-256 checksum, reported no secrets in the six pre-cleanup local commits (including the published commits).
- A separate Gitleaks scan reported no secrets in the generated static website. Scans used full output redaction and did not rely on `gitleaks:allow` comments.
- `npm audit --omit=dev` reported zero known production dependency vulnerabilities at the time of the audit.
- A full `npm audit`, including development and build packages, also reported zero known vulnerabilities.
- The cleaned four-commit publication history passed a separate Gitleaks scan. The uploaded logo, information screenshot and both pricing screenshots were checked by Git blob hash and were absent from the cleaned `main` history, including under renamed paths.
- All five negative safeguard tests passed: an unapproved image filename, image bytes renamed to a text file, a private environment file, a synthetic token pattern and replacement bytes under an approved image filename were rejected. The tests restored the staged source unchanged.
- The only environment file tracked is `.env.example`, containing empty contact/endpoint/registration settings and public website configuration. No real credentials are configured in it.
- The preview manifest's project ID is an identifier, not an authentication secret. The Git remote URL has no embedded credentials.
- The enquiry form currently prepares a local draft. There is no configured delivery endpoint, database, login system or stored server credential. Connecting delivery later still requires a properly secured service and updated privacy details.

## User-uploaded images

Two copies of the supplied logo had been included: `logo.png` and `public/original-logo.png`. The old information screenshot and the pricing screenshots were not present in GitHub's published `main` history. The information screenshot did exist in an older local-only backup history.

The cleanup removes the uploaded logo copies and the old information screenshot from the rewritten histories. Original references remain local and ignored. The public copy of the uploaded logo is moved outside `public/`, so future builds do not serve it. The displayed brand uses the existing code-drawn vector rather than the uploaded raster image.

Only generated site artwork and photos remain approved for Git. Each approved image has an explicit SHA-256 entry in `.security/approved-public-assets.json`. Newly uploaded or renamed images are not approved automatically.

## Prevention

- Images and credential files are ignored by default.
- `npm run security:check` inspects staged Git file contents, checks asset hashes and flags private files and common token/private-key patterns without printing their values.
- Commit and push hooks run the checks. The push check examines reachable history, so an older branch containing uploads cannot be pushed accidentally through this checkout.
- Install the hooks in every new clone with `npm run security:install-hooks`. Local hooks can be bypassed and are not a substitute for server-side protection or a full secret scanner.
- `AGENTS.md` records the user's rule that uploaded reference images must remain local.

## Limits

A clean scan means that these checks found no secrets; it does not prove the absence of every possible secret or vulnerability. Dependency advisories can change. Repeat scans and audits before a public release and after connecting services.

Rewriting Git history changes commit IDs. Collaborators with older clones should re-clone or carefully rebase rather than merge the old history back. Cleaning the current branch cannot recall existing clones, forks, downloaded copies or every cached GitHub view. GitHub documents the additional support process and its limits for sensitive data.

The earlier private Sites preview is a separate saved artifact. Its access was checked: it is private, with one allowed user and no external visitors. Cleaning this GitHub repository does not erase saved versions in that service. It is not the current local website.

## References

- Gitleaks: https://github.com/gitleaks/gitleaks
- GitHub history-removal guidance: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository
