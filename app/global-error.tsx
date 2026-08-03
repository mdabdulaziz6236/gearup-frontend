"use client"; // Global Error components must be Client Components

import { useEffect } from "react";
import { AlertOctagon, RefreshCcw } from "lucide-react";
import "@/app/globals.css"; 

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Critical Global Error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-slate-50 dark:bg-slate-950">
        <div className="min-h-screen flex items-center justify-center px-4 py-16">
          <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-10 text-center shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
            
            {/* Critical Error Icon */}
            <div className="mx-auto h-20 w-20 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-500 rounded-full flex items-center justify-center mb-6 border border-red-100 dark:border-red-900/50">
              <AlertOctagon className="h-10 w-10" />
            </div>

            {/* Error Message */}
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-3">
              Critical System Error
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
              We experienced a critical issue at the root level of the application. Please try reloading the page.
            </p>

            {/* Action Button */}
            <button 
              onClick={() => reset()} 
              className="w-full h-12 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all flex items-center justify-center gap-2"
            >
              <RefreshCcw className="h-4 w-4" /> Try to Recover
            </button>
            
          </div>
        </div>
      </body>
    </html>
  );
}