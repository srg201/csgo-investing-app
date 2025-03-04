"use client";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Check } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
interface NavigationItem {
  path: string;
  label: string;
}

const NAVIGATION_ITEMS: NavigationItem[] = [
  { path: "/", label: "Rankings" },
  { path: "/calculator", label: "Calculator" },
  { path: "/news", label: "Investor News" },
];

export const NavigationItems: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {NAVIGATION_ITEMS.map(({ path, label }) => (
          <SidebarMenuItem key={path}>
            <SidebarMenuButton className="text-base transition-colors flex justify-between">
              <Link
                scroll={false}
                className="flex justify-between w-full items-center"
                href={path + "?" + searchParams}
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
};
