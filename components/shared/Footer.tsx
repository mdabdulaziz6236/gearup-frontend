import Link from "next/link";
import { Camera, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa"; 

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Top Section - 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1: Brand & Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <Camera className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                Gear<span className="text-indigo-600 dark:text-indigo-400">Up</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              The premier peer-to-peer gear rental platform for photographers, filmmakers, and creators. Rent premium equipment locally.
            </p>
            <div className="flex gap-4">

              <a href="#" className="h-10 w-10 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-900/30 dark:hover:text-indigo-400 transition-colors">
                <FaFacebook className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-900/30 dark:hover:text-indigo-400 transition-colors">
                <FaTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-900/30 dark:hover:text-indigo-400 transition-colors">
                <FaInstagram className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-900/30 dark:hover:text-indigo-400 transition-colors">
                <FaYoutube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/gear" className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-sm flex items-center group">
                  <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300">-</span> Browse Gear
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-sm flex items-center group">
                  <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300">-</span> How it Works
                </Link>
              </li>
              <li>
                <Link href="/" className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-sm flex items-center group">
                  <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300">-</span> Become a Provider
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-sm flex items-center group">
                  <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300">-</span> About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-6 uppercase tracking-wider text-sm">Support</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/help" className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-sm flex items-center group">
                  <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300">-</span> Help Center
                </Link>
              </li>
              <li>
                <Link href="/" className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-sm flex items-center group">
                  <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300">-</span> Trust & Safety
                </Link>
              </li>
              <li>
                <Link href="/" className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-sm flex items-center group">
                  <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300">-</span> Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/" className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-sm flex items-center group">
                  <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300">-</span> Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Newsletter */}
          <div className="space-y-6">
            <h4 className="text-slate-900 dark:text-white font-bold uppercase tracking-wider text-sm">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-slate-500 dark:text-slate-400">
                <Mail className="h-5 w-5 text-indigo-500 shrink-0" />
                <span>support@gearup.com</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-500 dark:text-slate-400">
                <Phone className="h-5 w-5 text-indigo-500 shrink-0" />
                <span>+880 1234 567890</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-500 dark:text-slate-400">
                <MapPin className="h-5 w-5 text-indigo-500 shrink-0" />
                <span>Level-4, 34, Awal Centre, Banani, Dhaka</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Section - Copyright */}
        <div className="pt-8 border-t border-slate-100 dark:border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center md:text-left">
            © {currentYear} GearUp Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
            <span>Made with Dev.AbdulAziz</span>
          </div>
        </div>

      </div>
    </footer>
  );
}