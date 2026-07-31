import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { getSingleGear } from "@/service/api"
import RentAction from "./RentAction"

interface SingleGearPageProps {
  params: Promise<{ id: string }>
}

export default async function SingleGearPage({ params }: SingleGearPageProps) {

  const resolvedParams = await params;
  const gearId = resolvedParams.id;

  const response = await getSingleGear(gearId);
  const gear = response?.data;

  if (!gear) {
    return notFound(); 
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        
        <Link href="/gear" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to all gear
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          
          {/* Left Column - Images */}
          <div className="space-y-4">
            <div className="aspect-4/3 rounded-3xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700 relative overflow-hidden shadow-sm">
              <span className="text-2xl font-bold">{gear.brand} Image Preview</span>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="aspect-square rounded-2xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-xs text-slate-400 hover:border-emerald-500 cursor-pointer transition-colors">
                  Img {i}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Details & Actions */}
          <div className="flex flex-col">
            <div className="mb-2 flex items-center gap-3">
              <span className="inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-bold tracking-wider uppercase">
                {gear.category?.name || "General"}
              </span>
              {gear.stockQuantity > 0 ? (
                 <span className="flex items-center text-xs font-medium text-emerald-600 dark:text-emerald-400">
                   <CheckCircle2 className="h-4 w-4 mr-1" /> In Stock ({gear.stockQuantity})
                 </span>
              ) : (
                <span className="text-xs font-medium text-red-500">Out of stock</span>
              )}
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
              {gear.title}
            </h1>
            
            <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mb-6">
              ${gear.dailyPrice} <span className="text-lg text-slate-500 dark:text-slate-400 font-medium">/ per day</span>
            </div>

            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-8">
              {gear.description}
            </p>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 mb-8 shadow-sm">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4 text-lg">Key Specifications</h3>
              <ul className="space-y-3">
                <li className="flex justify-between items-center text-sm border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span className="text-slate-500 dark:text-slate-400">Brand</span>
                  <span className="font-medium text-slate-900 dark:text-white">{gear.brand}</span>
                </li>
                <li className="flex justify-between items-center text-sm border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span className="text-slate-500 dark:text-slate-400">Availability</span>
                  <span className="font-medium text-slate-900 dark:text-white">{gear.isAvailable ? 'Yes' : 'No'}</span>
                </li>
              </ul>
            </div>

            {/* 2. RentAction component*/}
            <RentAction 
              gearId={gear.id} 
              dailyPrice={gear.dailyPrice} 
              isAvailable={gear.isAvailable}
              stockQuantity={gear.stockQuantity}
            />

          </div>
        </div>
      </div>
    </div>
  )
}