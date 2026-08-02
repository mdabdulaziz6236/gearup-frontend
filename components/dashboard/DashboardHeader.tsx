"use client";

import { Menu, User as UserIcon, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "./Sidebar";
import { useEffect, useState } from "react";

export type Role = "CUSTOMER" | "PROVIDER" | "ADMIN";

type IUser = {
  success: string;
  message: string;
  data: {
    id: string;
    fullName: string;
    email: string;
    role: Role;
  };
};

type DashboardHeaderProps = {
  user: IUser;
};

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    setCurrentDate(formattedDate);
  }, []);

  const roleColor =
    user.data.role === "ADMIN"
      ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400"
      : user.data.role === "PROVIDER"
        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
        : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between gap-4 bg-slate-50 dark:bg-slate-950 px-4 md:px-6 lg:px-8 border-b border-slate-200 dark:border-slate-800">
      {/*  Mobile Menu Trigger */}
      <div className="flex items-center lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-slate-600 dark:text-slate-300"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-72 p-0 bg-slate-50 dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800"
          >
            <div className="h-full p-4">
              <Sidebar role={user.data?.role} />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/*  Current Date (Desktop Only) */}
      <div className="hidden md:flex items-center text-sm font-medium text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 px-4 py-2 rounded-full shadow-sm border border-slate-100 dark:border-slate-800">
        <Calendar className="mr-2 h-4 w-4 text-emerald-500" />
        {currentDate || "Loading date..."}
      </div>

      {/*  User Actions & Info */}
      <div className="flex items-center gap-4 ml-auto">
        {/* Role Badge */}
        <div
          className={`hidden sm:flex px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${roleColor}`}
        >
          {user.data.role} PANEL
        </div>

        {/* User Info Display (No Dropdown) */}
        <div className="flex items-center gap-3 pl-1.5 pr-4 py-1.5 h-12 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          {/* Avatar Initials */}
          <div className="h-9 w-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-sm font-bold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shrink-0">
            {user.data.fullName.charAt(0).toUpperCase()}
          </div>

          {/* Name & Email (Hidden on small screens) */}
          <div className="hidden md:block text-left">
            <p className="text-sm font-semibold leading-none text-slate-900 dark:text-white truncate max-w-37.5">
              {user.data.fullName}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 truncate max-w-37.5">
              {user.data.email}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
