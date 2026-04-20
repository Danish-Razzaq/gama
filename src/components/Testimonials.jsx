import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [ref, isVisible] = useScrollReveal();
  
  const testimonials = [
    { name: "Sarah Jenkins", role: "CEO, OceanFreight Ltd", metric: "35 mins to 4 mins", quote: "GamaSuite cut our quoting time drastically. Our customers love the self-serve portal." },
    { name: "Marcus Chen", role: "VP Operations, GlobalLogix", metric: "210% more clients", quote: "Since launching our branded Gama portal, we've onboarded clients at a record pace. It's a game-changer." },
    { name: "Elena Rostova", role: "Director, EuroTransit", metric: "Zero lost emails", quote: "All communication and tracking in one place. It transformed how our team operates internally and externally." }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="py-24 bg-gray-50 dark:bg-[#040812] relative z-10 overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-[#0A192F] dark:text-white mb-16">
          Voices of the <span className="text-[#FF6B00]">Industry</span>
        </h2>

        <div className={`relative h-[300px] flex justify-center items-center transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {testimonials.map((t, i) => {
            let offset = i - activeIndex;
            if (offset < -1) offset += testimonials.length;
            if (offset > 1) offset -= testimonials.length;

            const isCenter = offset === 0;
            const style = {
              transform: `translateX(${offset * 120}%) scale(${isCenter ? 1 : 0.85})`,
              opacity: isCenter ? 1 : 0.4,
              filter: isCenter ? 'blur(0px)' : 'blur(4px)',
              zIndex: isCenter ? 20 : 10,
            };

            return (
              <div 
                key={i} 
                className="absolute w-full max-w-md transition-all duration-700 ease-out"
                style={style}
              >
                <div className="bg-white dark:bg-[#0A192F] p-8 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 text-left">
                  <div className="flex text-yellow-400 mb-4">
                    {[1,2,3,4,5].map(star => <Star key={star} size={16} fill="currentColor" />)}
                  </div>
                  <p className="text-xl text-gray-700 dark:text-gray-300 italic mb-6">"{t.quote}"</p>
                  <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-4">
                    <div>
                      <h4 className="font-bold text-[#0A192F] dark:text-white">{t.name}</h4>
                      <p className="text-sm text-gray-500">{t.role}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-[#FF6B00] font-bold">{t.metric}</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide">Result</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
