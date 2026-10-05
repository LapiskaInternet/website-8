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
import {
  goToSection,
  useSiteStore,
  type SiteView,
} from "@/lib/site-store";
import { SiteAction } from "@/components/banhu/site-action";
import { cn } from "@/lib/utils";

type NavItem =
  | { kind: "anchor"; href: string; label: string }
  | { kind: "view"; view: SiteView; label: string }
  | { kind: "packages"; label: string };

const NAV_ITEMS: NavItem[] = [
  { kind: "anchor", href: "#home", label: "Home" },
  { kind: "view", view: "tours", label: "Tours" },
  { kind: "view", view: "travel-agency", label: "Travel Agency" },
  { kind: "packages", label: "Packages" },
  { kind: "anchor", href: "#events", label: "Events" },
  { kind: "anchor", href: "#community", label: "Community" },
  { kind: "anchor", href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const view = useSiteStore((s) => s.view);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isItemActive = (item: NavItem) =>
    item.kind === "view" && view === item.view;

  const handleMobileItem = (item: NavItem) => {
    setOpen(false);
    if (item.kind === "view") {
      useSiteStore.getState().setView(item.view);
    } else if (item.kind === "packages") {
      useSiteStore.getState().openPackages();
    } else {
      goToSection(item.href);
    }
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-banhu-sand bg-banhu-cream/90 backdrop-blur supports-[backdrop-filter]:bg-banhu-cream/80",
        scrolled && "shadow-sm"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 md:h-[4.5rem]">
        <SiteAction
          kind="anchor"
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
              Tour Operator &amp; Travel Agency
            </span>
          </span>
        </SiteAction>

        <div className="flex items-center gap-2">
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-0.5 lg:flex"
          >
            {NAV_ITEMS.map((item) => {
              const active = isItemActive(item);
              return (
                <SiteAction
                  key={item.label}
                  {...item}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-banhu-green text-banhu-cream hover:bg-banhu-green-dark"
                      : "text-banhu-green-dark/80 hover:bg-banhu-cream-dark hover:text-banhu-orange-dark"
                  )}
                >
                  {item.label}
                </SiteAction>
              );
            })}
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
            <SiteAction kind="anchor" href="#booking">
              Book Now
            </SiteAction>
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
                {NAV_ITEMS.map((item) => {
                  const active = isItemActive(item);
                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => handleMobileItem(item)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors",
                        active
                          ? "bg-banhu-green text-banhu-cream"
                          : "text-banhu-green-dark/80 hover:bg-banhu-cream-dark hover:text-banhu-orange-dark"
                      )}
                    >
                      {item.label}
                    </button>
                  );
                })}
                <Button
                  className="mt-3 w-full font-semibold"
                  onClick={() => handleMobileItem({ kind: "anchor", href: "#booking", label: "Book Now" })}
                >
                  Book Now
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
