import { Sparkles } from 'lucide-react'
import React from 'react'

const Badge = () => {
  return (
    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 text-indigo-600 px-4 py-2 rounded-full hover:border-indigo-500/40 transition-all duration-300 cursor-default">
            <Sparkles size={16} className="animate-pulse" />
            <span className="text-sm font-medium">
              A product by The DevLoopers
            </span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </div>
  )
}

export default Badge