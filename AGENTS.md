# Repository privacy and security

- Never commit user-uploaded images, screenshots, original logo files or copies/renamed versions of them. Keep references local in the ignored `private-reference/` directory, outside `public/`.
- Only the generated website assets listed by SHA-256 in `.security/approved-public-assets.json` are approved for tracking. Update this list only for assets whose generated provenance is verified; never approve an uploaded reference image.
- Never commit real environment files, passwords, private keys, API tokens or other credentials. `NEXT_PUBLIC_` values are browser-visible and must never contain secrets.
- Install this checkout's hooks with `npm run security:install-hooks`. Run `npm run security:check` before committing and `npm run security:history` before pushing. Do not bypass the repository checks.
- Review and stage explicit source paths. Do not stage local reference material, generated build directories, audit reports, tool downloads or backup archives.
- Use a complete secret scanner and dependency audit for security reviews. The repository checks prevent common mistakes; they do not prove that software is 100% secure.
