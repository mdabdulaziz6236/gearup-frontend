
import { Search, Bell, Mail, Menu } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Sidebar } from "./Sidebar"
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
export function DashboardHeader({user}:DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between gap-4 bg-slate-50 px-4 md:px-6 lg:px-8">
      
      {/* Mobile Menu Trigger */}
      <div className="flex items-center lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0 bg-slate-50 border-none">
            <div className="h-full p-4">
              <Sidebar role={user.data?.role} />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Search Bar matching image */}
      <div className="flex-1 max-w-md hidden md:flex items-center relative">
        <Search className="absolute left-3 h-4 w-4 text-gray-400" />
        <Input 
          type="search" 
          placeholder="Search gear, orders..." 
          className="w-full rounded-full bg-white pl-10 border-none shadow-sm focus-visible:ring-1 focus-visible:ring-emerald-500 h-10"
        />
        <div className="absolute right-3 flex items-center gap-1 text-xs text-gray-400">
          <kbd className="bg-gray-100 rounded px-1.5 py-0.5">⌘F</kbd>
        </div>
      </div>

      {/* User Actions */}
      <div className="flex items-center gap-4 ml-auto">
        <Button variant="outline" size="icon" className="rounded-full border-none shadow-sm bg-white h-10 w-10">
          <Mail className="h-4 w-4 text-gray-600" />
        </Button>
        <Button variant="outline" size="icon" className="rounded-full border-none shadow-sm bg-white h-10 w-10 relative">
          <Bell className="h-4 w-4 text-gray-600" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500" />
        </Button>
        
        <div className="flex items-center gap-3 pl-2">
          <div className="hidden md:block">
            <p className="text-sm font-semibold leading-none text-gray-900">{user.data.fullName}</p>
            <p className="text-xs text-gray-500 mt-1">{user.data?.email}</p>
          </div>
        </div>
      </div>
    </header>
  )
}