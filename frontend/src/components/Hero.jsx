// import React from 'react'
// import { useEffect, useState, useRef } from "react";

// import {
//   Sparkles,
//   Rocket,
//   Brain,
//   BookOpen,
//   Users,
//   MessageSquare,
//   Download,
//   Shield,
//   Zap,
//   Star,
//   ArrowRight,
//   ChevronDown,
//   Play,
//   CheckCircle,
//   TrendingUp,
//   Clock,
//   Award,
//   Heart,
// } from "lucide-react";
// const Hero = ({isLoaded}) => {
//   return (
//      <section className="min-h-screen flex items-center justify-center px-4 md:px-8 pt-24 md:pt-28 pb-12">
//         <div className="max-w-7xl mx-auto w-full">
//           <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
//             {/* Left Content */}
//             <div
//               className={`order-2 lg:order-1 text-center lg:text-left ${isLoaded ? "animate-slide-up" : ""
//                 }`}
//             >
//               {/* Badge */}
//               <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 text-indigo-300 px-4 py-2 rounded-full mb-6 hover:border-indigo-500/40 transition-all duration-300 cursor-default">
//                 <Sparkles size={16} className="animate-pulse" />
//                 <span className="text-sm font-medium">
//                   A product by The DevLoopers
//                 </span>
//                 <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
//               </div>

//               {/* Heading */}
//               <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
//                 <span className="block mb-2">Study Smarter</span>
//                 <span className="block">
//                   With{" "}
//                   <span className="relative inline-block">
//                     <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x glow-text">
//                       StacX
//                     </span>
//                     <svg
//                       className="absolute -bottom-2 left-0 w-full h-3"
//                       viewBox="0 0 200 12"
//                       fill="none"
//                       preserveAspectRatio="none"
//                     >
//                       <path
//                         d="M2 10C50 4 150 4 198 10"
//                         stroke="url(#underline-gradient)"
//                         strokeWidth="3"
//                         strokeLinecap="round"
//                       />
//                       <defs>
//                         <linearGradient
//                           id="underline-gradient"
//                           x1="0"
//                           y1="0"
//                           x2="200"
//                           y2="0"
//                         >
//                           <stop offset="0%" stopColor="#818cf8" />
//                           <stop offset="50%" stopColor="#a78bfa" />
//                           <stop offset="100%" stopColor="#22d3ee" />
//                         </linearGradient>
//                       </defs>
//                     </svg>
//                   </span>
//                 </span>
//               </h1>

//               {/* Description */}
//               <p className="text-gray-400 mt-6 text-base sm:text-lg lg:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0">
//                 Access semester notes, PYQs, assignments, and connect with
//                 your community — all in one{" "}
//                 <span className="text-indigo-400 font-medium">
//                   futuristic platform
//                 </span>
//                 .
//               </p>

//               {/* CTA Buttons */}
//               <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center lg:justify-start">
//                 <button
//                   onClick={() => token ? navigate("/home/myrequests") : navigate("/auth")}
//                   className="group relative bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 hover:scale-105 transition-all duration-300 px-8 py-4 rounded-2xl font-bold shadow-xl shadow-indigo-500/30 overflow-hidden"
//                 >
//                   <span className="relative z-10 flex items-center justify-center gap-2">
//                     <Rocket size={20} />
//                     Request Resources
//                     <ArrowRight
//                       size={18}
//                       className="group-hover:translate-x-1 transition-transform"
//                     />
//                   </span>
//                   <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                 </button>

//                 <button
//                   onClick={() => navigate("/home/resources")}
//                   className="group glass-card hover:bg-white/10 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
//                 >
//                   <Play size={18} />
//                   Explore Resources
//                 </button>
//               </div>

//               {/* Quick Stats */}
//               <div className="flex items-center gap-6 mt-10 justify-center lg:justify-start">
//                 <div className="flex -space-x-3">
//                   {[1, 2, 3, 4].map((i) => (
//                     <div
//                       key={i}
//                       className="w-10 h-10 rounded-full border-2 border-[#050816] overflow-hidden"
//                     >
//                       <img
//                         src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? "women" : "men"
//                           }/${i + 10}.jpg`}
//                         alt=""
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                   ))}
//                 </div>
//                 <div>
//                   <p className="text-white font-bold">Scalable for 10000+</p>
//                   <p className="text-gray-500 text-sm">Active Students</p>
//                 </div>
//               </div>
//             </div>

//             {/* Right Image */}
//             <div
//               className={`order-1 lg:order-2 relative ${isLoaded ? "animate-slide-in-right delay-200" : ""
//                 }`}
//             >
//               {/* Glow Effect */}
//               <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 via-purple-500/20 to-cyan-500/30 blur-3xl" />

//               {/* Main Image */}
//               <div className="relative z-10">
//                 <img
//                   src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"
//                   alt="Students collaborating"
//                   className="w-full h-[280px] sm:h-[350px] lg:h-[480px] object-cover border border-white/10 shadow-2xl shadow-indigo-500/20 rounded-3xl sm:rounded-[40px] lg:rounded-[60px] lg:rounded-tr-[120px] lg:rounded-bl-[120px] transform hover:scale-[1.02] transition-all duration-500"
//                 />

//                 {/* Floating Card - Top Right */}
//                 <div
//                   className="absolute -top-3 -right-3 sm:-top-5 sm:-right-5 glass-card rounded-2xl p-3 sm:p-4 bg-[#dbe1e3]/10 animate-bounce"
//                   style={{
//                     animationDuration: "2.5s",
//                   }}
//                 >
//                   <div className="flex items-center gap-2 sm:gap-3">
//                     <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
//                       <TrendingUp size={20} className="text-white" />
//                     </div>
//                     <div>
//                       <p className="text-white font-bold text-sm sm:text-base">
//                         98%
//                       </p>
//                       <p className="text-gray-400 text-xs">Success Rate</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Floating Card - Bottom Left */}
//                 <div
//                   className="absolute -bottom-3 -left-3 sm:-bottom-5 sm:-left-5 glass-card rounded-2xl p-3 sm:p-4 animate-bounce bg-[#dbe1e3]/10 animate-bounce"
//                   style={{ animationDuration: "2.5s", }}
//                 >
//                   <div className="flex items-center gap-2 sm:gap-3">
//                     <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
//                       <Clock size={20} className="text-white" />
//                     </div>
//                     <div>
//                       <p className="text-white font-bold text-sm sm:text-base">
//                         24/7
//                       </p>
//                       <p className="text-gray-400 text-xs">Available</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Scroll Indicator */}
//           <div className="hidden lg:flex justify-center mt-12">
//             <div
//               className="flex flex-col items-center gap-2 text-gray-500 cursor-pointer hover:text-gray-300 transition-colors"
//               onClick={() =>
//                 window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
//               }
//             >
//               <span className="text-sm">Scroll to explore</span>
//               <ChevronDown size={20} className="animate-bounce" />
//             </div>
//           </div>
//         </div>
//       </section>
//   )
// }

// export default Hero
import React from 'react'
import { useEffect, useState, useRef } from "react";
// Assumed standard routing/state logic references since navigate/token are used in the buttons
import { useNavigate } from "react-router-dom"; 

import {
  Sparkles,
  Rocket,
  Brain,
  BookOpen,
  Users,
  MessageSquare,
  Download,
  Shield,
  Zap,
  Star,
  ArrowRight,
  ChevronDown,
  Play,
  CheckCircle,
  TrendingUp,
  Clock,
  Award,
  Heart,
} from "lucide-react";
import CTA from './CTA';
import QuickStats from './QuickStats';
import Badge from './Badge';
import HeroTexts from './HeroTexts';

const Hero = ({ isLoaded }) => {
  // Safe default initialization for hooks if you're pulling these from elsewhere
  const navigate = useNavigate(); 
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 md:px-8 pt-24 md:pt-28 pb-12 overflow-hidden ">
      
      {/* ─── GRID BACKGROUND LAYER ─── */}
      <div 
        className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_60%,transparent_100%)]"
        aria-hidden="true"
      />

      {/* ─── CENTRAL BACKGROUND GLOW EFFECT ─── */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[400px] w-[600px] max-w-full -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-cyan-500/20 blur-[130px] rounded-full" />

    <div className="relative z-10 max-w-7xl mx-auto w-full text-center lg:text-left flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-10 lg:gap-14">

        
        {/* ─── LOGO PLACEHOLDER ─── */}
        <div className={`mb-2 flex items-center justify-center ${isLoaded ? "animate-slide-up" : ""}`}>
         
          
             <img src="/stacxlogo.png" alt="logo"  className='z-[-1000] h-50 w-35 lg:h-full lg:w-full'/>
            
        
        </div>

        {/* Center Wrapped Main Content */}
        <div className={`space-y-6 flex flex-col items-center ${isLoaded ? "animate-slide-up" : ""}`}>
          
          {/* Badge */}
          <Badge/>

         <HeroTexts/>

          {/* CTA Buttons */}
          <CTA token={token} navigate={navigate} />

          {/* Quick Stats */}
          <QuickStats/>

        </div>
      </div>
    </section>
  );
};

export default Hero;
