"use client";
import { MenuItem } from "@/data/menu";
import { IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubItem } from "../ui/sidebar";

interface Props extends Omit<MenuItem, "segment" | "permission"> {}

export function AppSidebarMenuItem({ icon, name, url, subItems }: Props) {
  const segments = useSelectedLayoutSegments();
  const currentPath = `/${segments.join("/")}`;
  const LinkWrapper = subItems ? "div" : Link;

  const hasActiveSubItem = subItems?.some((item) => currentPath === item.url || currentPath.startsWith(item.url + "/"));
  const isItemActive = currentPath === url || hasActiveSubItem;

  return (
    <SidebarMenuItem key={name} value={url}>
      <Collapsible className="group/collapsible" defaultOpen={hasActiveSubItem}>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton asChild isActive={isItemActive}>
            <LinkWrapper href={url} className="cursor-pointer">
              {icon}
              <span>{name}</span>
              {subItems && (
                <IconChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              )}
            </LinkWrapper>
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          {subItems && (
            <SidebarMenuSub>
              {subItems.map((item) => (
                <SidebarMenuSubItem key={item.name} value={item.url}>
                  <SidebarMenuButton asChild isActive={currentPath === item.url || currentPath.endsWith(item.url)}>
                    <Link href={item.url}>
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          )}
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
}
