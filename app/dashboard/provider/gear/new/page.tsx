"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Save, PackagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { toast } from "sonner";
import { createGear } from "@/service/api";

export default function AddNewGearPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    brand: "",
    categoryName: "",
    dailyPrice: "",
    stockQuantity: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.categoryName || !formData.dailyPrice || !formData.stockQuantity) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        title: formData.title,
        brand: formData.brand,
        categoryName: formData.categoryName,
        dailyPrice: parseFloat(formData.dailyPrice),
        stockQuantity: parseInt(formData.stockQuantity, 10),
        description: formData.description,
      };

      await createGear(payload);
      
      toast.success("Gear added successfully!");
      router.refresh(); 
    setFormData({
  title: "",
  brand: "",
  categoryName: "",
  dailyPrice: "",
  stockQuantity: "",
  description: "",
});
      
    } catch (error: any) {
      toast.error(error.message || "Something went wrong while adding the gear.");
    } finally {
      setIsLoading(false);
    }
  };

  //  Shadcn-like Input Classes 
  const inputClassName = "flex h-11 w-full rounded-xl border border-slate-200 bg-transparent px-3 py-2 text-sm text-slate-900 dark:text-white transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950";
  const labelClassName = "text-sm font-semibold leading-none text-slate-700 dark:text-slate-300 mb-2 block";

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <Link href="/dashboard/provider/gear" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-emerald-600 mb-6 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to My Gears
        </Link>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <PackagePlus className="h-5 w-5" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Add New Gear</h1>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 ml-13">
          Fill in the details below to list your equipment for rental.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Row 1: Title & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="title" className={labelClassName}>
                Gear Title <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Sony Alpha a7 III Camera"
                className={inputClassName}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="categoryName" className={labelClassName}>
                Category Name <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                id="categoryName"
                name="categoryName"
                value={formData.categoryName}
                onChange={handleChange}
                placeholder="e.g. Cameras, Lenses, Audio"
                className={inputClassName}
                required
              />
            </div>
          </div>

          {/* Row 2: Brand, Price, Stock */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="brand" className={labelClassName}>Brand</Label>
              <Input
                type="text"
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="e.g. Sony, Canon"
                className={inputClassName}
              />
            </div>

            <div>
              <Label htmlFor="dailyPrice" className={labelClassName}>
                Daily Price ($) <span className="text-red-500">*</span>
              </Label>
              <Input
                type="number"
                id="dailyPrice"
                name="dailyPrice"
                min="0"
                step="0.01"
                value={formData.dailyPrice}
                onChange={handleChange}
                placeholder="45.00"
                className={inputClassName}
                required
              />
            </div>

            <div>
              <Label htmlFor="stockQuantity" className={labelClassName}>
                Stock Quantity <span className="text-red-500">*</span>
              </Label>
              <Input
                type="number"
                id="stockQuantity"
                name="stockQuantity"
                min="1"
                value={formData.stockQuantity}
                onChange={handleChange}
                placeholder="3"
                className={inputClassName}
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className={labelClassName}>Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Describe your gear's features, condition, and what's included in the rental..."
              className="flex w-full rounded-xl border border-slate-200 bg-transparent px-3 py-3 text-sm text-slate-900 dark:text-white transition-colors placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-slate-800 dark:bg-slate-950 resize-none"
            />
          </div>

          <hr className="border-slate-100 dark:border-slate-800" />

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Link href="/dashboard/provider/gear">
              <Button type="button" variant="ghost" className="h-11 rounded-xl text-slate-600 dark:text-slate-400">
                Cancel
              </Button>
            </Link>
            
            <Button 
              type="submit" 
              disabled={isLoading}
              className="h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white min-w-[150px] transition-all"
            >
              {isLoading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</>
              ) : (
                <><Save className="mr-2 h-4 w-4" /> Save Gear</>
              )}
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
}