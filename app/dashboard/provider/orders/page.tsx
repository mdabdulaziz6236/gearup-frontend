"use client";

import { useEffect, useState } from "react";
import { ClipboardList, Calendar, DollarSign, CheckCircle2, Package, Loader2, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getProviderOrders, updateOrderStatus } from "@/service/api";

interface Order {
  id: string;
  gearId: string;
  startDate: string;
  endDate: string;
  totalAmount: string; 
  status: string;
  gear: {
    title: string;
    brand: string;
    dailyPrice: number;
  };
  payment?: {
    id: string;
    status: string; 
    provider: string;
  };
}

export default function ProviderOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await getProviderOrders();
      if (res.success) {
        setOrders(res.data);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to load incoming orders");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      setUpdatingId(orderId);
      await updateOrderStatus(orderId, newStatus);
      toast.success(`Order status updated to ${newStatus}`);
      
      setOrders((prev) =>
        prev.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order))
      );
    } catch (error: any) {
      toast.error(error.message || "Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const OrderSkeleton = () => (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl gap-6 animate-pulse shadow-sm">
      <div className="space-y-3 w-full md:w-1/3">
        <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded-md w-3/4"></div>
        <div className="h-4 bg-slate-100 dark:bg-slate-900 rounded-md w-1/2"></div>
      </div>
      <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-full w-24"></div>
      <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl w-32"></div>
    </div>
  );

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Incoming Orders</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Review rental requests, track schedules, and update statuses.</p>
        </div>
        <div className="bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900/50 px-4 py-2 rounded-2xl text-xs font-semibold text-emerald-700 dark:text-emerald-400">
          Total Requests: {orders.length}
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <OrderSkeleton key={i} />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 py-24">
          <ClipboardList className="h-12 w-12 text-slate-400 mb-4" />
          <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">No incoming orders</h3>
          <p className="text-sm text-slate-500 mt-1">You don't have any rental requests right now.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => {
            const status = order.status;
            
            const statusStyles = 
              status === 'PLACED' ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/50' : 
              status === 'CONFIRMED' ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-900/50' : 
              status === 'PAID' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/50' :
              status === 'PICKED_UP' ? 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/30 dark:text-purple-400 dark:border-purple-900/50' :
              'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-800';

            return (
              <div 
                key={order.id} 
                className="group relative bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                  
                  {/* Left: Gear & Order info */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className="h-12 w-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-900/30 flex items-center justify-center shrink-0 text-emerald-600 dark:text-emerald-400">
                      <Package className="h-6 w-6" />
                    </div>
                    
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="font-bold text-base text-slate-900 dark:text-white">
                          {order.gear?.title || "Rental Gear"}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${statusStyles}`}>
                          {status}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1">
                        <span className="flex items-center bg-slate-50 dark:bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-100 dark:border-slate-800">
                          <Calendar className="mr-1.5 h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                          {new Date(order.startDate).toLocaleDateString()} → {new Date(order.endDate).toLocaleDateString()}
                        </span>
                        
                        <span className="flex items-center font-bold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-100 dark:border-slate-800">
                          <DollarSign className="h-3.5 w-3.5 -mr-0.5 text-emerald-600" />
                          {order.totalAmount}
                        </span>
                      </div>

                      {/* Payment Status */}
                      {order.payment && (
                        <div className="flex items-center text-xs text-slate-600 dark:text-slate-400 pt-0.5">
                          <CreditCard className="mr-1.5 h-3.5 w-3.5 text-slate-400" />
                          Payment: 
                          <span className={`font-bold ml-1 ${order.payment.status === 'PENDING' ? 'text-amber-500' : 'text-emerald-500'}`}>
                            {order.payment.status}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-3 w-full lg:w-auto justify-end border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-100 dark:border-slate-900">
                    {status === "PLACED" && (
                      <Button 
                        onClick={() => handleStatusChange(order.id, "CONFIRMED")}
                        disabled={updatingId === order.id}
                        className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white h-11 px-5 text-xs font-bold shadow-sm transition-all"
                      >
                        {updatingId === order.id ? <Loader2 className="h-4 w-4 animate-spin" /> : "Confirm Order"}
                      </Button>
                    )}

                    {status === "CONFIRMED" && (
                      <Button 
                        onClick={() => handleStatusChange(order.id, "PICKED_UP")}
                        disabled={updatingId === order.id}
                        className="rounded-xl bg-purple-600 hover:bg-purple-700 text-white h-11 px-5 text-xs font-bold shadow-sm transition-all"
                      >
                        {updatingId === order.id ? <Loader2 className="h-4 w-4 animate-spin" /> : "Mark Picked Up"}
                      </Button>
                    )}

                    {status === "PICKED_UP" && (
                      <Button 
                        onClick={() => handleStatusChange(order.id, "RETURNED")}
                        disabled={updatingId === order.id}
                        className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white h-11 px-5 text-xs font-bold shadow-sm transition-all"
                      >
                        {updatingId === order.id ? <Loader2 className="h-4 w-4 animate-spin" /> : "Mark Returned"}
                      </Button>
                    )}

                    {status === "RETURNED" && (
                      <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900/50 px-4 py-2.5 rounded-xl flex items-center">
                        <CheckCircle2 className="mr-2 h-4 w-4 text-emerald-600" /> Completed
                      </div>
                    )}
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}