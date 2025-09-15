import { SidebarGroup, SidebarGroupLabel, SidebarMenu } from "@/components/ui/sidebar";

import { MenuItem } from "@/data/menu";
import { AppSidebarMenuItem } from "./sidebar-menu-item";

interface Props {
  menu: MenuItem[];
}

export function NavMain({ menu }: Props) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menu</SidebarGroupLabel>
      <SidebarMenu>
        {menu.map((item) => (
          <AppSidebarMenuItem
            key={item.name}
            name={item.name}
            url={item.url}
            icon={item.icon}
            subItems={item.subItems}
          />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
