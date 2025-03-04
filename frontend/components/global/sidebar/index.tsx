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
          <p className="text-xs px-4 py-2 text-muted-foreground">
            This website is an independent fan project and is not endorsed by,
            affiliated with, or sponsored by Valve Corporation or
            Counter-Strike: Global Offensive. All trademarks and copyrights
            belong to their respective owners.
          </p>
        </SidebarContent>
      </Sidebar>
    </Suspense>
  );
};
