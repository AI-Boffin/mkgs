# mkgs

MK Gas Safety website, built with Next.js, React and TypeScript for Ram's domestic gas safety checks in Milton Keynes, Buckingham and Newport Pagnell.

## Run locally

Requires Node.js 22 or newer.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000.

## Production build

```sh
npm run build
npm start
```

The build generates the static website in `out/`. `npm start` serves that export locally. The site can also be hosted on a provider that supports Next.js or static exports.

## Configure before public launch

Copy `.env.example` to `.env.local` and fill in the confirmed values:

- `NEXT_PUBLIC_SITE_URL`: the final canonical HTTPS domain.
- `NEXT_PUBLIC_CONTACT_EMAIL`: Ram's enquiry email.
- `NEXT_PUBLIC_GAS_SAFE_NUMBER`: Ram's verified registration number.
- `NEXT_PUBLIC_CONTACT_ENDPOINT`: optional HTTPS form delivery endpoint.
- `NEXT_PUBLIC_ENABLE_INDEXING`: set to `true` only for the public release.

Rebuild after changing these settings. Public environment variables are visible in browser code; do not use them for secrets.

Without an email or delivery endpoint, the form prepares an enquiry preview and sends nothing. With an email only, it opens an email draft for the visitor to send. Direct form delivery requires a real configured endpoint.

## Content and assets

- [Launch checklist](docs/LAUNCH.md): business details, privacy, registration, delivery and search indexing.
- [Image brief and research](docs/IMAGE-BRIEF.md): current image assets, generation prompts and UK guidance sources.
- The boiler, flue and hob images are AI-generated illustrations, not photos of Ram or completed jobs.
- The generated assets and local fonts are included. No image-generation step is needed to build or run the site. Local reference material and machine-specific preparation scripts are excluded from the repository.

The `.openai/hosting.json` file records an earlier private preview. The local app and static export do not require that hosting service or a ChatGPT login.
