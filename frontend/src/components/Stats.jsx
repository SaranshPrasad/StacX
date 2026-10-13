

const Stats = ({ stats, AnimatedCounter }) => {
  return (
    <section className="relative py-16 md:py-24 px-4 md:px-8 bg-slate-50 overflow-hidden">
      
      {/* Subtle Background Accent Pattern to tie into the Hero section */}
      <div 
        className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#0f172a04_1px,transparent_1px),linear-gradient(to_bottom,#0f172a04_1px,transparent_1px)] bg-[size:24px_24px] opacity-60"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Main Stats Card Frame */}
        <div className="bg-white border border-slate-200/80 rounded-3xl sm:rounded-[32px] p-8 md:p-12 shadow-sm shadow-slate-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 divide-y sm:divide-y-0 sm:gap-y-12 lg:divide-x lg:divide-slate-100">
            
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={index}
                  className="group flex flex-col items-center text-center pt-6 sm:pt-0 lg:px-6 transition-all duration-300 first:pt-0"
                >
                  {/* Icon Container with subtle color tone transformations */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-4 rounded-xl bg-indigo-50/60 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 group-hover:shadow-md group-hover:shadow-indigo-600/10">
                    <IconComponent size={22} className="transition-colors duration-300" />
                  </div>

                  {/* Clean, High-Contrast Typography Counter */}
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                    <AnimatedCounter
                      end={stat.value}
                      suffix={stat.suffix}
                    />
                  </h3>

                  {/* Label Meta */}
                  <p className="text-slate-500 font-medium mt-2 text-sm sm:text-base tracking-wide">
                    {stat.label}
                  </p>
                </div>
              );
            })}

          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
