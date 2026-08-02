"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { ArrowLeft, Package, DollarSign, Tag, CheckCircle2, XCircle, User, Mail, Calendar, Info } from "lucide-react";
import { getAdminGearById } from "@/service/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface GearDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default function AdminGearDetailsPage({ params }: GearDetailsPageProps) {
  const resolvedParams = use(params);
  const gearId = resolvedParams.id;

  const [gear, setGear] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchGearDetails();
  }, [gearId]);

  const fetchGearDetails = async () => {
    try {
      const res = await getAdminGearById(gearId);
      if (res.success) setGear(res.data);
    } catch (error: any) {
      toast.error(error.message || "Failed to load gear details");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!gear) return <div className="text-center py-20 text-slate-500">Gear not found</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Back Button & Header */}
      <div>
        <Link href="/dashboard/admin/gears" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 mb-6 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Inventory
        </Link>
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <Package className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{gear.title}</h1>
            <p className="text-sm text-slate-500 flex items-center gap-2 mt-1">
              Gear ID: <span className="font-mono text-xs bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">{gear.id}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        
        {/* Main Details Card (Spans 2 columns) */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <Info className="mr-2 h-5 w-5 text-indigo-500" /> General Information
            </h3>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm text-slate-500 mb-1">Brand</p>
                <p className="font-semibold text-slate-900 dark:text-white flex items-center">
                  <Tag className="mr-2 h-4 w-4 text-slate-400" /> {gear.brand || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Category</p>
                <p className="font-semibold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-900 inline-flex px-3 py-1 rounded-lg text-sm">
                  {gear.category?.name || "Uncategorized"}
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm text-slate-500 mb-2">Description</p>
              <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl text-sm text-slate-700 dark:text-slate-300 leading-relaxed border border-slate-100 dark:border-slate-800 whitespace-pre-wrap">
                {gear.description || "No description provided."}
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400 flex items-center">
              <Calendar className="mr-2 h-3.5 w-3.5" /> Created on: {new Date(gear.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Side Cards (Pricing & Provider) */}
        <div className="space-y-6">
          
          {/* Pricing & Stock Status */}
          <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Pricing & Status</h3>
            
            <div className="flex items-end gap-1 mb-6">
              <DollarSign className="h-6 w-6 text-emerald-500 mb-1" />
              <span className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">{gear.dailyPrice}</span>
              <span className="text-sm text-slate-500 mb-1.5 ml-1">/ day</span>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-sm text-slate-500">Available Stock</span>
                <span className="font-bold text-slate-900 dark:text-white">{gear.stockQuantity} units</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-slate-500">Status</span>
                {gear.isAvailable && gear.stockQuantity > 0 ? (
                  <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
                    <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" /> ACTIVE
                  </span>
                ) : (
                  <span className="flex items-center text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-lg">
                    <XCircle className="mr-1.5 h-3.5 w-3.5" /> OUT OF STOCK
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Provider Details */}
          <div className="bg-linear-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 border border-indigo-100 dark:border-indigo-900/30 rounded-3xl p-6 shadow-sm">
            <h3 className="font-bold text-indigo-900 dark:text-indigo-300 mb-4 flex items-center">
              <User className="mr-2 h-4 w-4" /> Provider Info
            </h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-xs text-indigo-400/80 uppercase tracking-wider font-semibold mb-1">Full Name</p>
                <p className="font-bold text-slate-800 dark:text-slate-200">{gear.provider?.fullName}</p>
              </div>
              <div>
                <p className="text-xs text-indigo-400/80 uppercase tracking-wider font-semibold mb-1">Contact Email</p>
                <p className="text-sm text-slate-700 dark:text-slate-300 flex items-center">
                  <Mail className="h-3.5 w-3.5 mr-2 text-indigo-500" /> {gear.provider?.email}
                </p>
              </div>
              <div className="pt-2">
                <Link href={`/dashboard/admin/users`}>
                  <Button variant="outline" size="sm" className="w-full text-indigo-600 border-indigo-200 hover:bg-indigo-100">
                    Manage Provider
                  </Button>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}