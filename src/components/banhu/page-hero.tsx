import { ChevronLeft, MessageCircle } from "lucide-react";

import { whatsappLink } from "@/lib/banhu-data";
import { Button } from "@/components/ui/button";
import { SiteAction } from "@/components/banhu/site-action";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  chips?: string[];
}

/** Header band shared by the dedicated Tours and Travel Agency pages. */
export function PageHero({ eyebrow, title, description, chips }: PageHeroProps) {
  return (
    <section className="relative topo-pattern bg-banhu-green-deep text-banhu-cream">
      <div aria-hidden="true" className="bead-strip h-1.5 w-full opacity-90" />
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <SiteAction
          kind="anchor"
          href="#home"
          className="inline-flex items-center gap-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.18em] text-banhu-cream/70 transition-colors hover:text-banhu-orange-light"
          aria-label="Back to home page"
        >
          <ChevronLeft aria-hidden="true" className="h-4 w-4" />
          Back to Home
        </SiteAction>

        <p className="mt-7 text-xs font-semibold uppercase tracking-[0.22em] text-banhu-orange-light">
          {eyebrow}
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-3xl font-extrabold leading-tight text-balance md:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-banhu-cream/80 md:text-base">
          {description}
        </p>

        {chips?.length ? (
          <ul className="mt-7 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-banhu-cream"
              >
                {chip}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}

/** Closing call-to-action band shared by the dedicated pages. */
export function CtaBand({
  title = "Ready to plan your journey?",
  description = "Tell us your dates and party size — we will build the itinerary, book the beds and meet you at the door.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section
      aria-label="Book your tour"
      className="topo-pattern bg-banhu-green-deep py-14 text-center text-banhu-cream md:py-16"
    >
      <div className="mx-auto max-w-2xl px-4">
        <h2 className="font-display text-2xl font-bold text-balance md:text-3xl">
          {title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-banhu-cream/75 md:text-base">
          {description}
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" className="font-semibold">
            <SiteAction kind="anchor" href="#booking">
              Book Your Tour
            </SiteAction>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/30 bg-transparent text-banhu-cream hover:bg-white/10 hover:text-banhu-cream"
          >
            <a
              href={whatsappLink(
                "Hi Banhu Tourism! I'd like to plan a trip — can you help?"
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle aria-hidden="true" className="mr-2 h-4 w-4" />
              WhatsApp Us
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
