import { getCases } from "@/lib/actions/cases.actions";
import { cn } from "@/lib/utils";
import { ICase, InvestType, SortBy, SortType } from "@/types/cases.types";
import React from "react";
interface Props {
  className?: string;
}

export const TopLine: React.FC<Props> = async ({}) => {
  const { data, status } = await getCases({
    sortBy: SortBy.INVESTING_ROI,
    sortType: SortType.DESC,
    investType: InvestType.ONE_YEAR,
    search: "",
  });

  if (status !== 200) return null;

  return (
    <div className="overflow-hidden inset-x-0 top-0 z-50 h-9 sticky border-b border-border bg-black flex justify-center items-center text-sm text-muted-foreground">
      <ul className="flex flex-grow flex-1 gap-7 animate-scroll hover:paused">
        {data?.length &&
          data?.length > 0 &&
          data?.map((item: ICase) => (
            <li
              className="whitespace-nowrap flex gap-2 items-center"
              key={item.id}
            >
              {item.name}
              <span
                className={cn(
                  "text-primary",
                  Number(item.investingRoiYear) < 0
                    ? "text-red-500"
                    : "text-green-500"
                )}
              >
                {Number(item.investingRoiYear) > 0 ? "+" : "-"}
                {new Intl.NumberFormat("en-US", {
                  style: "percent",
                  maximumFractionDigits: 2,
                }).format(Math.abs(Number(item.investingRoiYear)) / 100)}
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
};
