"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { CheckCircle2, XCircle, Home, LayoutDashboard, Loader2, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { confirmPayment } from "@/service/api";
import { toast } from "sonner";

interface PaymentSuccessPageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default function PaymentSuccessPage({ searchParams }: PaymentSuccessPageProps) {
  const resolvedParams = use(searchParams);
  const transactionId = resolvedParams.transactionId;

  const [status, setStatus] = useState<"PENDING" | "COMPLETED" | "FAILED">("PENDING");
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false); 

  useEffect(() => {
    if (transactionId) {
      verifyTransaction(transactionId);
    } else {
      setStatus("FAILED");
      setLoading(false);
    }
  }, [transactionId]);

  const verifyTransaction = async (id: string) => {
    try {
      const response = await confirmPayment({ transactionId: id });
      
      if (response.success) {
        setStatus("COMPLETED");
      } else {
        setStatus("FAILED");
      }
    } catch (error) {
      console.error("Verification error:", error);
      setStatus("FAILED");
    } finally {
      setLoading(false);
    }
  };


  const handleCopy = async () => {
    if (transactionId) {
      try {
        await navigator.clipboard.writeText(transactionId);
        setCopied(true);
        toast.success("Transaction ID copied to clipboard!");
        
        
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        toast.error("Failed to copy!");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="h-12 w-12 animate-spin text-emerald-600 mb-4" />
        <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300">Verifying your payment...</h2>
        <p className="text-slate-500 text-sm mt-2">Please do not close this window.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 transition-colors duration-300">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 p-8 text-center">
        
        {/* Dynamic Icon based on Status */}
        <div className="flex justify-center mb-6">
          {status === "COMPLETED" ? (
            <div className="h-24 w-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-12 w-12 text-emerald-600 dark:text-emerald-400" />
            </div>
          ) : (
            <div className="h-24 w-24 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
              <XCircle className="h-12 w-12 text-red-600 dark:text-red-400" />
            </div>
          )}
        </div>

        {/* Status Message */}
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          {status === "COMPLETED" ? "Payment Successful!" : "Payment Failed"}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          {status === "COMPLETED" 
            ? "Thank you for your order. Your rental payment has been processed successfully and verified." 
            : "We couldn't verify your payment. If money was deducted, please contact support."}
        </p>

        {/*  Transaction Details Box */}
        {transactionId && (
          <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 mb-8 text-left relative group">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Transaction ID
            </p>
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-mono font-medium text-slate-900 dark:text-white break-all">
                {transactionId}
              </p>
              
              {/* Copy Button */}
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleCopy}
                className="h-8 w-8 shrink-0 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors"
                title="Copy Transaction ID"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-emerald-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link href="/dashboard/customer/orders" className="block">
            <Button className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Go to My Rentals
            </Button>
          </Link>
          
          <Link href="/gear" className="block">
            <Button variant="outline" className="w-full h-12 rounded-xl border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium">
              <Home className="mr-2 h-4 w-4" />
              Browse More Gear
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}