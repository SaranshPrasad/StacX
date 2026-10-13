// ==========================================
// src/components/Footer.jsx
// ==========================================
import React from 'react';
import { Sparkles, Home, FolderOpen, MessageCircle, ClipboardList, ArrowUp, Heart } from "lucide-react";

export default function Footer() {
  // Scroll to top layout engine utility function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Simplified Quick Navigation Hook data array
  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "Resources", href: "/home/resources" },
    { name: "Notifications", href: "/home/notifications" },
    { name: "Requests", href: "/home/myrequests" },
  ];

  return (
    <footer className="relative border-t border-slate-200/80   overflow-hidden bg-white text-slate-900">
      
      {/* ─── GRID ACCENT LAYER ─── */}
      <div 
        className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#0f172a04_1px,transparent_1px),linear-gradient(to_bottom,#0f172a04_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_100%,#000_80%,transparent_100%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* ─── TOP SECTION: MINIMAL BRANDING & LINKS ─── */}
        <div className="py-10 md:py-14 flex flex-col md:flex-row items-center justify-between gap-8 border-b border-slate-100">
          
          {/* Minimal Corporate Platform Branding */}
          <div className="flex flex-col items-center md:items-start space-y-2 text-center md:text-left">
            <div className="flex items-center gap-2">
              <img src="/stacxlogo.png" alt="logo" className='h-20 w-15'/>
              <span className="font-black text-xl tracking-tight text-slate-900">StacX</span>
            </div>
            <p className="text-sm font-medium text-slate-400">College, Streamlined.</p>
          </div>

          {/* Inline Navigation Array Link Bar */}
          <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {quickLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

        </div>

        {/* ─── BOTTOM SECTION: LEGAL & COMPLIANCE DATA ─── */}
        <div className="py-6 md:py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Copyright Statement */}
            <p className="text-slate-400 font-medium text-xs md:text-sm text-center sm:text-left order-2 sm:order-1">
              © {new Date().getFullYear()} StacX. Designed & developed by The DevLoopers.
            </p>

            {/* Created With Love Tag Anchor */}
            <p className="text-slate-400 font-medium text-xs md:text-sm flex items-center gap-1.5 order-1 sm:order-2">
              Crafted with
              <Heart
                size={14}
                className="text-rose-500 fill-rose-500 animate-pulse shrink-0"
              />
              for modern students
              <Sparkles size={14} className="text-amber-500 shrink-0" />
            </p>

            {/* Flat Scroll to Top Button Action Layer */}
            <button
              onClick={scrollToTop}
              className="hidden sm:flex order-3 w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/60 items-center justify-center text-slate-500 hover:text-indigo-600 hover:bg-indigo-50/50 hover:border-indigo-100 transition-all duration-300 group shadow-sm"
              aria-label="Scroll to top"
            >
              <ArrowUp
                size={16}
                className="group-hover:-translate-y-0.5 transition-transform stroke-[2.5]"
              />
            </button>
            
          </div>
        </div>

      </div>
    </footer>
  );
}
