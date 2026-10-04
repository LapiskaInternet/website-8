import { SiteHeader } from "@/components/banhu/site-header";
import { Hero } from "@/components/banhu/hero";
import { LiveCalendarWeather } from "@/components/banhu/live-calendar-weather";
import { About } from "@/components/banhu/about";
import { PartnerCta } from "@/components/banhu/partner-cta";
import { TransportServices } from "@/components/banhu/transport-services";
import { ExpoBanner } from "@/components/banhu/expo-banner";
import { PlanYourTour } from "@/components/banhu/plan-your-tour";
import { Community } from "@/components/banhu/community";
import { BookingForm } from "@/components/banhu/booking-form";
import { Contact } from "@/components/banhu/contact";
import { SiteFooter } from "@/components/banhu/site-footer";
import { BeadDivider } from "@/components/banhu/bead-divider";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <BeadDivider className="py-2" />
        <LiveCalendarWeather />
        <About />
        <PartnerCta />
        <TransportServices />
        <ExpoBanner />
        <PlanYourTour />
        <Community />
        <BookingForm />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  );
}
