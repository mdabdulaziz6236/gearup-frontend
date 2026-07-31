"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, ShieldCheck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createRental } from "@/service/api";

interface RentActionProps {
  gearId: string;
  dailyPrice: number;
  isAvailable: boolean;
  stockQuantity: number;
}

export default function RentAction({
  gearId,
  dailyPrice,
  isAvailable,
  stockQuantity,
}: RentActionProps) {
  const router = useRouter();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const calculateTotal = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? diffDays * dailyPrice : dailyPrice;
  };

  const totalAmount = calculateTotal();

  const handleRentNow = async () => {
    if (!startDate || !endDate) {
      toast.error("Please select both start and end dates.");
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      toast.error("End date cannot be earlier than start date.");
      return;
    }

    setIsLoading(true);

    const payload = {
      gearId,
      startDate,
      endDate,
    };
    try {
      const user = await createRental(payload);
      if (user.success) {
        toast.success("Rental Created Successfully.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const isButtonDisabled = !isAvailable || stockQuantity === 0 || isLoading;

  return (
    <div className="mt-auto bg-slate-100 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-800">
      {/* Date Pickers */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
            Start Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="date"
              value={startDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full h-12 pl-10 pr-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            />
          </div>
        </div>

        <div className="flex-1">
          <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
            End Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="date"
              value={endDate}
              min={startDate || new Date().toISOString().split("T")[0]}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full h-12 pl-10 pr-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* Price Summary */}
      {totalAmount > 0 && (
        <div className="flex justify-between items-center mb-6 py-3 border-t border-slate-200 dark:border-slate-700">
          <span className="text-slate-600 dark:text-slate-400 font-medium">
            Total Cost
          </span>
          <span className="text-xl font-bold text-slate-900 dark:text-white">
            ${totalAmount}
          </span>
        </div>
      )}

      {/* Action Button */}
      <Button
        size="lg"
        onClick={handleRentNow}
        className="w-full h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg shadow-lg shadow-emerald-600/20 transition-all"
        disabled={isButtonDisabled}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing...
          </>
        ) : (
          "Rent Now"
        )}
      </Button>

      <div className="flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-4">
        <ShieldCheck className="h-4 w-4" /> Secure payment & verified providers
      </div>
    </div>
  );
}
