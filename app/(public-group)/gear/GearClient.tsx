"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ChevronLeft, ChevronRight, PackageX } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const ITEMS_PER_PAGE = 8;

export default function GearClient({
  initialGears,
  categories,
  user,
}: {
  initialGears: any[];
  categories: any[];
  user: any;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  // Filtering Logic
  const filteredGears = useMemo(() => {
    return initialGears.filter((gear) => {
      const matchesSearch =
        gear.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gear.brand.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || gear.categoryId === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, initialGears]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredGears.length / ITEMS_PER_PAGE);
  const paginatedGears = filteredGears.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleFilterChange = (value: string) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleGearClick = (gearId: string) => {
    if (!user?.success) {
      toast.error("You need to login first!");
      router.push(`/auth/login?redirect=/gear/${gearId}`);
      return;
    }
    router.push(`/gear/${gearId}`);
  };

  return (
    <>
      {/*  Search & Filters Container */}
      <div className="flex flex-col gap-5 mb-8 bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
        {/* Top Row: Search Input & Button */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input
              type="text"
              placeholder="Search by name or brand..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-11 h-12 w-full bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl focus-visible:ring-emerald-500 shadow-sm"
            />
          </div>
          <Button className="h-12 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold w-full sm:w-auto shrink-0 shadow-sm">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>

        {/* Bottom Row: Categories */}
        <div className="flex items-center gap-3 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            onClick={() => handleFilterChange("all")}
            className={`rounded-xl whitespace-nowrap h-10 px-5 transition-colors ${
              selectedCategory === "all"
                ? "bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
                : "border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            }`}
          >
            All Gear
          </Button>

          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? "default" : "outline"}
              onClick={() => handleFilterChange(cat.id)}
              className={`rounded-xl whitespace-nowrap h-10 px-5 transition-colors ${
                selectedCategory === cat.id
                  ? "bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
                  : "border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >
              {cat.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Gear Grid */}
      {paginatedGears.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedGears.map((gear) => (
            <div
              onClick={() => handleGearClick(gear.id)}
              key={gear.id}
              className="group cursor-pointer flex flex-col h-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-1 duration-300"
            >
              {/* Image Placeholder */}
              <div className="aspect-4/3 bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-slate-400 dark:text-slate-500 font-medium group-hover:scale-105 transition-transform duration-500">
                  Image: {gear.brand}
                </div>
                <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-900 dark:text-white shadow-sm">
                  ${gear.dailyPrice}/day
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-2 uppercase tracking-wider">
                  {gear.category?.name || "General"}
                </p>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {gear.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 flex-1 leading-relaxed">
                  {gear.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800/80 mt-auto">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md">
                    Stock: {gear.stockQuantity}
                  </span>
                  <Button
                    variant="ghost"
                    className="h-8 px-3 text-sm text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-lg"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Empty State
        <div className="flex flex-col items-center justify-center py-24 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm mt-6">
          <div className="h-24 w-24 bg-slate-50 dark:bg-slate-800/50 rounded-full flex items-center justify-center mb-6">
            <PackageX className="h-12 w-12 text-slate-300 dark:text-slate-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
            No gear found
          </h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-8 leading-relaxed">
            We couldn't find anything matching your search or filter criteria.
            Try adjusting them.
          </p>
          <Button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
            }}
            className="h-12 px-8 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 font-semibold shadow-sm"
          >
            Clear All Filters
          </Button>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-12 mb-8">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="rounded-xl h-11 px-4 border-slate-200 dark:border-slate-800 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Prev
          </Button>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Page
            </span>
            <span className="h-8 w-8 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white">
              {currentPage}
            </span>
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
              of {totalPages}
            </span>
          </div>

          <Button
            variant="outline"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="rounded-xl h-11 px-4 border-slate-200 dark:border-slate-800 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Next <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}
    </>
  );
}
