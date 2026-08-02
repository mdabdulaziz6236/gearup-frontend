"use client";

import { useState, useEffect, FormEvent } from "react";
import { User, Lock, Save, Loader2, Mail, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { changeUserPassword, updateUserProfile } from "@/service/api";
import { getMe } from "@/service/getMe";

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(true);
  
  // Profile State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  // Password State
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const res = await getMe();
      if (res.success && res.data) {
        setFullName(res.data.fullName);
        setEmail(res.data.email);
      }
    } catch (error: any) {
      toast.error("Failed to load user data");
    } finally {
      setIsLoading(false);
    }
  };

  //  Profile Update Handler
  const handleProfileUpdate = async (e: FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return toast.error("Full Name cannot be empty");

    try {
      setIsUpdatingProfile(true);
      const res = await updateUserProfile({ fullName });
      if (res.success) {
        toast.success("Profile updated successfully!");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  //  Password Change Handler
  const handlePasswordChange = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!oldPassword || !newPassword || !confirmPassword) {
      return toast.error("Please fill in all password fields");
    }
    if (newPassword !== confirmPassword) {
      return toast.error("New passwords do not match!");
    }
    if (newPassword.length < 6) {
      return toast.error("Password must be at least 6 characters long");
    }

    try {
      setIsChangingPassword(true);
      const res = await changeUserPassword({ oldPassword, newPassword });
      if (res.success) {
        toast.success("Password changed successfully!");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to change password");
    } finally {
      setIsChangingPassword(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 rounded animate-pulse mb-6"></div>
        <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-3xl animate-pulse"></div>
        <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-3xl animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-10">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Settings</h1>
        <p className="text-sm text-slate-500 mt-1">Manage your account settings and preferences.</p>
      </div>

      {/*  1. Profile Information Section */}
      <section className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/20">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center">
            <User className="mr-2 h-5 w-5 text-indigo-500" /> General Information
          </h2>
          <p className="text-sm text-slate-500 mt-1">Update your basic profile details here.</p>
        </div>
        
        <div className="p-6 sm:p-8">
          <form onSubmit={handleProfileUpdate} className="space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Full Name (Editable) */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Full Name</label>
                <input 
                  type="text" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
                />
              </div>

              {/* Email (Read-Only) */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  Email Address
                  <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-0.5 rounded uppercase font-bold tracking-wider">Cannot Edit</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input 
                    type="email" 
                    value={email}
                    disabled
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button type="submit" disabled={isUpdatingProfile} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-6 h-11">
                {isUpdatingProfile ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </section>


      {/*  2. Security & Password Section */}
      <section className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/20">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center">
            <Lock className="mr-2 h-5 w-5 text-emerald-500" /> Security
          </h2>
          <p className="text-sm text-slate-500 mt-1">Ensure your account is using a long, random password to stay secure.</p>
        </div>
        
        <div className="p-6 sm:p-8">
          <form onSubmit={handlePasswordChange} className="space-y-6">
            
            <div className="space-y-2 max-w-md">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Current Password</label>
              <input 
                type="password" 
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">New Password</label>
                <input 
                  type="password" 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Confirm New Password</label>
                <input 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full h-11 px-4 rounded-xl border bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-shadow ${
                    confirmPassword && newPassword !== confirmPassword 
                      ? 'border-red-400 focus:ring-red-500' 
                      : 'border-slate-200 dark:border-slate-700 focus:ring-emerald-500'
                  }`}
                />
                {confirmPassword && newPassword !== confirmPassword && (
                  <p className="text-xs text-red-500 mt-1 flex items-center">
                    <ShieldAlert className="h-3 w-3 mr-1" /> Passwords do not match
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button type="submit" disabled={isChangingPassword} className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-6 h-11">
                {isChangingPassword ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lock className="mr-2 h-4 w-4" />}
                Update Password
              </Button>
            </div>
          </form>
        </div>
      </section>

    </div>
  );
}