import { getAllGears, getCategories } from "@/service/api"
import GearClient from "./GearClient"

export default async function GearListingPage() {

  const [gearsRes, categoriesRes] = await Promise.all([
    getAllGears(),
    getCategories()
  ]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <main className="container mx-auto px-4 py-8 md:px-6 lg:py-12 max-w-7xl">
        
        {/* Header Section */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Rent Top Quality Gear
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
            Browse our extensive collection of sports and outdoor equipment. Find exactly what you need for your next adventure.
          </p>
        </div>
        
        {/* Client Component  where searching filtering pagination */}
        <GearClient 
          initialGears={gearsRes.data || []} 
          categories={categoriesRes.data || []} 
        />
        
      </main>
    </div>
  )
}