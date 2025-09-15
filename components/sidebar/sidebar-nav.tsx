"use client";

import { buttonVariants } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname();
  const router = useRouter();

  function handleChange(value: string) {
    router.push(value);
  }

  const activeItem = useMemo(() => items.find((item) => pathname.startsWith(item.href)) || null, [items, pathname]);

  if (items.length === 0) {
    return (
      <div className="border border-dashed rounded-md p-4">
        <p className="text-sm text-center">No options available</p>
      </div>
    );
  }

  return (
    <>
      <div className="block lg:hidden">
        <Select value={activeItem?.href || ""} onValueChange={handleChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select page" />
          </SelectTrigger>
          <SelectContent>
            {items.map((item) => (
              <SelectItem key={item.href} value={item.href}>
                {item.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <nav className={cn("hidden lg:flex lg:flex-col lg:space-y-1", className)} {...props}>
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              pathname.startsWith(item.href) ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline",
              "justify-start"
            )}
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </>
  );
}
