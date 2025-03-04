"use client";
import React from "react";
import { Button } from "../ui/button";
import { setCookieConsent } from "@/lib/actions/cookies.actions";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export const CookiesConsent: React.FC = () => {
  const handleCookieConsent = async (accepted: boolean) => {
    await setCookieConsent(accepted);
  };

  return (
    <div className="fixed bottom-4 inset-x-0 flex justify-center">
      <div className="max-w-96 bg-background border rounded-lg">
        <div className="p-4 flex gap-2 flex-col">
          <p className="text-sm text-muted-foreground">
            We use cookies to improve your experience.
          </p>
          <div className="flex gap-2 w-full">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="default"
                    className="w-full"
                    onClick={() => handleCookieConsent(true)}
                  >
                    Accept
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Accept all cookies. This includes essential and
                    non-essential cookies.
                  </p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleCookieConsent(false)}
                  >
                    Accept (only essential)
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-muted text-muted-foreground">
                  <p>
                    Accept only essential cookies. These cookies are necessary
                    for the website to function properly.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  );
};
