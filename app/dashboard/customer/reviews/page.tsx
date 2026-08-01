"use client";

import { useEffect, useState } from "react";
import { Star, MessageSquare, Calendar, Loader2, Package } from "lucide-react";
import { toast } from "sonner";
import { getMyReviews } from "@/service/api";

interface Review {
  id: string;
  customerId: string;
  gearId: string;
  rentalOrderId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export default function CustomerReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      
      const res = await getMyReviews();
      if (res.success) {
        setReviews(res.data);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to load reviews");
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
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">My Reviews</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">View all the reviews you have shared for your past rentals.</p>
      </div>

      {reviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 py-24">
          <MessageSquare className="h-12 w-12 text-slate-400 mb-4" />
          <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">No reviews yet</h3>
          <p className="text-sm text-slate-500 mt-1">You haven't left any reviews for your rented gears.</p>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <div 
              key={review.id} 
              className="flex flex-col bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Header: Rating & Date */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className={`h-4 w-4 ${
                        star <= review.rating 
                          ? "text-amber-400 fill-amber-400" 
                          : "text-slate-200 dark:text-slate-800"
                      }`} 
                    />
                  ))}
                </div>
                <div className="flex items-center text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 px-2.5 py-1 rounded-full">
                  <Calendar className="mr-1.5 h-3 w-3" />
                  {new Date(review.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                  })}
                </div>
              </div>

              {/* Body: Comment */}
              <div className="flex-1 mb-4">
                <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                  "{review.comment}"
                </p>
              </div>

              <hr className="border-slate-100 dark:border-slate-800 mb-4" />

              {/* Footer: Details (Since gear title is not populated, showing IDs) */}
              <div className="flex flex-col gap-1.5 mt-auto text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center">
                  <Package className="mr-2 h-3.5 w-3.5 text-slate-400" />
                  <span className="truncate">Gear ID: <span className="font-mono">{review.gearId}</span></span>
                </div>
                <div className="flex items-center">
                  <span className="w-3.5 mr-2"></span> 
                  <span className="truncate">Order ID: <span className="font-mono">{review.rentalOrderId}</span></span>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}