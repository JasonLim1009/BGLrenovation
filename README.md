# BGL Design & Build — React (Vite) version

Converted from the static HTML site (`index.html`, `service.html`, `contacts.html`) into a
React single-page app using Vite + React Router.

## Setup

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

## Build for production

```bash
npm run build
```

Output goes to `dist/`. Deploy `dist/` the same way you deployed the old static site (e.g. Vercel).

## Structure

- `src/pages/Home.jsx`, `Service.jsx`, `Contact.jsx` — the three original pages, now routes (`/`, `/service`, `/contact`)
- `src/components/` — shared pieces: TopBar, Header (with working mobile nav + scroll-hide header),
  Footer (with the subscribe form wired to a mailto: handler), HeroSlider (reusable, replaces the old
  `script.js` slider logic), CountUp (replaces the two counter `<script>` blocks), BackToTop, Preloader.
- `src/data/swiperData.js` — auto-extracted gallery data (9 categories, ~185 images) that used to be
  hand-written HTML in `service.html`; now rendered via `swiper/react` (official Swiper React bindings),
  matching the original CDN Swiper behavior (autoplay + pagination dots).
- `public/assets/` — original CSS (`assets/css/style.css`, untouched) and every image actually referenced
  by the 3 pages. Commented-out sections in the original HTML (menu, testimonials, old reservation form)
  were not carried over since they were already disabled — say the word if you want them added back in.
- `<ion-icon>` icons still load via the same unpkg CDN script tags as before (kept in `index.html`).

## PWA (installable app)

This project is now a PWA via `vite-plugin-pwa`:

- `npm run build && npm run preview` — PWA features (install prompt, offline
  caching) only work on a **built** app, not `npm run dev`. Open the preview
  URL, and on Chrome desktop/Android you'll see an "Install" icon in the
  address bar; on iOS Safari, use Share → "Add to Home Screen".
- Icons are pre-generated from `bgllogos.png` at `public/pwa-192x192.png`,
  `public/pwa-512x512.png`, `public/pwa-maskable-512x512.png`, and
  `public/apple-touch-icon.png`. Swap these out for a dedicated square logo
  if you want a cleaner icon later — current ones just pad the existing
  circular-ish logo onto a navy square.
- Site images (`assets/images/**`) are cached on-demand (cache-first) rather
  than pre-cached on install, since there are 200+ of them — first visit to
  each gallery caches it, then it's instant + offline after that.
- The manifest, theme color, and app name live in `vite.config.js` under the
  `VitePWA({ manifest: {...} })` block — edit there to rename/rebrand.
- When you deploy a new version, `registerType: "autoUpdate"` means installed
  users get the update automatically on their next visit/reload — no
  App Store review wait.

## Background ambient music

- `src/components/AmbientMusic.jsx` plays a 90-second looping ambient track
  (`public/assets/audio/ambient.mp3`, ~940KB) meant to feel calming while
  browsing — a soft layered drone plus gentle filtered noise, **synthesized
  from scratch (not a copyrighted song/recording)** so there's no licensing
  concern using it.
- Browsers block autoplay-with-sound, so it starts **muted** the instant the
  page loads, then automatically unmutes on the visitor's first click/scroll/
  keypress — feels close to instant without violating browser policy.
- A speaker icon button, bottom-left of every page, lets visitors mute/unmute
  any time; their choice is remembered (`localStorage`) across visits.
- To swap the track: replace `public/assets/audio/ambient.mp3` with your own
  royalty-free file (same filename), or edit the `src` in `AmbientMusic.jsx`.
  Good royalty-free sources if you'd rather use real music: YouTube Audio
  Library, Pixabay Music, or Free Music Archive (double-check each track's
  license terms before publishing).

## Google Analytics 4

Tracks which pages get the most traffic/engagement time (built into GA4's
own reports) plus custom events for which service gallery categories on
`/service` customers actually linger on.

1. Create a GA4 property at [analytics.google.com](https://analytics.google.com) if you don't have one, and grab the Measurement ID (`G-XXXXXXXXXX`) from Admin → Data Streams → your web stream.
2. Copy `.env.example` to `.env` and paste it in:
   ```
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
3. If deploying on Vercel, also add `VITE_GA_MEASUREMENT_ID` under Project Settings → Environment Variables (Vite bakes env vars in at build time, so it needs to be set there too, not just locally).
4. Restart `npm run dev` after adding the `.env` file.

**What gets tracked:**
- A `page_view` event on every route change (Home / Service / About / FAQ / Contact) — see this in GA4 under Reports → Engagement → Pages and screens, including average engagement time per page.
- A `view_gallery` event whenever a visitor scrolls a service category (Ceiling & Electrical, Paint, Tiles, etc.) into view — see under Reports → Engagement → Events, or build a custom report grouped by the `gallery_category` parameter.
- A `gallery_dwell_time` event (with a `dwell_seconds` parameter) fired when a visitor scrolls a gallery category *out* of view, telling you how long they actually looked at it — this is the "which gallery gets the most attention" metric. Build a GA4 Exploration (Reports → Explore) with `gallery_category` as a dimension and average `dwell_seconds` as the metric.
- No GA network requests happen until `VITE_GA_MEASUREMENT_ID` is set — safe to leave blank in dev.

## Portfolio (/portfolio) — map + filterable grid

`src/pages/Portfolio.jsx`: a filterable project grid (by service category)
plus a map (via Leaflet + OpenStreetMap — **no API key needed**, unlike
Google Maps JS) with a pin per project location. Click a category pill to
filter both the map and the grid together. Currently uses placeholder demo
project data (`src/data/projectsData.js`).

**Auto-syncing from Facebook** (`scripts/sync-fb-projects.mjs` +
`.github/workflows/sync-projects.yml`):
1. In Facebook, get your Page ID and generate a long-lived Page Access Token
   with `pages_read_engagement` permission (Meta for Developers → your app →
   Graph API Explorer, or via the Meta Business Suite).
2. In your GitHub repo → Settings → Secrets and variables → Actions, add two
   repository secrets: `FB_PAGE_ID` and `FB_PAGE_ACCESS_TOKEN`.
3. The workflow runs automatically on the 1st of every month, or trigger it
   manually anytime from the repo's Actions tab ("Sync projects from
   Facebook" → Run workflow). It pulls recent Page posts, guesses a service
   category and a rough location (Seremban vs. KL hub — see the script's
   comments for the heuristic) from each post's caption, and commits the
   result to `src/data/projects.generated.json`.
4. Once that file has real entries, `src/data/projects.js` automatically
   switches from the placeholder demo data to the synced data — no code
   change needed.
5. **Category/location guessing is heuristic, not exact** — it just scans
   the post caption for keywords. For more accurate results, get in the
   habit of starting each Facebook post's caption with the category name
   (e.g. "Tiles - ...") and mentioning the area name.
6. To test the script locally: `FB_PAGE_ID=xxx FB_PAGE_ACCESS_TOKEN=xxx node scripts/sync-fb-projects.mjs`

## New pages & features (this batch)

- **Floating WhatsApp button** — fixed bottom-right on every page, stacked above the existing back-to-top button.
- **Google Map embed** — added to `/contact`, plus an "Open in Google Maps" button.
- **SEO basics** — `src/components/SEOHead.jsx` sets title/description/canonical/Open Graph per page; `public/robots.txt` + `public/sitemap.xml` added. Update the domain in `SEOHead.jsx` and `sitemap.xml` if you move off `bglrenovation.vercel.app`.
- **Before & After slider** — `src/components/BeforeAfter.jsx`, shown on the Home page. **Currently uses placeholder image pairs** (reused gallery photos) just to demo the interaction — replace `beforeAfterPairs` in `Home.jsx` with real before/after photo pairs from actual projects for this to be persuasive.
- **Testimonials** — `src/components/Testimonials.jsx`, shown on Home. **Placeholder reviews** — swap in real customer quotes (consider pulling from your Google Business Profile or WhatsApp chats with permission).
- **Language switcher (EN / 中文 / BM)** — `src/i18n/`. Currently translates the site chrome: nav, header/footer labels, buttons, search placeholder. **Full page body content (paragraphs, testimonials, hero slide text) is not yet translated per-language** — that content is still hardcoded in English/Chinese as originally written. To extend: add more keys to `src/i18n/translations.js` and swap hardcoded strings for `t("key")` calls, page by page.

## Notes / small intentional differences from the original

- Routing is done client-side (React Router) instead of separate `.html` files — links between
  Home/Service/Contact no longer cause a full page reload.
- The external links (Facebook, 小红书, WhatsApp, Google Map) now open in a new tab (`target="_blank"`)
  so people don't get navigated away from the app — easy to remove in `Header.jsx`/`Footer.jsx`/`Contact.jsx`
  if you'd rather match the original same-tab behavior exactly.
- The two counter scripts (`.stat-value` and `.count`) now trigger when they scroll into view instead of
  on page load, via `CountUp.jsx` — feels a bit nicer since several of them are below the fold.
