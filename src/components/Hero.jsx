import React from 'react';
import { Play, ArrowRight, Box } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

const Hero = () => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden z-10" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-cyan-900/30 border border-blue-100 dark:border-cyan-800/50 mb-6">
            <span className="flex h-2 w-2 rounded-full bg-[#FF6B00] animate-pulse"></span>
            <span className="text-xs font-semibold text-blue-800 dark:text-cyan-300 tracking-wide uppercase">GamaSuite 2.0 is Live</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold text-[#0A192F] dark:text-white leading-tight mb-6 tracking-tight">
            Logistics Automation <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-orange-400">
              for the Modern Forwarder.
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-xl leading-relaxed">
            Give your customers a fully digital, branded shipping experience. Don't replace your TMS—supercharge it with our seamless frontend portal.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button className="w-full sm:w-auto btn-liquid px-8 py-4 rounded-full text-white font-bold text-lg shadow-[0_0_20px_rgba(255,107,0,0.5)] flex items-center justify-center group">
              Start a Free Trial
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-[#0A192F] dark:text-white flex items-center justify-center hover:bg-gray-100 dark:hover:bg-white/5 transition-colors group">
              <div className="relative mr-3">
                <div className="absolute inset-0 bg-blue-400 dark:bg-cyan-400 rounded-full animate-ping opacity-20 group-hover:opacity-40"></div>
                <Play className="text-[#FF6B00] dark:text-cyan-400 relative z-10" fill="currentColor" size={20} />
              </div>
              See How It Works
            </button>
          </div>
        </div>

        <div className={`relative hidden lg:block transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
          <div className="relative w-full aspect-square max-w-lg mx-auto">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-tr from-blue-500/20 to-orange-500/20 dark:from-cyan-500/20 dark:to-[#FF6B00]/20 rounded-full blur-3xl"></div>
            
            <div className="absolute top-10 right-0 w-full h-[80%] bg-white/80 dark:bg-[#0A192F]/80 backdrop-blur-xl rounded-2xl border border-white/40 dark:border-cyan-500/30 shadow-2xl transform rotate-y-[-15deg] rotate-x-[5deg] transition-transform duration-700 hover:rotate-y-0 hover:rotate-x-0 group">
              <div className="h-12 border-b border-gray-200 dark:border-gray-700/50 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="p-6 grid grid-cols-3 gap-4 h-[calc(100%-3rem)]">
                <div className="col-span-2 space-y-4">
                  <div className="h-24 bg-gray-100 dark:bg-gray-800/50 rounded-xl p-4 flex flex-col justify-between">
                    <div className="w-1/2 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="w-3/4 h-8 bg-blue-100 dark:bg-cyan-900/40 rounded mt-2"></div>
                  </div>
                  <div className="h-32 bg-gray-100 dark:bg-gray-800/50 rounded-xl p-4 relative overflow-hidden">
                    <svg className="absolute bottom-0 left-0 w-full text-[#FF6B00] opacity-50" viewBox="0 0 100 20" preserveAspectRatio="none">
                      <path d="M0 20 L 20 10 L 40 15 L 60 5 L 80 12 L 100 0 L 100 20 Z" fill="currentColor"/>
                    </svg>
                  </div>
                </div>
                <div className="col-span-1 space-y-4">
                  <div className="h-full bg-orange-50 dark:bg-[#FF6B00]/10 rounded-xl p-4 border border-orange-100 dark:border-[#FF6B00]/20 flex flex-col items-center justify-center gap-2">
                    <Box className="text-[#FF6B00] animate-bounce-slight" size={32} />
                    <div className="w-16 h-3 bg-[#FF6B00]/50 rounded"></div>
                  </div>
                </div>
              </div>

              <div className="absolute -left-12 top-20 bg-white dark:bg-[#112240] p-4 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 flex items-center gap-3 animate-float">
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg text-green-600 dark:text-green-400">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Invoice #402</div>
                  <div className="text-sm font-bold dark:text-white">Paid in Full</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
