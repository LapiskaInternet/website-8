"use client";

import Image from "next/image";
import { ArrowRight, Check, Clock } from "lucide-react";

import { PACKAGES } from "@/lib/banhu-data";
import { useBookingStore } from "@/lib/booking-store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { SectionHeading } from "@/components/banhu/section-heading";

export function TourPackages() {
  const { setSelectedPackage } = useBookingStore();

  return (
    <section id="packages" className="bg-banhu-cream-dark/50 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Tour Packages"
          title="Multi-day journeys across borders, mountains and bushveld"
        />

        <div className="grid gap-6 md:grid-cols-2">
          {PACKAGES.map((p) => (
            <Card key={p.id} className="group gap-0 overflow-hidden p-0">
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={p.image}
                  alt={`${p.name} tour package — ${p.description.slice(0, 60)}`}
                  fill
                  sizes="(min-width:768px) 50vw,100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <Badge className="absolute left-4 top-4 border-0 bg-banhu-orange px-3 py-1 text-xs font-semibold text-white shadow">
                  <Clock aria-hidden="true" className="mr-1 inline h-3 w-3" />
                  {p.duration}
                </Badge>
              </div>
              <CardContent className="p-6">
                <h3 className="font-display text-xl font-bold text-banhu-green-dark">
                  {p.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {p.description}
                </p>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-banhu-orange-dark">
                  Highlights
                </p>
                <ul className="mt-3 space-y-2">
                  {p.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-2.5 text-sm text-foreground/85"
                    >
                      <Check
                        aria-hidden="true"
                        className="mt-0.5 h-4 w-4 shrink-0 text-banhu-green-light"
                      />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="items-center justify-between gap-3 border-t border-banhu-sand/70 p-5">
                <span className="text-xs text-muted-foreground">
                  Custom quote — priced per itinerary
                </span>
                <Button
                  onClick={() => {
                    setSelectedPackage(p.name);
                    document
                      .getElementById("booking")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Enquire &amp; Book
                  <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
