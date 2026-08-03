import Link from "next/link";
import Image from "next/image"; 
import { 
  Camera, ShieldCheck, Users, Zap, 
  Target, Heart, Globe, ArrowRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  const stats = [
    { label: "Active Creators", value: "10k+", icon: Users, color: "text-blue-500" },
    { label: "Gears Listed", value: "25k+", icon: Camera, color: "text-indigo-500" },
    { label: "Cities Covered", value: "50+", icon: Globe, color: "text-emerald-500" },
    { label: "Secure Rentals", value: "100k+", icon: ShieldCheck, color: "text-amber-500" },
  ];

  const values = [
    {
      title: "Empower Creators",
      desc: "We believe everyone should have access to high-quality gear to bring their creative visions to life, regardless of their budget.",
      icon: Target,
      color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
    },
    {
      title: "Community First",
      desc: "We are building a trusted community where local photographers, filmmakers, and gear owners can connect and collaborate.",
      icon: Heart,
      color: "bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400"
    },
    {
      title: "Trust & Security",
      desc: "Safety is our top priority. With verified users and comprehensive insurance options, you can rent with complete peace of mind.",
      icon: ShieldCheck,
      color: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"
    },
    {
      title: "Seamless Experience",
      desc: "From finding the right lens to making a secure payment, our platform is designed to make the rental process as smooth as possible.",
      icon: Zap,
      color: "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden bg-white dark:bg-slate-900">
        

        <div className="absolute inset-0 opacity-5 z-0">
          <Image 
            src="https://i.ibb.co.com/FqsHsPQs/Screenshot-2026-08-03-161101.png"
            alt="Hero Background"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-200 bg-indigo-500/10 blur-[100px] rounded-full z-0"></div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-6">
            Making Premium Gear <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-emerald-500">
              Accessible to Everyone
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            GearUp is the leading peer-to-peer rental marketplace for creative equipment. 
            We connect gear owners who want to earn extra income with creators who need 
            affordable access to high-end cameras, lenses, and production tools.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-16 relative z-20 mb-24">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 shadow-xl shadow-slate-200/20 dark:shadow-none border border-slate-100 dark:border-slate-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x divide-slate-100 dark:divide-slate-800 text-center">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center p-4">
                <stat.icon className={`h-8 w-8 mb-4 ${stat.color}`} />
                <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-2">{stat.value}</h3>
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Our Story</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              The idea for GearUp was born out of a simple frustration: photography and filmmaking equipment is incredibly expensive, yet most of it sits on a shelf 90% of the time. 
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              We realized that if we could connect local creators safely, we could solve two problems at once. We could help gear owners turn their idle equipment into a reliable source of passive income, while giving aspiring filmmakers and photographers affordable access to the tools they need to succeed.
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              Today, GearUp is more than just a rental platform. It's a thriving community of artists, professionals, and hobbyists supporting each other's creative journeys.
            </p>
          </div>
          
     
        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 bg-slate-100/50 dark:bg-slate-900/30 rounded-3xl mb-24 border border-slate-200/50 dark:border-slate-800/50">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Our Core Values</h2>
          <p className="text-slate-500 mt-4 max-w-2xl mx-auto">The principles that guide our platform and community.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex gap-6 hover:shadow-md transition-shadow">
              <div className={`h-14 w-14 shrink-0 rounded-2xl flex items-center justify-center ${value.color}`}>
                <value.icon className="h-7 w-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{value.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{value.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">Ready to join the community?</h2>
        <p className="text-slate-600 dark:text-slate-400 text-lg mb-10">
          Whether you want to rent gear for your next project or start earning money from your equipment, we're excited to have you on board.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/gears">
            <Button className="h-14 px-8 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg w-full sm:w-auto">
              Explore Gears
            </Button>
          </Link>
          <Link href="/register?role=PROVIDER">
            <Button variant="outline" className="h-14 px-8 rounded-xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-bold text-lg w-full sm:w-auto">
              Become a Provider <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}