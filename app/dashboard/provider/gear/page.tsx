"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Package, Edit, Trash2, Tag, DollarSign, Image as ImageIcon, Loader2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription, 
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { getProviderGears } from "@/service/api";
import { deleteProviderGear, updateProviderGear } from "@/service/api"; 

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
  
  
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingGear, setEditingGear] = useState<Gear | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [gearToDelete, setGearToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

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

    const handleOpenEdit = (gear: Gear) => {
    setEditingGear({ ...gear });
    setIsEditDialogOpen(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setEditingGear((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [name]: type === "checkbox" ? checked : type === "number" ? Number(value) : value,
      };
    });
  };


  const handleOpenDelete = (gearId: string) => {
    setGearToDelete(gearId);
    setIsDeleteDialogOpen(true);
  };


  const confirmDelete = async () => {
    if (!gearToDelete) return;

    setIsDeleting(true);
    try {
   
      const res = await deleteProviderGear(gearToDelete);
      
      if (res.success) { 
        toast.success(res.message || "Gear deleted successfully!");
        setGears((prevGears) => prevGears.filter((gear) => gear.id !== gearToDelete));
        setIsDeleteDialogOpen(false);
      } else {
        toast.error(res.message || "Failed to delete gear");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsDeleting(false);
      setGearToDelete(null);
    }
  };



  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGear) return;

    setIsUpdating(true);
    try {
      const { id, ...payload } = editingGear; 
      const res = await updateProviderGear(id, payload);

      if (res.success) {
        toast.success(res.message || "Gear updated successfully!");
        setGears((prevGears) => 
          prevGears.map((gear) => (gear.id === editingGear.id ? editingGear : gear))
        );
        setIsEditDialogOpen(false);
      } else {
        toast.error(res.message || "Failed to update gear");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };



  const GearSkeleton = () => (
    <div className="flex flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm animate-pulse">
      <div className="h-40 w-full bg-slate-100 rounded-2xl mb-4"></div>
      <div className="h-5 bg-slate-200 rounded-md w-3/4 mb-2"></div>
      <div className="h-4 bg-slate-100 rounded-md w-1/2 mb-6"></div>
      <hr className="border-slate-100 mb-4" />
      <div className="flex gap-3 mt-auto">
        <div className="h-10 bg-slate-200 rounded-xl w-full"></div>
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
          {[1, 2, 3, 4, 5, 6].map((i) => <GearSkeleton key={i} />)}
        </div>
      ) : gears.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 py-24">
          <Package className="h-12 w-12 text-slate-400 mb-4" />
          <h3 className="text-lg font-semibold">No gear found</h3>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {gears.map((gear) => (
            <div key={gear.id} className="flex flex-col rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-5 shadow-sm hover:shadow-md group">
              <div className="h-40 w-full bg-slate-50 dark:bg-slate-900/50 rounded-2xl mb-4 flex items-center justify-center border border-slate-100 dark:border-slate-800">
                <ImageIcon className="h-10 w-10 text-slate-300" />
              </div>

              <div className="flex-1">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white line-clamp-1">{gear.title}</h3>
                <div className="flex items-center text-sm text-slate-500 mb-4">
                  <Tag className="mr-1.5 h-3.5 w-3.5" /> {gear.brand}
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-emerald-600 font-bold text-xl">
                    <DollarSign className="h-5 w-5 -mr-1" />{gear.dailyPrice}
                    <span className="text-xs font-normal text-slate-500 ml-1">/ day</span>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${gear.stockQuantity > 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                    {gear.stockQuantity > 0 ? `${gear.stockQuantity} in stock` : 'Out of stock'}
                  </span>
                </div>
              </div>

              <hr className="border-slate-100 dark:border-slate-800 mb-4" />

              <div className="flex gap-3 mt-auto">
                {/* Edit Button */}
                <Button 
                  onClick={() => handleOpenEdit(gear)}
                  variant="outline" 
                  className="flex-1 rounded-xl border-slate-200 dark:border-slate-700"
                >
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </Button>
                
                {/*  Delete Trigger Button */}
                <Button 
                  variant="destructive" 
                  size="icon" 
                  onClick={() => handleOpenDelete(gear.id)}
                  className="rounded-xl w-11 shrink-0 bg-red-50 hover:bg-red-100 text-red-600 border-none dark:bg-red-900/20 dark:hover:bg-red-900/40 dark:text-red-400"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/*  Edit Gear Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-106.25 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Edit Gear</DialogTitle>
          </DialogHeader>
          
          {editingGear && (
            <form onSubmit={handleUpdate} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="title">Gear Title</Label>
                <Input id="title" name="title" value={editingGear.title} onChange={handleEditChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="brand">Brand</Label>
                <Input id="brand" name="brand" value={editingGear.brand} onChange={handleEditChange} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dailyPrice">Daily Price ($)</Label>
                  <Input id="dailyPrice" name="dailyPrice" type="number" value={editingGear.dailyPrice} onChange={handleEditChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stockQuantity">Stock Quantity</Label>
                  <Input id="stockQuantity" name="stockQuantity" type="number" value={editingGear.stockQuantity} onChange={handleEditChange} required />
                </div>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <input type="checkbox" id="isAvailable" name="isAvailable" checked={editingGear.isAvailable} onChange={handleEditChange} className="h-4 w-4 text-emerald-600 rounded border-slate-300"/>
                <Label htmlFor="isAvailable" className="cursor-pointer">Is Available for Rent</Label>
              </div>

              <DialogFooter className="mt-6">
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)} className="rounded-xl">Cancel</Button>
                <Button type="submit" disabled={isUpdating} className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white">
                  {isUpdating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : "Save Changes"}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-100 rounded-2xl">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <DialogTitle className="text-xl font-bold text-slate-900 dark:text-white">Delete Gear?</DialogTitle>
            </div>
            <DialogDescription className="text-slate-500 dark:text-slate-400">
              Are you sure you want to delete this gear? This action cannot be undone and will remove it from the store immediately.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter className="mt-6 flex gap-3 sm:gap-0">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)} 
              disabled={isDeleting}
              className="rounded-xl w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button 
              type="button" 
              variant="destructive" 
              onClick={confirmDelete} 
              disabled={isDeleting} 
              className="rounded-xl bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto"
            >
              {isDeleting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Deleting...</> : "Yes, Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}