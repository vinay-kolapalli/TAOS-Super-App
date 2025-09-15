import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { mainMenu } from "@/data/menu";
import { User } from "@/db/types";
import { BrandCard } from "./brand-card";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

interface Props {
  user: User;
}

export function AppSidebar({ user }: Props) {
  const isAdmin = user.role === "admin";
  let userSpecialMenu = mainMenu;

  if (!isAdmin) {
    userSpecialMenu = mainMenu
      .map((item) => {
        const hasMainPermission = item.permission
          ? user.permissions.includes(item.permission)
          : true;

        if (!hasMainPermission) {
          return null;
        }

        if (item.subItems) {
          const filteredSubItems = item.subItems.filter((subItem) =>
            subItem.permission
              ? user.permissions?.includes(subItem.permission)
              : true,
          );
          return filteredSubItems.length > 0
            ? { ...item, subItems: filteredSubItems }
            : null;
        }

        return item;
      })
      .filter((v) => v !== null);
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <BrandCard />
      </SidebarHeader>
      <SidebarContent>
        <NavMain menu={userSpecialMenu} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          name={user.name}
          email={user.email}
          image={user.image ?? undefined}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
