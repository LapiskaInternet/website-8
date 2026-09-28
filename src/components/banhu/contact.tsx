import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { CONTACT } from "@/lib/banhu-data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/banhu/section-heading";

export function Contact() {
  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Contact Us"
          subtitle="Call, email or WhatsApp us — we are happy to plan your bushveld experience together."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="gap-0 p-6 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-banhu-green/10 text-banhu-green-dark">
              <Phone aria-hidden="true" className="h-6 w-6" />
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Phone
            </p>
            <a
              href={CONTACT.phoneTel}
              className="mt-1 block font-display text-lg font-bold text-banhu-green-dark transition-colors hover:text-banhu-orange-dark"
            >
              {CONTACT.phoneDisplay}
            </a>
          </Card>

          <Card className="gap-0 p-6 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-banhu-green/10 text-banhu-green-dark">
              <Mail aria-hidden="true" className="h-6 w-6" />
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Email
            </p>
            <a
              href={CONTACT.emailHref}
              className="mt-1 block break-all font-display text-base font-bold text-banhu-green-dark transition-colors hover:text-banhu-orange-dark"
            >
              {CONTACT.email}
            </a>
          </Card>

          <Card className="gap-0 p-6 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-banhu-green/10 text-banhu-green-dark">
              <MapPin aria-hidden="true" className="h-6 w-6" />
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Address
            </p>
            <p className="mt-1 text-sm font-medium leading-relaxed text-banhu-green-dark">
              {CONTACT.address}
            </p>
          </Card>

          <Card className="gap-0 p-6 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-banhu-green/10 text-banhu-green-dark">
              <Clock aria-hidden="true" className="h-6 w-6" />
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Operating Hours
            </p>
            <p className="mt-1 text-sm font-medium text-banhu-green-dark">
              {CONTACT.hours}
            </p>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <Button
            asChild
            size="lg"
            className="bg-[#1faa53] font-semibold text-white hover:bg-[#188f45]"
          >
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle aria-hidden="true" className="mr-2 h-5 w-5" />
              Chat on WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
