import React from 'react';
import { Zap, Map, ShieldCheck, LineChart } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

const Features = () => {
  const [ref, isVisible] = useScrollReveal();
  
  const chartHeights = [
    "h-[15%] group-hover:h-[40%]",
    "h-[15%] group-hover:h-[70%]",
    "h-[15%] group-hover:h-[45%]",
    "h-[15%] group-hover:h-[90%]",
    "h-[15%] group-hover:h-[60%]"
  ];

  return (
    <section id="platform" className="py-24 bg-gray-50/50 dark:bg-[#060B19]/50 relative z-10" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-[#0A192F] dark:text-white">
            The Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-cyan-400 dark:to-blue-500">Forwarder Toolkit</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl">Everything you need to provide a Tier-1 digital experience, out of the box.</p>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px] transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>

          {/* Card 1: Search & Quote */}
          <div className="group relative rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0A192F] shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 col-span-1 md:col-span-2 row-span-1">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent dark:from-[#FF6B00]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative h-full p-8 md:p-10 flex flex-col md:flex-row items-start justify-between z-10">
              <div className="w-full md:w-[45%]">
                <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-[#FF6B00]/20 flex items-center justify-center text-[#FF6B00] mb-6 transition-transform duration-500 group-hover:scale-110">
                  <Zap size={24} />
                </div>
                <h3 className="text-2xl font-bold text-[#0A192F] dark:text-white mb-3">Search, Quote & Book</h3>
                <p className="text-gray-600 dark:text-gray-400">Instant rate search with controlled margins. Empower your shippers to self-serve bookings across all modes instantly.</p>
              </div>
            </div>
          </div>

          {/* Card 2: Track & Trace */}
          <div className="group relative rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0A192F] shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 col-span-1 row-span-2 flex flex-col">
            <div className="relative p-8 z-10 flex flex-col h-full">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-cyan-900/30 flex items-center justify-center text-blue-600 dark:text-cyan-400 mb-6 transition-transform duration-500 group-hover:scale-110">
                <Map size={24} />
              </div>
              <h3 className="text-2xl font-bold text-[#0A192F] dark:text-white mb-3">Track & Trace</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8">Crystal clear, real-time visibility across ocean, air, and road. Stop the "where is my cargo?" emails forever.</p>
            </div>
          </div>

          {/* Card 3: Secure Payments */}
          <div className="group relative rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0A192F] shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 col-span-1 row-span-1 flex flex-col">
            <div className="relative p-8 z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300 transition-transform duration-500 group-hover:scale-110">
                  <ShieldCheck size={24} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#0A192F] dark:text-white mb-2">Secure Payments</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">One-click online payments reducing your DSO natively.</p>
            </div>
          </div>

          {/* Card 4: Actionable Analytics */}
          <div className="group relative rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0A192F] shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 col-span-1 row-span-1 flex flex-col">
            <div className="relative p-8 z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 transition-transform duration-500 group-hover:scale-110">
                  <LineChart size={24} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#0A192F] dark:text-white mb-2">Actionable Analytics</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Supply chain insights that help your clients optimize spend.</p>

              <div className="mt-auto flex items-end justify-between h-20 gap-2">
                {chartHeights.map((classes, i) => (
                  <div key={i} className="w-full bg-gray-100 dark:bg-gray-800 rounded-t-sm h-full relative flex items-end overflow-hidden">
                    <div 
                      className={`w-full bg-gradient-to-t from-indigo-400 to-indigo-600 dark:from-cyan-600 dark:to-cyan-400 rounded-t-sm transition-all duration-700 ease-out ${classes}`}
                      style={{ transitionDelay: `${i * 75}ms` }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Features;
