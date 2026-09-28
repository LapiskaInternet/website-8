"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { NAV_LINKS } from "@/lib/banhu-data";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-banhu-sand bg-banhu-cream/90 backdrop-blur supports-[backdrop-filter]:bg-banhu-cream/80",
        scrolled && "shadow-sm"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 md:h-[4.5rem]">
        <a
          href="#home"
          className="flex items-center gap-2.5"
          aria-label="Banhu Tourism — home"
        >
          <Image
            src="/images/banhu-logo.png"
            alt=""
            width={44}
            height={44}
            className="rounded-full bg-white p-0.5 ring-1 ring-banhu-sand"
          />
          <span className="flex flex-col">
            <span className="font-display text-lg font-bold leading-none text-banhu-green-dark">
              Banhu Tourism
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-banhu-orange-dark">
              Travel &amp; Tours · Mpumalanga
            </span>
          </span>
        </a>

        <div className="flex items-center gap-2">
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-0.5 lg:flex"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium text-banhu-green-dark/80 transition-colors hover:bg-banhu-cream-dark hover:text-banhu-orange-dark"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div
            role="group"
            aria-label="Language"
            className="hidden items-center rounded-full border border-banhu-sand bg-banhu-paper p-1 text-xs xl:flex"
          >
            <span className="rounded-full px-2.5 py-1 font-semibold text-banhu-green-dark/60">
              Banhu
            </span>
            <span className="rounded-full bg-banhu-green px-2.5 py-1 font-semibold text-banhu-cream">
              English
            </span>
          </div>

          <Button asChild size="sm" className="hidden sm:inline-flex">
            <a href="#booking">Book Now</a>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2.5 text-left font-display text-base font-bold text-banhu-green-dark">
                  <Image
                    src="/images/banhu-logo.png"
                    alt=""
                    width={36}
                    height={36}
                    className="rounded-full bg-white p-0.5 ring-1 ring-banhu-sand"
                  />
                  Banhu Tourism
                </SheetTitle>
                <SheetDescription className="sr-only">
                  Navigation menu
                </SheetDescription>
              </SheetHeader>
              <nav
                aria-label="Mobile navigation"
                className="flex flex-col gap-1"
              >
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-2.5 text-sm font-medium text-banhu-green-dark/80 transition-colors hover:bg-banhu-cream-dark hover:text-banhu-orange-dark"
                  >
                    {link.label}
                  </a>
                ))}
                <Button asChild className="mt-3 w-full font-semibold">
                  <a href="#booking" onClick={() => setOpen(false)}>
                    Book Now
                  </a>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
