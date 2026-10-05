import {
  ArrowRight,
  Briefcase,
  Check,
  Compass,
  type LucideIcon,
  Bus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/banhu/section-heading";
import { SiteAction } from "@/components/banhu/site-action";
import { cn } from "@/lib/utils";

type HighlightAction = {
  label: string;
  variant: "default" | "outline";
} & (
  | { kind: "view"; view: "tours" | "travel-agency" }
  | { kind: "packages" }
  | { kind: "anchor"; href: string }
);

interface Highlight {
  icon: LucideIcon;
  title: string;
  kicker: string;
  description: string;
  points: string[];
  actions: HighlightAction[];
  accent: "green" | "orange";
}

const HIGHLIGHTS: Highlight[] = [
  {
    icon: Compass,
    kicker: "Tour Operator",
    title: "Guided Tours & Safaris",
    description:
      "Heritage tours, multi-day packages and add-on experiences run by our own guides from the villages we call home.",
    points: [
      "6 add-on cultural experiences",
      "9 tour & safari packages",
      "Storytelling heritage guides",
    ],
    actions: [
      { kind: "view", view: "tours", label: "Explore Our Tours", variant: "default" },
    ],
    accent: "green",
  },
  {
    icon: Briefcase,
    kicker: "Travel Agency",
    title: "Packages & Bookings",
    description:
      "A full travel agency behind every trip — packages, accommodation, itineraries and bookings arranged under one roof.",
    points: [
      "Custom quotes & group tiers",
      "Accommodation & itinerary planning",
      "Cross-border journeys to Mozambique & Eswatini",
    ],
    actions: [
      {
        kind: "packages",
        label: "View Travel Agency Packages",
        variant: "default",
      },
      {
        kind: "view",
        view: "travel-agency",
        label: "Travel Agency page",
        variant: "outline",
      },
    ],
    accent: "orange",
  },
  {
    icon: Bus,
    kicker: "Transport",
    title: "Transfers & Shuttles",
    description:
      "Airport transfers and shuttle services across Mpumalanga, the Lowveld and the neighbouring borders.",
    points: [
      "4 regional airports served",
      "Scheduled & private shuttles",
      "Group & event transport",
    ],
    actions: [
      {
        kind: "view",
        view: "travel-agency",
        label: "Transport & Shuttles",
        variant: "default",
      },
    ],
    accent: "green",
  },
];

export function HomeHighlights() {
  return (
    <section aria-label="Service highlights" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Highlights"
          title="Two Divisions, One Team"
          subtitle="Banhu Tourism is both a tour operator and a travel agency — here is what that means for your trip."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {HIGHLIGHTS.map((item) => {
            const Icon = item.icon;
            const isOrange = item.accent === "orange";
            return (
              <Card key={item.title} className="gap-0 p-6">
                <span
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-2xl",
                    isOrange
                      ? "bg-banhu-orange/15 text-banhu-orange-dark"
                      : "bg-banhu-green/10 text-banhu-green-dark"
                  )}
                >
                  <Icon aria-hidden="true" className="h-6 w-6" />
                </span>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-banhu-orange-dark">
                  {item.kicker}
                </p>
                <h3 className="mt-1.5 font-display text-xl font-bold text-banhu-green-dark">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
                <ul className="mt-4 space-y-2">
                  {item.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2 text-sm text-foreground/85"
                    >
                      <Check
                        aria-hidden="true"
                        className="mt-0.5 h-4 w-4 shrink-0 text-banhu-green-light"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-col gap-2.5">
                  {item.actions.map((action) => (
                    <Button
                      key={action.label}
                      asChild
                      variant={action.variant}
                      className={cn(
                        "justify-between font-semibold",
                        action.variant === "outline" &&
                          "border-banhu-green/30 text-banhu-green-dark hover:bg-banhu-green/10 hover:text-banhu-green-dark"
                      )}
                    >
                      <SiteAction {...action} className="inline-flex w-full items-center justify-between gap-2">
                        {action.label}
                        <ArrowRight aria-hidden="true" className="h-4 w-4" />
                      </SiteAction>
                    </Button>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
