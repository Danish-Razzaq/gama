import React from 'react';
import { Globe, Anchor, Plane, Truck, Box } from 'lucide-react';

const Marquee = () => {
  const logos = [
    { name: "CargoWise", icon: <Globe size={28} /> },
    { name: "Maersk", icon: <Anchor size={28} /> },
    { name: "FedEx", icon: <Plane size={28} /> },
    { name: "DHL", icon: <Truck size={28} /> },
    { name: "Sealink", icon: <Anchor size={28} /> },
    { name: "Guided Imports", icon: <Box size={28} /> },
  ];

  const marqueeItems = [...logos, ...logos, ...logos];

  return (
    <div className="py-10 bg-white/50 dark:bg-[#060B19]/50 backdrop-blur-sm border-y border-gray-100 dark:border-gray-800/50 overflow-hidden relative z-10">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#F8F9FA] dark:from-[#060B19] to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#F8F9FA] dark:from-[#060B19] to-transparent z-10"></div>
      
      <p className="text-center text-sm font-semibold text-gray-500 dark:text-gray-400 mb-6 uppercase tracking-widest">
        Integrated seamlessly with platforms trusted by
      </p>

      <div className="flex animate-marquee whitespace-nowrap">
        {marqueeItems.map((logo, idx) => (
          <div key={idx} className="flex items-center space-x-2 mx-8 text-gray-400 dark:text-gray-600 hover:text-[#0A192F] dark:hover:text-cyan-400 transition-colors duration-300 cursor-pointer grayscale hover:grayscale-0">
            {logo.icon}
            <span className="text-xl font-bold font-sans">{logo.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
