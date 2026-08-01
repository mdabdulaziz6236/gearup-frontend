"use client";

import { useEffect, useState, use, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Star, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getSingleRentalOrder, submitReview } from "@/service/api";

interface ReviewPageProps {
  params: Promise<{ id: string }>;
}

export default function ReviewPage({ params }: ReviewPageProps) {
  const resolvedParams = use(params);
  const orderId = resolvedParams.id;
  
  const router = useRouter();

  const [order, setOrder] = useState<any>(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const fetchOrderDetails = useCallback(async () => {
    try {
      const res = await getSingleRentalOrder(orderId);
      
      if (res && res.data) {
        setOrder(res.data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load order details");
    } finally {
      setIsLoading(false);
    }
  }, [orderId]); 

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
    }
  }, [fetchOrderDetails, orderId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast.error("Please select a star rating");
      return;
    }
    if (!comment.trim()) {
      toast.error("Please write a short comment");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const payload = {
        gearId: order.gearId, 
        rating: rating,      
        comment: comment     
      };
      
      await submitReview(payload);
      
      toast.success("Review submitted successfully! Thank you.");
      router.push("/dashboard/customer/reviews");
      
    } catch (error: any) {
      toast.error(error.message || "Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  if (!order) return <div className="text-center py-10 text-slate-500">Order not found</div>;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link href={`/dashboard/customer/orders/${order.id}`} className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-emerald-600 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Tracking
      </Link>
      
      <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Leave a Review</h1>
        <p className="text-slate-500 text-sm mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          How was your experience using the <strong className="text-slate-700 dark:text-slate-300">{order.gear?.title}</strong>?
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Interactive Star Rating */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
              Overall Rating <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  <Star 
                    className={`h-10 w-10 transition-colors ${
                      star <= (hoverRating || rating)
                        ? "text-amber-400 fill-amber-400"
                        : "text-slate-200 dark:text-slate-700"
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-2">
              {rating === 1 && "Poor"}
              {rating === 2 && "Fair"}
              {rating === 3 && "Good"}
              {rating === 4 && "Very Good"}
              {rating === 5 && "Excellent"}
            </p>
          </div>

          {/* Comment Box */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Written Review <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell others what you liked or disliked about this gear..."
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none transition-all"
            ></textarea>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base transition-all"
          >
            {isSubmitting ? (
              <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Submitting...</>
            ) : (
              <><Send className="mr-2 h-5 w-5" /> Submit Review</>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}