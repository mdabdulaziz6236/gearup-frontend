"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Package, Tag, DollarSign, Eye, Trash2, Shield, User, Loader2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getAllAdminGears, deleteAdminGear } from "@/service/api";

interface Gear {
  id: string;
  title: string;
  brand: string;
  dailyPrice: number;
  stockQuantity: number;
  isAvailable: boolean;
  category: { name: string };
  provider: { id: string; fullName: string; email: string };
}

export default function AdminGearsPage() {
  const [gears, setGears] = useState<Gear[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchGears();
  }, []);

  const fetchGears = async () => {
    try {
      const res = await getAllAdminGears();
      if (res.success) setGears(res.data);
    } catch (error: any) {
      toast.error(error.message || "Failed to load gears");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this gear?")) return;
    try {
      setDeletingId(id);
      await deleteAdminGear(id);
      toast.success("Gear deleted successfully");
      setGears(prev => prev.filter(g => g.id !== id));
    } catch (error: any) {
      toast.error(error.message || "Failed to delete gear");
    } finally {
      setDeletingId(null);
    }
  };

  const GearSkeleton = () => (
    <div className="flex flex-col sm:flex-row justify-between p-5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl gap-4 animate-pulse">
      <div className="flex gap-4">
        <div className="h-12 w-12 rounded-xl bg-slate-200 dark:bg-slate-800"></div>
        <div className="space-y-2">
          <div className="h-4 w-40 bg-slate-200 dark:bg-slate-800 rounded"></div>
          <div className="h-3 w-24 bg-slate-100 dark:bg-slate-900 rounded"></div>
        </div>
      </div>
      <div className="h-8 w-24 bg-slate-100 dark:bg-slate-900 rounded-full"></div>
    </div>
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <Package className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            Gear Inventory
          </h1>
          <p className="text-sm text-slate-500 mt-1">Manage all rental items listed by providers.</p>
        </div>
        <div className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 px-4 py-2 rounded-xl text-sm font-semibold border border-indigo-100 dark:border-indigo-900/50">
          Total Gears: {gears.length}
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => <GearSkeleton key={i} />)}
        </div>
      ) : gears.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
          <Package className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold">No gears found</h3>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden">
          <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
            
            {/* Desktop Table Header */}
            <div className="hidden sm:grid sm:grid-cols-12 gap-4 p-5 bg-slate-50/50 dark:bg-slate-900/20 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <div className="col-span-4">Gear Info</div>
              <div className="col-span-3">Provider</div>
              <div className="col-span-2">Price & Stock</div>
              <div className="col-span-3 text-right">Actions</div>
            </div>

            {/* List */}
            {gears.map((gear) => (
              <div key={gear.id} className="flex flex-col sm:grid sm:grid-cols-12 gap-4 p-5 hover:bg-slate-50 dark:hover:bg-slate-900/30 items-start sm:items-center transition-colors">
                
                {/* Gear Info */}
                <div className="col-span-4 flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-500 border border-indigo-100 dark:border-indigo-800 shrink-0">
                    <Package className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">{gear.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-slate-500 flex items-center"><Tag className="h-3 w-3 mr-1" />{gear.brand}</span>
                      <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-600 dark:text-slate-300">{gear.category?.name || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                {/* Provider Info */}
                <div className="col-span-3 flex items-center mt-2 sm:mt-0">
                  <div>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center">
                      <User className="h-3.5 w-3.5 mr-1.5 text-slate-400" /> {gear.provider.fullName}
                    </p>
                    <p className="text-xs text-slate-500 ml-5 truncate w-32 md:w-48">{gear.provider.email}</p>
                  </div>
                </div>

                {/* Price & Stock */}
                <div className="col-span-2 flex flex-col mt-2 sm:mt-0">
                  <span className="font-bold text-slate-900 dark:text-white flex items-center">
                    <DollarSign className="h-4 w-4 text-emerald-500" />{gear.dailyPrice}/day
                  </span>
                  <span className={`text-xs mt-1 ${gear.stockQuantity > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                    {gear.stockQuantity} in stock
                  </span>
                </div>

                {/* Actions */}
                <div className="col-span-3 flex items-center sm:justify-end gap-2 w-full sm:w-auto mt-4 sm:mt-0 pt-4 sm:pt-0 border-t border-slate-100 dark:border-slate-800 sm:border-0">
                  <Link href={`/dashboard/admin/gears/${gear.id}`} className="flex-1 sm:flex-none">
                    <Button variant="outline" size="sm" className="w-full h-9 rounded-xl text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 border-indigo-200">
                      <Eye className="h-4 w-4 mr-2" /> View
                    </Button>
                  </Link>
                  <Button 
                    variant="destructive" size="icon" 
                    onClick={() => handleDelete(gear.id)}
                    disabled={deletingId === gear.id}
                    className="h-9 w-9 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border-none shrink-0"
                  >
                    {deletingId === gear.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                  </Button>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}