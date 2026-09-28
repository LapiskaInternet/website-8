# Banhu Tourism — Project Worklog

Shared worklog for all agents working on the Banhu Tourism website (Next.js 16 + shadcn/ui + Prisma).

Project goal: Single-page marketing + booking site for Banhu Tourism (Acornhoek, Mpumalanga).
Live data: SAST clock/calendar + Open-Meteo weather. Booking form → SQLite (Prisma) + WhatsApp handoff.

Brand tokens: cream #F7F1E1 background, deep green #1D4A2B primary, burnt orange #DE7B33 accent, brown #5C4322. Font: Poppins.
Logo: /public/images/banhu-logo.png (pulled from banhutravel.co.za).

---
Task ID: 1
Agent: main (orchestrator)
Task: Project setup — assets, connectivity checks, foundations planning

Work Log:
- Verified project scaffold (Next.js 16, Tailwind 4, shadcn/ui New York, Prisma+SQLite, zustand, zod available)
- Downloaded 9 uploaded poster images from CDN into /public/images (renamed kebab-case, compressed via sharp to ~1MB each, max width 1400)
- Pulled official logo from https://banhutravel.co.za/logo.png → /public/images/banhu-logo.png (441x438 PNG, verified visually)
- Tested Open-Meteo geocoding + forecast APIs from sandbox — both reachable, Acornhoek resolves correctly

Stage Summary:
- Assets ready in /public/images: banhu-logo.png, 6 addon posters (addon-*.png), mpumalanga-tourism-expo.png, bushbuckridge-heritage-tour.png, expo-about.png
- Weather source decided: Open-Meteo (no API key) via backend route /api/weather
- Next: foundations (theme, data lib, store, Prisma Booking model, API routes), then parallel component build by agents 2-a / 2-b

---
Task ID: 2 (foundations complete)
Agent: main (orchestrator)
Task: Foundations — theme, fonts, data, store, Prisma, API routes, generated package photos

Work Log:
- layout.tsx: Poppins font (300-800), metadata "Banhu Tourism — Experience the Heritage of Mpumalanga", favicon = /images/banhu-logo.png
- globals.css: full brand theme — cream background #F7F1E1, primary green #1D4A2B, accent orange #DE7B33, banhu-* color tokens, topo-pattern & bead-strip utilities, smooth scroll + scroll-padding for anchors
- prisma/schema.prisma: replaced scaffold models with Booking model; `bun run db:push` OK
- src/lib/banhu-data.ts: CONTACT (phone 064 959 4490, wa.me/27649594490, email, address, hours, CIPC/SARS), ADDONS (6, with poster images), PACKAGES (4 with generated photos), STRATEGIC_PARTNERS (8), AIRPORTS, SHUTTLES, NAV_LINKS, whatsappLink()
- src/lib/booking-store.ts: zustand store {selectedAddons, selectedPackage, toggleAddon, clearAddons, setSelectedPackage}
- src/components/banhu/bead-divider.tsx + section-heading.tsx (eyebrow/title/subtitle, onDark variant)
- /api/weather: GET ?query= → Open-Meteo geocode+forecast, returns {name, admin1, country, description, current{temperature,feelsLike,humidity,wind}}
- /api/booking: POST zod-validated → saved to Prisma → returns {ok, bookingId, whatsappUrl} with prefilled WhatsApp summary
- Generated 4 landscape package photos via z-ai image CLI: package-highveld-lowveld.jpg, package-maputo-acornhoek.jpg, package-swaziland-acornhoek.jpg, package-heritage.jpg (verified quality)

Stage Summary:
- Foundations DONE. Available to component agents: banhu-* colors, BeadDivider, SectionHeading, banhu-data, booking-store, /api/weather, /api/booking, use-toast hook, Toaster mounted in layout
- Next: parallel component build (Task 2-a header/hero/live/about/expo; Task 2-b add-ons/partner/packages/services/community/booking/contact/footer)

---
Task ID: 2-b
Agent: 2-b component builder
Task: Build the 8 bottom-half page components (add-ons, partner CTA, packages, transport, community, booking form, contact, footer)

Work Log:
- Read worklog.md + verified foundations before coding: banhu-data.ts (CONTACT/ADDONS/PACKAGES/STRATEGIC_PARTNERS/AIRPORTS/SHUTTLES/whatsappLink), booking-store.ts (zustand), section-heading.tsx, bead-divider.tsx, shadcn ui exports (select/tabs/checkbox/card/badge/button/input/textarea/label), use-toast hook, /api/booking route contract (zod schema + {ok, bookingId, whatsappUrl} response)
- addon-tours.tsx (client): #add-ons section, SectionHeading + Info strip, 3-col grid of 6 addon cards (next/image fill posters, hover zoom, partner note footer), Add/Added-to-Booking toggle buttons wired to useBookingStore.toggleAddon with aria-pressed + toast on add
- partner-cta.tsx (server): #partner split card (1.15fr/0.85fr) — operator/accommodation pitch, Badge, WhatsApp "Become a Partner" (whatsappLink with partner message) + ghost "Contact Us" anchor, boma-storytelling poster image right
- tour-packages.tsx (client): #packages cream-dark band, 2-col grid of 4 package cards with overlaid duration Badge (Clock), highlights checklists, "Enquire & Book" button → setSelectedPackage(p.name) + smooth scroll to #booking
- transport-services.tsx (server): #services 2 service cards (Plane/Bus) with AIRPORTS/SHUTTLES CheckCircle2 lists + "Book" anchor buttons to #booking
- community.tsx (server): #community 3 pillar cards (GraduationCap/Handshake/TrendingUp) + Strategic Partners block with BeadDivider and 8 partner chips
- booking-form.tsx (client): #booking dark topo-pattern section; Tabs pre/custom; package Select ("none" ↔ "" store mapping), addon checkbox grid bound to store; custom tab destination/days/partySize/interest chips; shared name/email/phone/notes fields; POST /api/booking with full payload per API contract, validation toast, success state (inline alert + Open WhatsApp fallback + window.open), resets form/store after send
- contact.tsx (server): #contact 4 cards (Phone/Email/Address/Hours from CONTACT) + WhatsApp CTA button (#1faa53)
- site-footer.tsx (server): bead-strip top edge, logo + blurb, 9 quick links, compliance list (CIPC/SARS/tel/mail), © 2026 + webmaster bar; mt-auto for sticky footer
- Validation: bunx tsc --noEmit → 0 errors in src/ (only pre-existing errors in examples/ & skills/); bunx eslint on all 8 files → 0 problems; dev.log shows clean compiles

Stage Summary:
- All 8 files created in src/components/banhu/: addon-tours, partner-cta, tour-packages, transport-services, community, booking-form, contact, site-footer. No other files touched.
- Deviations from spec (visual-correctness fixes): added gap-0 to Card classNames that use p-0/mt-* inner spacing because shadcn Card base ships gap-6 (would have left cream gaps between images/content); kept everything else per spec.
- Booking form posts {type, packageName, addons, fullName, email, phone, travelDate, partySize, destination, notes} — matches /api/booking zod schema; success uses returned whatsappUrl.
- Ready for composition into page.tsx: section ids exposed = add-ons, partner, packages, services, community, booking, contact (+ footer). Note: #events anchor belongs to agent 2-a.

---
Task ID: 2-a
Agent: 2-a component builder
Task: Build header, hero, live calendar & weather, about, and expo banner sections (5 components in src/components/banhu)

Work Log:
- site-header.tsx (client): sticky backdrop-blur header with scroll-shadow (passive listener + cleanup), logo lockup (next/image banhu-logo + "Banhu Tourism / Travel & Tours · Mpumalanga" stack), desktop nav from NAV_LINKS, Banhu/English language pill (xl+), Book Now CTA (sm+), mobile Sheet (controlled open state) with nav links that close the sheet, Book Now button, SheetTitle + sr-only SheetDescription for a11y
- hero.tsx (server): section#home with topo-pattern + bead-strip top border, location badge, h1 with orange "Heritage" highlight, tagline, 3 CTAs (Book / Add-Ons / Plan Your Visit), trust row (BadgeCheck/Handshake/ShieldCheck: founder, BBR partner, CIPC 2026/020289/07); right column: bushbuckridge-heritage-tour.png (priority, 4/5 aspect, object-top) + offset rotated expo-about.png + rotated green "Experience. Connect. Discover." chip; mb-10/12 on wrapper for offset poster clearance
- live-calendar-weather.tsx (client): section#live with SectionHeading; Card A = live calendar: Mon-Sun week strip built from SAST formatToParts → Date.UTC monday-anchored math (today highlighted green, aria-current="date", Skeleton cells pre-mount), SAST ticking clock (Intl en-GB, hour12:false, pre-mount "--:--:--") + date line + UTC+2 caption; Card B = weather: controlled search form → GET /api/weather?query= (loading skeletons / error role=alert / result with temp, description, feels-like/humidity/wind stat grid), auto-loads Acornhoek on mount with didInit ref guard (strict-mode safe), sr-only live status
- about.tsx (server): section#about two-column; expo-about.png poster with floating banhu-logo badge and green caption card (Heritage Corridor / Expo 2026 Riverside Mall), 3 paragraphs (founder + Powerline/Shobiyane as <strong>), 3 feature rows (User/MapPin/Handshake icon circles), CTAs to #community and #booking; order-2/order-1 swap on mobile
- expo-banner.tsx (server): section#events Card (rounded-3xl, p-0, border-banhu-sand, overflow-hidden) grid 1.15fr/0.85fr; dark green left pane with orange event badge, heading with orange expo name, description, info list (MapPin/CalendarRange/Sparkles), WhatsApp CTA via whatsappLink("Hi Banhu Tourism! I'd like...") target=_blank rel=noopener + ghost "Plan Your Visit" → #live; right pane next/image fill mpumalanga-tourism-expo.png object-top (min-h-280px on mobile)
- Verification: `bunx tsc --noEmit` — zero errors in my files (remaining errors are pre-existing in examples/ and skills/, not part of this task); `bunx eslint` on all 5 files — clean (0 errors/warnings). Did not touch page.tsx/layout/globals/lib/ui per constraints

Stage Summary:
- 5 production components delivered: SiteHeader, Hero, LiveCalendarWeather, About, ExpoBanner — all typed, lint-clean, brand-consistent (banhu-* tokens, font-display, bead/topo textures), mobile-first responsive, no emojis, a11y covered (aria-labels, sr-only, semantic tags, alt text, next/image everywhere)
- Ready for page assembly: place SiteHeader at top, then Hero → (2-b sections) → ExpoBanner; anchor targets provided: #home, #live, #about, #events
- API contracts consumed: GET /api/weather?query= returns {name, admin1, country, description, current{temperature,feelsLike,humidity,wind}}; /api/booking untouched; whatsappLink() imported from banhu-data

---
Task ID: 3
Agent: main (orchestrator)
Task: Page assembly, network fix, lint, browser self-verification

Work Log:
- Assembled src/app/page.tsx: min-h-screen flex-col wrapper, SiteHeader, main with 11 sections in content order (Hero → BeadDivider → Live → About → Add-Ons → Partner → Packages → Services → Expo/Events → Community → Booking → Contact), SiteFooter (mt-auto sticky)
- FIXED CRITICAL NETWORK BUG: Node fetch (undici) in Next server failed with ETIMEDOUT against Open-Meteo. Root cause: sandbox has no IPv6 route + IPv4 TCP connect (~260ms) exceeds undici's default 250ms autoSelectFamily attempt timeout, killing healthy connections. Fix: dns.setDefaultResultOrder("ipv4first") + net.setDefaultAutoSelectFamily(false) at module level in /api/weather route. Removed instrumentation.ts (caused Edge-runtime warnings; redundant)
- Added missing Preferred start date + Travellers fields to Pre-Planned booking tab (matched user content)
- Fixed nav link wrapping ("Add-On Tours" broke to 3 lines) with whitespace-nowrap
- bun run lint: clean
- Browser verification (agent-browser): page renders fully; live SAST clock ticks + week strip highlights today; weather auto-loads Acornhoek and search updates (Hoedspruit tested); add-on "Add to Booking" toggles + toast + store sync into booking checkboxes; package Select works; full booking submit → POST 200 → Prisma INSERT verified in SQLite → success panel + toast → WhatsApp opens new tab with fully prefilled message; Customise tab renders (destination/date/days/travellers/interests); "Enquire & Book" pre-selects package and scrolls to form; mobile 390px layout + hamburger menu navigation verified; footer sticky/pushes correctly
- Bookings in DB: 2 rows (browser test + curl test)

Stage Summary:
- SITE COMPLETE AND VERIFIED. Single route / with all sections, two working API routes (/api/weather via Open-Meteo, /api/booking via Prisma+WhatsApp), brand-consistent design (cream/green/orange, Poppins, beadwork motifs), official logo from banhutravel.co.za, 6 uploaded posters + 4 AI-generated package photos in use
