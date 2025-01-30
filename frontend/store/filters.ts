import { InvestType, SortBy, SortType } from "@/types/cases.types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type Store = {
  currency: string;
  source: string;
  showInvestingRoi: boolean;
  showListings: boolean;
  search: string;
  sortBy: SortBy;
  sortType: SortType;
  investType: InvestType;
  update: (updated: Partial<Store>) => void;
  syncWithUrl: () => void;
};

export const useFilters = create<Store>()(
  devtools(
    (set) => ({
      currency: "USD",
      source: "steam",
      showInvestingRoi: true,
      showListings: true,
      search: "",
      sortBy: "investingRoi",
      sortType: "asc",
      investType: "1year",
      update: (updated) =>
        set((state) => {
          const newState = { ...state, ...updated };
          return newState;
        }),
      syncWithUrl: () => {
        const searchParams = new URLSearchParams(window.location.search);
        set((state) => ({
          ...state,
          search: searchParams.get("search") || "",
          sortBy: (searchParams.get("sortBy") as SortBy) || "investingRoi",
          sortType: (searchParams.get("sortType") as SortType) || "asc",
          investType: (searchParams.get("investType") as InvestType) || "1year",
        }));
      },
    }),
    {
      name: "filters state",
    }
  )
);
