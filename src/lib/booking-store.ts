"use client";

import { create } from "zustand";

interface BookingState {
  /** ids of add-on tours ticked in the booking form */
  selectedAddons: string[];
  /** id of the chosen pre-planned package ("" = none) */
  selectedPackage: string;
  toggleAddon: (id: string) => void;
  clearAddons: () => void;
  setSelectedPackage: (id: string) => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  selectedAddons: [],
  selectedPackage: "",
  toggleAddon: (id) =>
    set((state) => ({
      selectedAddons: state.selectedAddons.includes(id)
        ? state.selectedAddons.filter((a) => a !== id)
        : [...state.selectedAddons, id],
    })),
  clearAddons: () => set({ selectedAddons: [] }),
  setSelectedPackage: (id) => set({ selectedPackage: id }),
}));
