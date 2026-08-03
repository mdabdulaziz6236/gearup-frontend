import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import CtaSection from "@/components/home/CtaSection";
import Testimonials from "@/components/home/Testimonials";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 selection:bg-indigo-500/30">
      <HeroSection />
      <HowItWorks />
      <CtaSection />
      <Testimonials />
    </div>
  );
}