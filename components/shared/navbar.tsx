"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Boxes,
  LayoutDashboard,
  LogOut,
  User,
  LogInIcon,
  User2Icon,
} from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Fragment } from "react";
import { toast } from "sonner";
import { ModeToggle } from "../theme/toggleButton";

const navLinks = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Gear", href: "/gear", icon: Boxes },
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
  // const [isLogout, setIsLogout] = useState(false);

  const handleUserMenuAction = async (action: string, e: React.MouseEvent) => {
    if (action === "Log out") {
      e.preventDefault();

      try {
        // await logout();
        toast.success("User Logged Out Successfully");
        router.push("/login");
        router.refresh();
        // setIsLogout(true);
      } catch (error) {
        console.error("Logout failed:", error);
      }
    }
  };
  // useEffect(() => {
  //   if (isLogout) {
  //     toast.success("User Logged Out Successfully");
  //     router.push("/login");
  //     router.refresh();
  //   }
  // }, [isLogout]);
  return (
    <header className="border-b">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Boxes className="size-6 text-primary" />
          <span className="text-lg font-semibold tracking-tight">Gear Up</span>
        </Link>

        {/* Nav links */}
        <ul className="items-center hidden gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className={cn(buttonVariants({ variant: "ghost" }))}
              >
                <link.icon className="mr-2 size-4" />
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* User dropdown */}
        <div className="flex justify-center items-center space-x-3">
          <ModeToggle></ModeToggle>

          {user?.success ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full cursor-pointer"
                  aria-label="Open user menu"
                >
                  <Avatar className="size-8 flex justify-center items-center">
                    <AvatarFallback className="bg-amber-100">
                      <User2Icon className="text-green-600 size-5" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">
                        {user?.data?.fullName || "User Name"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {user?.data?.email || "user@example.com"}
                      </span>
                    </div>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  {userMenuItems.map((item) => (
                    <Fragment key={item.label}>
                      {item.separatorBefore && <DropdownMenuSeparator />}
                      {item.label !== "Log out" ? (
                        <DropdownMenuItem asChild>
                          <Link href={item.href} className="cursor-pointer">
                            <item.icon className="mr-2 size-4" />
                            <span>{item.label}</span>
                          </Link>
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem
                          onClick={(e) => handleUserMenuAction(item.label, e)}
                          className="cursor-pointer text-red-600 focus:text-red-600"
                        >
                          <item.icon className="mr-2 size-4" />
                          <span>{item.label}</span>
                        </DropdownMenuItem>
                      )}
                    </Fragment>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth/login">
              <Button className="cursor-pointer">
                <LogInIcon className="size-4" />
                Login
              </Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
