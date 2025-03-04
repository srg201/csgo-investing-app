import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { getUpdatedTime } from "@/lib/actions/cases.actions";
import { formatDistanceToNow } from "date-fns";
import React from "react";

export const SidebarUpdatedTime: React.FC = async () => {
  const { status, data: updatedTime } = await getUpdatedTime();

  if (status !== 200) {
    return null;
  }

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu className="flex flex-col gap-4">
          <SidebarMenuItem aria-label="Last data updated time">
            <div className="flex flex-col gap-2 border border-primary border-dashed p-2 rounded-md items-center">
              <h2 className="text-xl text-primary font-semibold uppercase">
                UPDATED
              </h2>
              <p className="text-sm text-primary">
                {formatDistanceToNow(new Date(updatedTime ?? new Date()), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
