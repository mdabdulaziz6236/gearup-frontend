"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CreditCard, Loader2, ArrowRight, FileText, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getMyPayments } from "@/service/api";

interface Payment {
  id: string;
  transactionId: string;
  amount: string;
  provider: string;
  status: string;
  paidAt: string | null;
  rentalOrder: {
    gear: {
      title: string;
    };
  };
}

export default function PaymentHistoryPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {    
      const res = await getMyPayments();
      setPayments(res.data);
    } catch (error) {
      toast.error("Failed to load payment history");
    } finally {
      setIsLoading(false);
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
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Payment History</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">View all your transactions and receipts.</p>
      </div>

      {payments.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 py-20">
          <CreditCard className="h-10 w-10 text-slate-400 mb-4" />
          <h3 className="text-lg font-semibold">No payments found</h3>
          <p className="text-sm text-slate-500">You haven't made any payments yet.</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 font-medium border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-6 py-4">Transaction ID</th>
                  <th className="px-6 py-4">Item</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {payments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-slate-500 dark:text-slate-400">
                      {payment.transactionId.substring(0, 15)}...
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                      {payment.rentalOrder.gear.title}
                    </td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                      {payment.paidAt ? new Date(payment.paidAt).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">
                      ${payment.amount}
                    </td>
                    <td className="px-6 py-4">
                      {payment.status === "COMPLETED" ? (
                        <span className="inline-flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 dark:text-emerald-400 px-2 py-1 rounded-md">
                          <CheckCircle2 className="mr-1 h-3 w-3" /> Completed
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-xs font-medium text-amber-600 bg-amber-50 dark:bg-amber-900/30 dark:text-amber-400 px-2 py-1 rounded-md">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/dashboard/customer/payments/${payment.id}`}>
                        <Button variant="outline" size="sm" className="rounded-lg border-slate-200 dark:border-slate-800">
                          <FileText className="mr-2 h-4 w-4" /> Receipt
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}