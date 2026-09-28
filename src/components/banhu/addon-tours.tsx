"use client";

import Image from "next/image";
import { Check, Info, Plus } from "lucide-react";

import { ADDONS } from "@/lib/banhu-data";
import { useBookingStore } from "@/lib/booking-store";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { SectionHeading } from "@/components/banhu/section-heading";

export function AddonTours() {
  const { selectedAddons, toggleAddon } = useBookingStore();
  const { toast } = useToast();

  return (
    <section id="add-ons" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Add-On Experiences"
          title="Add-On Tours"
          subtitle="Our add-on experiences, known on the ground by these names — delivered together with our local partners."
        />

        <div className="mx-auto mb-10 flex max-w-2xl items-start justify-center gap-2 rounded-2xl border border-banhu-sand bg-banhu-paper px-4 py-3 text-center text-sm text-muted-foreground">
          <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-banhu-orange-dark" />
          <p>
            Take any add-on on its own or combine it with a package — every
            experience is customisable in the booking form below.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ADDONS.map((a) => {
            const isSelected = selectedAddons.includes(a.id);
            return (
              <Card key={a.id} className="group gap-0 overflow-hidden p-0 pt-0">
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={a.image}
                    alt={`${a.name} — Banhu Tourism add-on experience poster`}
                    fill
                    sizes="(min-width:1024px) 33vw,(min-width:640px) 50vw,100vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-5">
                  <h3 className="font-display text-lg font-bold text-banhu-green-dark">
                    {a.name}
                  </h3>
                  <p className="mt-2 min-h-[3.5rem] text-sm leading-relaxed text-muted-foreground">
                    {a.description}
                  </p>
                </CardContent>
                <CardFooter className="flex-col items-stretch gap-2 border-t border-banhu-sand/70 p-5">
                  <p className="text-[11px] italic text-muted-foreground">
                    Delivered with our local partners
                  </p>
                  <Button
                    className={
                      isSelected
                        ? "w-full"
                        : "w-full border-banhu-orange/60 text-banhu-orange-dark hover:bg-banhu-orange hover:text-white"
                    }
                    variant={isSelected ? "default" : "outline"}
                    aria-pressed={isSelected}
                    onClick={() => {
                      if (!isSelected) {
                        toast({
                          title: "Added to booking",
                          description: `${a.name} will be included in your booking request.`,
                        });
                      }
                      toggleAddon(a.id);
                    }}
                  >
                    {isSelected ? (
                      <Check aria-hidden="true" className="mr-2 h-4 w-4" />
                    ) : (
                      <Plus aria-hidden="true" className="mr-2 h-4 w-4" />
                    )}
                    {isSelected ? "Added to Booking" : "Add to Booking"}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
