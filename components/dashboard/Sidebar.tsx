"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Boxes,
  ClipboardList,
  CreditCard,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  PackagePlus,
  Settings,
  ShoppingBag,
  Star,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { logout } from "@/service/logout";

type Role = "CUSTOMER" | "PROVIDER" | "ADMIN";

interface SidebarProps {
  role: Role;
}

const MENU_ITEMS: Record<
  Role,
  {
    name: string;
    href: string;
    icon: React.ElementType;
  }[]
> = {
  CUSTOMER: [
    {
      name: "Dashboard",
      href: "/dashboard/customer",
      icon: LayoutDashboard,
    },
    {
      name: "Browse Gear",
      href: "/gear",
      icon: ShoppingBag,
    },
    {
      name: "My Orders",
      href: "/dashboard/customer/orders",
      icon: ClipboardList,
    },
    {
      name: "Payments",
      href: "/dashboard/customer/payments",
      icon: CreditCard,
    },
    {
      name: "Reviews",
      href: "/dashboard/customer/reviews",
      icon: Star,
    },
  ],

  PROVIDER: [
    {
      name: "Dashboard",
      href: "/dashboard/provider",
      icon: LayoutDashboard,
    },
    {
      name: "My Gear",
      href: "/dashboard/provider/gear",
      icon: ShoppingBag,
    },
    {
      name: "Add Gear",
      href: "/dashboard/provider/gear/new",
      icon: PackagePlus,
    },
    {
      name: "Orders",
      href: "/dashboard/provider/orders",
      icon: ClipboardList,
    }
  ],

  ADMIN: [
    {
      name: "Dashboard",
      href: "/dashboard/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Users",
      href: "/dashboard/admin/users",
      icon: Users,
    },
    {
      name: "Gear Listings",
      href: "/dashboard/admin/gears",
      icon: ShoppingBag,
    },
    {
      name: "Rental Orders",
      href: "/dashboard/admin/rentals",
      icon: ClipboardList,
    },
    {
      name: "Payments",
      href: "/dashboard/admin/payments",
      icon: CreditCard,
    },
  ],
};

const GENERAL_MENU = [
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    name: "Help",
    href: "/help",
    icon: HelpCircle,
  },
];

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();

  const menus = MENU_ITEMS[role];

  return (
    <aside className="flex h-full flex-col rounded-3xl bg-sidebar-accent dark:bg-accent p-4 shadow-sm">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 px-2 py-4">
        <Boxes className="size-6 text-primary" />
        <span className="text-xl font-bold tracking-tight">GearUp</span>
      </Link>

      {/* Main Menu */}
      <div className="mt-6">
        <p className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Menu
        </p>

        <nav className="space-y-1">
          {menus.map((item) => {
            const Icon = item.icon;

            const isActive =
              pathname === item.href ||
              (item.name !== "Dashboard" &&
                pathname.startsWith(`${item.href}/`) &&
                !menus.some(
                  (menu) =>
                    menu.href !== item.href && pathname.startsWith(menu.href),
                ));

            return (
              <Link key={item.href} href={item.href}>
                <span
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-5 w-5",
                      isActive
                        ? "text-primary-foreground"
                        : "text-muted-foreground",
                    )}
                  />
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* General */}
      <div className="mt-8">
        <p className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          General
        </p>

        <nav className="space-y-1">
          {GENERAL_MENU.map((item) => {
            const Icon = item.icon;

            const isActive = pathname === item.href;

            return (
              <Link key={item.href} href={item.href}>
                <span
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-5 w-5",
                      isActive
                        ? "text-primary-foreground"
                        : "text-muted-foreground",
                    )}
                  />
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <button
        onClick={() => {
          logout();
        }}
        className="mt-auto flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
      >
        <LogOut className="h-5 w-5" />
        Logout
      </button>
    </aside>
  );
}
