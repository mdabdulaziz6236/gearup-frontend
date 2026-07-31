"use client";

import Link from "next/link";
import { XCircle, RefreshCcw, Home, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 transition-colors duration-300">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 p-8 text-center">
        
        {/* Cancelled Icon */}
        <div className="flex justify-center mb-6">
          <div className="h-24 w-24 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
            <XCircle className="h-12 w-12 text-red-600 dark:text-red-400" />
          </div>
        </div>

        {/* Cancelled Message */}
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Payment Cancelled
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
          You have cancelled the payment process. Don't worry, <strong className="text-slate-700 dark:text-slate-300">no charges were made</strong> to your account. Your rental order is saved, and you can try paying again whenever you're ready.
        </p>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link href="/dashboard/customer/orders" className="block">
            <Button className="w-full h-12 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white dark:text-slate-900 text-white font-medium shadow-md transition-all">
              <RefreshCcw className="mr-2 h-4 w-4" />
              Try Payment Again
            </Button>
          </Link>
          
          <Link href="/gear" className="block">
            <Button variant="outline" className="w-full h-12 rounded-xl border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium transition-colors">
              <Home className="mr-2 h-4 w-4" />
              Browse More Gear
            </Button>
          </Link>
          
          <Link href="/dashboard" className="block pt-2">
            <Button variant="ghost" className="w-full h-10 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Return to Dashboard
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}