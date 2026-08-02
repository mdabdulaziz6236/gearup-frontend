"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  DollarSign, Package, ShoppingCart, Activity, ArrowUpRight, 
  Calendar, CreditCard, Search, Compass, CheckCircle2, Clock, XCircle 
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { getCustomerDashboardStats } from "@/service/api"; 

interface RecentRental {
  id: string;
  startDate: string;
  endDate: string;
  totalAmount: string;
  status: string;
  gear: {
    title: string;
    brand: string;
  };
  payment: {
    status: string;
    amount: string;
  } | null;
}

interface DashboardData {
  totalRentals: number;
  activeRentals: number;
  totalSpent: string;
  recentRentals: RecentRental[];
}

export default function CustomerDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await getCustomerDashboardStats();
      if (res.success) {
        setData(res.data);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to load dashboard data");
    } finally {
      setIsLoading(false);
    }
  };

  //  Stats Card Skeleton
  const StatsSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {[1, 2, 3].map((i) => (
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">My Dashboard</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Welcome back! Here is an overview of your rental activities.
          </p>
        </div>
        <Link href="/gear">
          <Button className="rounded-full bg-indigo-600 hover:bg-indigo-700 text-white px-6">
            <Search className="h-4 w-4 mr-2" /> Find New Gear
          </Button>
        </Link>
      </div>

      {/*  Top Summary Cards (3 Columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Total Spent Card */}
        <div className="bg-linear-to-br from-emerald-500 to-emerald-700 rounded-3xl p-6 text-white shadow-md relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 bg-white/10 h-24 w-24 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="font-medium text-emerald-100 text-sm">Total Spent</p>
              <h3 className="text-3xl font-bold mt-1 tracking-tight">${data.totalSpent}</h3>
            </div>
            <div className="bg-white/20 p-2.5 rounded-xl">
              <DollarSign className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>

        {/* Active Rentals Card */}
        <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm group hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium text-slate-500 dark:text-slate-400 text-sm">Active Rentals</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{data.activeRentals}</h3>
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/20 p-2.5 rounded-xl border border-amber-100 dark:border-amber-900/50 group-hover:bg-amber-100 dark:group-hover:bg-amber-900/40 transition-colors">
              <Activity className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
        </div>

        {/* Total Rentals Card */}
        <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm group hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium text-slate-500 dark:text-slate-400 text-sm">Total Orders</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{data.totalRentals}</h3>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-2.5 rounded-xl border border-blue-100 dark:border-blue-900/50 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors">
              <ShoppingCart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
      </div>

      {/*  Recent Rentals Section */}
      <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden">
        
        {/* Section Header */}
        <div className="flex justify-between items-center p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/20">
          <div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Recent Rentals</h3>
            <p className="text-xs text-slate-500 mt-1">Your most recent gear bookings.</p>
          </div>
          <Link href="/dashboard/customer/orders" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center transition-colors">
            View All <ArrowUpRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        {/* Table/List */}
        <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {data.recentRentals && data.recentRentals.length > 0 ? (
            data.recentRentals.map((rental) => {
              
              // 🟢 Status Badge Colors
              const orderStatusColor = 
                rental.status === 'PLACED' ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400' : 
                rental.status === 'CONFIRMED' ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400' : 
                rental.status === 'PAID' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400' :
                rental.status === 'PICKED_UP' ? 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/30 dark:text-purple-400' :
                rental.status === 'RETURNED' ? 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/30 dark:text-indigo-400' :
                'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-900 dark:text-slate-300';

              //  Payment Details
              const isPaid = rental.payment?.status === 'COMPLETED' || rental.payment?.status === 'PAID';
              const isPending = rental.payment?.status === 'PENDING';

              return (
                <div key={rental.id} className="flex flex-col sm:grid sm:grid-cols-12 gap-4 p-5 sm:p-6 hover:bg-slate-50 dark:hover:bg-slate-900/30 items-start sm:items-center transition-colors">
                  
                  {/* Gear Info */}
                  <div className="col-span-5 flex items-start gap-3 sm:gap-4 w-full">
                    <div className="h-12 w-12 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0 text-slate-500">
                      <Package className="h-6 w-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate" title={rental.gear.title}>
                        {rental.gear.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                        <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">{rental.gear.brand}</span>
                      </div>
                    </div>
                  </div>

                  {/* Rental Dates */}
                  <div className="col-span-3 flex items-center text-xs text-slate-600 dark:text-slate-400 mt-2 sm:mt-0 font-medium w-full">
                    <Calendar className="h-4 w-4 mr-2 opacity-70 text-indigo-500 shrink-0" />
                    <span className="truncate">
                      {new Date(rental.startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} 
                      {" - "} 
                      {new Date(rental.endDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </span>
                  </div>

                  {/* Payment & Amount */}
                  <div className="col-span-2 flex flex-col mt-2 sm:mt-0 w-full">
                    <span className="font-bold text-slate-900 dark:text-white flex items-center">
                      <DollarSign className="h-4 w-4 text-emerald-500 -mr-0.5" />
                      {rental.totalAmount}
                    </span>
                    <span className={`text-[10px] font-bold uppercase mt-1 flex items-center ${isPaid ? 'text-emerald-600' : isPending ? 'text-amber-500' : 'text-slate-400'}`}>
                      {isPaid ? <CheckCircle2 className="h-3 w-3 mr-1" /> : isPending ? <Clock className="h-3 w-3 mr-1" /> : <XCircle className="h-3 w-3 mr-1" />}
                      {rental.payment?.status || 'UNPAID'}
                    </span>
                  </div>

                  {/* Order Status */}
                  <div className="col-span-2 flex items-center sm:justify-end mt-3 sm:mt-0 w-full sm:w-auto">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${orderStatusColor} whitespace-nowrap`}>
                      {rental.status}
                    </span>
                  </div>

                </div>
              );
            })
          ) : (
            <div className="text-center py-16">
              <Compass className="h-12 w-12 text-slate-300 mx-auto mb-3" />
              <h3 className="font-medium text-slate-900 dark:text-white">No rentals yet</h3>
              <p className="text-sm text-slate-500 mt-1">You haven't rented any gear yet.</p>
              <Link href="/gear">
                <Button variant="outline" className="mt-4 rounded-full">Browse Gears</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}