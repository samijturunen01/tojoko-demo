# Project status – Tojoko Oy (Hades Design · Apollo)

_Last updated: 24.11.2026_

## Project

- **Target company:** Tojoko Oy, Y-tunnus 3119564-8, Aspitie 16, 80100 Joensuu – independent car repair shop (founded 2020)
- **Original website:** none – this is a new website, not a redesign
- **Package:** Apollo (multi-page) – Master Prompt `C:\VERKKOSIVUT\Prompt.md`, no Hermes/Zeus module
- **Additional user instructions:** none beyond the Master Prompt (start prompt gave name, address, "no website")
- **Repository:** https://github.com/samijturunen01/tojoko-demo
- **Live demo:** https://samijturunen01.github.io/tojoko-demo/

## Strategy (CONVERSION_STRATEGY.md)

- Primary conversion: agree a time – phone call 040 169 5277 or "aikapyyntö" form (CTA "Pyydä aikaa korjaamolle")
- Positioning from verified reviews: friendly service + persistence with hard faults ("Myös ne viat, joiden syy ei löydy helpolla")
- Trust: Google 5,0 / 6 reviews (checked 24.11.2026, linked, not quoted), Y-tunnus, since 2020, address, hours, open-now

## Creative direction – "Varjotaulu" (shadow board)

- A workshop tool wall: petrol pegboard surfaces (CSS dot holes), painted yellow outlines where tools belong, warm paper-white walls, signal yellow for the next action. Key tags (punched hole) as the recurring shape: buttons, section markers, symptom tags, form preview.
- Palette: paper `#f4f1e9`, ink `#151918`, petrol `#0f3b3f` / deep `#0a2b2e`, yellow `#ffc933`, rust `#b5401f` (errors/warnings only).
- Type: Gabarito (display), Rethink Sans (body), Fragment Mono (labels) – self-hosted, not used in earlier demos.
- **Wordmark (proposal):** TOJOKO with three socket "O"s (hex counters) – the "OK" inside the name lights up yellow. `src/components/brand/wordmark.json`. Needs customer approval.
- **Signature intro "Kaikki paikallaan"** (`src/components/home/HeroBoard.tsx` + `index.css`): yellow shadow outlines are painted, the letters hang onto their pegs with an overshoot, a wrench swings into place, "OK" lights up, status "Kaikki paikallaan" (~2.3 s). Pure CSS from the `intro` class set in `index.html` before paint: every fresh load/refresh of the homepage, never with reduced motion, never replayed on in-app navigation (removed by ScrollManager / timeout). Desktop: full board beside the H1; phones: compact wordmark strip above the H1. H1 and CTAs never wait.
- **Custom interaction:** "Mitä autossa tuntuu?" symptom key tags (GSAP elastic swing, lazy-loaded) → what to tell the garage → pre-filled request (`?aihe=…&oire=…`). Contact form has a live "avainlappu" key-tag preview (desktop).
- Other motion: hanging reveals, shadow-board hover in the service list, subtle GSAP parallax on the photo break (desktop).

## Pages

Etusivu · Palvelut · Autohuolto · Autokorjaukset · Vianselvitys · Korjaamo (type plate, review themes, how to deal with a small garage) · Yhteystiedot (call card, hours + open-now, request form, click-to-load Google map, company info) · branded 404 ("Tämä koukku on tyhjä.").

## Completed

- Research + docs: CONTENT_SOURCES, REDESIGN_IMPROVEMENTS (digital presence analysis), CONVERSION_STRATEGY, CONVERSION_MEASUREMENT, ASSET_PROVENANCE, IMAGE_REPLACEMENT_LIST, BACKEND_INTEGRATION
- Full site, prerendered routes with unique titles/descriptions, canonical (demo URL), OG image, JSON-LD (AutoRepair with hours, Service, BreadcrumbList, FAQPage – no ratings), sitemap, robots (allows crawling so `noindex` is visible), `.nojekyll`
- Demo form (validation, plate formatting, pre-selection, honeypot, "Demoversio – viestiä ei lähetetty."), analytics no-op layer
- Scroll manager (nav → top instantly, hash links scroll to section, back/forward restore)
- Image pipeline (`npm run images`), lab perf script, screenshot tool

## Testing status (local production build, 24.11.2026)

- `tsc -b`, `eslint .`, `npm run build` – pass
- Playwright (desktop 1440 + Pixel 7): 92 passed, 4 skipped (device-specific) – pages, metadata, noindex, 404, robots/sitemap, overflow at 360/390/768/1024/1440, no third-party requests/cookies, images + alt, navigation (Etusivu first, active state, top-of-page on nav, back/forward restore, nested direct links, mobile dialog), intro (plays on load/refresh, not on in-app return, reduced motion, no-JS), form (validation, demo submit sends nothing/stores nothing, pre-selection, key tag), symptom picker, map click-to-load + correct place, Google link, FAQ, open-now with a fixed clock
- axe-core WCAG 2.2 A/AA: no serious/critical violations on any page (automated only; keyboard flows covered by tests; no screen-reader testing done)
- Lab performance (Chromium, 4× CPU, ~1.6 Mbps, 150 ms RTT – not real-user data): mobile LCP ≈ 1.5–1.7 s, desktop ≈ 1.35–1.5 s, CLS 0 (homepage desktop 0.004)

## Fixed during QA

- `scroll-padding-top` on `<html>` made the page jump when a sticky-header link was focused/clicked → removed (anchors use scroll-margin)
- Demo strip re-wrapped on font swap (mobile CLS 0.07) → single line at every width; body font preloaded
- Label-in-name (WCAG 2.5.3) mismatches on the logo link and mobile call bar → fixed

## Known issues / notes

- Holiday hours unknown – open-now follows regular hours, with a note to confirm holidays by phone.
- No email published (none found). No owner name/photo (unverified).
- All photos are labelled Pexels illustrations (no authentic photos exist publicly).

## Asset permissions

No authentic logo/photos found. Wordmark + graphics are original (proposal). Stock: Pexels licence, labelled "Kuvituskuva". Details: ASSET_PROVENANCE.md.

## Deployment

GitHub Actions `.github/workflows/deploy.yml` (lint → build → Playwright → Pages). Base path `/tojoko-demo/`, `VITE_FORM_MODE=demo`, `VITE_ALLOW_INDEXING=false`. Repo-local git identity `samijturunen01 <308068629+samijturunen01@users.noreply.github.com>`. Local preview port **4336** (`node scripts/serve-dist.mjs 4336`).

## Production readiness (if the customer buys)

Confirm facts and services (CONTENT_SOURCES "Requires customer confirmation") · approve or replace the wordmark · domain/DNS + HTTPS (`VITE_BASE_PATH=/`, `SITE_URL`) · Apps Script + reCAPTCHA (BACKEND_INTEGRATION.md) · privacy notice · consented analytics (CONVERSION_MEASUREMENT.md) · `VITE_ALLOW_INDEXING=true` · authentic photos (IMAGE_REPLACEMENT_LIST.md) · link the site from the Google Business Profile.

## Next recommended action

Present the demo to the owner; collect answers to the confirmation list, 3–5 authentic photos (workshop, owner, exterior) and an email address.
