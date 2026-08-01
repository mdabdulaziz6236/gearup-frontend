"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DollarSign, Package, ShoppingCart, CheckCircle2, ArrowUpRight, Loader2, Calendar } from "lucide-react";
import { toast } from "sonner";
import { getProviderDashboardStats } from "@/service/api";

interface DashboardData {
  totalGears: number;
  totalOrders: number;
  totalPaidOrders: number;
  totalRevenue: string;
  recentPaidOrders: Array<{
    id: string;
    startDate: string;
    endDate: string;
    totalAmount: string;
    status: string;
    gear: { title: string; dailyPrice: number };
    customer: { fullName: string; email: string };
  }>;
}

export default function ProviderDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await getProviderDashboardStats();
      if (res.success) {
        setData(res.data);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to load dashboard data");
    } finally {
      setIsLoading(false);
    }
  };

  // 🟢 Stats Card Skeleton
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
        <div className="h-64 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl animate-pulse"></div>
      </div>
    );
  }

  if (!data) return <div className="text-center py-20 text-slate-500">Failed to load data</div>;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Dashboard Overview</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Welcome back! Here's what's happening with your rental business.
        </p>
      </div>

      {/* 🟢 Top Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Revenue Card */}
        <div className="bg-linear-to-br from-emerald-500 to-emerald-700 rounded-3xl p-6 text-white shadow-md relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 bg-white/10 h-24 w-24 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="font-medium text-emerald-100 text-sm">Total Revenue</p>
              <h3 className="text-3xl font-bold mt-1 tracking-tight">${data.totalRevenue}</h3>
            </div>
            <div className="bg-white/20 p-2.5 rounded-xl">
              <DollarSign className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>

        {/* Total Orders Card */}
        <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium text-slate-500 dark:text-slate-400 text-sm">Total Orders</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{data.totalOrders}</h3>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-2.5 rounded-xl border border-blue-100 dark:border-blue-900/50">
              <ShoppingCart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        {/* Paid Orders Card */}
        <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium text-slate-500 dark:text-slate-400 text-sm">Paid Orders</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{data.totalPaidOrders}</h3>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-2.5 rounded-xl border border-purple-100 dark:border-purple-900/50">
              <CheckCircle2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>

        {/* Total Gears Card */}
        <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium text-slate-500 dark:text-slate-400 text-sm">Listed Gears</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{data.totalGears}</h3>
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/20 p-2.5 rounded-xl border border-amber-100 dark:border-amber-900/50">
              <Package className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
        </div>
      </div>

      {/*  Recent Paid Orders Section */}
      <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden">
        
        {/* Section Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/20">
          <div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Recent Transactions</h3>
            <p className="text-xs text-slate-500 mt-1">Your most recent paid & completed orders.</p>
          </div>
          <Link href="/dashboard/provider/orders" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 flex items-center transition-colors">
            View All <ArrowUpRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        {/* Table/List */}
        <div className="p-0 sm:p-6 overflow-x-auto">
          {data.recentPaidOrders && data.recentPaidOrders.length > 0 ? (
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 hidden sm:table-header-group">
                <tr>
                  <th className="font-medium pb-3 px-4 sm:px-0">Customer & Gear</th>
                  <th className="font-medium pb-3">Rental Date</th>
                  <th className="font-medium pb-3">Status</th>
                  <th className="font-medium pb-3 text-right pr-4 sm:pr-0">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {data.recentPaidOrders.map((order) => (
                  <tr key={order.id} className="group hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors flex flex-col sm:table-row py-4 sm:py-0">
                    
                    {/* Customer & Gear */}
                    <td className="py-4 px-4 sm:px-0 flex flex-col justify-center">
                      <div className="font-bold text-slate-900 dark:text-white truncate max-w-50 lg:max-w-75">
                        {order.customer.fullName}
                      </div>
                      <div className="text-xs text-slate-500 truncate mt-0.5">
                        {order.gear.title}
                      </div>
                    </td>

                    {/* Date */}
                    <td className="py-2 sm:py-4 px-4 sm:px-0">
                      <div className="flex items-center text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
                        <Calendar className="mr-2 h-3.5 w-3.5 opacity-70" />
                        {new Date(order.startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} - {new Date(order.endDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-2 sm:py-4 px-4 sm:px-0">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider
                        ${order.status === 'PAID' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400' : 
                          order.status === 'RETURNED' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400' : 
                          'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400'}`}
                      >
                        {order.status}
                      </span>
                    </td>

                    {/* Amount */}
                    <td className="py-2 sm:py-4 px-4 sm:px-0 text-left sm:text-right font-bold text-slate-900 dark:text-white">
                      ${order.totalAmount}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-12 text-slate-500">
              No recent transactions found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}