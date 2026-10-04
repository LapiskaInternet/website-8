"use client";

import { useState } from "react";
import Image from "next/image";
import {
  CalendarRange,
  Check,
  ChevronDown,
  Clock3,
  Info,
  MapPinned,
  Plus,
  Sparkles,
  Users,
} from "lucide-react";

import { ADDONS, REGIONAL_PACKAGES, zar } from "@/lib/banhu-data";
import { useBookingStore } from "@/lib/booking-store";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/banhu/section-heading";
import { cn } from "@/lib/utils";

export function PlanYourTour() {
  const { selectedAddons, toggleAddon, setSelectedPackage } = useBookingStore();
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

  const handleEnquire = (name: string) => {
    setSelectedPackage(name);
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="plan-your-tour" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Plan Your Tour"
          title={<>Add-On Tours &amp; Travel Packages</>}
          subtitle="Build your journey piece by piece with local add-on experiences, or book a fully structured regional package — every option supports the community."
        />

        <div className="grid items-start gap-6 lg:grid-cols-2">
          {/* ── Grid 1 · Plan Your Tour → Add-On Tours ─────────────────── */}
          <div id="add-ons" className="min-w-0">
            <Card className="gap-0 p-5 md:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-banhu-green/10 text-banhu-green-dark">
                    <Sparkles aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-banhu-green-dark">
                      Plan Your Tour
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Add-On Tours · delivered with our local partners
                    </p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="border-banhu-green/30 bg-banhu-green/10 text-banhu-green-dark"
                >
                  {ADDONS.length} experiences
                </Badge>
              </div>

              <ul className="mt-5 space-y-2.5">
                {ADDONS.map((addon) => {
                  const added = selectedAddons.includes(addon.id);
                  return (
                    <li
                      key={addon.id}
                      className={cn(
                        "flex items-center gap-3 rounded-2xl border p-2.5 transition-colors",
                        added
                          ? "border-banhu-green bg-banhu-green/5"
                          : "border-banhu-sand bg-banhu-paper hover:border-banhu-orange/60"
                      )}
                    >
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                        <Image
                          src={addon.image}
                          alt={addon.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-banhu-green-dark">
                          {addon.name}
                        </p>
                        <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                          {addon.description}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant={added ? "secondary" : "outline"}
                        aria-pressed={added}
                        onClick={() => handleAddon(addon.id, addon.name)}
                        className={cn(
                          "shrink-0",
                          added &&
                            "bg-banhu-green text-banhu-cream hover:bg-banhu-green-dark"
                        )}
                      >
                        {added ? (
                          <>
                            <Check aria-hidden="true" className="mr-1 h-3.5 w-3.5" />
                            Added
                          </>
                        ) : (
                          <>
                            <Plus aria-hidden="true" className="mr-1 h-3.5 w-3.5" />
                            Add
                          </>
                        )}
                      </Button>
                    </li>
                  );
                })}
              </ul>

              <p className="mt-5 flex items-start gap-2 rounded-xl bg-banhu-orange/10 p-3 text-xs leading-relaxed text-banhu-green-dark">
                <Info
                  aria-hidden="true"
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-banhu-orange-dark"
                />
                Every add-on is delivered with our local partners and can be
                attached to any package or custom tour.
              </p>
            </Card>
          </div>

          {/* ── Grid 2 · Travel Packages (Regional Master Portfolio) ───── */}
          <div id="packages" className="min-w-0">
            <Card className="gap-0 p-5 md:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-banhu-orange/15 text-banhu-orange-dark">
                    <MapPinned aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-banhu-green-dark">
                      Travel Packages
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Acornhoek Regional Master Portfolio · custom quote
                    </p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="border-banhu-orange/30 bg-banhu-orange/10 text-banhu-orange-dark"
                >
                  {REGIONAL_PACKAGES.length} itineraries
                </Badge>
              </div>

              <ul className="mt-5 space-y-3">
                {REGIONAL_PACKAGES.map((pkg) => {
                  const open = openItinerary === pkg.id;
                  return (
                    <li
                      key={pkg.id}
                      className="overflow-hidden rounded-2xl border border-banhu-sand bg-banhu-paper transition-colors hover:border-banhu-orange/60"
                    >
                      <div className="flex items-center gap-3 p-3">
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl">
                          <Image
                            src={pkg.image}
                            alt={pkg.name}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold leading-snug text-banhu-green-dark">
                            {pkg.name}
                          </p>
                          <p className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-muted-foreground">
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
                          <p className="font-display text-sm font-bold text-banhu-orange-dark">
                            {zar(pkg.groupPrice)}
                          </p>
                          <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                            group · 10+
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 px-3 pb-3">
                        <Button
                          size="sm"
                          onClick={() => handleEnquire(pkg.name)}
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
                          className="border-t border-banhu-sand/70 bg-background px-3 py-4"
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

              <p className="mt-5 flex items-start gap-2 rounded-xl bg-banhu-orange/10 p-3 text-xs leading-relaxed text-banhu-green-dark">
                <Info
                  aria-hidden="true"
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-banhu-orange-dark"
                />
                Group tier requires a minimum of 10 paying adults. All packages
                can also be sold as standalone single-day trips or luxury
                add-ons for resort stays in the Timbavati and Thornybush
                private game reserves.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
