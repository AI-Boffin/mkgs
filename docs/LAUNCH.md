# MK Gas Safety launch notes

This is a Next.js App Router site using TypeScript and static generation. Run `npm install`, then `npm run dev`. `npm run build` produces the portable `out/` directory. The Sites preview is private and deliberately noindex.

## Confirm before public launch

- Landlord package prices have now been supplied in two screenshots and added to the site. See `docs/PRICING.md` for the six prices, alarm inclusion, property-access note and Powermax exclusion. Confirm these remain current and clarify the VAT treatment before public launch.

- Ram's real enquiry email. Set `NEXT_PUBLIC_CONTACT_EMAIL` and rebuild. The default email flow creates a draft in the visitor's email application; the visitor must send it. It never claims a draft was delivered. For submission directly on the page, connect `NEXT_PUBLIC_CONTACT_ENDPOINT` to a real HTTPS form/email service with server-side validation, abuse protection, origin controls, length limits, and a verified recipient. Update the privacy notice for that provider. No secret belongs in a `NEXT_PUBLIC_` variable.
- Ram's Gas Safe registration and qualifications for all advertised work. Set `NEXT_PUBLIC_GAS_SAFE_NUMBER` after verification. No registration number, official logo, testimonials, prices, response-time promises or trading history have been invented.
- Confirm any business contact address directly with Ram before publishing it. The old reference screenshot is retained locally and excluded from the repository; no visitor address is advertised.
- Confirm the business privacy contact, retention schedule, email provider and actual data processing before enabling public enquiries. The current privacy notice labels the preview honestly.
- Confirm ownership of the final domain. Set `NEXT_PUBLIC_SITE_URL` to its canonical HTTPS origin and `NEXT_PUBLIC_ENABLE_INDEXING=true` only for the public release. Rebuild and redeploy. Submit `/sitemap.xml` to Search Console and create or update the verified Google Business Profile using the real service area. Canonicals, metadata, service pages, schema, internal links and sitemap are implemented; search rankings cannot be guaranteed.

## Content references, checked 15 October 2026

- HSE landlord guidance: https://www.hse.gov.uk/gas/domestic/faqlandlord.htm
- Gas Safety (Installation and Use) Regulations 1998, regulation 36: https://www.legislation.gov.uk/uksi/1998/2451/regulation/36
- Gas Safe engineer lookup: https://www.gassaferegister.co.uk/find-an-engineer-or-check-the-register/
- National gas emergency guidance: https://www.gassaferegister.co.uk/gas-emergency/what-to-do-in-a-gas-emergency/

The marketing copy is for domestic gas checks in England. Gas checks and boiler servicing are distinguished. Existing tenants: normally copy within 28 days; new tenants: before move-in; landlord records: at least two years. Full qualifications and exceptions remain in the linked HSE guidance.

## Visual assets

The current local revision replaces the kitchen-led design with unbranded boiler, flue and gas-hob imagery and more direct service copy. See `docs/IMAGE-BRIEF.md` for the final assets, generation prompts and research sources. The earlier kitchen asset below is retained only as an unused reference.

Original user-uploaded images are local references only and must not be committed or placed in `public/`. `public/icon.svg` and the React brand component redraw the six-colour flame as a clean vector suitable for the web; they are a brand interpretation rather than an extracted official vector.

`public/images/home-hero.webp` was made with the built-in image generation tool. It is illustrative, not a photo of Ram's work. Final generation prompt: premium editorial photograph of a welcoming British family kitchen; charcoal shaker cabinets, pale oak counters, cream walls, a terracotta vase and a green plant, gentle morning light from a garden window, subtle domestic gas hob; natural architecture-magazine photography, warm neutral palette, no people, text, logos or promotional graphics. The generated original is preserved outside the project; the web version is optimised locally.
