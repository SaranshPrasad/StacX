import { Zap } from 'lucide-react';
import React from 'react';

const Features = ({ features }) => {
  return (
    <section className="relative py-20 md:py-28 px-4 md:px-8 bg-white text-slate-900 overflow-hidden">
      
      {/* ─── GRID BACKDROP ACCENT ─── */}
      <div 
        className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#0f172a05_1px,transparent_1px),linear-gradient(to_bottom,#0f172a05_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_60%,transparent_100%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* ─── SECTION HEADER ─── */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full mb-6 shadow-sm">
            <Zap size={14} className="fill-indigo-100" />
            <span className="text-xs sm:text-sm font-semibold tracking-wide">Powerful Features</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 leading-[1.15]">
            Everything You Need
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(79,70,229,0.1)]">
              {" "}To Excel
            </span>
          </h2>
          
          <p className="text-slate-600 max-w-2xl mx-auto mt-6 text-base sm:text-lg md:text-xl font-medium leading-relaxed">
            Designed and developed by The DevLoopers, for students. Every feature is designed to
            make your academic journey smoother and more successful.
          </p>
        </div>

        {/* ─── FEATURES GRID (MODIFIED FOR 3 + 2 ROW ALIGNMENT) ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 md:gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            
            // Check if this card belongs to the second row (Index 3 and 4)
            const isSecondRowItem = index >= 3;

            return (
              <div
                key={index}
                className={`group relative bg-slate-50/50 border border-slate-200/60 rounded-3xl p-6 md:p-8 hover:-translate-y-1.5 transition-all duration-300 hover:bg-white hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-500/[0.04] cursor-default
                  col-span-1 
                  sm:col-span-1 
                  ${isSecondRowItem ? 'lg:col-span-3' : 'lg:col-span-2'}
                `}
              >
                {/* Dynamic Icon Container */}
                <div
                  className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl border flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-105 group-hover:shadow-md ${feature.bgColor || 'bg-indigo-50/50'} ${feature.borderColor || 'border-indigo-100/50'}`}
                >
                  <IconComponent size={24} className={feature.iconColor || 'text-indigo-600'} />
                </div>

                {/* Typography */}
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 tracking-tight group-hover:text-indigo-600 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-slate-500 leading-relaxed text-sm md:text-base font-medium">
                  {feature.description}
                </p>

                {/* Subtle visual anchor arrow appearing on card hover */}
                <div className="absolute bottom-6 right-6 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-indigo-500 hidden md:block">
                  <svg xmlns="http://w3.org" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
