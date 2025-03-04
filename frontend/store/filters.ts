import { InvestType, SortBy, SortType } from "@/types/cases.types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

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
    persist(
      (set) => ({
        currency: "USD",
        source: "steam",
        showInvestingRoi: true,
        showListings: true,
        search: "",
        sortBy: SortBy.INVESTING_ROI,
        sortType: SortType.ASC,
        investType: InvestType.ONE_YEAR,
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
            sortBy:
              (searchParams.get("sortBy") as SortBy) || SortBy.INVESTING_ROI,
            sortType:
              (searchParams.get("sortType") as SortType) || SortType.ASC,
            investType:
              (searchParams.get("investType") as InvestType) ||
              InvestType.ONE_YEAR,
          }));
        },
      }),
      {
        name: "filters state",
      }
    )
  )
);
