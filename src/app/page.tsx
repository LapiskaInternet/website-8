import { SiteHeader } from "@/components/banhu/site-header";
import { Hero } from "@/components/banhu/hero";
import { LiveCalendarWeather } from "@/components/banhu/live-calendar-weather";
import { About } from "@/components/banhu/about";
import { AddonTours } from "@/components/banhu/addon-tours";
import { PartnerCta } from "@/components/banhu/partner-cta";
import { TourPackages } from "@/components/banhu/tour-packages";
import { TransportServices } from "@/components/banhu/transport-services";
import { ExpoBanner } from "@/components/banhu/expo-banner";
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
        <AddonTours />
        <PartnerCta />
        <TourPackages />
        <TransportServices />
        <ExpoBanner />
        <Community />
        <BookingForm />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  );
}
