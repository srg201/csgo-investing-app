"use client";
import Loader from "@/components/global/loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSyncUrl } from "@/hooks/use-sync-url";
import { cn } from "@/lib/utils";
import { useFilters } from "@/store/filters";
import { InvestType, SortBy, SortType } from "@/types/cases.types";
import { ArrowUpWideNarrow } from "lucide-react";
import React, { Suspense, useState } from "react";
import { useDebounce } from "react-use";

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { search, investType, sortType, update, sortBy } = useFilters();
  const [localSearch, setLocalSearch] = useState(search);
  useSyncUrl();

  useDebounce(
    () => {
      console.log("localSearch DEBOUNCED", localSearch);
      update({ search: localSearch });
    },
    500,
    [localSearch]
  );

  return (
    <Suspense fallback={<Loader />}>
      <div
        className={cn(
          "flex flex-col lg:flex-row items-stretch lg:items-center justify-between w-full gap-4",
          className
        )}
      >
        <div className="flex gap-2 w-full">
          <Button
            aria-label="Sorting Type"
            variant={"outline"}
            onClick={() =>
              update({
                sortType:
                  sortType === SortType.ASC ? SortType.DESC : SortType.ASC,
              })
            }
          >
            <ArrowUpWideNarrow
              className={cn("transition-transform duration-500", {
                "rotate-180": sortType === SortType.DESC,
              })}
            />
          </Button>
          <Select
            defaultValue={SortBy.INVESTING_ROI}
            value={sortBy || SortBy.INVESTING_ROI}
            onValueChange={(val: SortBy) => update({ sortBy: val })}
          >
            <SelectTrigger className="max-w-52">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent className="flex-auto">
              <SelectItem value={SortBy.INVESTING_ROI}>
                Investing ROI
              </SelectItem>
              <SelectItem value={SortBy.PRICE}>Price</SelectItem>
              <SelectItem value={SortBy.LISTINGS}>Listings</SelectItem>
            </SelectContent>
          </Select>

          <Select
            defaultValue={InvestType.ONE_YEAR}
            value={investType || InvestType.ONE_YEAR}
            onValueChange={(val: InvestType) =>
              update({
                investType: val,
              })
            }
          >
            <SelectTrigger className="max-w-52">
              <SelectValue placeholder="Invest Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={InvestType.ONE_YEAR}>1 year</SelectItem>
              <SelectItem value={InvestType.SIX_MONTH}>6 month</SelectItem>
              <SelectItem value={InvestType.ONE_MONTH}>1 month</SelectItem>
              <SelectItem value={InvestType.ONE_WEEK}>1 week</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Input
          aria-label="Searching"
          className="w-full"
          placeholder="Search"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
        />
      </div>
    </Suspense>
  );
};
