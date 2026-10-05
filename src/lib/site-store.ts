"use client";

import { create } from "zustand";

import { useBookingStore } from "@/lib/booking-store";

/** Dedicated in-app views. The site stays on the single "/" route —
 * these views swap the rendered page content client-side. */
export type SiteView = "home" | "tours" | "travel-agency";

interface SiteState {
  view: SiteView;
  /** Travel Agency packages pop-out (modal) */
  packagesOpen: boolean;
  setView: (view: SiteView) => void;
  openPackages: () => void;
  closePackages: () => void;
}

export const useSiteStore = create<SiteState>((set) => ({
  view: "home",
  packagesOpen: false,
  setView: (view) => set({ view }),
  openPackages: () => set({ packagesOpen: true }),
  closePackages: () => set({ packagesOpen: false }),
}));

export function scrollToSection(hash: string) {
  const id = hash.replace(/^#/, "");
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * Anchor navigation that works from any view — switches back to the
 * home view first (when needed), then smooth-scrolls to the section.
 */
export function goToSection(hash: string) {
  const { view, setView } = useSiteStore.getState();
  if (view !== "home") {
    setView("home");
    // wait one tick for the home sections to mount before scrolling
    window.setTimeout(() => scrollToSection(hash), 90);
  } else {
    scrollToSection(hash);
  }
}

/** Pre-select a package (by name) and open the booking form on the home view. */
export function enquirePackage(name: string) {
  useBookingStore.getState().setSelectedPackage(name);
  useSiteStore.getState().closePackages();
  goToSection("booking");
}
