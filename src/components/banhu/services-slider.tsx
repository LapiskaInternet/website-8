"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";

import { SERVICE_SLIDES, type ServiceSlide } from "@/lib/banhu-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { SectionHeading } from "@/components/banhu/section-heading";
import { SiteAction } from "@/components/banhu/site-action";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 5500;

type SlideAction =
  | { kind: "view"; view: "tours" | "travel-agency" }
  | { kind: "packages" };

function slideAction(slide: ServiceSlide): SlideAction {
  switch (slide.id) {
    case "heritage-tours":
    case "tour-packages":
    case "add-ons":
      return { kind: "view", view: "tours" };
    case "transfers":
      return { kind: "view", view: "travel-agency" };
    default:
      return { kind: "packages" };
  }
}

function slideCta(slide: ServiceSlide): string {
  switch (slide.id) {
    case "heritage-tours":
      return "Explore Our Tours";
    case "tour-packages":
      return "View Tour Packages";
    case "cross-border":
      return "View Travel Packages";
    case "transfers":
      return "Transport & Shuttles";
    case "travel-agency":
      return "View Travel Agency Packages";
    case "add-ons":
      return "Browse Add-On Experiences";
    default:
      return "Learn More";
  }
}

export function ServicesSlider() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const pausedRef = useRef(false);

  // track the active slide for the dots
  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  // gentle autoplay — paused on hover/focus and when the tab is hidden
  useEffect(() => {
    if (!api) return;
    const id = window.setInterval(() => {
      if (pausedRef.current || document.hidden) return;
      api.scrollNext();
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [api]);

  return (
    <section
      aria-label="Services we offer"
      className="py-16 md:py-24"
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
      onFocus={() => (pausedRef.current = true)}
      onBlur={() => (pausedRef.current = false)}
    >
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="What We Offer"
          title="Tour Operator &amp; Travel Agency — One Partner"
          subtitle="Slide through the services we offer — from guided heritage tours and safari packages to airport transfers and full travel-agency bookings."
        />

        <Carousel
          setApi={setApi}
          opts={{ loop: true }}
          className="group relative"
        >
          <CarouselContent>
            {SERVICE_SLIDES.map((slide, index) => {
              const action = slideAction(slide);
              const flip = index % 2 === 1;
              return (
                <CarouselItem key={slide.id}>
                  <article className="grid h-full overflow-hidden rounded-3xl border border-banhu-sand bg-banhu-paper shadow-sm md:grid-cols-2">
                    <div
                      className={cn(
                        "relative h-56 w-full sm:h-72 md:h-full md:min-h-[340px]",
                        flip && "md:order-2"
                      )}
                    >
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                      />
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-banhu-green-deep/40 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-banhu-paper/10"
                      />
                    </div>

                    <div className="flex flex-col justify-center gap-4 p-6 md:p-8 lg:p-10">
                      <Badge
                        variant="outline"
                        className="w-fit border-banhu-orange/40 bg-banhu-orange/10 text-banhu-orange-dark"
                      >
                        {slide.tag}
                      </Badge>
                      <h3 className="font-display text-2xl font-bold leading-tight text-banhu-green-dark md:text-3xl">
                        {slide.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                        {slide.description}
                      </p>
                      <ul className="space-y-2">
                        {slide.points.map((point) => (
                          <li
                            key={point}
                            className="flex items-start gap-2.5 text-sm text-foreground/85"
                          >
                            <Check
                              aria-hidden="true"
                              className="mt-0.5 h-4 w-4 shrink-0 text-banhu-green-light"
                            />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-2">
                        <Button asChild size="lg" className="font-semibold">
                          <SiteAction {...action} className="inline-flex items-center gap-2">
                            {slideCta(slide)}
                            <ArrowRight aria-hidden="true" className="h-4 w-4" />
                          </SiteAction>
                        </Button>
                      </div>
                    </div>
                  </article>
                </CarouselItem>
              );
            })}
          </CarouselContent>

          <CarouselPrevious className="left-3 size-9 rounded-full border-banhu-sand bg-banhu-cream/90 hover:bg-banhu-cream md:-left-5" />
          <CarouselNext className="right-3 size-9 rounded-full border-banhu-sand bg-banhu-cream/90 hover:bg-banhu-cream md:-right-5" />
        </Carousel>

        <div className="mt-6 flex items-center justify-center gap-2">
          <span className="sr-only" role="status">
            Slide {current + 1} of {SERVICE_SLIDES.length}:{" "}
            {SERVICE_SLIDES[current]?.title}
          </span>
          {SERVICE_SLIDES.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              aria-label={`Go to slide ${i + 1}: ${slide.title}`}
              aria-current={current === i ? "true" : undefined}
              onClick={() => api?.scrollTo(i)}
              className={cn(
                "h-2.5 rounded-full transition-all duration-300",
                current === i
                  ? "w-7 bg-banhu-orange"
                  : "w-2.5 bg-banhu-sand hover:bg-banhu-orange/50"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
