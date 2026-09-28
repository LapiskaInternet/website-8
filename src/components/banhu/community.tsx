import { GraduationCap, Handshake, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { STRATEGIC_PARTNERS } from "@/lib/banhu-data";
import { Card } from "@/components/ui/card";
import { BeadDivider } from "@/components/banhu/bead-divider";
import { SectionHeading } from "@/components/banhu/section-heading";

const PILLARS: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: GraduationCap,
    title: "Learner Support Programme",
    description:
      "In partnership with Shobiyane High School and Powerline Primary School, we walk alongside learners who are doing art and tourism — offering mentorship, exposure and real pathways into the industry.",
  },
  {
    icon: Handshake,
    title: "Local Partnerships",
    description:
      "We work hand-in-hand with Bushbuckridge Tourism and a network of local organisations, providing practical training placements and supporting community projects across the region.",
  },
  {
    icon: TrendingUp,
    title: "Economic Impact",
    description:
      "Tourism revenue flows directly back into local communities, supporting families, education, and small business development in the Acornhoek area.",
  },
];

export function Community() {
  return (
    <section id="community" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Community First"
          title="Every tour supports local development"
        />

        <div className="grid gap-6 md:grid-cols-3">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <Card key={pillar.title} className="gap-0 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-banhu-orange/15 text-banhu-orange-dark">
                  <Icon aria-hidden="true" className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-banhu-green-dark">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {pillar.description}
                </p>
              </Card>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <h3 className="font-display text-xl font-bold text-banhu-green-dark">
            Strategic Partners
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Together we build a stronger community
          </p>
          <BeadDivider className="my-6" />
          <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-2.5">
            {STRATEGIC_PARTNERS.map((partner) => (
              <span
                key={partner}
                className="rounded-full border border-banhu-sand bg-banhu-paper px-4 py-2 text-sm font-medium text-banhu-green-dark shadow-sm transition-colors hover:border-banhu-orange"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
