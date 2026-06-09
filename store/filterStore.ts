import { create } from "zustand";

export type PropertyType = "apartment" | "house" | "villa" | "studio" | null;

interface IFilterState {
  search: string;
  type: PropertyType;
  minPrice: number | null;
  maxPrice: number | null;
  bedrooms: number | null;

  setSearch: (value: string) => void;
  setType: (value: PropertyType) => void;
  setMinPrice: (value: number | null) => void;
  setMaxPrice: (value: number | null) => void;
  setBedrooms: (value: number | null) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<IFilterState>((set) => ({
  search: "",
  type: null,
  minPrice: null,
  maxPrice: null,
  bedrooms: null,

  setSearch: (value: string) => set({ search: value }),
  setType: (value: PropertyType) => set({ type: value }),
  setMinPrice: (value: number | null) => set({ minPrice: value }),
  setMaxPrice: (value: number | null) => set({ maxPrice: value }),
  setBedrooms: (value: number | null) => set({ bedrooms: value }),
  resetFilters: () =>
    set({
      search: "",
      type: null,
      minPrice: null,
      maxPrice: null,
      bedrooms: null,
    }),
}));
