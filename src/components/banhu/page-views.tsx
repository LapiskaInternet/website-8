"use client";

import { useEffect } from "react";

import type { SiteView } from "@/lib/site-store";
import { useSiteStore } from "@/lib/site-store";
import { Hero } from "@/components/banhu/hero";
import { BeadDivider } from "@/components/banhu/bead-divider";
import { ServicesSlider } from "@/components/banhu/services-slider";
import { HomeHighlights } from "@/components/banhu/home-highlights";
import { LiveCalendarWeather } from "@/components/banhu/live-calendar-weather";
import { About } from "@/components/banhu/about";
import { PartnerCta } from "@/components/banhu/partner-cta";
import { ExpoBanner } from "@/components/banhu/expo-banner";
import { Community } from "@/components/banhu/community";
import { BookingForm } from "@/components/banhu/booking-form";
import { Contact } from "@/components/banhu/contact";
import { ToursPage } from "@/components/banhu/tours-page";
import { TravelAgencyPage } from "@/components/banhu/travel-agency-page";
import { PackagesModal } from "@/components/banhu/packages-modal";

const TITLES: Record<SiteView, string> = {
  home: "Banhu Tourism — Experience the Heritage of Mpumalanga",
  tours: "Our Tours & Safari Packages — Banhu Tourism",
  "travel-agency": "Travel Agency & Bookings — Banhu Tourism",
};

/**
 * Client-side view switch — the sandbox exposes a single route ("/"), so the
 * dedicated Tours and Travel Agency pages swap in here instead of using URLs.
 * The Travel Agency packages pop-out stays mounted across every view.
 */
export function PageViews() {
  const view = useSiteStore((s) => s.view);

  useEffect(() => {
    document.title = TITLES[view];
    if (view !== "home") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [view]);

  return (
    <>
      {view === "tours" ? (
        <ToursPage />
      ) : view === "travel-agency" ? (
        <TravelAgencyPage />
      ) : (
        <>
          <Hero />
          <BeadDivider className="py-2" />
          <ServicesSlider />
          <HomeHighlights />
          <LiveCalendarWeather />
          <About />
          <PartnerCta />
          <ExpoBanner />
          <Community />
          <BookingForm />
          <Contact />
        </>
      )}
      <PackagesModal />
    </>
  );
}
