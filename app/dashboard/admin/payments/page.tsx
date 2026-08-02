"use client";

import { useEffect, useState } from "react";
import {
  CreditCard,
  DollarSign,
  Calendar,
  Hash,
  CheckCircle2,
  Clock,
  XCircle,
  Copy,
} from "lucide-react";
import { toast } from "sonner";
import { getAllAdminPayments } from "@/service/api";

interface Payment {
  id: string;
  rentalOrderId: string;
  transactionId: string;
  amount: string;
  provider: string;
  status: string;
  paidAt: string | null;
  createdAt: string;
}

const PaymentSkeleton = () => (
  <div className="flex flex-col lg:flex-row justify-between p-5 sm:p-6 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl gap-4 animate-pulse shadow-sm">
    <div className="flex gap-4 w-full lg:w-1/3">
      <div className="h-12 w-12 rounded-2xl bg-slate-200 dark:bg-slate-800 shrink-0"></div>
      <div className="space-y-2 w-full mt-1">
        <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-800 rounded"></div>
        <div className="h-3 w-1/2 bg-slate-100 dark:bg-slate-900 rounded"></div>
      </div>
    </div>
    <div className="space-y-2 w-full lg:w-1/4 mt-2 lg:mt-0">
      <div className="h-4 w-2/3 bg-slate-200 dark:bg-slate-800 rounded"></div>
      <div className="h-3 w-1/3 bg-slate-100 dark:bg-slate-900 rounded"></div>
    </div>
    <div className="h-8 w-24 bg-slate-200 dark:bg-slate-800 rounded-full mt-2 lg:mt-0"></div>
  </div>
);

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await getAllAdminPayments();
      if (res.success) {
        setPayments(res.data);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to load payment history");
    } finally {
      setIsLoading(false);
    }
  };


  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Transaction ID copied!");
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <CreditCard className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
            Payment History
          </h1>
          <p className="text-sm text-slate-500 mt-1.5">
            Monitor all transactions and revenue across the platform.
          </p>
        </div>
        <div className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 px-5 py-2.5 rounded-2xl text-sm font-semibold border border-indigo-100 dark:border-indigo-900/50 flex items-center shadow-sm">
          Total Transactions{" "}
          <span className="ml-2 bg-white dark:bg-indigo-950 px-2 py-0.5 rounded-md">
            {payments.length}
          </span>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <PaymentSkeleton key={i} />
          ))}
        </div>
      ) : payments.length === 0 ? (
        <div className="text-center py-24 bg-white dark:bg-slate-950 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 shadow-sm">
          <CreditCard className="h-14 w-14 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300">
            No payments found
          </h3>
          <p className="text-sm text-slate-500 mt-2">
            No transactions have been recorded yet.
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl shadow-sm overflow-hidden">
          <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {/* Desktop Table Header */}
            <div className="hidden lg:grid lg:grid-cols-12 gap-4 p-5 bg-slate-50/80 dark:bg-slate-900/40 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <div className="col-span-5">Transaction Details</div>
              <div className="col-span-3">Amount</div>
              <div className="col-span-2">Date</div>
              <div className="col-span-2 text-right">Status</div>
            </div>

            {/* List Items */}
            {payments.map((payment) => {
              const isCompleted = payment.status === "COMPLETED";
              const isPending = payment.status === "PENDING";

              const statusColor = isCompleted
                ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/50"
                : isPending
                  ? "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/50"
                  : "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-900/50";

              return (
                <div
                  key={payment.id}
                  className="group flex flex-col lg:grid lg:grid-cols-12 gap-y-4 lg:gap-4 p-5 sm:p-6 hover:bg-slate-50/50 dark:hover:bg-slate-900/30 items-start lg:items-center transition-all duration-200"
                >
                  {/* 1. Transaction Details */}
                  <div className="col-span-5 flex items-start justify-between w-full lg:w-auto min-w-0">
                    <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0 pr-2">
                      <div
                        className={`h-12 w-12 rounded-2xl border flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform ${
                          isCompleted
                            ? "bg-emerald-50 border-emerald-100 text-emerald-500 dark:bg-emerald-950/50 dark:border-emerald-900/30 dark:text-emerald-400"
                            : isPending
                              ? "bg-amber-50 border-amber-100 text-amber-500 dark:bg-amber-950/50 dark:border-amber-900/30 dark:text-amber-400"
                              : "bg-red-50 border-red-100 text-red-500 dark:bg-red-950/50 dark:border-red-900/30 dark:text-red-400"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="h-6 w-6" />
                        ) : isPending ? (
                          <Clock className="h-6 w-6" />
                        ) : (
                          <XCircle className="h-6 w-6" />
                        )}
                      </div>

                      {/*  Transaction ID Truncate Section */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 text-sm text-slate-900 dark:text-white">
                          <Hash className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                          <h4
                            className="font-bold truncate"
                            title={payment.transactionId || "N/A"}
                          >
                            {payment.transactionId || "N/A"}
                          </h4>
                          {payment.transactionId && (
                            <button
                              onClick={() => handleCopy(payment.transactionId)}
                              className="shrink-0 p-1 rounded-md text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
                              title="Copy ID"
                            >
                              <Copy className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs font-medium">
                          <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded uppercase">
                            {payment.provider}
                          </span>
                          <span
                            className="text-slate-500 dark:text-slate-400 truncate max-w-30 sm:max-w-50"
                            title={payment.rentalOrderId}
                          >
                            Order: {payment.rentalOrderId.substring(0, 8)}...
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Mobile Only: Status Badge */}
                    <div className="lg:hidden shrink-0 ml-2">
                      <span
                        className={`px-2.5 py-1 rounded-xl text-[10px] font-bold uppercase tracking-wider border ${statusColor} whitespace-nowrap`}
                      >
                        {payment.status}
                      </span>
                    </div>
                  </div>

                  {/* 2 & 3. Amount & Date Container */}
                  <div className="col-span-5 flex flex-col sm:flex-row lg:contents w-full gap-4 mt-2 lg:mt-0 border-t border-slate-100 dark:border-slate-800/50 pt-4 lg:border-0 lg:pt-0">
                    {/* Amount */}
                    <div className="col-span-3 flex-1 min-w-0">
                      <p className="font-bold text-lg text-slate-900 dark:text-white flex items-center">
                        <DollarSign className="h-5 w-5 text-emerald-500 -mr-0.5 shrink-0" />
                        {payment.amount}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Total Amount
                      </p>
                    </div>

                    {/* Date */}
                    <div className="col-span-2 flex-1 mt-1 sm:mt-0">
                      <p className="font-semibold text-slate-800 dark:text-slate-200 flex items-center text-sm">
                        <Calendar className="h-3.5 w-3.5 mr-1.5 text-indigo-400 opacity-70 shrink-0" />
                        {new Date(payment.createdAt).toLocaleDateString(
                          undefined,
                          { year: "numeric", month: "short", day: "numeric" },
                        )}
                      </p>
                      <p className="text-xs text-slate-500 mt-1 ml-5">
                        {new Date(payment.createdAt).toLocaleTimeString(
                          undefined,
                          { hour: "2-digit", minute: "2-digit" },
                        )}
                      </p>
                    </div>
                  </div>

                  {/* 4. Payment Status (Desktop Only) */}
                  <div className="hidden lg:flex col-span-2 items-center justify-end w-full">
                    <span
                      className={`px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider border ${statusColor} whitespace-nowrap`}
                    >
                      {payment.status}
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
