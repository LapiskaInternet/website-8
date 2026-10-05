"use client";

import Image from "next/image";
import { CalendarRange, Clock3, MapPinned, Sparkles } from "lucide-react";

import { PACKAGES, REGIONAL_PACKAGES, zar } from "@/lib/banhu-data";
import { enquirePackage, useSiteStore } from "@/lib/site-store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

/**
 * Travel Agency packages pop-out — a quick way to browse and enquire about
 * every bookable package without leaving the current page.
 */
export function PackagesModal() {
  const open = useSiteStore((s) => s.packagesOpen);
  const setOpen = (next: boolean) =>
    next
      ? useSiteStore.getState().openPackages()
      : useSiteStore.getState().closePackages();

  const goTours = () => {
    useSiteStore.getState().closePackages();
    useSiteStore.getState().setView("tours");
  };

  const goAgency = () => {
    useSiteStore.getState().closePackages();
    useSiteStore.getState().setView("travel-agency");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-3xl">
        <DialogHeader className="gap-2 border-b border-banhu-sand bg-banhu-cream-dark/60 px-6 py-5 text-left">
          <DialogTitle className="flex items-center gap-2.5 font-display text-xl font-bold text-banhu-green-dark">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-banhu-orange/15 text-banhu-orange-dark">
              <MapPinned aria-hidden="true" className="h-5 w-5" />
            </span>
            Travel Agency Packages
          </DialogTitle>
          <DialogDescription className="text-sm leading-relaxed text-muted-foreground">
            All nine bookable packages — cross-border journeys, heritage
            circuits and the Acornhoek regional portfolio. Every itinerary is
            quoted custom to your dates and group size.
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[65vh] space-y-6 overflow-y-auto px-6 py-5">
          {/* ── Cross-Border & Heritage Tours ──────────────────────────── */}
          <section aria-label="Cross-border and heritage tours">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-display text-sm font-bold uppercase tracking-wide text-banhu-green-dark">
                Cross-Border &amp; Heritage Tours
              </h3>
              <Badge
                variant="outline"
                className="border-banhu-green/30 bg-banhu-green/10 text-banhu-green-dark"
              >
                Custom quote
              </Badge>
            </div>
            <ul className="mt-3 space-y-2.5">
              {PACKAGES.map((pkg) => (
                <li
                  key={pkg.id}
                  className="flex items-center gap-3 rounded-2xl border border-banhu-sand bg-banhu-paper p-3 transition-colors hover:border-banhu-orange/60"
                >
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                    <Image
                      src={pkg.image}
                      alt={pkg.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold leading-snug text-banhu-green-dark">
                      {pkg.name}
                    </p>
                    <p className="mt-0.5 inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock3 aria-hidden="true" className="h-3 w-3" />
                      {pkg.duration}
                    </p>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                      {pkg.description}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => enquirePackage(pkg.name)}
                    className="shrink-0 bg-banhu-green hover:bg-banhu-green-dark"
                  >
                    Enquire
                  </Button>
                </li>
              ))}
            </ul>
          </section>

          <Separator className="bg-banhu-sand" />

          {/* ── Acornhoek Regional Master Portfolio ────────────────────── */}
          <section aria-label="Acornhoek regional master portfolio">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-display text-sm font-bold uppercase tracking-wide text-banhu-green-dark">
                Acornhoek Regional Portfolio
              </h3>
              <Badge
                variant="outline"
                className="border-banhu-orange/30 bg-banhu-orange/10 text-banhu-orange-dark"
              >
                Group &amp; FIT rates
              </Badge>
            </div>
            <ul className="mt-3 space-y-2.5">
              {REGIONAL_PACKAGES.map((pkg) => (
                <li
                  key={pkg.id}
                  className="rounded-2xl border border-banhu-sand bg-banhu-paper p-3 transition-colors hover:border-banhu-orange/60"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                      <Image
                        src={pkg.image}
                        alt={pkg.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold leading-snug text-banhu-green-dark">
                        {pkg.name}
                      </p>
                      <p className="mt-0.5 flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground">
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
                  <div className="mt-2.5 flex flex-wrap items-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => enquirePackage(pkg.name)}
                      className="bg-banhu-green hover:bg-banhu-green-dark"
                    >
                      Enquire &amp; Book
                    </Button>
                    <span className="ml-auto text-xs text-muted-foreground">
                      FIT from{" "}
                      <span className="font-semibold text-banhu-green-dark">
                        {zar(pkg.fitPrice)}
                      </span>{" "}
                      pp
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="flex flex-col gap-3 border-t border-banhu-sand bg-banhu-cream-dark/60 px-6 py-4 sm:flex-row sm:items-center">
          <p className="flex items-start gap-2 text-xs leading-relaxed text-banhu-green-dark sm:flex-1">
            <Sparkles
              aria-hidden="true"
              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-banhu-orange-dark"
            />
            Full day-by-day itineraries live on the dedicated pages.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" onClick={goTours}>
              Tours page
            </Button>
            <Button size="sm" variant="outline" onClick={goAgency}>
              Travel Agency page
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
