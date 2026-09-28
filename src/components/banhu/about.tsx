import Image from "next/image";
import { Handshake, MapPin, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/banhu/section-heading";

const FEATURES = [
  {
    icon: User,
    text: "Founded by Jimmy Victor Nyathi",
  },
  {
    icon: MapPin,
    text: "Office at Mount Lapiska, Canhuk Drive",
  },
  {
    icon: Handshake,
    text: "Community upliftment in partnership with Bushbuckridge Tourism",
  },
] as const;

export function About() {
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — poster with floating logo + caption */}
          <div className="relative order-2 mb-8 lg:order-1 lg:mb-0">
            <Image
              src="/images/expo-about.png"
              alt="Banhu Travel & Tours — Highveld to Lowveld Heritage Corridor poster"
              width={800}
              height={1067}
              sizes="(min-width:1024px) 448px, 90vw"
              style={{ aspectRatio: "3 / 4" }}
              className="mx-auto w-full max-w-md rounded-3xl border-4 border-banhu-paper object-cover object-top shadow-xl"
            />
            <Image
              src="/images/banhu-logo.png"
              alt=""
              aria-hidden="true"
              width={88}
              height={88}
              className="absolute -right-4 -top-6 h-20 w-20 rounded-full border-4 border-banhu-paper bg-white shadow-lg md:-right-8"
            />
            <div className="absolute -bottom-6 left-4 right-8 rounded-2xl bg-banhu-green px-5 py-4 shadow-lg md:left-8">
              <p className="font-display text-sm font-semibold text-banhu-cream">
                Banhu Travel &amp; Tours — Highveld to Lowveld Heritage Corridor
              </p>
              <p className="mt-0.5 text-xs text-banhu-cream/70">
                Exhibiting at the Mpumalanga Tourism Expo 2026 · Riverside Mall,
                Mbombela
              </p>
            </div>
          </div>

          {/* Right — copy */}
          <div className="order-1 lg:order-2">
            <SectionHeading
              align="left"
              eyebrow="Who We Are"
              title="About Banhu Tourism"
            />
            <div className="-mt-4 space-y-4 text-base leading-relaxed text-muted-foreground md:-mt-6">
              <p>
                Founded by{" "}
                <strong className="font-semibold text-banhu-green-dark">
                  Jimmy Victor Nyathi
                </strong>
                , Banhu Tourism is a tour operation based in Acornhoek,
                Mpumalanga. Our office is located at Mount Lapiska on Canhuk
                Drive.
              </p>
              <p>
                We specialize in authentic bushveld experiences that connect
                visitors with the natural beauty and cultural richness of the
                Acornhoek region and the greater Lowveld. Our mission goes
                beyond tourism — we are committed to community upliftment
                through skills development and job creation in partnership with
                Bushbuckridge Tourism and a network of local partners.
              </p>
              <p>
                Every tour you take directly supports learners from{" "}
                <strong className="font-semibold text-banhu-green-dark">
                  Powerline
                </strong>{" "}
                and{" "}
                <strong className="font-semibold text-banhu-green-dark">
                  Shobiyane
                </strong>{" "}
                villages, creating pathways into the tourism industry for young
                South Africans.
              </p>
            </div>

            <ul className="mt-6 space-y-3">
              {FEATURES.map((feature) => (
                <li
                  key={feature.text}
                  className="flex items-start gap-3 rounded-2xl border border-banhu-sand bg-banhu-paper p-3.5"
                >
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-banhu-orange/15 text-banhu-orange-dark">
                    <feature.icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <p className="text-sm font-semibold text-banhu-green-dark">
                    {feature.text}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <a href="#community">Our Community Impact</a>
              </Button>
              <Button
                asChild
                variant="ghost"
                className="text-banhu-green-dark"
              >
                <a href="#booking">Plan Your Tour</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
