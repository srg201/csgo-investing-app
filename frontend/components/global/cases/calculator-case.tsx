"use client";

import { cn, formatCurrency } from "@/lib/utils";
import { ICase } from "@/types/cases.types";
import React, { useCallback } from "react";
import { Button } from "../../ui/button";
import { removeFromCalculator } from "@/lib/actions/cases.actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";

interface Props extends ICase {
  className?: string;
  quantity: number;
}

export const CalculatorCase: React.FC<Props> = ({ className, ...caseData }) => {
  const { name, imageUrl, quantity, price } = caseData;
  const router = useRouter();

  const handleRemove = useCallback(async () => {
    await removeFromCalculator(caseData);
    toast.success(`${name} removed from calculator`);
    router.refresh();
  }, [caseData, name, router]);

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-2 p-4 rounded-lg bg-muted overflow-hidden",
        className
      )}
    >
      <h1 className="font-semibold text-xl line-clamp-1">{name}</h1>
      <div className="relative">
        <Image
          width={300}
          height={300}
          src={imageUrl}
          alt={name}
          className="w-full h-52 object-contain"
        />
        <div className="flex flex-col items-center justify-center absolute top-[2%] right-[17%] bg-black/50 backdrop-blur-sm p-4 w-24 h-24 rounded-full border">
          <span className="text-xl font-bold">{formatCurrency(price)}</span>
        </div>
      </div>
      <p className="font-bold text-md">
        Quantity: <span className="font-normal">{quantity}</span>
      </p>
      <p className="font-bold text-md">
        Total Price:{" "}
        <span className="font-normal">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(price * quantity)}
        </span>
      </p>
      <Button
        variant="destructive"
        className="w-full mt-4"
        onClick={handleRemove}
      >
        Remove from Calculator
      </Button>
    </div>
  );
};
