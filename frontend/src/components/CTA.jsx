import { ArrowRight, Play, Rocket } from 'lucide-react'
import React from 'react'

const CTA = ({token, navigate}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full sm:w-auto justify-center cursor-pointer">
            <button
              onClick={() => token ? navigate("/home/myrequests") : navigate("/auth")}
              className="group relative bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 hover:scale-105 transition-all duration-300 px-8 py-4 rounded-2xl font-bold shadow-xl shadow-indigo-500/30 overflow-hidden cursor-pointer"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 text-white">
                <Rocket size={20} />
                Request Resources
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            <button
              onClick={() => navigate("/home/resources")}
              className="group glass-card border-white text-white bg-gradient-to-r from-purple-500 to-cyan-500 px-8 py-4 rounded-2xl font-semibold  flex items-center justify-center gap-2  hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <Play size={18} />
              Explore Resources
            </button>
          </div>
  )
}

export default CTA