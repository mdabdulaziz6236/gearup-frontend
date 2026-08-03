"use client";

import { useEffect, useState } from "react";
import { Star, Quote, Camera } from "lucide-react";
import Marquee from "react-fast-marquee";
import { getAllReviews } from "@/service/api";

interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  customer: {
    fullName: string;
  };
  gear: {
    title: string;
    brand: string;
  };
}

export default function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const cardColors = [
    "bg-blue-50/60 hover:bg-blue-100/60 border-blue-100 dark:bg-blue-950/20 dark:hover:bg-blue-900/30 dark:border-blue-900/50",
    "bg-emerald-50/60 hover:bg-emerald-100/60 border-emerald-100 dark:bg-emerald-950/20 dark:hover:bg-emerald-900/30 dark:border-emerald-900/50",
    "bg-amber-50/60 hover:bg-amber-100/60 border-amber-100 dark:bg-amber-950/20 dark:hover:bg-amber-900/30 dark:border-amber-900/50",
    "bg-rose-50/60 hover:bg-rose-100/60 border-rose-100 dark:bg-rose-950/20 dark:hover:bg-rose-900/30 dark:border-rose-900/50",
    "bg-purple-50/60 hover:bg-purple-100/60 border-purple-100 dark:bg-purple-950/20 dark:hover:bg-purple-900/30 dark:border-purple-900/50",
  ];

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await getAllReviews();
      if (res.success && res.data) {
        setReviews(res.data.slice(0, 8));
      }
    } catch (error: any) {
      console.error("Failed to load reviews", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-slate-50 dark:bg-slate-950/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 space-y-4">
            <div className="h-8 w-64 bg-slate-200 dark:bg-slate-800 rounded-lg mx-auto animate-pulse"></div>
            <div className="h-4 w-72 sm:w-96 bg-slate-100 dark:bg-slate-900 rounded mx-auto animate-pulse"></div>
          </div>
          <div className="flex gap-6 overflow-hidden">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 h-70 w-70 shrink-0 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (reviews.length === 0) return null;

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            What Our Creators Say
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-3 max-w-2xl mx-auto">
            Real feedback from photographers and filmmakers who trust our platform for their creative needs.
          </p>
        </div>

        {/*  React Fast Marquee */}
        <div className="overflow-hidden py-4">
          <Marquee 
            pauseOnHover={true} 
            speed={40} 
            gradient={false}
            autoFill={true}
          >
            {reviews.map((review, index) => {

              const activeColor = cardColors[index % cardColors.length];

              return (
                <div 
                  key={review.id} 
                  className={`w-70 h-70 mr-6 border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 relative flex flex-col shrink-0 ${activeColor}`}
                >
                  <Quote className="absolute top-4 right-4 h-8 w-8 text-slate-900/5 dark:text-white/5 -rotate-12 z-0" />
                  
                  <div className="relative z-10 flex-1">
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-3.5 w-3.5 ${
                            i < review.rating ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-300 dark:fill-slate-800 dark:text-slate-700"
                          }`} 
                        />
                      ))}
                    </div>

                    <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-5 whitespace-pre-line italic line-clamp-3">
                      "{review.comment}"
                    </p>
                  </div>

                  <div className="relative z-10 mt-auto">
                    {/* Inner Tag */}
                    <div className="bg-white/60 dark:bg-slate-950/40 rounded-xl p-2.5 mb-3 flex items-start gap-2.5 border border-white/40 dark:border-slate-800/50">
                      <div className="h-7 w-7 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center shrink-0 shadow-sm">
                        <Camera className="h-3.5 w-3.5 text-slate-600 dark:text-slate-400" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Rented Gear</p>
                        <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate" title={review.gear.title}>
                          {review.gear.title}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-3 border-t border-slate-900/5 dark:border-white/5">
                      <div className="h-9 w-9 rounded-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
                        {review.customer.fullName.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white capitalize truncate">
                          {review.customer.fullName}
                        </h4>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                          {formatDate(review.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Marquee>
        </div>

      </div>
    </section>
  );
}