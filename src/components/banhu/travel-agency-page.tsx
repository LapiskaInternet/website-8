import Image from "next/image";
import {
  BedDouble,
  Check,
  Compass,
  FileCheck2,
  MapPinned,
  Plane,
  Users,
  type LucideIcon,
} from "lucide-react";

import { TRAVEL_AGENCY_SERVICES } from "@/lib/banhu-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/banhu/section-heading";
import { SiteAction } from "@/components/banhu/site-action";
import { CtaBand, PageHero } from "@/components/banhu/page-hero";
import { TransportServices } from "@/components/banhu/transport-services";

const SERVICE_ICONS: LucideIcon[] = [
  Compass,
  BedDouble,
  MapPinned,
  Plane,
  Users,
  FileCheck2,
];

export function TravelAgencyPage() {
  return (
    <>
      <PageHero
        eyebrow="Travel Agency"
        title="Travel Agency & Bookings"
        description="Packages, accommodation, transfers and full itinerary planning under one roof in Acornhoek — Banhu Tourism is a registered tour operator and travel agency."
        chips={[
          "9 bookable packages",
          "Custom quotes",
          "Group & FIT rates",
          "CIPC 2026/020289/07",
        ]}
      />

      {/* ── Packages pop-out intro ─────────────────────────────────────── */}
      <section aria-label="Travel agency packages" className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid overflow-hidden rounded-3xl border border-banhu-sand bg-banhu-paper shadow-sm md:grid-cols-2">
            <div className="relative h-64 w-full md:h-full md:min-h-[360px]">
              <Image
                src="/images/travel-agency.jpg"
                alt="A Banhu Travel & Tours consultant helping travellers plan their trip"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-banhu-green-deep/30 via-transparent to-transparent"
              />
            </div>
            <div className="flex flex-col justify-center gap-4 p-6 md:p-8 lg:p-10">
              <Badge
                variant="outline"
                className="w-fit border-banhu-orange/40 bg-banhu-orange/10 text-banhu-orange-dark"
              >
                Travel Agency
              </Badge>
              <h2 className="font-display text-2xl font-bold leading-tight text-banhu-green-dark md:text-3xl">
                One roof for your whole trip
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                Browse every package we sell — cross-border journeys, heritage
                circuits, safari, adventure and culture — with group and FIT
                pricing on the regional portfolio. Tap enquire on any package
                and it lands straight in the booking form.
              </p>
              <ul className="space-y-2">
                {[
                  "4 cross-border & heritage tours",
                  "5 Acornhoek regional itineraries",
                  "Custom quotes for every group size",
                ].map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 text-sm text-foreground/85"
                  >
                    <Check
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 shrink-0 text-banhu-green-light"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-2 flex flex-wrap gap-3">
                <Button asChild size="lg" className="font-semibold">
                  <SiteAction kind="packages">View All Travel Agency Packages</SiteAction>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── What we do ─────────────────────────────────────────────────── */}
      <section
        aria-label="Travel agency services"
        className="bg-banhu-cream-dark/50 py-16 md:py-24"
      >
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            eyebrow="What We Do"
            title="Travel Agency Services"
            subtitle="Highlights of the services we offer from our Acornhoek travel desk — everything a trip needs, arranged by locals."
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TRAVEL_AGENCY_SERVICES.map((service, i) => {
              const Icon = SERVICE_ICONS[i % SERVICE_ICONS.length];
              return (
                <Card key={service.title} className="gap-0 p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-banhu-green/10 text-banhu-green-dark">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold text-banhu-green-dark">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Transport & logistics (shared section) ─────────────────────── */}
      <TransportServices />

      <CtaBand
        title="Let us plan it for you"
        description="Share your dates, budget and dreams — the travel desk replies with a full itinerary and quote."
      />
    </>
  );
}
