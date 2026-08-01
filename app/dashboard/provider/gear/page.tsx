"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Package, Edit, Trash2, Tag, DollarSign, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getProviderGears } from "@/service/api";

interface Gear {
  id: string;
  title: string;
  brand: string;
  dailyPrice: number;
  stockQuantity: number;
  isAvailable: boolean;
  categoryId: string;
}

export default function ProviderMyGearsPage() {
  const [gears, setGears] = useState<Gear[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchGears();
  }, []);

  const fetchGears = async () => {
    try {
      const res = await getProviderGears();
      if (res.success) {
        setGears(res.data);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to load your gears");
    } finally {
      setIsLoading(false);
    }
  };


  const GearSkeleton = () => (
    <div className="flex flex-col rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-5 shadow-sm animate-pulse">
      {/* Image Placeholder Skeleton */}
      <div className="h-40 w-full bg-slate-100 dark:bg-slate-900 rounded-2xl mb-4"></div>
      
      {/* Title & Brand Skeleton */}
      <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded-md w-3/4 mb-2"></div>
      <div className="h-4 bg-slate-100 dark:bg-slate-900 rounded-md w-1/2 mb-6"></div>
      
      {/* Price & Stock Skeleton */}
      <div className="flex justify-between items-center mb-6">
        <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-md w-1/4"></div>
        <div className="h-5 bg-slate-100 dark:bg-slate-900 rounded-full w-1/4"></div>
      </div>
      
      <hr className="border-slate-100 dark:border-slate-800 mb-4" />
      
      {/* Buttons Skeleton */}
      <div className="flex gap-3 mt-auto">
        <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl w-full"></div>
        <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl w-12 shrink-0"></div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">My Gears</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Manage your rental equipment inventory.</p>
        </div>
        <Link href="/dashboard/provider/gear/new">
          <Button className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-md">
            <Plus className="mr-2 h-4 w-4" /> Add New Gear
          </Button>
        </Link>
      </div>

      {/* Main Content */}
      {isLoading ? (

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <GearSkeleton key={i} />
          ))}
        </div>
      ) : gears.length === 0 ? (

        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 py-24">
          <Package className="h-12 w-12 text-slate-400 mb-4" />
          <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">No gear found</h3>
          <p className="text-sm text-slate-500 mt-1 mb-6">You haven't added any gear to rent out yet.</p>
          <Link href="/dashboard/provider/gear/new">
            <Button className="rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white">
              <Plus className="mr-2 h-4 w-4" /> Add Your First Gear
            </Button>
          </Link>
        </div>
      ) : (

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {gears.map((gear) => (
            <div 
              key={gear.id} 
              className="flex flex-col rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-5 shadow-sm transition-all hover:shadow-md group"
            >
              {/* Image Placeholder */}
              <div className="h-40 w-full bg-slate-50 dark:bg-slate-900/50 rounded-2xl mb-4 flex items-center justify-center border border-slate-100 dark:border-slate-800 group-hover:bg-slate-100 dark:group-hover:bg-slate-800 transition-colors">
                <ImageIcon className="h-10 w-10 text-slate-300 dark:text-slate-700" />
              </div>

              {/* Title & Info */}
              <div className="flex-1">
                <div className="flex justify-between items-start gap-2 mb-1">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white line-clamp-1" title={gear.title}>
                    {gear.title}
                  </h3>
                </div>
                <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-4">
                  <Tag className="mr-1.5 h-3.5 w-3.5" /> {gear.brand}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-emerald-600 dark:text-emerald-400 font-bold text-xl">
                    <DollarSign className="h-5 w-5 -mr-1" />
                    {gear.dailyPrice}
                    <span className="text-xs font-normal text-slate-500 ml-1">/ day</span>
                  </div>
                  
                  {/* Status Badge */}
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold
                    ${gear.isAvailable && gear.stockQuantity > 0 
                      ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' 
                      : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}
                  >
                    {gear.isAvailable && gear.stockQuantity > 0 ? `${gear.stockQuantity} in stock` : 'Out of stock'}
                  </span>
                </div>
              </div>

              <hr className="border-slate-100 dark:border-slate-800 mb-4" />

              {/* Action Buttons */}
              <div className="flex gap-3 mt-auto">
                <Link href={`/dashboard/provider/gear/edit/${gear.id}`} className="flex-1">
                  <Button variant="outline" className="w-full rounded-xl border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900">
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </Button>
                </Link>
                <Button 
                  variant="destructive" 
                  size="icon" 
                  className="rounded-xl w-11 shrink-0 bg-red-50 hover:bg-red-100 text-red-600 border-none dark:bg-red-900/20 dark:hover:bg-red-900/40 dark:text-red-400"
                  onClick={() => toast.error("Delete functionality will be added soon")}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}