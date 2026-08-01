"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Users, Package, ShoppingCart, DollarSign, Activity, ShieldCheck, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { getAdminSystemStats } from "@/service/api";

interface SystemStats {
  totalUsers: number;
  totalGears: number;
  totalOrders: number;
  totalRevenue: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await getAdminSystemStats();
     
      if (res.success) {
        setStats(res.data);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to load system stats");
    } finally {
      setIsLoading(false);
    }
  };

  //  Skeleton Loading
  const StatsSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm animate-pulse">
          <div className="flex justify-between items-start">
            <div className="space-y-2 w-full">
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2"></div>
              <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-1/3 mt-2"></div>
            </div>
            <div className="h-10 w-10 bg-slate-100 dark:bg-slate-900 rounded-xl"></div>
          </div>
        </div>
      ))}
    </div>
  );

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 rounded-md mb-2 animate-pulse"></div>
          <div className="h-4 w-64 bg-slate-100 dark:bg-slate-900 rounded-md animate-pulse"></div>
        </div>
        <StatsSkeleton />
      </div>
    );
  }

  if (!stats) return <div className="text-center py-20 text-slate-500">Failed to load system data</div>;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Admin Control Panel</h1>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 ml-8">
            Overview of platform performance and metrics.
          </p>
        </div>
        <div className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded-xl text-sm font-semibold flex items-center border border-indigo-100 dark:border-indigo-900/50">
          <Activity className="h-4 w-4 mr-2 animate-pulse" /> System Online
        </div>
      </div>

      {/* 🟢 System Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Revenue Card (Admin Theme) */}
        <div className="bg-linear-to-br from-indigo-600 to-indigo-800 rounded-3xl p-6 text-white shadow-md relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 bg-white/10 h-24 w-24 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="font-medium text-indigo-200 text-sm">Platform Revenue</p>
              <h3 className="text-3xl font-bold mt-1 tracking-tight">${stats.totalRevenue}</h3>
            </div>
            <div className="bg-white/20 p-2.5 rounded-xl">
              <DollarSign className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>

        {/* Total Users */}
        <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm group hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium text-slate-500 dark:text-slate-400 text-sm">Total Users</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{stats.totalUsers}</h3>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-2.5 rounded-xl border border-blue-100 dark:border-blue-900/50 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors">
              <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        {/* Total Gears */}
        <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm group hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium text-slate-500 dark:text-slate-400 text-sm">Total Gears Listed</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{stats.totalGears}</h3>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-2.5 rounded-xl border border-emerald-100 dark:border-emerald-900/50 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/40 transition-colors">
              <Package className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm group hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium text-slate-500 dark:text-slate-400 text-sm">Total Rentals</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{stats.totalOrders}</h3>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-2.5 rounded-xl border border-purple-100 dark:border-purple-900/50 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/40 transition-colors">
              <ShoppingCart className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/*  Quick Management Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        
        <Link href="/dashboard/admin/users" className="group">
          <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:border-indigo-500 dark:hover:border-indigo-500 transition-all">
            <div className="flex justify-between items-center mb-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-2xl text-blue-600 dark:text-blue-400">
                <Users className="h-6 w-6" />
              </div>
              <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Manage Users</h3>
            <p className="text-sm text-slate-500 mt-1">View users, update roles, or suspend accounts.</p>
          </div>
        </Link>

        <Link href="/dashboard/admin/gears" className="group">
          <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:border-indigo-500 dark:hover:border-indigo-500 transition-all">
            <div className="flex justify-between items-center mb-4">
              <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-2xl text-emerald-600 dark:text-emerald-400">
                <Package className="h-6 w-6" />
              </div>
              <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Gear Inventory</h3>
            <p className="text-sm text-slate-500 mt-1">Monitor all listed gears across the platform.</p>
          </div>
        </Link>

        <Link href="/dashboard/admin/rentals" className="group">
          <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:border-indigo-500 dark:hover:border-indigo-500 transition-all">
            <div className="flex justify-between items-center mb-4">
              <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-2xl text-purple-600 dark:text-purple-400">
                <ShoppingCart className="h-6 w-6" />
              </div>
              <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">All Rentals</h3>
            <p className="text-sm text-slate-500 mt-1">Track platform-wide rental orders and payments.</p>
          </div>
        </Link>

      </div>
    </div>
  );
}