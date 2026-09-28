import { Bus, CheckCircle2, Plane } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { AIRPORTS, SHUTTLES } from "@/lib/banhu-data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/banhu/section-heading";

const SERVICES: {
  icon: LucideIcon;
  title: string;
  description: string;
  items: string[];
  cta: string;
}[] = [
  {
    icon: Plane,
    title: "Airport Transfers",
    description:
      "Door-to-door transfers to and from the region's major airports. We track your flight, assist with luggage and get you to your destination relaxed and on time — day or night.",
    items: AIRPORTS,
    cta: "Book an Airport Transfer",
  },
  {
    icon: Bus,
    title: "Shuttle Services",
    description:
      "Scheduled and private shuttles for individuals, families and groups — village runs, safari connections, event transport and day trips across the province.",
    items: SHUTTLES,
    cta: "Book a Shuttle",
  },
];

export function TransportServices() {
  return (
    <section id="services" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Our Services"
          title="Transport & Logistics"
          subtitle="Reliable airport transfers and shuttle services across Mpumalanga, the Lowveld and neighbouring borders — start and end your journey the easy way."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <Card key={s.title} className="gap-0 p-6 md:p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-banhu-green/10 text-banhu-green-dark">
                  <Icon aria-hidden="true" className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-xl font-bold text-banhu-green-dark">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {s.description}
                </p>
                <ul className="mt-5 space-y-2.5">
                  {s.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-foreground/85"
                    >
                      <CheckCircle2
                        aria-hidden="true"
                        className="mt-0.5 h-4 w-4 shrink-0 text-banhu-orange-dark"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild className="mt-7 w-full sm:w-auto">
                  <a href="#booking">{s.cta}</a>
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
