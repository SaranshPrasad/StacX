import React from 'react'

const QuickStats = () => {
  return (
   <div className="flex flex-col sm:flex-row items-center gap-4 mt-10 justify-center">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-[#050816] overflow-hidden shadow-md"
                >
                  <img
                    src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? "women" : "men"}/${i + 10}.jpg`}
                    alt="Student Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="text-center sm:text-left">
              <p className="text-white font-bold">Scalable for 10000+</p>
              <p className="text-gray-500 text-sm">Active Students</p>
            </div>
          </div>
  )
}

export default QuickStats