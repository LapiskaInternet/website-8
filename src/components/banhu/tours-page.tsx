"use client";

import { useState } from "react";
import Image from "next/image";
import {
  CalendarRange,
  Check,
  ChevronDown,
  Clock3,
  Info,
  MessageCircle,
  Plus,
  Users,
} from "lucide-react";

import {
  ADDONS,
  PACKAGES,
  REGIONAL_PACKAGES,
  whatsappLink,
  zar,
} from "@/lib/banhu-data";
import { useBookingStore } from "@/lib/booking-store";
import { enquirePackage } from "@/lib/site-store";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/banhu/section-heading";
import { CtaBand, PageHero } from "@/components/banhu/page-hero";
import { cn } from "@/lib/utils";

export function ToursPage() {
  const { selectedAddons, toggleAddon } = useBookingStore();
  const { toast } = useToast();
  const [openItinerary, setOpenItinerary] = useState<string | null>(null);

  const handleAddon = (id: string, name: string) => {
    const already = selectedAddons.includes(id);
    toggleAddon(id);
    if (!already) {
      toast({
        title: "Added to booking",
        description: `${name} will be included in your request.`,
      });
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Tour Operator"
        title="Our Tours & Safari Packages"
        description="Every Banhu journey is guided by locals — heritage walks, cross-border circuits, safari packages and add-on experiences rooted in the villages we call home."
        chips={[
          "6 add-on experiences",
          "4 cross-border & heritage packages",
          "5 regional itineraries",
          "Local guides throughout",
        ]}
      />

      {/* ── Add-On Experiences ─────────────────────────────────────────── */}
      <section id="add-ons" className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            eyebrow="Add-On Experiences"
            title="Extend Any Tour"
            subtitle="Short, soulful experiences delivered with our local partners — attach them to any package or custom tour."
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ADDONS.map((addon) => {
              const added = selectedAddons.includes(addon.id);
              return (
                <Card key={addon.id} className="gap-0 overflow-hidden p-0">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={addon.image}
                      alt={addon.name}
                      fill
                      sizes="(min-width: 1024px) 340px, (min-width: 640px) 45vw, 90vw"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-bold text-banhu-green-dark">
                      {addon.name}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {addon.description}
                    </p>
                    <Button
                      variant={added ? "secondary" : "outline"}
                      aria-pressed={added}
                      onClick={() => handleAddon(addon.id, addon.name)}
                      className={cn(
                        "mt-4 w-full sm:w-auto",
                        added &&
                          "bg-banhu-green text-banhu-cream hover:bg-banhu-green-dark"
                      )}
                    >
                      {added ? (
                        <>
                          <Check aria-hidden="true" className="mr-1.5 h-4 w-4" />
                          Added to Booking
                        </>
                      ) : (
                        <>
                          <Plus aria-hidden="true" className="mr-1.5 h-4 w-4" />
                          Add to Booking
                        </>
                      )}
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>

          <p className="mx-auto mt-8 flex max-w-3xl items-start gap-2 rounded-xl bg-banhu-orange/10 p-4 text-xs leading-relaxed text-banhu-green-dark">
            <Info
              aria-hidden="true"
              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-banhu-orange-dark"
            />
            Every add-on is delivered with our local partners and can be
            attached to any package or custom tour.
          </p>
        </div>
      </section>

      {/* ── Cross-Border & Heritage Packages ───────────────────────────── */}
      <section
        aria-label="Cross-border and heritage packages"
        className="bg-banhu-cream-dark/50 py-16 md:py-24"
      >
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            eyebrow="Signature Journeys"
            title="Cross-Border & Heritage Packages"
            subtitle="Four fully guided circuits linking Mpumalanga with our neighbours — every trip quoted custom to your dates and group size."
          />

          <div className="grid gap-6 md:grid-cols-2">
            {PACKAGES.map((pkg) => (
              <Card key={pkg.id} className="gap-0 overflow-hidden p-0">
                <div className="relative h-52 w-full sm:h-60">
                  <Image
                    src={pkg.image}
                    alt={pkg.name}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <Badge className="absolute left-4 top-4 gap-1 bg-banhu-cream/95 text-banhu-green-dark hover:bg-banhu-cream/95">
                    <Clock3 aria-hidden="true" className="h-3 w-3" />
                    {pkg.duration}
                  </Badge>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-banhu-green-dark">
                    {pkg.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {pkg.description}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {pkg.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-2.5 text-sm text-foreground/85"
                      >
                        <Check
                          aria-hidden="true"
                          className="mt-0.5 h-4 w-4 shrink-0 text-banhu-orange-dark"
                        />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap items-center gap-2.5">
                    <Button
                      onClick={() => enquirePackage(pkg.name)}
                      className="bg-banhu-green hover:bg-banhu-green-dark"
                    >
                      Enquire &amp; Book
                    </Button>
                    <Button asChild variant="ghost">
                      <a
                        href={whatsappLink(
                          `Hi Banhu Tourism! I'm interested in the ${pkg.name} package.`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageCircle aria-hidden="true" className="mr-1.5 h-4 w-4" />
                        Ask on WhatsApp
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Acornhoek Regional Master Portfolio ────────────────────────── */}
      <section id="packages" className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            eyebrow="Regional Master Portfolio"
            title="Acornhoek Regional Packages"
            subtitle="Five structured itineraries with transparent group and FIT pricing — expand any package for the full day-by-day programme."
          />

          <ul className="space-y-3">
            {REGIONAL_PACKAGES.map((pkg) => {
              const open = openItinerary === pkg.id;
              return (
                <li
                  key={pkg.id}
                  className="overflow-hidden rounded-2xl border border-banhu-sand bg-banhu-paper transition-colors hover:border-banhu-orange/60"
                >
                  <div className="flex flex-wrap items-center gap-3 p-4 sm:flex-nowrap">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl sm:h-16 sm:w-16">
                      <Image
                        src={pkg.image}
                        alt={pkg.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold leading-snug text-banhu-green-dark sm:text-base">
                        {pkg.name}
                      </p>
                      <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <Clock3 aria-hidden="true" className="h-3 w-3" />
                          {pkg.duration}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="inline-flex items-center gap-1">
                          <CalendarRange aria-hidden="true" className="h-3 w-3" />
                          {pkg.base}
                        </span>
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="font-display text-base font-bold text-banhu-orange-dark">
                        {zar(pkg.groupPrice)}
                      </p>
                      <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                        group · 10+
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 px-4 pb-4">
                    <Button
                      size="sm"
                      onClick={() => enquirePackage(pkg.name)}
                      className="bg-banhu-green hover:bg-banhu-green-dark"
                    >
                      Enquire &amp; Book
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      aria-expanded={open}
                      aria-controls={`itinerary-${pkg.id}`}
                      onClick={() => setOpenItinerary(open ? null : pkg.id)}
                    >
                      Itinerary
                      <ChevronDown
                        aria-hidden="true"
                        className={cn(
                          "ml-1 h-4 w-4 transition-transform",
                          open && "rotate-180"
                        )}
                      />
                    </Button>
                    <span className="ml-auto text-xs text-muted-foreground">
                      FIT from{" "}
                      <span className="font-semibold text-banhu-green-dark">
                        {zar(pkg.fitPrice)}
                      </span>{" "}
                      pp
                    </span>
                  </div>

                  {open ? (
                    <div
                      id={`itinerary-${pkg.id}`}
                      className="border-t border-banhu-sand/70 bg-background px-4 py-5"
                    >
                      <p className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
                        <Users
                          aria-hidden="true"
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-banhu-orange-dark"
                        />
                        <span>
                          <span className="font-semibold text-banhu-green-dark">
                            Who it&apos;s for:
                          </span>{" "}
                          {pkg.audience}
                        </span>
                      </p>
                      <p className="mt-2 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
                        <Check
                          aria-hidden="true"
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-banhu-green"
                        />
                        <span>
                          <span className="font-semibold text-banhu-green-dark">
                            Includes:
                          </span>{" "}
                          {pkg.inclusions}
                        </span>
                      </p>

                      <ol className="mt-4 space-y-3 border-l-2 border-banhu-sand pl-4">
                        {pkg.itinerary.map((stop, i) => (
                          <li key={`${pkg.id}-${i}`} className="relative">
                            <span
                              aria-hidden="true"
                              className="absolute -left-[22px] top-1 h-2.5 w-2.5 rounded-full border-2 border-background bg-banhu-orange"
                            />
                            <p className="flex flex-wrap items-baseline gap-x-2">
                              <span className="rounded-md bg-banhu-green/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-banhu-green-dark">
                                {stop.day}
                              </span>
                              <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                                {stop.time}
                              </span>
                            </p>
                            <p className="mt-1 text-xs font-semibold text-banhu-green-dark">
                              {stop.activity}
                            </p>
                            <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                              {stop.detail}
                            </p>
                          </li>
                        ))}
                      </ol>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>

          <p className="mx-auto mt-8 flex max-w-3xl items-start gap-2 rounded-xl bg-banhu-orange/10 p-4 text-xs leading-relaxed text-banhu-green-dark">
            <Info
              aria-hidden="true"
              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-banhu-orange-dark"
            />
            Group tier requires a minimum of 10 paying adults. All packages can
            also be sold as standalone single-day trips or luxury add-ons for
            resort stays in the Timbavati and Thornybush private game reserves.
          </p>
        </div>
      </section>

      <CtaBand
        title="Ready to hit the road?"
        description="Pick a package or build your own — our guides, vehicles and partners are ready."
      />
    </>
  );
}
