import Link from "next/link";
import { Zap, Search, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-white dark:bg-slate-950 z-0"></div>
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-200 h-150 bg-indigo-500/10 dark:bg-indigo-500/20 blur-[120px] rounded-full rounded-tr-none z-0"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-150 h-150 bg-emerald-500/10 dark:bg-emerald-500/10 blur-[100px] rounded-full z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800/50 text-indigo-600 dark:text-indigo-400 text-sm font-semibold mb-8 animate-fade-in-up">
          <Zap className="h-4 w-4" /> 
          <span>The #1 Gear Rental Platform</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tight mb-6 leading-tight">
          Rent Premium Gear <br className="hidden md:block" /> 
          <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-emerald-500">
            For Your Next Shoot
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
          Discover and rent high-quality cameras, lenses, and production equipment from trusted local creators. Secure, affordable, and easy.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/gear">
            <Button className="w-full sm:w-auto h-14 px-8 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold shadow-lg shadow-indigo-500/30 transition-all hover:scale-105">
              Browse Gears <Search className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/how-it-works">
            <Button variant="outline" className="w-full sm:w-auto h-14 px-8 rounded-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-lg font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
              <PlayCircle className="mr-2 h-5 w-5 text-indigo-500" /> How it works
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}