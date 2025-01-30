import { cn } from "@/lib/utils";
import React from "react";
import { Skeleton } from "./ui/skeleton";

interface Props {
  className?: string;
}

export const CaseCardSkeleton: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn("rounded-lg p-4", className, `border`)}>
      <div className="relative mb-4">
        <Skeleton
          className={cn("font-bold text-xl text-center w-full h-8 bg-accent")}
        ></Skeleton>
      </div>
      <div className="flex justify-center flex-col relative">
        <Skeleton className="w-full h-52 object-contain bg-accent" />
        <div className="grid grid-cols-2 gap-4 justify-between mt-4 mb-4">
          <Skeleton className="h-16 flex flex-col gap-1 items-center bg-accent p-2 rounded-lg">
          </Skeleton>
          <Skeleton className="h-16 flex flex-col gap-1 items-center bg-accent p-2 rounded-lg">
          </Skeleton>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <Skeleton className="w-full h-10 bg-accent" />
        <Skeleton className="w-full h-10 bg-accent" />
        <Skeleton className="w-full h-10 bg-accent" />
        <Skeleton className="w-full h-10 bg-accent" />
      </div>
    </div>
  );
};
