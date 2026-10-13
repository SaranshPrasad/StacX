import React from 'react';
import { Brain, Rocket, Sparkles, X, Code, Target, Heart, ArrowRight } from 'lucide-react';

const About = () => {
  // Configurable content items integrated from your input array
  const aboutCards = [
    {
      icon: Brain,
      title: "Smart Discovery",
      desc: "AI-powered search to find exactly what you need",
    },
    {
      icon: Rocket,
      title: "Fast Requests",
      desc: "Get resources from seniors within hours",
    },
    {
      icon: Sparkles,
      title: "Community Support",
      desc: "24/7 help from thousands of active students",
    },
  ];

  return (
    <section className="relative py-20 md:py-28 px-4 md:px-8 text-slate-900 overflow-hidden">
      
      {/* ─── GRID BACKDROP PATTERN ─── */}
      <div 
        className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#0f172a05_1px,transparent_1px),linear-gradient(to_bottom,#0f172a05_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"
        aria-hidden="true"
      />

      {/* ─── LIGHT GLOW RADIUS ACCENT ─── */}
      <div 
        className="absolute top-10 left-1/2 -translate-x-1/2 -z-10 h-[350px] w-[600px] bg-gradient-to-tr from-indigo-500/10 via-purple-500/5 to-cyan-500/5 blur-[120px] rounded-full"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        
        {/* ─── COLLABORATION LOGO STACK ─── */}
       <div className="flex items-center justify-center gap-6 sm:gap-8 mb-16 select-none">
  
  {/* Logo 1 Container: StacX */}
  <div className="group relative w-20 h-20 sm:w-24 sm:h-24 flex flex-col items-center justify-center transition-transform duration-300 hover:scale-105">
    <div className="w-full h-full flex items-center justify-center">
      <img 
        src="/stacxlogo.png" 
        alt="StacX Logo" 
        className="w-full h-full object-contain drop-shadow-sm" 
      />
    </div>
    <span className="absolute -bottom-6 text-[10px] sm:text-xs font-bold tracking-widest text-slate-400 uppercase whitespace-nowrap">
      StacX
    </span>
  </div>

  {/* Connection Sign: X */}
  <div className="flex items-center justify-center text-slate-400 shrink-0">
    <X size={20} className="stroke-[3.5] sm:scale-125" />
  </div>

  {/* Logo 2 Container: The DevLoopers */}
  <div className="group relative w-20 h-20 sm:w-24 sm:h-24 flex flex-col items-center justify-center transition-transform duration-300 hover:scale-105">
    <div className="w-full h-full flex items-center justify-center">
      <img 
        src="/dlogo.png" 
        alt="The DevLoopers Logo" 
        className="w-full h-full object-contain drop-shadow-sm" 
      />
    </div>
    <span className="absolute -bottom-6 text-[10px] sm:text-xs font-bold tracking-widest text-slate-400 uppercase whitespace-nowrap">
     The DevLoopers
    </span>
  </div>

</div>


        {/* ─── TEXT BLOCK HEADER ─── */}
        <div className="text-center max-w-3xl space-y-4 mb-16 pt-2">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full shadow-sm">
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold tracking-wide">Behind the Platform</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            Designed and Developed by <br/>
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(79,70,229,0.1)]">
              The DevLoopers
            </span>
          </h2>
          
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            StacX is a sub-product proudly engineered by <span className='font-bold'>The DevLoopers</span>, a student-driven tech club. Every pixel and line of code has been crafted to help balance resources, community engagement, and deadlines.
          </p>
        </div>

        {/* ─── SPLIT GRID CONTENT (ABOUT CARDS + CLUB DETAILS) ─── */}
        <div className="grid lg:grid-cols-12 gap-8 items-start w-full">
          
          {/* LEFT CONTAINER: DYNAMIC INPUT ABOUT CARDS (MAP LOOP) */}
          <div className="lg:col-span-6 space-y-4 w-full order-2 lg:order-1">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 text-center lg:text-left">Product Ecosystem</div>
            {aboutCards.map((card, index) => {
              const CardIcon = card.icon;
              return (
                <div 
                  key={index} 
                  className="bg-slate-50/50 border border-slate-200/60 rounded-2xl p-5 hover:bg-white hover:border-indigo-100 hover:shadow-lg hover:shadow-indigo-500/[0.03] transition-all duration-300 flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                    <CardIcon size={18} />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-slate-900 text-base">{card.title}</h4>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed">{card.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT CONTAINER: CLUB CULTURE & TEAM STATS */}
          <div className="lg:col-span-6 space-y-4 w-full order-1 lg:order-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 text-center lg:text-left">Our Mission</div>
            
            {/* Club Card Component */}
            <div className="bg-slate-50/50 border border-slate-200/60 rounded-3xl p-6 sm:p-8 hover:shadow-xl hover:shadow-indigo-500/[0.03] transition-all duration-300 space-y-4">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
                <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow-md shadow-purple-600/20 shrink-0">
                  <Target size={22} />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-600">Core DNA</span>
                  <h3 className="text-xl font-bold text-slate-900">Student-Driven Innovation</h3>
                  <p className="text-slate-500 leading-relaxed text-sm md:text-base font-medium">
                    We focus on building tools that push the boundaries of collaborative digital spaces, equipping developers and classmates with robust, production-grade academic solutions.
                  </p>
                </div>
              </div>
            </div>

            {/* Passion Callout Flag */}
            <div className="flex items-center justify-center lg:justify-start gap-2 bg-slate-50 border border-slate-200/50 rounded-2xl py-4 px-5 text-xs sm:text-sm font-medium text-slate-600">
              <Heart size={14} className="text-rose-500 fill-rose-500 animate-pulse shrink-0" />
              <span>Built by students, for students, with absolute dedication.</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;
