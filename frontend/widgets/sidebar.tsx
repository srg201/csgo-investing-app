"use client";
import React, { Suspense } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useFilters } from "@/store/filters";
import { Check } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import Loader from "@/components/loader";

interface NavigationItem {
  path: string;
  label: string;
}

const NAVIGATION_ITEMS: NavigationItem[] = [
  { path: "/", label: "Rankings" },
  { path: "/calculator", label: "Calculator" },
];

const PRICING_SOURCES = [{ value: "steam", label: "Steam" }];

const CURRENCIES = [{ value: "USD", label: "USD" }];

interface Props {
  className?: string;
  updatedTime: string;
}

export const AppSidebar: React.FC<Props> = ({ updatedTime }) => {
  const pathname = usePathname();
  const { update, showInvestingRoi, showListings, source, currency } =
    useFilters();
  const searchParams = useSearchParams();

  const handleToggleInvestingRoi = React.useCallback(() => {
    update({ showInvestingRoi: !showInvestingRoi });
  }, [showInvestingRoi, update]);

  const handleToggleListings = React.useCallback(() => {
    update({ showListings: !showListings });
  }, [showListings, update]);

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

  const lastUpdateTime = React.useMemo(() => {
    return formatDistanceToNow(new Date(updatedTime), {
      addSuffix: true,
    });
  }, [updatedTime]);

  const renderNavigationItems = () => (
    <SidebarGroup>
      <SidebarMenu>
        {NAVIGATION_ITEMS.map(({ path, label }) => (
          <SidebarMenuItem key={path}>
            <SidebarMenuButton className="text-xl transition-colors flex justify-between">
              <Link
                className="flex justify-between w-full items-center"
                href={path + '?' + searchParams}
              >
                {label}
                {pathname === path && <Check className="stroke-primary" />}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );

  const renderFiltersSection = () => (
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

  const renderAdvancedSettings = () => (
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

  return (
    <Suspense fallback={<Loader />}>
      <Sidebar>
      <SidebarContent className="">
        <div className="py-4">
          <h1 className="uppercase text-xl font-black leading-none text-primary text-center tracking-widest">
            <span className="tracking-tighter text-2xl">CSGO CASE</span>
            <br />
            INVESTOR
          </h1>
        </div>
        <Separator />

        {renderNavigationItems()}
        {renderFiltersSection()}
        {renderAdvancedSettings()}

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-4">
              <SidebarMenuItem aria-label="Last data updated time">
                <div className="flex flex-col gap-2 border border-primary p-2 rounded-md items-center">
                  <h2 className="text-xl text-primary font-bold">UPDATED</h2>
                  <p className="text-sm text-primary">{lastUpdateTime}</p>
                </div>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-4">
              <SidebarMenuItem>
                <SidebarMenuButton>FAQ</SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>Cookies Policy</SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup> */}
      </SidebarContent>
    </Sidebar>
    </Suspense>
  );
};
