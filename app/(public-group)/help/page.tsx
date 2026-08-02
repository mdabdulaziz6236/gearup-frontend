"use client";

import { useState } from "react";
import { 
  Search, Book, Shield, CreditCard, Camera, MessageCircle, 
  Mail, Phone, ChevronDown, LifeBuoy, ArrowRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0); 

  const categories = [
    { title: "Renting Gear", icon: Camera, desc: "How to find, book, and return items.", color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
    { title: "Listing Gear", icon: Book, desc: "Guide for providers to list items.", color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
    { title: "Payments & Refunds", icon: CreditCard, desc: "Billing, deposits, and payouts.", color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-900/20" },
    { title: "Trust & Safety", icon: Shield, desc: "Insurance, disputes, and account security.", color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20" },
  ];

  const faqs = [
    {
      question: "How do I rent gear from a provider?",
      answer: "Browse our catalog, select the gear you need, choose your rental dates, and click 'Book Now'. Once the provider confirms, you can proceed to make the payment to secure your booking."
    },
    {
      question: "When do I get my security deposit back?",
      answer: "Security deposits are held automatically and are released within 24-48 hours after the gear is returned in good, working condition and the provider marks the order as 'RETURNED'."
    },
    {
      question: "How do I list my camera gear as a Provider?",
      answer: "Go to your Provider Dashboard, click on 'Gear Inventory', and select 'Add New Gear'. Fill in the title, description, daily price, and upload clear photos of your equipment."
    },
    {
      question: "What happens if the gear gets damaged?",
      answer: "If gear is damaged during a rental, report it immediately through the platform. Our Trust & Safety team will review the case, and the renter's deposit may be used to cover repair costs."
    },
    {
      question: "Can I cancel my booking?",
      answer: "Yes, you can cancel a booking before the provider confirms it for a full refund. If you cancel after confirmation, our standard cancellation policy will apply based on how close it is to the rental date."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      
      {/*  Hero / Search Section */}
      <div className="bg-indigo-600 dark:bg-indigo-900 pt-20 pb-24 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            How can we help you today?
          </h1>
          <p className="text-indigo-100 text-lg mb-8">
            Search our knowledge base or browse categories below to find answers.
          </p>
          
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search for articles, guides, or FAQs..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 pl-12 pr-4 rounded-2xl bg-white dark:bg-slate-900 border-none shadow-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg"
            />
            <Button className="absolute right-2 top-2 h-10 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-6 hidden sm:flex">
              Search
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-10 relative z-20 space-y-16">
        
        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-200/50 dark:border-slate-800 hover:shadow-md transition-all cursor-pointer group">
              <div className={`h-14 w-14 rounded-2xl flex items-center justify-center mb-5 ${cat.bg} ${cat.color} group-hover:scale-110 transition-transform`}>
                <cat.icon className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{cat.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{cat.desc}</p>
              <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 flex items-center group-hover:underline">
                Read articles <ArrowRight className="ml-1 h-4 w-4" />
              </span>
            </div>
          ))}
        </div>

        {/* FAQ & Contact Section Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* FAQ Section (Takes up 2 columns on large screens) */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center">
                <LifeBuoy className="mr-2 h-6 w-6 text-indigo-500" /> Frequently Asked Questions
              </h2>
              <p className="text-sm text-slate-500 mt-1">Quick answers to common questions about our platform.</p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div 
                  key={idx} 
                  className={`bg-white dark:bg-slate-900 border rounded-2xl overflow-hidden transition-all duration-200 ${openFaq === idx ? 'border-indigo-200 dark:border-indigo-800 shadow-sm' : 'border-slate-200 dark:border-slate-800'}`}
                >
                  <button 
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left bg-transparent"
                  >
                    <span className={`font-semibold ${openFaq === idx ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-800 dark:text-slate-200'}`}>
                      {faq.question}
                    </span>
                    <ChevronDown className={`h-5 w-5 text-slate-400 transition-transform duration-200 ${openFaq === idx ? 'rotate-180 text-indigo-500' : ''}`} />
                  </button>
                  
                  {openFaq === idx && (
                    <div className="p-5  text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 mt-2 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Support Card */}
          <div className="lg:col-span-1">
            <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 rounded-3xl p-8 text-center sticky top-28">
              <div className="h-16 w-16 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-indigo-100 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400">
                <MessageCircle className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Still need help?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-8">
                Can't find the answer you're looking for? Our support team is here to help you out.
              </p>
              
              <div className="space-y-3">
                <Button className="w-full rounded-xl h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold">
                  <MessageCircle className="mr-2 h-4 w-4" /> Live Chat
                </Button>
                <Button variant="outline" className="w-full rounded-xl h-12 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300">
                  <Mail className="mr-2 h-4 w-4 text-slate-500" /> support@care.xyz
                </Button>
                <Button variant="outline" className="w-full rounded-xl h-12 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300">
                  <Phone className="mr-2 h-4 w-4 text-slate-500" /> +880 1234 567890
                </Button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}