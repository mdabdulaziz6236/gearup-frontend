"use client";

import { useEffect, useState } from "react";
import { ShoppingCart, Calendar, DollarSign, User, Package, CreditCard } from "lucide-react";
import { toast } from "sonner";
import { getAllAdminRentals } from "@/service/api";

interface RentalOrder {
  id: string;
  startDate: string;
  endDate: string;
  totalAmount: string;
  status: string;
  createdAt: string;
  customer: {
    id: string;
    fullName: string;
    email: string;
  };
  gear: {
    id: string;
    title: string;
    dailyPrice: number;
  };
  payment: {
    id: string;
    status: string;
    transactionId: string;
    provider: string;
  } | null;
}

//  Skeleton Component
const RentalSkeleton = () => (
  <div className="flex flex-col lg:flex-row justify-between p-5 sm:p-6 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl gap-4 animate-pulse shadow-sm">
    <div className="flex gap-4 w-full lg:w-1/3">
      <div className="h-12 w-12 rounded-2xl bg-slate-200 dark:bg-slate-800 shrink-0"></div>
      <div className="space-y-2 w-full mt-1">
        <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-800 rounded"></div>
        <div className="h-3 w-1/2 bg-slate-100 dark:bg-slate-900 rounded"></div>
      </div>
    </div>
    <div className="space-y-2 w-full lg:w-1/4 mt-2 lg:mt-0">
      <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-800 rounded"></div>
      <div className="h-3 w-1/2 bg-slate-100 dark:bg-slate-900 rounded"></div>
    </div>
    <div className="h-8 w-24 bg-slate-200 dark:bg-slate-800 rounded-full mt-2 lg:mt-0"></div>
  </div>
);

export default function AdminRentalsPage() {
  const [rentals, setRentals] = useState<RentalOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRentals();
  }, []);

  const fetchRentals = async () => {
    try {
      const res = await getAllAdminRentals();
      if (res.success) {
        setRentals(res.data);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to load rental orders");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <ShoppingCart className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
            Platform Rentals
          </h1>
          <p className="text-sm text-slate-500 mt-1.5">
            Monitor and track all rental transactions across the platform.
          </p>
        </div>
        <div className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 px-5 py-2.5 rounded-2xl text-sm font-semibold border border-indigo-100 dark:border-indigo-900/50 flex items-center shadow-sm">
          Total Orders <span className="ml-2 bg-white dark:bg-indigo-950 px-2 py-0.5 rounded-md">{rentals.length}</span>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => <RentalSkeleton key={i} />)}
        </div>
      ) : rentals.length === 0 ? (
        <div className="text-center py-24 bg-white dark:bg-slate-950 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 shadow-sm">
          <ShoppingCart className="h-14 w-14 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300">No rentals found</h3>
          <p className="text-sm text-slate-500 mt-2">No orders have been placed on the platform yet.</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl shadow-sm overflow-hidden">
          <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
            
            {/* Desktop Table Header */}
            <div className="hidden lg:grid lg:grid-cols-12 gap-4 p-5 bg-slate-50/80 dark:bg-slate-900/40 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <div className="col-span-4">Gear & Timeline</div>
              <div className="col-span-3">Customer</div>
              <div className="col-span-3">Financials</div>
              <div className="col-span-2 text-right">Order Status</div>
            </div>

            {/* List Items */}
            {rentals.map((rental) => {
              //  Order Status Colors
              const orderStatusColor = 
                rental.status === 'PLACED' ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/50' : 
                rental.status === 'CONFIRMED' ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-900/50' : 
                rental.status === 'PAID' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/50' :
                rental.status === 'PICKED_UP' ? 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/30 dark:text-purple-400 dark:border-purple-900/50' :
                rental.status === 'RETURNED' ? 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/30 dark:text-indigo-400 dark:border-indigo-900/50' :
                'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-800';

              //  Payment Status
              const isPaid = rental.payment?.status === 'COMPLETED' || rental.payment?.status === 'PAID';
              const isPending = rental.payment?.status === 'PENDING';
              
              const paymentText = isPaid ? 'COMPLETED' : isPending ? 'PENDING' : 'UNPAID';
              const paymentColor = isPaid ? 'text-emerald-600 dark:text-emerald-400' : isPending ? 'text-amber-500' : 'text-slate-400 dark:text-slate-500';

              return (
                <div key={rental.id} className="group flex flex-col lg:grid lg:grid-cols-12 gap-y-4 lg:gap-4 p-5 sm:p-6 hover:bg-slate-50/50 dark:hover:bg-slate-900/30 items-start lg:items-center transition-all duration-200">
                  
                  {/* 1. Gear & Timeline (With Mobile Status Badge) */}
                  <div className="col-span-4 flex items-start justify-between w-full lg:w-auto">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900/30 flex items-center justify-center shrink-0 text-indigo-500 dark:text-indigo-400 group-hover:scale-105 transition-transform">
                        <Package className="h-6 w-6" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate" title={rental.gear.title}>
                          {rental.gear.title}
                        </h4>
                        <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
                          <Calendar className="h-3.5 w-3.5 opacity-70 text-indigo-500" />
                          {new Date(rental.startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} 
                          <span className="mx-0.5 text-slate-300 dark:text-slate-600">→</span> 
                          {new Date(rental.endDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </div>
                      </div>
                    </div>
                    {/* Mobile Only: Status Badge on Top Right */}
                    <div className="lg:hidden shrink-0 ml-2">
                      <span className={`px-2.5 py-1 rounded-xl text-[10px] font-bold uppercase tracking-wider border ${orderStatusColor} whitespace-nowrap`}>
                        {rental.status}
                      </span>
                    </div>
                  </div>

                  {/*  Mobile Wrapper for Customer & Financials to fix responsiveness */}
                  <div className="col-span-6 flex flex-col sm:flex-row lg:contents w-full gap-4 mt-2 lg:mt-0 border-t border-slate-100 dark:border-slate-800/50 pt-4 lg:border-0 lg:pt-0">
                    
                    {/* 2. Customer */}
                    <div className="col-span-3 flex-1 min-w-0">
                      <p className="font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center truncate">
                        <User className="h-3.5 w-3.5 mr-2 text-indigo-400 opacity-70" />
                        {rental.customer.fullName}
                      </p>
                      <p className="text-xs text-slate-500 ml-5.5 truncate mt-1">{rental.customer.email}</p>
                    </div>

                    {/* 3. Financials */}
                    <div className="col-span-3 flex-1 mt-1 sm:mt-0">
                      <p className="font-bold text-slate-900 dark:text-white flex items-center text-sm">
                        <DollarSign className="h-4 w-4 text-emerald-500 -mr-0.5" />
                        {rental.totalAmount}
                      </p>
                      <div className="flex items-center mt-1.5">
                        <div className={`flex items-center text-xs font-bold ${paymentColor}`}>
                          <CreditCard className="h-3.5 w-3.5 mr-1.5 opacity-80" />
                          {paymentText}
                        </div>
                      </div>
                    </div>
                    
                  </div>

                  {/* 4. Order Status (Desktop Only - Mobile version is above) */}
                  <div className="hidden lg:flex col-span-2 items-center justify-end w-full">
                    <span className={`px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider border ${orderStatusColor} whitespace-nowrap`}>
                      {rental.status}
                    </span>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}