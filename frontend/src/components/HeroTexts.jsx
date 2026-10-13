import React from 'react'

const HeroTexts = () => {
  return (
    <>
     {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight max-w-3xl text-center  text-slate-900">
  <span className="block mb-2">College, Streamlined</span>
  <span className="block">
    With{" "}
    <span className="relative inline-block">
      <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(79,70,229,0.15)]">
        StacX
      </span>
      <svg
        className="absolute -bottom-2 left-0 w-full h-3"
        viewBox="0 0 200 12"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M2 10C50 4 150 4 198 10"
          stroke="url(#underline-gradient)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="underline-gradient" x1="0" y1="0" x2="200" y2="0">
            <stop offset="0%" stopColor="#4f46e5" />
            <stop offset="50%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#0891b2" />
          </linearGradient>
        </defs>
      </svg>
    </span>
  </span>
</h1>


          {/* Description */}
          <p className="text-gray-400 mt-4 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto">
            Access semester notes, PYQs, assignments, and connect with
            your community — all in one{" "}
            <span className="text-indigo-400 font-medium">
              futuristic platform
            </span>
            .
          </p>
    </>
  )
}

export default HeroTexts