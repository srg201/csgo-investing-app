import { cn } from "@/lib/utils";
import { BanIcon } from "lucide-react";
import React from "react";

interface Props {
  className?: string;
  error?: string;
  description?: string;
}

export const ErrorBoundary: React.FC<Props> = ({
  className,
  error,
  description,
}) => {
  return (
    <div
      className={cn(
        "w-full h-[70vh] justify-center flex flex-col items-center gap-4",
        className
      )}
    >
      <BanIcon className="size-32 text-red-500" />
      <h1 className="text-3xl font-semibold text-muted-foreground text-center text-red-500">
        {error ?? "Something went wrong"}
      </h1>
      <p className="text-muted-foreground text-center">
        {description ?? "Please try again later or contact support"}
      </p>
    </div>
  );
};
