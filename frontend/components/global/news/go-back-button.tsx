"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { cn } from "@/lib/utils";
interface Props {
  className?: string;
}

export const GoBackButton: React.FC<Props> = ({ className }) => {
  const router = useRouter();
  return (
    <Button
      className={cn("self-start rounded-full", className)}
      variant={"outline"}
      onClick={() => router.back()}
    >
      <ArrowLeft /> Go back
    </Button>
  );
};
