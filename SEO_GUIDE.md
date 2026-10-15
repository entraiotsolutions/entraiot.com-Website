# SEO / GEO / AEO guide for entraiot.com

## What is already in the code
- **Metadata**: title, description, canonical, Open Graph / Twitter on every page; `en-IN` locale; share image `/og-image.jpg`.
- **GEO (local)**: Chennai / Anna Nagar `geo.*` meta tags, `ProfessionalService` (LocalBusiness) schema with address, coordinates, opening hours, service area (Chennai, Tamil Nadu, India), map + Google profile links.
- **Structured data (JSON-LD)**: Organization, founder Person, WebSite, FAQPage, Service + Breadcrumb for all 8 industries, Product, BlogPosting, About, Contact. All rendered in server HTML (crawlers see it without running JS).
- **AEO (answer engines: ChatGPT, Gemini, Perplexity, Google AI Overviews)**: FAQ schema with direct answers, `public/llms.txt` fact sheet, `robots.ts` explicitly allows AI crawlers.
- **Crawling**: `src/app/sitemap.ts` and `src/app/robots.ts` (auto-generated, replaced the stale `public/sitemap.xml` which listed pages that don't exist). `/admin`, `/task`, `/api` are blocked from indexing.
- **Config in one place**: `src/lib/seo.ts` (address, phone, coordinates, social links, industries).

## Do these once after deploying (code alone cannot do them)
1. **Google Search Console** (https://search.google.com/search-console): property is already verified; submit `https://entraiot.com/sitemap.xml`; use *URL Inspection > Request indexing* for the home page and each main page.
2. **Google Business Profile**: claim/verify the Anna Nagar listing, same name/address/phone as in `src/lib/seo.ts`, add category "Internet of Things (IoT) service provider" / "Software company", photos, hours, and ask clients for Google reviews. This is the biggest factor for "IoT company in Chennai" / "near me" searches.
3. **Exact coordinates**: open your office in Google Maps, right-click > copy lat/long, put them in `SITE.geo` in `src/lib/seo.ts` (currently approximate).
4. **Bing Webmaster Tools** (feeds ChatGPT/Copilot search): add site, import from Search Console, paste the verification code in `src/app/layout.tsx` (commented line).
5. **Consistent NAP**: use the exact same name, address, phone everywhere (LinkedIn, Justdial, IndiaMART, Clutch, GoodFirms, Sulekha, Facebook, Instagram).
6. **Backlinks**: directory listings above, guest posts, partner/client sites linking to entraiot.com.
7. **Content**: rankings come from pages that match what people search. Add new pages/blog posts for specific queries, e.g. "IoT company in Chennai", "RFID solutions Chennai", "predictive maintenance for manufacturing in India", and answer each question in the first 2 sentences. Update `CONTENT_LAST_UPDATED` and the blog list in `sitemap.ts` when you do.
8. Check **PageSpeed Insights** and fix anything marked red (Core Web Vitals are a ranking factor).

## Notes
- Nobody can guarantee position #1; with a new brand it takes weeks to months. Brand-name searches ("Entraiot") should rank first quickly.
- The 28 `/contact/<type>/<value>[/<action>]` pages are near-duplicates; they are kept out of the sitemap on purpose.
