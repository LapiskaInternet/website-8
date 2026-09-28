import Image from "next/image";
import { CalendarRange, MapPin, MessageCircle, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { whatsappLink } from "@/lib/banhu-data";

const EVENT_DETAILS = [
  { icon: MapPin, text: "Riverside Mall, Mbombela (Nelspruit)" },
  { icon: CalendarRange, text: "25–27 September 2026 · All weekend" },
  { icon: Sparkles, text: "Experience. Connect. Discover." },
] as const;

export function ExpoBanner() {
  return (
    <section id="events" className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <Card className="grid overflow-hidden rounded-3xl border-banhu-sand p-0 shadow-lg lg:grid-cols-[1.15fr_0.85fr]">
          <div className="bg-banhu-green-dark p-8 text-banhu-cream md:p-12">
            <Badge className="border-banhu-orange/40 bg-banhu-orange/15 text-banhu-orange-light">
              <Sparkles className="h-3 w-3" aria-hidden="true" />
              Event · 25–27 September 2026
            </Badge>
            <h3 className="mt-4 font-display text-3xl font-bold leading-tight md:text-4xl">
              Meet Us at the{" "}
              <span className="text-banhu-orange-light">
                Mpumalanga Tourism Expo
              </span>{" "}
              2026
            </h3>
            <p className="mt-4 max-w-lg text-banhu-cream/80">
              Banhu Travel &amp; Tours — the Highveld to Lowveld Heritage
              Corridor — exhibiting at Riverside Mall, Mbombela. Come plan your
              bushveld experience with us in person.
            </p>

            <ul className="mt-6 space-y-2.5">
              {EVENT_DETAILS.map((detail) => (
                <li
                  key={detail.text}
                  className="flex items-center gap-2.5 text-sm text-banhu-cream/85"
                >
                  <detail.icon
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-banhu-orange-light"
                  />
                  {detail.text}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                className="bg-banhu-orange text-white hover:bg-banhu-orange-dark"
              >
                <a
                  href={whatsappLink(
                    "Hi Banhu Tourism! I'd like to know more about your stand at the Mpumalanga Tourism Expo 2026."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" />
                  Chat on WhatsApp
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-banhu-cream/30 bg-transparent text-banhu-cream hover:bg-banhu-cream/10 hover:text-banhu-cream"
              >
                <a href="#live">Plan Your Visit</a>
              </Button>
            </div>
          </div>

          <div className="relative min-h-[280px] lg:min-h-0">
            <Image
              src="/images/mpumalanga-tourism-expo.png"
              alt="Mpumalanga Tourism Expo 2026 poster featuring Banhu Travel & Tours"
              fill
              sizes="(min-width:1024px) 40vw, 100vw"
              className="object-cover object-top"
            />
          </div>
        </Card>
      </div>
    </section>
  );
}
