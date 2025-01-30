import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn, formatCurrency } from "@/lib/utils";
import { useFilters } from "@/store/filters";
import { ICase } from "@/types/cases.types";
import { Scroll, TrendingDown, TrendingUp } from "lucide-react";
import React, { useCallback, useMemo } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { addToCalculator } from "@/lib/actions/cases.actions";
import Image from "next/image";

interface CaseCardProps extends ICase {
  className?: string;
}

export const CaseCard: React.FC<CaseCardProps> = ({
  className,
  ...caseData
}) => {
  const { showInvestingRoi, showListings, investType } = useFilters();

  const handleAddToCalculator = useCallback(
    (quantity: number) => {
      addToCalculator(caseData, quantity);
      toast.success(`${quantity} ${caseData.name}s added to calculator`);
    },
    [caseData]
  );

  const currentRoi = useMemo(() => {
    const roiMap = {
      "1year": caseData.investingRoiYear,
      "6month": caseData.investingRoi6M,
      "1month": caseData.investingRoi1M,
      "1week": caseData.investingRoiWeek,
    };
    return roiMap[investType] || roiMap["1week"];
  }, [investType, caseData]);

  const formattedPrice = useMemo(() => {
    return formatCurrency(caseData.price);
  }, [caseData.price]);

  return (
    <Card
      className={cn(
        "transition-all hover:shadow-lg h-full",
        className,
        "border"
      )}
    >
      <CardHeader className="relative">
        <CardTitle
          className={cn("font-medium whitespace-nowrap text-xl text-center")}
        >
          {caseData.name}
        </CardTitle>
        <CardDescription />
      </CardHeader>
      <CardContent className="flex justify-center flex-col relative">
        <Image
          src={caseData.imageUrl}
          alt={caseData.name}
          className="w-full h-52 object-contain"
          loading="lazy"
          width={300}
          height={300}
        />
        <div className="flex flex-col items-center justify-center absolute top-[2%] right-[17%] bg-black/50 backdrop-blur-sm p-4 w-24 h-24 rounded-full border">
          <span className="text-xl font-bold">{formattedPrice}</span>
        </div>

        <div className="grid grid-cols-2 gap-4 justify-between">
          {showInvestingRoi && (
            <div className="flex flex-col gap-1 items-center bg-accent p-2 rounded-lg">
              <span>Investing ROI</span>
              {currentRoi > 0 ? (
                <TrendingUp className="stroke-green-500" />
              ) : (
                <TrendingDown className="stroke-red-500" />
              )}
              <p
                className={cn(
                  "font-bold text-md",
                  currentRoi > 0 ? "text-green-500" : "text-red-500"
                )}
              >
                {currentRoi.toFixed(2)}%
              </p>
            </div>
          )}

          {showListings && (
            <div className="flex flex-col gap-1 items-center bg-accent p-2 rounded-lg">
              <span>Listings</span>
              <Scroll />
              <p className="font-bold text-xl">{caseData.listings}</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-4 mt-4 gap-1">
          {[10, 100, 1000, 5000].map((quantity) => (
            <Button
              key={quantity}
              variant="outline"
              onClick={() => handleAddToCalculator(quantity)}
              className="hover:bg-accent transition-colors"
            >
              +{quantity}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
