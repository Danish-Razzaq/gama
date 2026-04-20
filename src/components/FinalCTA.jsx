import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

const FinalCTA = ({ isDark }) => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section className="py-24 px-6 relative z-10" ref={ref}>
      <div className={`max-w-5xl mx-auto rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden transition-all duration-1000 transform ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'} ${
        isDark 
          ? 'bg-[#0A192F] border border-cyan-900/30' 
          : 'bg-gradient-to-b from-blue-50 to-white border border-blue-100 shadow-xl'
      }`}>
        {isDark && (
          <div className="absolute -bottom-1/2 left-1/2 -translate-x-1/2 w-full max-w-2xl aspect-square bg-[#FF6B00]/20 rounded-full blur-[100px] pointer-events-none"></div>
        )}

        <div className="relative z-10">
          <h2 className="text-4xl md:text-6xl font-extrabold text-[#0A192F] dark:text-white mb-6 tracking-tight">
            It's time to go digital <br/> with Gama.
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
            Join the forwarders who are already providing a next-gen customer experience and scaling without adding headcount.
          </p>
          <button className="btn-liquid text-lg px-10 py-5 rounded-full text-white font-bold shadow-[0_0_30px_rgba(255,107,0,0.5)] hover:shadow-[0_0_50px_rgba(255,107,0,0.7)] transform hover:-translate-y-1 transition-all">
            Schedule Your Demo Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
