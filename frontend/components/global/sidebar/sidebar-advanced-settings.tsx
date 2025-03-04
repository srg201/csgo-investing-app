"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useFilters } from "@/store/filters";
import React from "react";

export const SidebarAdvancedSettings: React.FC = () => {
  const { update, showInvestingRoi, showListings } = useFilters();

  const handleToggleInvestingRoi = React.useCallback(() => {
    update({ showInvestingRoi: !showInvestingRoi });
  }, [showInvestingRoi, update]);

  const handleToggleListings = React.useCallback(() => {
    update({ showListings: !showListings });
  }, [showListings, update]);

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu className="flex flex-col gap-4">
          <SidebarMenuItem>
            <Accordion
              aria-label="Advanced settings"
              type="single"
              defaultValue="default"
              collapsible
            >
              <AccordionItem value="default">
                <SidebarGroupLabel className="mb-4">
                  <AccordionTrigger className="text-base">
                    Advanced Settings
                  </AccordionTrigger>
                </SidebarGroupLabel>
                <AccordionContent>
                  <ul className="flex flex-col gap-2">
                    <li className="flex gap-4 items-center">
                      <Checkbox
                        checked={showInvestingRoi}
                        onCheckedChange={handleToggleInvestingRoi}
                      />
                      Show Investing ROI
                    </li>
                    <li className="flex gap-4 items-center">
                      <Checkbox
                        checked={showListings}
                        onCheckedChange={handleToggleListings}
                      />
                      Show Listings
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
