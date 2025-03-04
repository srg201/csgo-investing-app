import React, { Suspense } from "react";
import Loader from "@/components/global/loader";
import { NavigationItems } from "./navigation-items";
import { Logo } from "./logo";
import { SidebarUpdatedTime } from "./sidebar-updated-time";
import { SidebarAdvancedSettings } from "./sidebar-advanced-settings";
import { SidebarFilters } from "./sidebar-filters";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { BottomNavigation } from "./bottom-navigation";

export const AppSidebar: React.FC = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Sidebar>
        <SidebarContent className="bg-sidebar">
          <Logo />
          <Separator />

          <NavigationItems />
          <SidebarFilters />
          <SidebarAdvancedSettings />

          <SidebarUpdatedTime />
          <BottomNavigation />
        </SidebarContent>
      </Sidebar>
    </Suspense>
  );
};
