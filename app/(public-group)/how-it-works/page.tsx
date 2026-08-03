"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Search, Calendar, Camera, RefreshCcw, 
  UploadCloud, CheckCircle2, Package, DollarSign, 
  ShieldCheck, ArrowRight, PlayCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HowItWorksPage() {
  const [activeTab, setActiveTab] = useState<"renter" | "provider">("renter");

  const renterSteps = [
    {
      icon: Search,
      title: "1. Find Your Gear",
      desc: "Browse our extensive catalog of cameras, lenses, and production equipment. Filter by location, dates, and brand.",
      color: "text-blue-500",
      bg: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-blue-200 dark:border-blue-900/50"
    },
    {
      icon: Calendar,
      title: "2. Book & Pay Securely",
      desc: "Select your rental dates and complete the payment. Your money is held securely until the rental is successfully completed.",
      color: "text-emerald-500",
      bg: "bg-emerald-50 dark:bg-emerald-900/20",
      borderColor: "border-emerald-200 dark:border-emerald-900/50"
    },
    {
      icon: Camera,
      title: "3. Pick Up & Shoot",
      desc: "Meet the provider to pick up the gear. Inspect the equipment, shoot your project, and create amazing content.",
      color: "text-purple-500",
      bg: "bg-purple-50 dark:bg-purple-900/20",
      borderColor: "border-purple-200 dark:border-purple-900/50"
    },
    {
      icon: RefreshCcw,
      title: "4. Return the Gear",
      desc: "Return the gear to the provider in the same condition. Once confirmed, your security deposit (if any) is released.",
      color: "text-indigo-500",
      bg: "bg-indigo-50 dark:bg-indigo-900/20",
      borderColor: "border-indigo-200 dark:border-indigo-900/50"
    }
  ];

  const providerSteps = [
    {
      icon: UploadCloud,
      title: "1. List Your Gear",
      desc: "Upload photos, set your daily price, and write a clear description of your equipment. It's completely free to list.",
      color: "text-blue-500",
      bg: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-blue-200 dark:border-blue-900/50"
    },
    {
      icon: CheckCircle2,
      title: "2. Accept Requests",
      desc: "Receive booking requests from verified renters. Review their profile and approve the dates that work for you.",
      color: "text-amber-500",
      bg: "bg-amber-50 dark:bg-amber-900/20",
      borderColor: "border-amber-200 dark:border-amber-900/50"
    },
    {
      icon: Package,
      title: "3. Handover Gear",
      desc: "Meet the renter at a safe location. Do a quick condition check together and hand over the equipment.",
      color: "text-purple-500",
      bg: "bg-purple-50 dark:bg-purple-900/20",
      borderColor: "border-purple-200 dark:border-purple-900/50"
    },
    {
      icon: DollarSign,
      title: "4. Get Paid",
      desc: "Once the rental is complete and the gear is returned safely, your earnings are deposited directly into your bank account.",
      color: "text-emerald-500",
      bg: "bg-emerald-50 dark:bg-emerald-900/20",
      borderColor: "border-emerald-200 dark:border-emerald-900/50"
    }
  ];

  const currentSteps = activeTab === "renter" ? renterSteps : providerSteps;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24">
      
      {/*  Header / Hero Section */}
      <div className="bg-indigo-600 dark:bg-indigo-950 pt-24 pb-32 px-4 sm:px-6 relative overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 blur-[100px] rounded-full"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-indigo-100 text-sm font-semibold mb-6">
            <PlayCircle className="h-4 w-4" /> 
            <span>Step-by-step Guide</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
            How Our Platform Works
          </h1>
          <p className="text-indigo-100 text-lg md:text-xl max-w-2xl mx-auto">
            Whether you're looking to rent gear for your next big shoot, or want to earn money from your unused equipment, we make it simple and secure.
          </p>
        </div>
      </div>

      {/*  Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-16 relative z-20">
        
        {/* Toggle Switch */}
        <div className="flex justify-center mb-16">
          <div className="bg-white dark:bg-slate-900 p-1.5 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 inline-flex">
            <button 
              onClick={() => setActiveTab("renter")}
              className={`px-6 md:px-10 py-3 rounded-xl font-bold text-sm md:text-base transition-all duration-300 ${activeTab === "renter" ? "bg-indigo-600 text-white shadow-sm" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"}`}
            >
              I want to Rent Gear
            </button>
            <button 
              onClick={() => setActiveTab("provider")}
              className={`px-6 md:px-10 py-3 rounded-xl font-bold text-sm md:text-base transition-all duration-300 ${activeTab === "provider" ? "bg-emerald-500 text-white shadow-sm" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"}`}
            >
              I want to List Gear
            </button>
          </div>
        </div>

        {/*  Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative">
          
          {/* Desktop Connecting Line */}
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-slate-200 dark:bg-slate-800 z-0"></div>

          {currentSteps.map((step, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm relative z-10 hover:-translate-y-2 transition-transform duration-300">
              <div className={`h-20 w-20 rounded-2xl flex items-center justify-center mb-6 shadow-sm border ${step.bg} ${step.color} ${step.borderColor}`}>
                <step.icon className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                {step.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/*  Trust & Safety Section */}
        <div className="mt-24 bg-linear-to-br from-slate-900 to-slate-800 rounded-3xl overflow-hidden shadow-xl border border-slate-700">
          <div className="grid grid-cols-1 lg:grid-cols-5 items-center">
            <div className="p-10 lg:p-12 lg:col-span-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6">
                <ShieldCheck className="h-4 w-4" /> Trust & Safety
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">You're in safe hands.</h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Every user is verified, and every rental is covered by our comprehensive damage and theft protection. We hold deposits securely and handle all dispute resolutions so you can rent with peace of mind.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={activeTab === "renter" ? "/gears" : "/register?role=PROVIDER"}>
                  <Button className="h-12 px-8 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold w-full sm:w-auto">
                    {activeTab === "renter" ? "Browse Gear Now" : "List Your First Item"}
                  </Button>
                </Link>
                <Link href="/help">
                  <Button variant="outline" className="h-12 px-8 rounded-xl bg-transparent border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white font-bold w-full sm:w-auto">
                    Read FAQ <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Visual element on the right */}
            <div className="hidden lg:flex lg:col-span-2 bg-slate-800/50 h-full items-center justify-center p-12 border-l border-slate-700/50">
              <div className="relative w-full max-w-sm aspect-square bg-linear-to-tr from-emerald-500/20 to-indigo-500/20 rounded-full flex items-center justify-center border border-white/10 shadow-2xl">
                <ShieldCheck className="h-32 w-32 text-emerald-400 opacity-80" />
                <div className="absolute inset-0 rounded-full border border-emerald-500/30 animate-[spin_10s_linear_infinite]" style={{ borderStyle: 'dashed' }}></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}