"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useFilters } from "@/store/filters";
import React from "react";

const PRICING_SOURCES = [{ value: "steam", label: "Steam" }];

const CURRENCIES = [{ value: "USD", label: "USD" }];

export const SidebarFilters: React.FC = () => {
  const { update, source, currency } = useFilters();

  const handleSourceChange = React.useCallback(
    (value: string) => {
      update({ source: value });
    },
    [update]
  );

  const handleCurrencyChange = React.useCallback(
    (value: string) => {
      update({ currency: value });
    },
    [update]
  );
  return (
    <SidebarGroup className="mt-auto">
      <SidebarGroupLabel className="text-base">Filters</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="flex flex-col gap-4">
          <SidebarMenuItem>
            <Select
              defaultValue="steam"
              value={source || "steam"}
              onValueChange={handleSourceChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pricing Source" />
              </SelectTrigger>
              <SelectContent>
                {PRICING_SOURCES.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Select
              defaultValue="USD"
              value={currency || "USD"}
              onValueChange={handleCurrencyChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Currency" />
              </SelectTrigger>
              <SelectContent>
                {CURRENCIES.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
