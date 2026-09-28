import Image from "next/image";
import { Handshake } from "lucide-react";

import { ADDONS, whatsappLink } from "@/lib/banhu-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function PartnerCta() {
  const bomaImage =
    ADDONS.find((a) => a.id === "boma-storytelling")!.image;

  return (
    <section id="partner" className="pb-16 md:pb-24">
      <div className="mx-auto max-w-6xl px-4">
        <Card className="gap-0 overflow-hidden rounded-3xl border-banhu-sand p-0 shadow-lg">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
            <div className="p-8 md:p-10">
              <Badge className="border-banhu-orange/30 bg-banhu-orange/10 text-banhu-orange-dark">
                For Tour Operators &amp; Accommodation
              </Badge>
              <h3 className="mt-4 font-display text-2xl font-bold text-banhu-green-dark md:text-3xl">
                Bring the Storytelling to Your Guests
              </h3>
              <p className="mt-4 text-muted-foreground">
                Also available to tour operators doing Panorama Route or Kruger
                drives — add an authentic cultural layer to your itinerary.
              </p>
              <p className="mt-3 text-muted-foreground">
                Hotels, guest houses and lodges: we bring the storytelling to
                your accommodation and share it with your guests around the boma
                fire.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild>
                  <a
                    href={whatsappLink(
                      "Hi Banhu Tourism! I am a tour operator / accommodation partner and I would like to discuss a partnership."
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Handshake aria-hidden="true" className="mr-2 h-4 w-4" />
                    Become a Partner
                  </a>
                </Button>
                <Button asChild variant="ghost" className="text-banhu-green-dark">
                  <a href="#contact">Contact Us</a>
                </Button>
              </div>
            </div>
            <div className="relative min-h-[240px] lg:min-h-0">
              <Image
                src={bomaImage}
                alt="Storytelling on boma fire — Banhu add-on experience poster"
                fill
                sizes="(min-width:1024px) 42vw,100vw"
                className="object-cover object-top"
              />
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
