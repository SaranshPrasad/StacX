// ==========================================
// src/components/Footer.jsx
// ==========================================

import {
  Sparkles,
  Home,
  FolderOpen,
  MessageCircle,
  ClipboardList,
  

  Mail,
  Heart,
  ArrowUp,
  ExternalLink,
  Code,
  Rocket,
  Users,
  BookOpen,
} from "lucide-react";

export default function Footer() {
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Quick Links Data
  const quickLinks = [
    { name: "Home", icon: Home },
    { name: "Resources", icon: FolderOpen },
    { name: "Community Chat", icon: MessageCircle },
    { name: "My Requests", icon: ClipboardList },
  ];

  // Platform Info Data
  const platformInfo = [
    { text: "Built for Students", icon: Rocket },
    { text: "React + Tailwind CSS", icon: Code },
    { text: "10,000+ Users", icon: Users },
    { text: "5,000+ Resources", icon: BookOpen },
  ];

  // Social Links Data
  const socialLinks = [
    
   
  ];

  return (
    <footer className="relative border-t border-white/10 mt-20 md:mt-32 overflow-hidden">
      {/* Background Glow Effects */}
    

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        
        <div className="border-t border-white/10 py-5 md:py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-gray-500 text-xs md:text-sm text-center sm:text-left order-2 sm:order-1">
              © {new Date().getFullYear()} StacX. All rights reserved.
            </p>

            {/* Made With Love */}
            <p className="text-gray-500 text-xs md:text-sm flex items-center gap-1.5 order-1 sm:order-2">
              Crafted with
              <Heart
                size={14}
                className="text-red-400 fill-red-400 animate-pulse"
              />
              for modern students
              <Sparkles size={14} className="text-yellow-400" />
            </p>

            {/* Scroll to Top Button - Hidden on very small screens */}
            <button
              onClick={scrollToTop}
              className="hidden sm:flex order-3 w-10 h-10 rounded-xl bg-white/5 border border-white/10 items-center justify-center text-gray-400 hover:text-white hover:bg-indigo-500/20 hover:border-indigo-500/30 transition-all duration-300 group"
              aria-label="Scroll to top"
            >
              <ArrowUp
                size={18}
                className="group-hover:-translate-y-0.5 transition-transform"
              />
            </button>
          </div>
        </div>
      </div>

      
      
    </footer>
  );
}