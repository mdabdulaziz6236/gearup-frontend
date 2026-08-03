import { Search, Calendar, Camera } from "lucide-react";

export default function HowItWorks() {
  return (
    <section className="py-24 bg-white dark:bg-slate-900/50 border-y border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Simple & Secure Process</h2>
          <p className="text-slate-500 mt-4 max-w-2xl mx-auto">Renting gear has never been this easy. Follow these 3 simple steps.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
          {/* Desktop Connector Line */}
          <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-linear-to-r from-indigo-100 via-indigo-300 to-indigo-100 dark:from-indigo-900 dark:via-indigo-700 dark:to-indigo-900 z-0"></div>

          <div className="relative z-10 flex flex-col items-center text-center group">
            <div className="h-24 w-24 bg-indigo-50 dark:bg-indigo-900/40 rounded-full flex items-center justify-center mb-6 shadow-sm border border-indigo-100 dark:border-indigo-800 group-hover:scale-110 transition-transform">
              <Search className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">1. Find Gear</h3>
            <p className="text-slate-500 dark:text-slate-400">Search for cameras, lenses, or drones near your location.</p>
          </div>

          <div className="relative z-10 flex flex-col items-center text-center group">
            <div className="h-24 w-24 bg-emerald-50 dark:bg-emerald-900/40 rounded-full flex items-center justify-center mb-6 shadow-sm border border-emerald-100 dark:border-emerald-800 group-hover:scale-110 transition-transform">
              <Calendar className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">2. Book & Pay</h3>
            <p className="text-slate-500 dark:text-slate-400">Select your dates and securely pay through our platform.</p>
          </div>

          <div className="relative z-10 flex flex-col items-center text-center group">
            <div className="h-24 w-24 bg-purple-50 dark:bg-purple-900/40 rounded-full flex items-center justify-center mb-6 shadow-sm border border-purple-100 dark:border-purple-800 group-hover:scale-110 transition-transform">
              <Camera className="h-10 w-10 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">3. Shoot & Return</h3>
            <p className="text-slate-500 dark:text-slate-400">Pick up the gear, create magic, and return it safely.</p>
          </div>
        </div>
      </div>
    </section>
  );
}