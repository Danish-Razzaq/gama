'use client'
import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, ChevronRight, Zap, Box, Map, ShieldCheck, 
  LineChart, ArrowRight, Menu, X, CheckCircle2, Star,
  Smartphone, Globe, Anchor, Plane, Truck, FileText, Bell,
  Mail, FileSpreadsheet, AlertTriangle, Activity,
  LayoutDashboard, Search, DollarSign, RefreshCw,
  ArrowUpRight, ArrowDownUp, Crosshair, MapPin,
  MessageSquare, Cpu, Settings, Share2, Leaf, Layers,
  Clock, Building, ArrowLeft, Check, User, Video, Navigation, Calendar, Image
} from 'lucide-react';



export const CrossPlatformExperience = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const sectionRefs = useRef([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const platformFeatures = [
    {
      title: "Global Command Center",
      desc: "Give your shippers a comprehensive desktop dashboard. Track all active containerized loads and manage the supply chain from a single screen.",
      icon: <LayoutDashboard strokeWidth={1.5} />
    },
    {
      title: "Centralized Documents",
      desc: "End the email chaos. Customers can securely access, upload, and approve bills of lading, commercial invoices, and customs documents.",
      icon: <FileText strokeWidth={1.5} />
    },
    {
      title: "Port Compliance & Alerts",
      desc: "Stay ahead of customs holds and terminal fees. Automate ISF filings and trigger real-time demurrage warnings before costs accrue.",
      icon: <ShieldCheck strokeWidth={1.5} />
    },
    {
      title: "Analytics & Insights",
      desc: "Provide comprehensive reporting on freight spend, lane performance, and carbon footprint directly from the dashboard.",
      icon: <LineChart strokeWidth={1.5} />
    },
    {
      title: "Supply Chain In Their Pocket",
      desc: "Take the experience fully mobile. Provide a white-labeled iOS and Android app so clients can receive instant push notifications on the go.",
      icon: <Smartphone strokeWidth={1.5} />
    }
  ];

  useEffect(() => {
    if (!mounted) return;
    
    const handleScroll = () => {
      const triggerPoint = window.innerWidth < 1024 
         ? window.innerHeight * 0.75 
         : window.innerHeight * 0.45;
         
      let closestIndex = 0;
      let minDistance = Infinity;

      sectionRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const center = rect.top + rect.height / 2;
          const distance = Math.abs(triggerPoint - center);
          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = index;
          }
        }
      });
      setActiveIndex(closestIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted]);

  const isMobile = activeIndex === 4;

  return (
    <section className="relative z-10 bg-[#FAFAFA] border-y border-gray-100">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex flex-col lg:flex-row relative">

        {/* Left Column: Text Content */}
        <div className="w-full lg:w-[45%] pb-[10vh] lg:pb-[35vh] order-2 lg:order-1 pt-16 lg:pt-0">
           
           <div className="pt-16 lg:pt-48 mb-24 lg:mb-40 relative z-10 text-center lg:text-left">
             <div className="inline-flex items-center space-x-3 px-4 py-1.5 rounded-full border border-gray-200/80 bg-white shadow-sm mb-8">
               <span className="flex h-1.5 w-1.5 rounded-full bg-[#FF5C00]"></span>
               <span className="text-[10px] font-normal text-gray-500 tracking-[0.2em] uppercase">Omnichannel</span>
             </div>
             <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-gray-900 mb-8 tracking-tight leading-[1.15]">
               Your supply chain, <br/>
               <span className="orange-hover-fx font-light mt-2 inline-block">on every screen.</span>
             </h2>
             <p className="text-lg sm:text-xl font-light text-gray-500 max-w-md mx-auto lg:mx-0 leading-relaxed">
               Provide your shippers with a fully-featured, white-labeled portal synced directly with your core system. 
             </p>
           </div>

           <div className="relative z-10">
             <div className="absolute left-[26px] top-12 bottom-[-10vh] w-px bg-gray-200 hidden lg:block"></div>

             {platformFeatures.map((f, i) => (
                <div 
                  key={i} 
                  ref={el => sectionRefs.current[i] = el} 
                  className={`relative pl-0 lg:pl-24 mb-[25vh] lg:mb-[35vh] transition-all duration-1000 ease-out flex flex-col justify-center origin-left text-center lg:text-left items-center lg:items-start ${activeIndex === i ? 'opacity-100 translate-y-0' : 'opacity-30 translate-y-12'}`}
                >
                    <div className={`hidden lg:block absolute left-[26px] top-8 -translate-x-1/2 w-2 h-2 rounded-full transition-all duration-700 ${activeIndex === i ? 'bg-[#FF5C00] scale-150 shadow-[0_0_10px_rgba(255,92,0,0.5)]' : 'bg-gray-300 scale-100'}`}></div>

                    <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-6 sm:mb-8 transition-all duration-700 relative overflow-hidden ${activeIndex === i ? 'bg-white shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-gray-100 lg:translate-x-4' : 'bg-transparent border border-transparent'}`}>
                      <div className={`relative z-10 transition-transform duration-700 ${activeIndex === i ? 'scale-110 text-[#FF5C00]' : 'scale-100 text-gray-400'}`}>
                        {React.cloneElement(f.icon, { size: 28 })}
                      </div>
                    </div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-normal text-gray-900 mb-4 sm:mb-6 tracking-tight leading-tight">{f.title}</h3>
                    <p className="text-base sm:text-lg font-light text-gray-500 leading-relaxed max-w-md">{f.desc}</p>
                </div>
             ))}
           </div>
        </div>

        {/* Right Column: Sticky Morphing Hardware */}
        <div className="w-full lg:w-[55%] h-[40vh] sm:h-[50vh] lg:h-screen sticky top-24 lg:top-0 self-start flex flex-col items-center lg:items-start xl:items-center justify-center z-0 order-1 lg:order-2 overflow-hidden pointer-events-none lg:pointer-events-auto border-b border-gray-100 lg:border-none bg-gray-50/50 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none lg:pl-10 xl:pl-0">
           
           <div className="relative w-full flex flex-col items-center lg:items-start xl:items-center justify-center transform scale-[0.55] sm:scale-[0.7] md:scale-[0.85] lg:scale-[0.9] xl:scale-100 origin-center lg:origin-left xl:origin-center transition-transform duration-700">
               
               <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px] pointer-events-none transition-all duration-1000 ease-in-out ${isMobile ? 'w-64 h-[500px] bg-[#FF5C00]/10' : 'w-[500px] h-[300px] bg-blue-400/10'}`}></div>

               {/* Morphing Device Bezel */}
               <div 
                 className={`relative bg-white flex flex-col overflow-hidden z-20 border border-gray-200/80
                   transition-[width,height,border-radius,box-shadow,border-width] duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]
                   ${isMobile 
                     ? 'w-[280px] h-[580px] rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.12)] border-[8px]' 
                     : 'w-[600px] h-[380px] rounded-t-2xl rounded-b-none shadow-[0_20px_50px_rgba(0,0,0,0.06)] border-[10px] border-b-[16px]'
                   }
                 `}
               >
                  {/* Laptop Camera / Phone Dynamic Island */}
                  <div className={`absolute left-1/2 -translate-x-1/2 bg-gray-100 border border-gray-200/80 rounded-full z-30 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${isMobile ? 'top-3 w-20 h-5' : 'top-[-5px] w-1.5 h-1.5 border-none bg-gray-300'}`}></div>

                  <div className={`relative w-full h-full bg-[#FAFAFA] overflow-hidden transition-all duration-1000 ${isMobile ? 'rounded-[2rem]' : 'rounded-sm'}`}>
                     
                     {/* Screen 0: Dashboard */}
                     <div className={`absolute inset-0 w-full h-full bg-[#FAFAFA] flex transition-opacity duration-700 ${activeIndex === 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                        <div className="w-32 sm:w-40 bg-white border-r border-gray-100 p-4 sm:p-6 flex flex-col gap-4">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-5 h-5 bg-blue-50 text-blue-500 rounded-md flex items-center justify-center"><Navigation size={12} strokeWidth={1.5} /></div>
                            <div className="h-3 w-12 sm:w-16 bg-gray-100 rounded"></div>
                          </div>
                          <div className="h-2 w-full bg-gray-100 rounded-full"></div>
                          <div className="h-2 w-3/4 bg-gray-100 rounded-full"></div>
                          <div className="h-2 w-full bg-orange-50 rounded-full"></div>
                          <div className="h-2 w-5/6 bg-gray-100 rounded-full"></div>
                        </div>
                        <div className="flex-1 p-4 sm:p-6 relative flex flex-col gap-4">
                          <div className="flex justify-between items-center mb-2">
                             <div className="h-4 w-24 sm:w-32 bg-gray-200 rounded-full"></div>
                             <div className="h-6 w-16 sm:w-24 bg-white border border-gray-100 rounded-full"></div>
                          </div>
                          <div className="flex gap-4">
                            <div className="flex-1 h-16 sm:h-20 bg-white rounded-xl border border-gray-100 p-3 sm:p-4 shadow-sm flex flex-col justify-end"><div className="h-2 w-1/2 bg-blue-100 rounded-full"></div></div>
                            <div className="flex-1 h-16 sm:h-20 bg-white rounded-xl border border-gray-100 p-3 sm:p-4 shadow-sm flex flex-col justify-end"><div className="h-2 w-1/2 bg-orange-100 rounded-full"></div></div>
                            <div className="flex-1 h-16 sm:h-20 bg-white rounded-xl border border-gray-100 p-3 sm:p-4 shadow-sm flex flex-col justify-end"><div className="h-2 w-1/2 bg-green-100 rounded-full"></div></div>
                          </div>
                          <div className="flex-1 bg-white rounded-xl border border-gray-100 p-4 relative overflow-hidden flex items-center justify-center shadow-sm">
                             <Map size={240} className="text-gray-50 absolute" strokeWidth={1} />
                             <div className="bg-white/90 backdrop-blur-md border border-gray-100 p-4 rounded-xl shadow-lg relative z-10 w-48 sm:w-64">
                               <div className="flex justify-between items-center mb-3"><span className="text-[10px] font-normal tracking-widest text-gray-400 uppercase">SHP-9021</span><span className="w-2 h-2 bg-[#FF5C00] rounded-full animate-pulse"></span></div>
                               <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-[#FF5C00] w-2/3"></div></div>
                             </div>
                          </div>
                        </div>
                     </div>

                     {/* Screen 1: Documents */}
                     <div className={`absolute inset-0 w-full h-full bg-[#FAFAFA] flex transition-opacity duration-700 ${activeIndex === 1 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                        <div className="w-32 sm:w-40 bg-white border-r border-gray-100 p-4 sm:p-6 flex flex-col gap-4">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-5 h-5 bg-blue-50 rounded-md"></div><div className="h-3 w-12 sm:w-16 bg-gray-100 rounded"></div>
                          </div>
                          <div className="h-2 w-full bg-gray-100 rounded-full"></div>
                          <div className="h-2 w-full bg-[#FF5C00]/10 rounded-full border-l-[2px] border-[#FF5C00]"></div>
                          <div className="h-2 w-5/6 bg-gray-100 rounded-full"></div>
                        </div>
                        <div className="flex-1 p-4 sm:p-6 flex flex-col">
                           <div className="flex justify-between items-center mb-6">
                             <div className="h-4 w-24 sm:w-32 bg-gray-200 rounded-full"></div>
                             <div className="h-7 w-20 sm:w-24 bg-white border border-gray-100 rounded-lg flex justify-center items-center"><div className="h-1.5 w-10 bg-gray-300 rounded-full"></div></div>
                           </div>
                           <div className="grid grid-cols-3 gap-4">
                              {[1,2,3,4,5,6].map((i) => (
                                <div key={i} className="bg-white border border-gray-100 rounded-xl p-3 sm:p-4 flex flex-col items-center justify-center gap-3 shadow-sm">
                                   <FileText size={20} strokeWidth={1} className="text-gray-300" />
                                   <div className="h-1.5 w-12 sm:w-16 bg-gray-200 rounded-full"></div>
                                </div>
                              ))}
                           </div>
                        </div>
                     </div>

                     {/* Screen 2: Compliance Alerts */}
                     <div className={`absolute inset-0 w-full h-full bg-[#FAFAFA] flex transition-opacity duration-700 ${activeIndex === 2 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                        <div className="w-32 sm:w-40 bg-white border-r border-gray-100 p-4 sm:p-6 flex flex-col gap-4">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-5 h-5 bg-blue-50 rounded-md"></div><div className="h-3 w-12 sm:w-16 bg-gray-100 rounded"></div>
                          </div>
                          <div className="h-2 w-full bg-gray-100 rounded-full"></div>
                          <div className="h-2 w-3/4 bg-[#FF5C00]/10 rounded-full border-l-[2px] border-[#FF5C00]"></div>
                          <div className="h-2 w-5/6 bg-gray-100 rounded-full"></div>
                        </div>
                        <div className="flex-1 p-4 sm:p-6 flex flex-col gap-4">
                           <div className="h-4 w-24 sm:w-32 bg-gray-200 rounded-full mb-2"></div>
                           <div className="bg-white border border-red-100 border-l-[4px] border-l-red-400 rounded-xl p-4 shadow-sm flex items-center gap-4">
                              <AlertTriangle size={20} strokeWidth={1.5} className="text-red-400" />
                              <div>
                                <div className="h-2 w-20 sm:w-24 bg-gray-800 rounded-full mb-2"></div>
                                <div className="h-1.5 w-32 sm:w-40 bg-gray-400 rounded-full"></div>
                              </div>
                           </div>
                           <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm flex items-center gap-4">
                              <CheckCircle2 size={20} strokeWidth={1.5} className="text-green-400" />
                              <div>
                                <div className="h-2 w-24 sm:w-32 bg-gray-400 rounded-full mb-2"></div>
                                <div className="h-1.5 w-20 sm:w-24 bg-gray-200 rounded-full"></div>
                              </div>
                           </div>
                           <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm flex items-center gap-4">
                              <CheckCircle2 size={20} strokeWidth={1.5} className="text-green-400" />
                              <div>
                                <div className="h-2 w-20 sm:w-28 bg-gray-400 rounded-full mb-2"></div>
                                <div className="h-1.5 w-24 sm:w-32 bg-gray-200 rounded-full"></div>
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* Screen 3: Analytics */}
                     <div className={`absolute inset-0 w-full h-full bg-[#FAFAFA] flex transition-opacity duration-700 ${activeIndex === 3 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                        <div className="w-32 sm:w-40 bg-white border-r border-gray-100 p-4 sm:p-6 flex flex-col gap-4">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-5 h-5 bg-blue-50 rounded-md"></div><div className="h-3 w-12 sm:w-16 bg-gray-100 rounded"></div>
                          </div>
                          <div className="h-2 w-full bg-gray-100 rounded-full"></div>
                          <div className="h-2 w-5/6 bg-[#FF5C00]/10 rounded-full border-l-[2px] border-[#FF5C00]"></div>
                        </div>
                        <div className="flex-1 p-4 sm:p-6 flex flex-col gap-4">
                           <div className="flex justify-between items-center mb-2">
                             <div className="h-4 w-24 sm:w-32 bg-gray-200 rounded-full"></div>
                           </div>
                           <div className="flex gap-4 h-20 sm:h-24">
                              <div className="flex-1 bg-white border border-gray-100 rounded-xl p-4 shadow-sm flex flex-col justify-center">
                                 <div className="h-1.5 w-12 sm:w-16 bg-gray-300 rounded-full mb-3"></div>
                                 <div className="h-4 sm:h-5 w-20 sm:w-24 bg-gray-800 rounded-full"></div>
                              </div>
                              <div className="flex-1 bg-white border border-gray-100 rounded-xl p-4 shadow-sm flex flex-col justify-center items-end text-right">
                                 <div className="h-1.5 w-16 sm:w-20 bg-gray-300 rounded-full mb-3"></div>
                                 <div className="h-4 sm:h-5 w-12 sm:w-16 bg-green-400 rounded-full"></div>
                              </div>
                           </div>
                           <div className="flex-1 bg-white border border-gray-100 rounded-xl p-4 sm:p-6 shadow-sm flex items-end gap-4">
                              <div className="flex-1 bg-blue-50 rounded-t-md h-[40%]"></div>
                              <div className="flex-1 bg-blue-50 rounded-t-md h-[60%]"></div>
                              <div className="flex-1 bg-blue-100 rounded-t-md h-[30%]"></div>
                              <div className="flex-1 bg-blue-400 rounded-t-md h-[80%] relative"><div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 h-1.5 sm:h-2 w-8 sm:w-10 bg-gray-800 rounded-full"></div></div>
                              <div className="flex-1 bg-blue-50 rounded-t-md h-[50%]"></div>
                           </div>
                        </div>
                     </div>

                     {/* Screen 4: Mobile App */}
                     <div className={`absolute top-0 left-0 w-full h-full bg-[#FAFAFA] flex flex-col pt-14 px-5 transition-opacity duration-700 delay-300 ${activeIndex === 4 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                         <div className="flex justify-between items-center mb-8 px-2">
                           <div className="w-16 h-3 bg-gray-200 rounded-full"></div>
                           <div className="w-8 h-8 rounded-full bg-white border border-gray-200"></div>
                         </div>
                         <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-6 shadow-sm relative overflow-hidden">
                           <div className="text-[10px] text-gray-400 font-mono tracking-widest uppercase mb-2">SHP-9021</div>
                           <div className="text-xl font-normal tracking-tight text-gray-900 mb-6">In Transit</div>
                           <div className="flex justify-between text-xs font-normal text-gray-400 mb-3">
                             <span>SHA</span> <span className="opacity-30">⟶</span> <span>LAX</span>
                           </div>
                           <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                             <div className="w-2/3 h-full bg-[#FF5C00] rounded-full"></div>
                           </div>
                         </div>
                         <div className="flex flex-col gap-3">
                            <div className="text-[10px] font-normal text-gray-400 uppercase tracking-[0.2em] mb-1 px-2">Recent Activity</div>
                            <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                               <div className="w-10 h-10 rounded-full bg-orange-50 text-[#FF5C00] flex items-center justify-center"><Bell size={16} strokeWidth={1.5}/></div>
                               <div><div className="text-xs font-normal text-gray-900">Customs Cleared</div><div className="text-[10px] text-gray-400 mt-1">12 mins ago</div></div>
                            </div>
                            <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                               <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center"><MapPin size={16} strokeWidth={1.5}/></div>
                               <div><div className="text-xs font-normal text-gray-900">Departed Origin</div><div className="text-[10px] text-gray-400 mt-1">2 days ago</div></div>
                            </div>
                         </div>
                     </div>

                  </div>
               </div>

               {/* Laptop Base (Hides on Mobile) */}
               <div 
                 className={`bg-white shadow-[0_20px_40px_rgba(0,0,0,0.06)] relative z-10 flex items-start justify-center border border-gray-100 border-t-0
                   transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]
                   ${isMobile 
                     ? 'w-0 h-0 opacity-0 -translate-y-4 scale-50 border-none rounded-none' 
                     : 'w-[660px] h-4 opacity-100 translate-y-0 scale-100 rounded-b-2xl -mt-[2px]'
                   }
                 `}
               >
                  <div className={`w-24 h-1.5 bg-gray-200/60 rounded-b-md transition-opacity duration-300 ${isMobile ? 'opacity-0' : 'opacity-100'}`}></div>
               </div>

           </div>
        </div>
      </div>
    </section>
  );
};