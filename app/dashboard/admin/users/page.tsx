"use client";

import { useEffect, useState } from "react";
import { Users, Mail, Shield, CheckCircle2, XCircle, Trash2, Loader2, Search, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getAllAdminUsers, updateAdminUserStatus, deleteAdminUser } from "@/service/api";

interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await getAllAdminUsers();
      if (res.success) {
        setUsers(res.data);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to load users");
    } finally {
      setIsLoading(false);
    }
  };


  const handleToggleStatus = async (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
    try {
      setUpdatingId(userId);
      await updateAdminUserStatus(userId, newStatus);
      toast.success(`User status updated to ${newStatus}`);
      
      setUsers((prev) => 
        prev.map(user => user.id === userId ? { ...user, status: newStatus } : user)
      );
    } catch (error: any) {
      toast.error(error.message || "Failed to update user status");
    } finally {
      setUpdatingId(null);
    }
  };


  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;

    try {
      setUpdatingId(userId);
      await deleteAdminUser(userId);
      toast.success("User deleted successfully");
      
      setUsers((prev) => prev.filter(user => user.id !== userId));
    } catch (error: any) {
      toast.error(error.message || "Failed to delete user");
      setUpdatingId(null);
    }
  };

  //  Skeleton Loading
  const UserSkeleton = () => (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl gap-4 animate-pulse">
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-800"></div>
        <div className="space-y-2">
          <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded"></div>
          <div className="h-3 w-24 bg-slate-100 dark:bg-slate-900 rounded"></div>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="h-8 w-20 bg-slate-100 dark:bg-slate-900 rounded-full"></div>
        <div className="h-8 w-20 bg-slate-100 dark:bg-slate-900 rounded-full"></div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            Manage Users
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            View, update, suspend, or delete users across the platform.
          </p>
        </div>
        <div className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-xl text-sm font-semibold border border-slate-200 dark:border-slate-800">
          Total Users: {users.length}
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => <UserSkeleton key={i} />)}
        </div>
      ) : users.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 py-24">
          <Users className="h-12 w-12 text-slate-400 mb-4" />
          <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">No users found</h3>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden">
          {/* Desktop Table View / Mobile Card View Wrapper */}
          <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
            
            {/* Table Header (Hidden on Mobile) */}
            <div className="hidden sm:grid sm:grid-cols-12 gap-4 p-5 bg-slate-50/50 dark:bg-slate-900/20 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              <div className="col-span-4">User Details</div>
              <div className="col-span-2">Role</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2">Joined Date</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>

            {/* User List */}
            {users.map((user) => {
              const isActive = user.status === "ACTIVE";
              const isUpdating = updatingId === user.id;
              
              // Role Badge Colors
              const roleColor = 
                user.role === "ADMIN" ? "bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400" :
                user.role === "PROVIDER" ? "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400" :
                "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400";

              return (
                <div key={user.id} className="flex flex-col sm:grid sm:grid-cols-12 gap-4 p-5 hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors items-start sm:items-center">
                  
                  {/* User Details */}
                  <div className="col-span-4 flex items-center gap-3 w-full">
                    <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 shrink-0 border border-slate-200 dark:border-slate-700">
                      <UserInitials name={user.fullName} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">{user.fullName}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center truncate mt-0.5">
                        <Mail className="h-3 w-3 mr-1" /> {user.email}
                      </p>
                    </div>
                  </div>

                  {/* Role */}
                  <div className="col-span-2 flex items-center mt-2 sm:mt-0">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${roleColor} flex items-center`}>
                      <Shield className="mr-1 h-3 w-3" /> {user.role}
                    </span>
                  </div>

                  {/* Status */}
                  <div className="col-span-2 flex items-center mt-2 sm:mt-0">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center
                      ${isActive ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20' : 'text-red-600 bg-red-50 dark:bg-red-900/20'}`}>
                      <Activity className="mr-1.5 h-3.5 w-3.5" />
                      {user.status}
                    </span>
                  </div>

                  {/* Joined Date */}
                  <div className="col-span-2 text-xs text-slate-500 mt-2 sm:mt-0 hidden sm:block">
                    {new Date(user.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                  </div>

                  {/* Actions */}
                  <div className="col-span-2 flex items-center sm:justify-end gap-2 mt-4 sm:mt-0 w-full sm:w-auto border-t sm:border-0 pt-4 sm:pt-0 border-slate-100 dark:border-slate-800">
                    {/* Suspend/Activate Button */}
                    <Button 
                      onClick={() => handleToggleStatus(user.id, user.status)}
                      disabled={isUpdating || user.role === "ADMIN"} 
                      variant="outline"
                      size="sm"
                      className={`h-8 rounded-lg text-xs font-semibold w-full sm:w-auto
                        ${isActive 
                          ? "hover:bg-amber-50 hover:text-amber-600 hover:border-amber-200" 
                          : "hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200"}`}
                    >
                      {isUpdating ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : 
                       isActive ? <><XCircle className="mr-1.5 h-3.5 w-3.5" /> Suspend</> : 
                       <><CheckCircle2 className="mr-1.5 h-3.5 w-3.5" /> Activate</>}
                    </Button>

                    {/* Delete Button */}
                    <Button 
                      onClick={() => handleDeleteUser(user.id)}
                      disabled={isUpdating || user.role === "ADMIN"}
                      variant="destructive"
                      size="icon"
                      className="h-8 w-8 rounded-lg shrink-0 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border-none dark:bg-red-900/20 dark:text-red-400"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

//  Helper Component for User Avatar Initials
const UserInitials = ({ name }: { name: string }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return <span className="text-xs font-bold">{initials || "U"}</span>;
};