import Image from "next/image";
import {
  BadgeCheck,
  Briefcase,
  CalendarDays,
  Handshake,
  MapPin,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { SiteAction } from "@/components/banhu/site-action";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden topo-pattern">
      <div aria-hidden="true" className="bead-strip h-1.5 w-full" />
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-12 md:pb-24 md:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left column */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-banhu-sand bg-banhu-paper px-4 py-1.5 text-xs font-semibold text-banhu-green-dark shadow-sm">
                <MapPin className="h-3.5 w-3.5 text-banhu-orange-dark" />
                Acornhoek · Mpumalanga · South Africa
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-banhu-sand bg-banhu-paper px-4 py-1.5 text-xs font-semibold text-banhu-green-dark shadow-sm">
                <Briefcase className="h-3.5 w-3.5 text-banhu-orange-dark" />
                Tour Operator &amp; Travel Agency
              </span>
            </div>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.1] text-banhu-green-dark sm:text-5xl lg:text-[3.4rem]">
              Experience the <span className="text-banhu-orange">Heritage</span>{" "}
              of Mpumalanga
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Storytelling, heritage walks and authentic bushveld experiences
              around Acornhoek and the greater Lowveld — where nature meets
              community.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="font-semibold">
                <a href="#booking">Book Your Adventure</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-banhu-orange text-banhu-orange-dark hover:bg-banhu-orange hover:text-white font-semibold"
              >
                <SiteAction kind="view" view="tours">
                  Explore Our Tours
                </SiteAction>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="text-banhu-green-dark hover:text-banhu-orange-dark"
              >
                <a href="#live">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  Plan Your Visit
                </a>
              </Button>
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <li className="inline-flex items-center gap-1.5">
                <BadgeCheck
                  aria-hidden="true"
                  className="h-4 w-4 text-banhu-green-light"
                />
                Founded by Jimmy Victor Nyathi
              </li>
              <li className="inline-flex items-center gap-1.5">
                <Handshake
                  aria-hidden="true"
                  className="h-4 w-4 text-banhu-green-light"
                />
                Bushbuckridge Tourism partner
              </li>
              <li className="inline-flex items-center gap-1.5">
                <ShieldCheck
                  aria-hidden="true"
                  className="h-4 w-4 text-banhu-green-light"
                />
                CIPC 2026/020289/07
              </li>
            </ul>
          </div>

          {/* Right column */}
          <div className="relative mb-10 sm:mb-12">
            <Image
              src="/images/bushbuckridge-heritage-tour.png"
              alt="Banhu Travel & Tours poster — your story starts here in Mpumalanga"
              width={700}
              height={933}
              priority
              sizes="(min-width:1024px) 384px, 90vw"
              style={{ aspectRatio: "4 / 5" }}
              className="mx-auto w-full max-w-sm rounded-3xl border-4 border-banhu-paper object-cover object-top shadow-xl"
            />
            <Image
              src="/images/expo-about.png"
              alt="Banhu Travel — Highveld to Lowveld Heritage Corridor poster"
              width={440}
              height={587}
              sizes="(min-width:1024px) 224px, 40vw"
              className="absolute -bottom-10 -right-2 hidden w-48 rotate-6 rounded-2xl border-4 border-banhu-paper object-cover object-top shadow-lg sm:block md:-right-8 md:w-56"
            />
            <div className="absolute -left-3 top-10 max-[380px]:hidden -rotate-3 rounded-2xl bg-banhu-green px-4 py-3 shadow-lg md:-left-8">
              <p className="font-display text-sm font-semibold text-banhu-cream">
                Experience. <span className="text-banhu-orange-light">Connect.</span>{" "}
                Discover.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
