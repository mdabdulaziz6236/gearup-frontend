"use client";

import { useEffect, useState, use, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, Package, CheckCircle2, CreditCard, Truck, RotateCcw, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getSingleRentalOrder, getSingleReview } from "@/service/api";

interface OrderTrackingPageProps {
  params: Promise<{ id: string }>;
}

const STATUS_STEPS = ["PLACED", "CONFIRMED", "PAID", "PICKED_UP", "RETURNED"];

export default function OrderTrackingPage({ params }: OrderTrackingPageProps) {
  const resolvedParams = use(params);
  const orderId = resolvedParams.id;

  const [order, setOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [hasReviewed, setHasReviewed] = useState(false);
  const [checkingReview, setCheckingReview] = useState(false);

  const fetchOrderDetails = useCallback(async () => {
    try {
      const res = await getSingleRentalOrder(orderId);
      
      if (res && res.data) {
        setOrder(res.data);
        
        checkExistingReview(res.data.gearId);
      }
    } catch (error) {
      toast.error("Failed to load order details");
    } finally {
      setIsLoading(false);
    }
  }, [orderId]);

  
  const checkExistingReview = async (gearId: string) => {
    try {
      setCheckingReview(true);
      const res = await getSingleReview(gearId);
      if(res.data.length !== 0){

          setHasReviewed(true);
      }
    } catch (error) {
      console.error("Error checking review status", error);
    } finally {
      setCheckingReview(false);
    }
  };
 

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
    }
  }, [fetchOrderDetails, orderId]);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  if (!order) return <div className="text-center py-10">Order not found</div>;

  const currentStepIndex = STATUS_STEPS.indexOf(order.status);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <Link href="/dashboard/customer/orders" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-emerald-600 mb-6 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders
        </Link>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Track Order Status</h1>
        <p className="text-slate-500 text-sm">Order ID: <span className="font-mono">{order.id}</span></p>
      </div>

      {/* Visual Tracking Stepper */}
      <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          
          {/* Progress Bar Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-slate-100 dark:bg-slate-800 -translate-y-1/2 z-0 rounded-full"></div>
          <div 
            className="hidden md:block absolute top-1/2 left-0 h-1 bg-emerald-500 -translate-y-1/2 z-0 rounded-full transition-all duration-500"
            style={{ width: `${(currentStepIndex / (STATUS_STEPS.length - 1)) * 100}%` }}
          ></div>

          {STATUS_STEPS.map((step, index) => {
            const isCompleted = index <= currentStepIndex;
            const isCurrent = index === currentStepIndex;

            const StepIcon = 
              step === "PLACED" ? Package :
              step === "CONFIRMED" ? CheckCircle2 :
              step === "PAID" ? CreditCard :
              step === "PICKED_UP" ? Truck : RotateCcw;

            return (
              <div key={step} className="relative z-10 flex md:flex-col items-center gap-4 md:gap-2 bg-white dark:bg-slate-950 px-2">
                <div className={`h-12 w-12 rounded-full flex items-center justify-center border-2 transition-colors ${
                  isCompleted 
                    ? "bg-emerald-500 border-emerald-500 text-white" 
                    : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-400"
                } ${isCurrent ? "ring-4 ring-emerald-100 dark:ring-emerald-900/30" : ""}`}>
                  <StepIcon className="h-5 w-5" />
                </div>
                <div className="text-left md:text-center">
                  <p className={`text-sm font-bold ${isCompleted ? "text-slate-900 dark:text-white" : "text-slate-400"}`}>
                    {step.replace("_", " ")}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Order Info & Review Button */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Gear Details</h3>
          <p className="font-bold text-lg">{order.gear.title}</p>
          <p className="text-slate-500 text-sm mb-4">Brand: {order.gear.brand}</p>
          <div className="flex justify-between text-sm py-2 border-t border-slate-200 dark:border-slate-700">
            <span className="text-slate-500">Rental Period:</span>
            <span className="font-medium">{new Date(order.startDate).toLocaleDateString()} - {new Date(order.endDate).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between text-sm py-2">
            <span className="text-slate-500">Total Amount:</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">${order.totalAmount}</span>
          </div>
        </div>

        {/*  Leave Review Section (Only shows if RETURNED) */}
        {order.status === "RETURNED" && (
          <div className="bg-emerald-50 dark:bg-emerald-900/10 p-6 rounded-2xl border border-emerald-200 dark:border-emerald-900/30 flex flex-col justify-center items-center text-center">
            <Star className={`h-10 w-10 mb-3 ${hasReviewed ? "text-emerald-500 fill-emerald-500" : "text-amber-400 fill-amber-400"}`} />
            
            {hasReviewed ? (
              <>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">Review Submitted</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                  Thank you for sharing your experience! You have already reviewed this gear.
                </p>
                <Button disabled className="w-full rounded-xl bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                  <CheckCircle2 className="mr-2 h-4 w-4" /> Reviewed
                </Button>
              </>
            ) : checkingReview ? (
               <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
            ) : (
              <>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">How was the gear?</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                  Your rental is complete! Please share your experience to help others.
                </p>
                <Link href={`/dashboard/customer/orders/${order.id}/review`} className="w-full">
                  <Button className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white">
                    Leave a Review
                  </Button>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}