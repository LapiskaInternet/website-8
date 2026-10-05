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

---
Task ID: 5
Agent: main (orchestrator)
Task: Add 5 regional packages from "Acornhoek Regional Tour Packages" PDF as a two-grid "Plan Your Tour" section (Add-On Tours | Travel Packages) placed directly before Community

Work Log:
- Generated 3 new package photos via z-ai image CLI: regional-fused-luxury.jpg (Masingitana tented camp), regional-two-villages.jpg (elder storytelling + craft market), regional-bushveld-adventure.jpg (horseback safari + giraffe); reused package-heritage.jpg and package-highveld-lowveld.jpg for the two matching themes
- banhu-data.ts: added RegionalItineraryStop + RegionalPackage interfaces, REGIONAL_PACKAGES (5 PDF packages with full day-by-day itineraries, target audience, primary base, Group/FIT ZAR tiers, inclusions) and zar() formatter ("R 4,800" style)
- NEW plan-your-tour.tsx (client): section#plan-your-tour with two-grid lg:grid-cols-2 — Grid 1 wrapper id="add-ons": "Plan Your Tour" card, 6 compact add-on rows (poster thumb, name, description, Add/Added toggle wired to zustand toggleAddon + toast, green added state) + local-partners note; Grid 2 wrapper id="packages": "Travel Packages" card, 5 package rows (thumb, name, duration+base, Group price right-aligned, FIT-from line, Enquire & Book → setSelectedPackage + smooth scroll to #booking, expandable Itinerary toggle aria-expanded/aria-controls revealing audience, inclusions and day-by-day timeline with day badges) + portfolio booking-conditions footnote (10+ pax group tier, Timbavati/Thornybush add-on option)
- page.tsx: removed AddonTours + TourPackages sections (content consolidated into PlanYourTour), new section order: Hero → Live → About → Partner → Services → Events → PlanYourTour → Community → Booking → Contact (directly before Community per user); deleted addon-tours.tsx and tour-packages.tsx
- booking-form.tsx: package Select now grouped via SelectGroup/SelectLabel — "Acornhoek Regional Packages" (5 new) + "Cross-Border & Heritage Tours" (4 original), keeping all 9 bookable
- NAV_LINKS unchanged (#add-ons/#packages anchors preserved on the new grid wrappers)
- FIX mobile horizontal overflow: grid items had min-width:auto blowout (scrollW 488 vs 390) — added min-w-0 to both grid wrapper divs; verified scrollW = 390
- Verified: tsc 0 errors in src/, eslint clean; agent-browser — two-grid renders with correct data and prices, Add→Added toggles + syncs booking checkbox (Acornhoek Nightlife data-state=checked), itinerary expands with audience/inclusions/day timeline, Enquire & Book scrolls to booking and pre-selects "The Authentic Heritage & Culture Package" in grouped dropdown, section order plan-your-tour → community confirmed, mobile 390px clean, zero console/page errors

Stage Summary:
- Landing page now carries the 5-package regional master portfolio with ZAR pricing and full itineraries in a two-grid Plan Your Tour section directly before Community; add-ons + packages shopping consolidated (old sections removed), all 9 packages remain bookable in the form dropdown
- Files: new src/components/banhu/plan-your-tour.tsx; edited banhu-data.ts, page.tsx, booking-form.tsx; deleted addon-tours.tsx, tour-packages.tsx; 3 new images in public/images

---
Task ID: 6
Agent: main (orchestrator)
Task: Tour operator + travel agency restructure — packages pop-out modal, dedicated Tours & Travel Agency pages, home page services slider + highlights

Work Log:
- Generated 2 new service images via z-ai CLI: shuttle-service.jpg (minibus on bushveld road), travel-agency.jpg (consultant planning trip with couple)
- NEW src/lib/site-store.ts: zustand store {view: "home"|"tours"|"travel-agency", packagesOpen} + goToSection() (switches home first, then smooth-scrolls), enquirePackage() (setSelectedPackage → closePackages → goToSection("booking"))
- banhu-data.ts: added SERVICE_SLIDES (6 slider slides with tags/images/points), TRAVEL_AGENCY_SERVICES (6 agency services); removed NAV_LINKS (nav now action-based)
- NEW site-action.tsx: <SiteAction kind="view"|"packages"|"anchor"> client trigger usable inside server components (hero/footer/highlights); preventDefault + store action
- NEW services-slider.tsx (home): embla Carousel loop:true, 6 full-width slides (image + tag badge + title + points + CTA), interval autoplay 5.5s (pauses on hover/focus + document.hidden), setApi-based dots with aria-current + sr-only slide status, prev/next arrows
- NEW home-highlights.tsx: "Two Divisions, One Team" — 3 cards (Tour Operator / Travel Agency / Transport) with bullets and SiteAction CTAs (tours view, packages modal, agency view)
- NEW packages-modal.tsx: Travel Agency Packages pop-out Dialog — grouped 4 cross-border ("Custom quote") + 5 regional (group/FIT prices), 9 Enquire buttons → enquirePackage, footer buttons switch to Tours/Travel Agency views; mounted globally in PageViews so it pops from anywhere
- NEW page-hero.tsx: shared dedicated-page header band (dark green topo, Back to Home, eyebrow/title/description, chips) + shared CtaBand (Book Your Tour → #booking + WhatsApp)
- NEW tours-page.tsx (dedicated Tours view): PageHero chips; #add-ons 6-card add-on grid (Add to Booking → zustand toggle + toast); 4 cross-border package cards (image, duration badge, highlights, Enquire & Book + WhatsApp); #packages 5 regional rows with expandable day-by-day itineraries; CtaBand
- NEW travel-agency-page.tsx (dedicated Travel Agency view): PageHero; intro card with travel-agency.jpg + "View All Travel Agency Packages" (opens modal); 6 Travel Agency Services cards; reuses <TransportServices/> (id="services"); CtaBand
- NEW page-views.tsx: client view switch on "/" (sandbox single-route) — home (Hero → BeadDivider → ServicesSlider → HomeHighlights → Live → About → Partner → Expo → Community → Booking → Contact) | ToursPage | TravelAgencyPage, document.title per view, instant scroll-top on view change, PackagesModal always mounted
- site-header.tsx: nav rebuilt as actions — Home, Tours, Travel Agency, Packages (modal), Events, Community, Contact; active view pill (aria-current=page); logo + Book Now via SiteAction; mobile sheet buttons close sheet then dispatch action
- hero.tsx: added "Tour Operator & Travel Agency" badge, "Explore Add-On Tours" → "Explore Our Tours" (tours view)
- site-footer.tsx: quick links updated (Tours & Packages, Travel Agency, Travel Packages via SiteAction; dead #add-ons/#packages/#services anchors removed)
- Removed plan-your-tour.tsx (content absorbed by dedicated pages + modal); page.tsx now renders SiteHeader/PageViews/SiteFooter
- Verification: tsc 0 errors in src/, eslint clean; agent-browser — home slider autoplay + 6 dots + CTAs verified, highlights render, Tours view (title/active nav/addon toggle + toast/itinerary expander/9 enquire buttons), Travel Agency view, packages modal 9 rows + Enquire → modal closed + home + booking scrolled + "Highveld to Lowveld" preselected, cross-view anchor nav (Community from Tours view → home scroll), modal "Tours page" button, addon checkbox sync into booking form (1 checked), mobile 390px (no horizontal overflow, hamburger sheet active states, scrollable modal, footer), zero console/page errors, dev.log all 200s

Stage Summary:
- Site now presents Banhu as tour operator + travel agency: home page is highlights-only with a 6-slide services slider and packages pop-out; dedicated Tours and Travel Agency pages carry the full detail (add-ons, 4 cross-border packages, 5 regional itineraries, agency services, transport)
- Single-route constraint respected: dedicated pages are client-side views via src/lib/site-store.ts (document.title changes per view); all booking flows (Enquire/Add to Booking) still land on the home #booking form with prefilled state
- Files: new site-store.ts, site-action.tsx, services-slider.tsx, home-highlights.tsx, packages-modal.tsx, page-hero.tsx, tours-page.tsx, travel-agency-page.tsx, page-views.tsx; edited banhu-data.ts, page.tsx, site-header.tsx, hero.tsx, site-footer.tsx; deleted plan-your-tour.tsx; 2 new images (shuttle-service.jpg, travel-agency.jpg)
