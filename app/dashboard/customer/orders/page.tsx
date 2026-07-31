"use client";

import { useEffect, useState } from "react";
import { Package, Calendar, CreditCard, Loader2, ArrowRight, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getMyRentals, initiatePayment } from "@/service/api";

interface RentalOrder {
  id: string;
  gearId: string;
  startDate: string;
  endDate: string;
  totalAmount: string;
  status: string;
  gear: {
    id: string;
    title: string;
    brand: string;
    dailyPrice: number;
  };
  payment: {
    id: string;
    status: string;
    transactionId: string;
  } | null;
}

export default function CustomerOrdersPage() {
  const [orders, setOrders] = useState<RentalOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      
      const res = await getMyRentals();
      setOrders(res.data);
    } catch (error) {
      toast.error("Failed to load rental orders");
    } finally {
      setIsLoading(false);
    }
  };


  const handlePayment = async (rentalOrderId: string) => {
    try {
      setPaymentLoading(rentalOrderId);

      const payload = { rentalOrderId };
      const response = await initiatePayment(payload);


      toast.success("Redirecting to payment gateway...");
      

      if (response?.data?.paymentUrl) {
        window.location.href = response.data.paymentUrl;
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to initiate payment");
    } finally {
      setPaymentLoading(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">My Rentals</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">View and manage your rented equipment.</p>
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 py-20">
          <Package className="h-10 w-10 text-slate-400 mb-4" />
          <h3 className="text-lg font-semibold">No rentals found</h3>
          <p className="text-sm text-slate-500">You haven't rented any gear yet.</p>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {orders.map((order) => {
            const needsPayment = !order.payment || order.payment.status === "PENDING";
            
            return (
              <div 
                key={order.id} 
                className="flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                {/* Header: Title & Status */}
                <div className="flex justify-between items-start mb-4 gap-4">
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white line-clamp-1" title={order.gear.title}>
                      {order.gear.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{order.gear.brand}</p>
                  </div>
                  <div className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider whitespace-nowrap
                    ${order.status === 'PLACED' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400' : 
                      order.status === 'CONFIRMED' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400' : 
                      'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'}`}
                  >
                    {order.status}
                  </div>
                </div>

                <hr className="border-slate-100 dark:border-slate-800 mb-4" />

                {/* Body: Details */}
                <div className="space-y-3 flex-1 mb-6">
                  <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                    <Calendar className="mr-3 h-4 w-4 text-slate-400" />
                    <span className="flex-1">
                      {new Date(order.startDate).toLocaleDateString()} <ArrowRight className="inline h-3 w-3 mx-1" /> {new Date(order.endDate).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-slate-600 dark:text-slate-400">
                      <CreditCard className="mr-3 h-4 w-4 text-slate-400" />
                      Total Amount
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white">${order.totalAmount}</span>
                  </div>

                  {/* Payment Status Indicator */}
                  <div className="flex items-center gap-2 mt-2">
                    {!needsPayment ? (
                      <span className="inline-flex items-center text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-md">
                        <CheckCircle2 className="mr-1.5 h-3 w-3" /> Paid Successfully
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-xs font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 px-2 py-1 rounded-md">
                        <Clock className="mr-1.5 h-3 w-3" /> Payment Pending
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer: Action Button */}
                {needsPayment && (
                  <Button 
                    onClick={() => handlePayment(order.id)}
                    disabled={paymentLoading === order.id}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl h-11"
                  >
                    {paymentLoading === order.id ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</>
                    ) : (
                      <><CreditCard className="mr-2 h-4 w-4" /> Pay Now</>
                    )}
                  </Button>
                )}
                
                {/* Optional: Show view details if already paid */}
                {!needsPayment && (
                  <Button variant="outline" className="w-full rounded-xl h-11 border-slate-200 dark:border-slate-800">
                    View Receipt
                  </Button>
                )}

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}