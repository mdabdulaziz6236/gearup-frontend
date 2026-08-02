"use client";

import { useEffect, useState } from "react";
import { User, Mail, Key, ShieldCheck, Hash } from "lucide-react";
import { toast } from "sonner";
import { getMe } from "@/service/getMe";


interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  role: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await getMe();
      if (res.success) {
        setProfile(res.data);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to load profile data");
    } finally {
      setIsLoading(false);
    }
  };

  //  Role Badge Color Logic
  const getRoleBadge = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400 border-indigo-200";
      case "PROVIDER":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 border-emerald-200";
      case "CUSTOMER":
      default:
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400 border-blue-200";
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 rounded animate-pulse mb-2"></div>
        <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-3xl animate-pulse"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-20 bg-white dark:bg-slate-950 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800">
        <User className="h-12 w-12 text-slate-300 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300">Profile not found</h3>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">My Profile</h1>
        <p className="text-sm text-slate-500 mt-1">View your personal information and account details.</p>
      </div>

      <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden">
        
        {/*  Cover Photo Banner */}
        <div className="h-32 sm:h-40 bg-linear-to-r from-indigo-500 via-purple-500 to-emerald-500 relative">
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 bg-white/10" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.2) 1px, transparent 0)", backgroundSize: "20px 20px" }}></div>
        </div>

        <div className="px-6 sm:px-10 pb-10">
          
          {/*  Profile Header Info (Avatar overlapping banner) */}
          <div className="flex flex-col  sm:flex-row items-center sm:items-end gap-5 -mt-4 sm:-mt-6 mb-8 w-full">
            
            {/* Avatar Initials (Removed Camera Icon) */}
            <div className="relative group">
              <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-full bg-white dark:bg-slate-900 border-4 border-white dark:border-slate-950 shadow-md flex items-center justify-center text-4xl sm:text-5xl font-black text-slate-700 dark:text-slate-300 z-10 relative overflow-hidden">
                <div className="absolute inset-0 bg-slate-100 dark:bg-slate-800"></div>
                <span className="relative z-10">{profile.fullName.charAt(0).toUpperCase()}</span>
              </div>
            </div>

            {/* Name & Role */}
            <div className="text-center sm:text-left mb-2 w-full flex-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white capitalize">{profile.fullName}</h2>
              <div className="flex items-center justify-center sm:justify-start gap-3 mt-2">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border flex items-center ${getRoleBadge(profile.role)}`}>
                  <ShieldCheck className="h-3.5 w-3.5 mr-1.5" />
                  {profile.role}
                </span>
              </div>
            </div>
          </div>

          <hr className="border-slate-100 dark:border-slate-800/80 mb-8" />

          {/*  Account Information Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Left Column: Personal Details */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Personal Information</h3>
              
              <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-start gap-4">
                <div className="h-10 w-10 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-500 shrink-0 shadow-sm">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-0.5">Full Name</p>
                  <p className="font-medium text-slate-900 dark:text-white capitalize">{profile.fullName}</p>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-start gap-4">
                <div className="h-10 w-10 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-500 shrink-0 shadow-sm">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-0.5">Email Address</p>
                  <p className="font-medium text-slate-900 dark:text-white">{profile.email}</p>
                </div>
              </div>
            </div>

            {/* Right Column: Security & System Details */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Account Details</h3>
              
              <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-start gap-4">
                <div className="h-10 w-10 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-500 shrink-0 shadow-sm">
                  <Hash className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-0.5">Account ID</p>
                  <p className="font-mono text-sm text-slate-900 dark:text-white truncate" title={profile.id}>{profile.id}</p>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-start gap-4">
                <div className="h-10 w-10 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-500 shrink-0 shadow-sm">
                  <Key className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-0.5">Password</p>
                  <p className="font-medium text-slate-900 dark:text-white text-lg leading-none tracking-widest mt-1">••••••••</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}