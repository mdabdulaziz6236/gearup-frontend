import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CtaSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
      <div className="bg-slate-900 dark:bg-slate-900 rounded-3xl p-10 md:p-16 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden">
        {/* Decorative Pattern */}
        <div className="absolute right-0 top-0 w-64 h-64 bg-indigo-500/20 blur-[80px] rounded-full"></div>
        
        <div className="relative z-10 max-w-xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Have gear lying around?</h2>
          <p className="text-slate-400 text-lg mb-8">
            Turn your unused cameras, lenses, and lighting equipment into passive income. Join thousands of creators on our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/auth/register">
              <Button className="w-full sm:w-auto h-12 px-8 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold">
                Start Earning Today
              </Button>
            </Link>
            <div className="flex items-center justify-center sm:justify-start text-slate-300 text-sm font-medium">
              <ShieldCheck className="h-5 w-5 text-emerald-400 mr-2" /> Fully Insured Rentals
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}