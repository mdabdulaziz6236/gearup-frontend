"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Boxes,
  LayoutDashboard,
  LogOut,
  User,
  LogInIcon,
  User2Icon,
  Menu,
  ChevronRight,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Fragment, useState } from "react";
import { toast } from "sonner";
import { ModeToggle } from "../theme/toggleButton";
import { logout } from "@/service/logout";


const navLinks = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Gear", href: "/gear", icon: Boxes },
  { label: "About-Us", href: "/about", icon: Users },
];

const userMenuItems = [
  { label: "Profile", href: "/profile", icon: User },
  { label: "Log out", href: "#", icon: LogOut, separatorBefore: true },
];

type IUser = {
  success: string;
  message: string;
  data: {
    id: string;
    fullName: string;
    email: string;
    role: string;
  };
};

type NavbarProps = {
  user: IUser;
};

export function Navbar({ user }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleUserMenuAction = async (action: string, e: React.MouseEvent) => {
    if (action === "Log out") {
      e.preventDefault();
      try {
        await logout();
        toast.success("Logged out successfully");
        router.push("/");
        router.refresh();
      } catch (error) {
        console.error("Logout failed:", error);
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md upports-backdrop-filter:bg-background/60">

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        
        {/* Left Side: Mobile Menu & Logo  */}
        <div className="flex flex-1 items-center gap-3">
          
          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="-ml-2 rounded-full">
                  <Menu className="size-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-70 border-r-0 bg-background/95 backdrop-blur-lg p-0">
                <SheetHeader className="p-6 border-b text-left">
                  <SheetTitle className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
                      <Boxes className="size-5 text-primary-foreground" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">GearUp</span>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col p-4 space-y-2">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.label}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all",
                          isActive 
                            ? "bg-primary/10 text-primary" 
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <link.icon className="size-5" />
                          {link.label}
                        </div>
                        <ChevronRight className="size-4 opacity-50" />
                      </Link>
                    );
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-80">
            <div className="flex shadow-sm  sm:flex size-8 items-center justify-center rounded-lg bg-primary">
                      <Boxes className="size-5 text-primary-foreground" />
                    </div>
            <span className="text-xl font-bold tracking-tight text-foreground">
              GearUp
            </span>
          </Link>
        </div>

        {/* Center: Desktop Navigation  */}
        <nav className="hidden md:flex items-center justify-center gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                )}
              >
                <link.icon className="size-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Side: Theme & User Actions  */}
        <div className="flex flex-1 items-center justify-end gap-3">
          <ModeToggle />

          {user?.success ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="relative h-10 w-10 rounded-full border-border/50 p-0 hover:bg-secondary/50 transition-all focus-visible:ring-1 focus-visible:ring-primary"
                >
                  <Avatar className="size-9">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {user.data?.fullName?.charAt(0).toUpperCase() || <User2Icon className="size-4" />}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 rounded-2xl p-2 shadow-xl">
                <DropdownMenuLabel className="p-3">
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm font-semibold text-foreground leading-none">
                      {user?.data?.fullName || "User Name"}
                    </span>
                    <span className="text-xs text-muted-foreground truncate leading-none mt-1">
                      {user?.data?.email || "user@example.com"}
                    </span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="mx-2" />
                <DropdownMenuGroup className="p-1">
                  {userMenuItems.map((item) => (
                    <Fragment key={item.label}>
                      {item.separatorBefore && <DropdownMenuSeparator className="mx-1 my-1" />}
                      {item.label !== "Log out" ? (
                        <DropdownMenuItem asChild className="rounded-xl cursor-pointer">
                          <Link href={item.href} className="flex items-center w-full px-3 py-2.5">
                            <item.icon className="mr-3 size-4 text-muted-foreground" />
                            <span className="font-medium">{item.label}</span>
                          </Link>
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem
                          onClick={(e) => handleUserMenuAction(item.label, e)}
                          className="rounded-xl cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-700 dark:focus:bg-red-950/50 mt-1 px-3 py-2.5"
                        >
                          <item.icon className="mr-3 size-4" />
                          <span className="font-medium">{item.label}</span>
                        </DropdownMenuItem>
                      )}
                    </Fragment>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth/login">
              <Button className="cursor-pointer  ">
                <LogInIcon className="mr-2 size-4 hidden sm:block" />
                Login
              </Button>
            </Link>
          )}
        </div>
        
      </div>
    </header>
  );
}