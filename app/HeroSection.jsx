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

// --- Custom Hooks ---
const useScrollReveal = (options = { threshold: 0.1 }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, options);

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options.threshold]);

  return [ref, isVisible];
};

// Reusable Logo Component
const LogoMark = ({ className = "w-8 h-8", colorClass = "text-[#FF5C00]" }) => (
  <svg viewBox="0 0 100 100" className={`${className} ${colorClass} transition-colors duration-500`}>
    <circle cx="50" cy="50" r="50" fill="currentColor" />
    <path d="M48 22 L22 48 L48 72 L60 60 L46 48 L60 34 Z" fill="white" />
    <path d="M52 78 L78 52 L52 28 L40 40 L54 52 L40 66 Z" fill="white" />
  </svg>
);

// --- Global UI Components ---

const ParticleBackground = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#FAFAFA]">
     <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02]"></div>
     <div className="absolute top-[-10%] left-[-10%] w-[60%] lg:w-[40%] h-[40%] rounded-full blur-[150px] bg-blue-200/20"></div>
     <div className="absolute bottom-[-10%] right-[-10%] w-[60%] lg:w-[40%] h-[40%] rounded-full blur-[150px] bg-orange-200/10"></div>
  </div>
);

const Navbar = ({ onOpenDemo, currentRoute, setCurrentRoute }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = (route) => {
    setCurrentRoute(route);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'py-4 bg-[#FF5C00] shadow-[0_4px_20px_rgba(255,92,0,0.3)] border-b border-transparent' 
        : 'py-6 lg:py-8 bg-transparent border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex justify-between items-center relative">
        
        <div onClick={() => navigate('home')} className="flex items-center gap-3 group cursor-pointer z-50">
         <img src={'/images/logo.svg'} alt='logo ' />
        </div>

        {/* Desktop Nav */}
        <div className={`hidden lg:flex items-center space-x-10 px-8 py-3 rounded-full border transition-all duration-500 ${
          scrolled 
            ? 'bg-white/10 backdrop-blur-md border-white/20' 
            : 'bg-white/60 backdrop-blur-md border-gray-200/60 shadow-[0_2px_10px_rgba(0,0,0,0.01)]'
        }`}>
          <button onClick={() => navigate('bco')} className={`text-[13px] font-normal tracking-wide transition-colors duration-500 ${
            scrolled 
              ? (currentRoute === 'bco' ? 'text-white font-medium' : 'text-white/70 hover:text-white')
              : (currentRoute === 'bco' ? 'text-[#FF5C00]' : 'text-gray-500 hover:text-gray-900')
          }`}>
            Gama BCO
          </button>
          {['Platform', 'Integrations', 'Company'].map((item) => (
            <button key={item} onClick={() => navigate('home')} className={`text-[13px] font-normal tracking-wide transition-colors duration-500 ${
              scrolled ? 'text-white/70 hover:text-white' : 'text-gray-500 hover:text-gray-900'
            }`}>
              {item}
            </button>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center space-x-6">
          <button className={`text-[13px] font-normal tracking-wide transition-colors duration-500 ${
            scrolled ? 'text-white/90 hover:text-white' : 'text-gray-500 hover:text-gray-900'
          }`}>
            Log In
          </button>
          <button onClick={onOpenDemo} className={`px-6 py-2.5 rounded-full font-normal text-[13px] tracking-wide transition-all duration-500 hover:-translate-y-0.5 ${
            scrolled 
              ? 'bg-white text-[#FF5C00] shadow-[0_4px_14px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:bg-gray-50' 
              : 'bg-[#FF5C00] hover:bg-[#E65300] text-white shadow-[0_4px_14px_rgba(255,92,0,0.15)] hover:shadow-[0_6px_20px_rgba(255,92,0,0.2)]'
          }`}>
            Book Demo
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-3 lg:hidden z-50">
          <button className={`p-2 transition-colors duration-500 ${scrolled ? 'text-white' : 'text-gray-800'}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} strokeWidth={1} /> : <Menu size={24} strokeWidth={1} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-gray-200/60 transition-all duration-500 ease-in-out overflow-hidden ${mobileMenuOpen ? 'max-h-[500px] py-6 shadow-xl' : 'max-h-0 py-0 shadow-none border-transparent'}`}>
        <div className="px-8 flex flex-col space-y-4 text-center">
          <button onClick={() => navigate('home')} className="text-base font-light text-gray-600 hover:text-gray-900 transition-colors py-3 border-b border-gray-50">Home</button>
          <button onClick={() => navigate('bco')} className="text-base font-light text-gray-600 hover:text-gray-900 transition-colors py-3 border-b border-gray-50">Gama BCO</button>
          <button onClick={() => navigate('home')} className="text-base font-light text-gray-600 hover:text-gray-900 transition-colors py-3 border-b border-gray-50">Company</button>
          
          <div className="pt-4 flex flex-col gap-4">
             <button className="text-base font-normal text-gray-900 py-2">Log In</button>
             <button onClick={() => { setMobileMenuOpen(false); onOpenDemo(); }} className="bg-[#FF5C00] text-white py-3.5 rounded-full font-normal text-sm tracking-wide shadow-md">
               Book a Demo
             </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

// --- Page: Home View Components ---

const HomeHero = () => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section className="relative pt-40 sm:pt-48 pb-24 lg:pt-56 lg:pb-32 z-10" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10 text-center flex flex-col items-center">
        
        <div className={`transition-all duration-1000 transform flex flex-col items-center ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center space-x-3 px-5 py-2 rounded-full border border-gray-200/80 bg-white mb-10 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
            <span className="flex h-2 w-2 rounded-full bg-green-500 relative">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            </span>
            <span className="text-[11px] font-normal text-gray-500 tracking-[0.2em] uppercase">Gama OS is Live</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light text-gray-900 leading-[1.1] mb-8 tracking-tight max-w-5xl">
            The operational standard <br className="hidden sm:block"/>
            <span className="orange-hover-fx font-light">for modern logistics.</span>
          </h1>
          
          <p className="text-lg sm:text-xl font-light text-gray-500 mb-12 max-w-2xl leading-relaxed">
            Unify your freight forwarding, supply chain visibility, and BCO operations into a single, beautifully designed ecosystem.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button className="w-full sm:w-auto bg-[#FF5C00] hover:bg-[#E65300] px-10 py-4 rounded-full text-white font-normal text-sm tracking-wide flex items-center justify-center transition-all shadow-[0_8px_20px_rgba(255,92,0,0.2)] hover:-translate-y-0.5">
              Explore the Platform
              <ArrowRight className="ml-3" size={16} strokeWidth={1.5} />
            </button>
            <button className="w-full sm:w-auto bg-white px-10 py-4 rounded-full font-normal text-gray-700 flex items-center justify-center border border-gray-200 hover:border-gray-300 transition-all text-sm shadow-sm hover:shadow hover:-translate-y-0.5">
              <Play className="text-gray-400 mr-3" fill="currentColor" size={12} />
              Watch Overview
            </button>
          </div>
        </div>

        {/* Video Mockup Area */}
        <div className={`w-full max-w-5xl mt-20 relative transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
           <div className="relative w-full aspect-video bg-gray-900 rounded-[2rem] shadow-[0_30px_80px_rgba(0,0,0,0.1)] overflow-hidden border-8 border-white group cursor-pointer flex items-center justify-center">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-40 mix-blend-overlay group-hover:scale-105 transition-transform duration-1000"></div>
              <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:bg-[#FF5C00] group-hover:border-[#FF5C00] transition-colors duration-500 z-10">
                 <Play className="text-white ml-2" size={32} fill="currentColor" strokeWidth={1} />
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

const SocialProofMarquee = () => {
  const logos = [
    { name: "CMA CGM", text: "CMA CGM" },
    { name: "Maersk", text: "MAERSK" },
    { name: "Hapag", text: "Hapag-Lloyd" },
    { name: "Evergreen", text: "EVERGREEN" },
    { name: "MSC", text: "MSC" },
    { name: "Cosco", text: "COSCO" }
  ];

  return (
    <div className="py-16 bg-white border-y border-gray-100 overflow-hidden relative z-10">
      <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
      
      <p className="text-center text-[10px] font-normal text-gray-400 mb-10 uppercase tracking-[0.3em] px-4">
        Trusted integrations with global leaders
      </p>

      <div className="flex animate-marquee whitespace-nowrap items-center">
        {[...logos, ...logos, ...logos].map((logo, idx) => (
          <div key={idx} className="mx-16 text-xl font-light tracking-widest text-gray-300 uppercase select-none">
             {logo.text}
          </div>
        ))}
      </div>
    </div>
  );
};

const ProductOverview = ({ setCurrentRoute }) => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section className="py-32 relative z-10 bg-[#FAFAFA]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="text-center mb-24 relative z-10">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-tight">
            The complete suite. <br className="hidden sm:block"/>
            <span className="orange-hover-fx font-normal">Layered for scale.</span>
          </h2>
          <p className="text-lg font-light text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Separate your operational chaos from your financial backbone. Gama handles the logistics workflow, while Climax scales your enterprise ERP.
          </p>
        </div>

        <div className={`grid md:grid-cols-2 gap-8 lg:gap-12 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
           
           {/* Gama BCO Card */}
           <div className="bg-white rounded-[2rem] p-10 lg:p-14 border border-gray-200/60 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-all duration-500 group flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <div className="flex items-center gap-4 mb-8 relative z-10">
                 <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                    <Navigation size={24} strokeWidth={1.5} />
                 </div>
                 <div>
                    <h3 className="text-2xl font-normal text-gray-900 tracking-wide">Gama BCO</h3>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400 font-normal mt-1">Operations Layer</p>
                 </div>
              </div>
              
              <p className="text-base font-light text-gray-500 leading-relaxed mb-10 relative z-10">
                 Purpose-built for exporters and shippers. Manage shipments, track containers in real-time, and centralize documentation without replacing your accounting software.
              </p>

              <ul className="space-y-4 mb-12 relative z-10 flex-1">
                 {["Real-time track & trace visibility", "Centralized document management", "Carrier & Forwarder API sync"].map((item, i) => (
                   <li key={i} className="flex items-center gap-3 text-sm font-light text-gray-600">
                      <CheckCircle2 size={16} strokeWidth={1.5} className="text-gray-300" /> {item}
                   </li>
                 ))}
              </ul>

              <button onClick={() => setCurrentRoute('bco')} className="relative z-10 w-max flex items-center gap-2 text-sm font-normal text-gray-900 group-hover:text-[#FF5C00] transition-colors">
                 Explore Gama BCO <ArrowRight size={16} strokeWidth={1.5} className="transform group-hover:translate-x-1 transition-transform" />
              </button>
           </div>

           {/* Climax ERP Card */}
           <div className="bg-gray-900 rounded-[2rem] p-10 lg:p-14 border border-gray-800 shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.2)] transition-all duration-500 group flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF5C00]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <div className="flex items-center gap-4 mb-8 relative z-10">
                 <div className="w-12 h-12 bg-gray-800 text-white rounded-2xl flex items-center justify-center">
                    <Layers size={24} strokeWidth={1.5} />
                 </div>
                 <div>
                    <h3 className="text-2xl font-normal text-white tracking-wide">Climax ERP</h3>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 font-normal mt-1">Enterprise Layer</p>
                 </div>
              </div>
              
              <p className="text-base font-light text-gray-400 leading-relaxed mb-10 relative z-10">
                 The complete financial and accounting backbone for massive scale. Perfect for when your operations outgrow simple tools and require full general ledger sync.
              </p>

              <ul className="space-y-4 mb-12 relative z-10 flex-1">
                 {["Automated vendor reconciliation", "Multi-currency financial reporting", "Deep enterprise ledger mapping"].map((item, i) => (
                   <li key={i} className="flex items-center gap-3 text-sm font-light text-gray-400">
                      <CheckCircle2 size={16} strokeWidth={1.5} className="text-gray-600" /> {item}
                   </li>
                 ))}
              </ul>

              <button className="relative z-10 w-max flex items-center gap-2 text-sm font-normal text-white group-hover:text-[#FF5C00] transition-colors">
                 Learn about Climax <ArrowRight size={16} strokeWidth={1.5} className="transform group-hover:translate-x-1 transition-transform" />
               </button>
           </div>

        </div>
      </div>
    </section>
  );
};

// 6. Interactive Platform Features
const PlatformFeatures = () => {
  const [ref, isVisible] = useScrollReveal();
  
  const chartHeights = [
    "h-[20%] group-hover:h-[45%]",
    "h-[30%] group-hover:h-[75%]",
    "h-[15%] group-hover:h-[50%]",
    "h-[40%] group-hover:h-[95%]",
    "h-[25%] group-hover:h-[65%]",
    "h-[10%] group-hover:h-[80%]",
    "h-[35%] group-hover:h-[60%]"
  ];

  return (
    <section className="py-32 relative z-10 bg-white border-t border-gray-100" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
           <div>
             <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-tight">
               How it works.
             </h2>
             <p className="text-lg font-light text-gray-500 max-w-xl leading-relaxed">
               A comprehensive toolkit designed to modernize your forwarding operations and empower shippers to self-serve.
             </p>
           </div>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 auto-rows-[auto] lg:auto-rows-[340px] transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>

          {/* Card 1 */}
          <div className="group relative rounded-[2.5rem] overflow-hidden border border-gray-200/60 bg-[#F7F7F9] col-span-1 md:col-span-2 row-span-1 cursor-default hover:bg-white hover:shadow-[0_20px_60px_rgba(0,0,0,0.04)] transition-all duration-700">
            <div className="relative h-full p-10 lg:p-12 flex flex-col md:flex-row items-start justify-between z-10">
              <div className="w-full md:w-[45%]">
                <div className="w-14 h-14 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 mb-8 shadow-sm group-hover:text-[#FF5C00] transition-colors duration-500">
                  <Search size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-normal text-gray-900 mb-4 tracking-wide">Search & Quote</h3>
                <p className="text-base font-light text-gray-500 leading-relaxed">Fast, reliable freight shipping rates search gives your customers on-demand pricing across all modes—with your controlled markup.</p>
              </div>

              <div className="hidden md:flex absolute right-0 bottom-0 w-[45%] h-[85%] bg-white rounded-tl-[2.5rem] border-t border-l border-gray-100 shadow-[-10px_-10px_30px_rgba(0,0,0,0.02)] transition-all duration-700 translate-x-12 translate-y-12 group-hover:translate-x-0 group-hover:translate-y-0 flex-col p-8">
                <div className="flex justify-between items-center mb-8 text-gray-400">
                   <div className="text-[11px] font-normal tracking-widest uppercase">CNSHA</div>
                   <div className="flex-1 h-[1px] bg-gray-100 mx-6 relative">
                      <Plane className="absolute top-1/2 left-0 -translate-y-1/2 text-gray-300 group-hover:text-[#FF5C00] group-hover:left-[calc(100%-1rem)] transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]" size={16} strokeWidth={1.5}/>
                   </div>
                   <div className="text-[11px] font-normal tracking-widest uppercase">USLAX</div>
                </div>
                <div className="bg-[#F7F7F9] p-6 rounded-2xl border border-gray-100 mt-auto flex flex-col gap-4">
                   <div className="text-[10px] text-gray-400 uppercase tracking-widest font-normal">Ocean FCL • 20 Days</div>
                   <div className="flex justify-between items-end">
                      <div className="text-4xl font-light tracking-tight text-gray-900">$1,450</div>
                      <div className="bg-white text-gray-900 border border-gray-200 text-[10px] uppercase tracking-widest px-5 py-2.5 rounded-full font-normal group-hover:bg-[#FF5C00] group-hover:text-white group-hover:border-[#FF5C00] transition-colors cursor-pointer">Quote</div>
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group relative rounded-[2.5rem] overflow-hidden border border-gray-200/60 bg-[#F7F7F9] col-span-1 row-span-1 flex flex-col cursor-default hover:bg-white hover:shadow-[0_20px_60px_rgba(0,0,0,0.04)] transition-all duration-700">
             <div className="relative p-10 lg:p-12 flex flex-col h-full z-10">
                <div className="w-14 h-14 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 mb-8 shadow-sm group-hover:text-[#FF5C00] transition-colors duration-500">
                  <Box size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-normal text-gray-900 mb-4 tracking-wide">Book Shipments</h3>
                <p className="text-base font-light text-gray-500 leading-relaxed mb-8 md:mb-0">Hassle-free online booking options allow your customers to self-serve.</p>

                <div className="mt-auto w-full flex justify-start hidden md:flex opacity-30 group-hover:opacity-100 transition-opacity duration-500">
                   <div className="flex gap-4">
                      <div className="w-14 h-14 bg-white border border-gray-200/80 rounded-full flex items-center justify-center text-gray-400 shadow-sm group-hover:bg-[#FF5C00] group-hover:text-white group-hover:border-[#FF5C00] transition-colors duration-300 delay-100"><Anchor size={20} strokeWidth={1.5}/></div>
                      <div className="w-14 h-14 bg-white border border-gray-200/80 rounded-full flex items-center justify-center text-gray-400 shadow-sm transition-colors duration-300"><Plane size={20} strokeWidth={1.5}/></div>
                      <div className="w-14 h-14 bg-white border border-gray-200/80 rounded-full flex items-center justify-center text-gray-400 shadow-sm transition-colors duration-300"><Truck size={20} strokeWidth={1.5}/></div>
                   </div>
                </div>
             </div>
          </div>

          {/* Card 3 */}
          <div className="group relative rounded-[2.5rem] overflow-hidden border border-gray-200/60 bg-[#F7F7F9] col-span-1 row-span-1 md:row-span-2 flex flex-col cursor-default hover:bg-white hover:shadow-[0_20px_60px_rgba(0,0,0,0.04)] transition-all duration-700">
             <div className="relative p-10 lg:p-12 z-10 flex flex-col h-full">
                <div className="w-14 h-14 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 mb-8 shadow-sm group-hover:text-[#FF5C00] transition-colors duration-500">
                  <MapPin size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-normal text-gray-900 mb-4 tracking-wide">Real-Time Tracking</h3>
                <p className="text-base font-light text-gray-500 mb-10 leading-relaxed">Crystal clear visibility from pick-up through delivery, keeping customers updated.</p>

                <div className="relative flex-1 mt-auto pl-4 flex flex-col hidden md:flex opacity-40 group-hover:opacity-100 transition-opacity duration-700">
                   <div className="relative h-[220px] flex flex-col justify-between">
                     <div className="absolute left-[7px] top-[12px] bottom-[12px] w-px bg-gray-200 z-0"></div>
                     <div className="absolute left-[7px] top-[12px] w-px bg-[#FF5C00] h-0 group-hover:h-[calc(100%-24px)] transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] z-10"></div>

                     <div className="relative z-20 flex items-center gap-6">
                       <div className="w-4 h-4 rounded-full bg-white border-[2px] border-[#FF5C00] flex-shrink-0"></div>
                       <div className="text-sm font-normal text-gray-800 leading-tight">Origin Port</div>
                     </div>
                     
                     <div className="relative z-20 flex items-center gap-6">
                       <div className="w-4 h-4 rounded-full bg-white border-[2px] border-gray-200 group-hover:border-[#FF5C00] transition-colors duration-300 delay-[400ms] flex-shrink-0"></div>
                       <div className="text-sm font-normal text-gray-800 leading-tight">Ocean Transit</div>
                     </div>
                     
                     <div className="relative z-20 flex items-center gap-6">
                       <div className="w-4 h-4 rounded-full bg-white border-[2px] border-gray-200 group-hover:border-[#FF5C00] transition-colors duration-300 delay-0 group-hover:delay-[900ms] flex-shrink-0"></div>
                       <div className="text-sm font-normal text-gray-800 leading-tight transition-colors duration-300 delay-0 group-hover:delay-[900ms]">Destination</div>
                     </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Card 4 */}
          <div className="group relative rounded-[2.5rem] overflow-hidden border border-gray-200/60 bg-[#F7F7F9] col-span-1 row-span-1 flex flex-col cursor-default hover:bg-white hover:shadow-[0_20px_60px_rgba(0,0,0,0.04)] transition-all duration-700">
             <div className="relative p-10 lg:p-12 z-10 flex flex-col h-full">
                <div className="w-14 h-14 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 mb-8 shadow-sm group-hover:text-[#FF5C00] transition-colors duration-500">
                  <LayoutDashboard size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-normal text-gray-900 mb-4 tracking-wide">Manage Shipments</h3>
                <p className="text-base font-light text-gray-500 leading-relaxed mb-8 md:mb-0">Through an easy-to-use interface, customers can edit bookings and download documents.</p>

                <div className="mt-auto w-full flex justify-start hidden md:flex">
                   <div className="w-full max-w-[240px] bg-white rounded-2xl border border-gray-100 p-5 shadow-sm group-hover:-translate-y-3 transition-transform duration-700 ease-out">
                      <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-4">
                        <span className="text-[11px] font-normal text-gray-400 tracking-widest uppercase">SHP-9021</span>
                        <span className="text-[9px] text-green-500 font-normal uppercase tracking-widest">Active</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 group-hover:text-[#FF5C00] group-hover:border-orange-100 transition-colors"><FileText size={16} strokeWidth={1.5}/></div>
                        <span className="text-sm font-normal text-gray-600">BOL_Final.pdf</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Card 5 */}
          <div className="group relative rounded-[2.5rem] overflow-hidden border border-gray-200/60 bg-[#F7F7F9] col-span-1 row-span-1 flex flex-col cursor-default hover:bg-white hover:shadow-[0_20px_60px_rgba(0,0,0,0.04)] transition-all duration-700">
             <div className="relative p-10 lg:p-12 z-10 flex flex-col h-full">
                <div className="w-14 h-14 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 mb-8 shadow-sm group-hover:text-[#FF5C00] transition-colors duration-500">
                  <DollarSign size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-normal text-gray-900 mb-4 tracking-wide">Pay Invoices</h3>
                <p className="text-base font-light text-gray-500 leading-relaxed mb-8 md:mb-0">Quick and easy payment options allow your customers to securely pay online.</p>

                <div className="mt-auto flex justify-start hidden md:flex">
                   <div className="w-full max-w-[220px] bg-white rounded-2xl border border-gray-100 p-6 shadow-sm group-hover:-translate-y-3 transition-transform duration-700 ease-out relative overflow-hidden">
                      <div className="text-[10px] font-normal text-gray-400 tracking-widest uppercase mb-4">Invoice #9942</div>
                      <div className="text-3xl font-light text-gray-900 mb-6">$3,250</div>
                      <div className="w-full py-3 bg-gray-50 border border-gray-100 text-gray-600 text-[10px] uppercase tracking-widest font-normal rounded-full text-center transition-colors group-hover:bg-[#FF5C00] group-hover:border-[#FF5C00] group-hover:text-white">
                         Pay Now
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Card 6 */}
          <div className="group relative rounded-[2.5rem] overflow-hidden border border-gray-200/60 bg-[#F7F7F9] col-span-1 md:col-span-2 lg:col-span-2 row-span-1 cursor-default hover:bg-white hover:shadow-[0_20px_60px_rgba(0,0,0,0.04)] transition-all duration-700">
            <div className="relative h-full p-10 lg:p-12 flex flex-col md:flex-row items-start justify-between z-10">
              <div className="w-full md:w-[45%]">
                <div className="w-14 h-14 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 mb-8 shadow-sm group-hover:text-[#FF5C00] transition-colors duration-500">
                  <LineChart size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-normal text-gray-900 mb-4 tracking-wide">Actionable Insights</h3>
                <p className="text-base font-light text-gray-500 leading-relaxed">Actionable information from analytical tools empowers your customers, making you an invaluable partner. Real-time data is readily accessible.</p>
              </div>

              <div className="hidden md:flex absolute right-0 bottom-0 w-[45%] h-[85%] bg-white rounded-tl-[2.5rem] border-t border-l border-gray-100 shadow-[-10px_-10px_30px_rgba(0,0,0,0.02)] transition-all duration-700 translate-x-12 translate-y-12 group-hover:translate-x-0 group-hover:translate-y-0 flex-col p-8">
                <div className="flex justify-between items-center mb-10">
                   <div className="text-[11px] uppercase tracking-widest font-normal text-gray-400">Spend Analysis</div>
                   <div className="text-green-500 text-xs font-normal tracking-wide">+14.2%</div>
                </div>
                <div className="flex-1 flex items-end justify-between gap-4 border-b border-gray-100 pb-4">
                   {chartHeights.map((classes, i) => (
                      <div key={i} className="w-full bg-gray-50 rounded-t-lg h-full relative flex items-end overflow-hidden">
                         <div 
                           className={`w-full bg-gray-200 rounded-t-lg transition-all duration-700 ease-out group-hover:bg-[#FF5C00]/80 ${classes}`}
                           style={{ transitionDelay: `${i * 50}ms` }}
                         ></div>
                      </div>
                   ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// 7. Cross Platform Experience (Restored & Styled to Minimal Aesthetic)
const CrossPlatformExperience = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef([]);

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
    const handleScroll = () => {
      const triggerPoint = typeof window !== 'undefined' && window.innerWidth < 1024 
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
  }, []);

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
                        {React.cloneElement(f.icon, { size: window.innerWidth < 640 ? 24 : 28 })}
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

const TechStack = () => {
  const [ref, isVisible] = useScrollReveal();
  
  return (
    <section className="py-32 lg:py-48 relative overflow-hidden z-10 bg-[#0B0F19]" ref={ref}>
      
      {/* 1. Parallax Texture Layer */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05] bg-fixed pointer-events-none mix-blend-overlay"></div>
      
      {/* 2. Animated Endless Data Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] pointer-events-none animate-grid-pan"></div>

      {/* 3. Animated Orbiting Glow Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] bg-blue-600/15 animate-orbit pointer-events-none mix-blend-screen"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] bg-[#FF5C00]/15 animate-orbit-reverse pointer-events-none mix-blend-screen"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10 w-full">
        <div className={`text-center mb-16 md:mb-24 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
           <h2 className="text-4xl md:text-5xl font-light text-white mb-6 tracking-tight">
             Connects with your <span className="orange-hover-fx font-normal">entire stack.</span>
           </h2>
           <p className="text-lg font-light text-gray-400 max-w-2xl mx-auto leading-relaxed">
             Plug Gama directly into your existing infrastructure via secure, latency-free APIs.
           </p>
        </div>

        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-1000 delay-200 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
           {[
             { name: "CargoWise", label: "Core Sync" },
             { name: "Descartes", label: "Compliance" },
             { name: "SAP S/4HANA", label: "ERP" },
             { name: "NetSuite", label: "Accounting" }
           ].map((node, i) => (
             <div key={i} className="bg-[#111625]/80 backdrop-blur-xl rounded-[2rem] p-8 border border-white/5 flex flex-col items-center justify-center min-h-[180px] md:min-h-[200px] hover:bg-[#161C2D] hover:border-[#FF5C00]/40 hover:shadow-[0_0_40px_rgba(255,92,0,0.15)] hover:-translate-y-1 transition-all duration-500 cursor-pointer group relative overflow-hidden">
                {/* Internal Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#FF5C00]/0 to-[#FF5C00]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#FF5C00]/20 transition-all duration-500 relative z-10">
                   <Activity size={20} strokeWidth={1.5} className="text-gray-400 group-hover:text-[#FF5C00] transition-colors" />
                </div>
                <div className="text-[10px] uppercase tracking-widest text-gray-500 font-medium mb-3 relative z-10">{node.label}</div>
                <div className="text-lg md:text-xl font-normal tracking-wide text-white group-hover:text-[#FF5C00] transition-colors relative z-10">{node.name}</div>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};


// --- Page: Gama BCO View Components ---

const BcoHero = () => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section className="relative pt-40 sm:pt-48 pb-24 lg:pt-56 lg:pb-32 z-10" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10 text-center flex flex-col items-center">
        
        <div className={`transition-all duration-1000 transform flex flex-col items-center ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center space-x-3 px-5 py-2 rounded-full border border-gray-200/80 bg-white mb-10 shadow-sm">
            <span className="text-[11px] font-normal text-gray-500 tracking-[0.2em] uppercase">Gama BCO Service</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light text-gray-900 leading-[1.1] mb-8 tracking-tight max-w-4xl">
            Take control of your <br/>
            <span className="orange-hover-fx font-normal">Ocean Freight.</span>
          </h1>
          
          <p className="text-lg sm:text-xl font-light text-gray-500 mb-12 max-w-2xl leading-relaxed">
            The operational layer built strictly for exporters and importers. Bring visibility and sanity to your supply chain without forcing a massive ERP migration.
          </p>
        </div>

      </div>
    </section>
  );
};

const BcoExplanation = () => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section className="py-24 relative z-10 bg-[#FAFAFA]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className={`grid md:grid-cols-2 gap-16 items-center transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
           
           <div>
             <h3 className="text-[11px] font-normal text-gray-400 uppercase tracking-[0.2em] mb-6">What is Gama BCO?</h3>
             <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-8 leading-tight">
               It is an operational layer, <span className="orange-hover-fx font-normal">not a full ERP system.</span>
             </h2>
             <p className="text-base font-light text-gray-500 leading-relaxed mb-6">
               Gama BCO helps exporters and importers seamlessly track and manage shipments. It is <strong>not</strong> a full ERP system for accounting and finance—it focuses purely on supply chain visibility and day-to-day logistics operations.
             </p>
             <p className="text-base font-light text-gray-500 leading-relaxed">
               It works beautifully with your existing freight forwarders. And when your business scales to require deep financial reconciliation and general ledger sync, Gama BCO expands seamlessly into <strong>Climax</strong>, our full enterprise ERP suite.
             </p>
           </div>

           <div className="bg-white rounded-[2rem] p-10 border border-gray-200/60 shadow-[0_20px_50px_rgba(0,0,0,0.03)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-50 rounded-full blur-[60px] opacity-60"></div>
              
              <div className="space-y-8 relative z-10">
                 <div className="flex items-start gap-4 pb-8 border-b border-gray-50">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center flex-shrink-0">
                       <MapPin size={18} strokeWidth={1.5} />
                    </div>
                    <div>
                       <h4 className="text-lg font-normal text-gray-900 mb-2">Made for BCOs</h4>
                       <p className="text-sm font-light text-gray-500 leading-relaxed">Designed specifically for exporters and importers working with multiple freight forwarders.</p>
                    </div>
                 </div>
                 <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-orange-50 text-[#FF5C00] flex items-center justify-center flex-shrink-0">
                       <Layers size={18} strokeWidth={1.5} />
                    </div>
                    <div>
                       <h4 className="text-lg font-normal text-gray-900 mb-2">Scales into Climax ERP</h4>
                       <p className="text-sm font-light text-gray-500 leading-relaxed">Start with shipment visibility today, and grow into a full financial ERP backbone with Climax when ready.</p>
                    </div>
                 </div>
              </div>
           </div>

        </div>
      </div>
    </section>
  );
};

const BcoVsClimax = () => {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 });

  return (
    <section className="py-24 lg:py-32 relative z-10 bg-white border-t border-gray-100" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        
        <div className={`text-center mb-20 lg:mb-24 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
           <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-6 tracking-tight">
             Operations vs. <span className="orange-hover-fx font-normal">Finance.</span>
           </h2>
           <p className="text-lg font-light text-gray-500 max-w-2xl mx-auto leading-relaxed">
             Understand the clear line between supply chain visibility (Gama BCO) and full-scale enterprise accounting (Climax Suite).
           </p>
        </div>

        <div className={`flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch transition-all duration-1000 delay-200 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
           
           {/* Gama BCO side */}
           <div className="flex-1 bg-[#FAFAFA] rounded-[2.5rem] p-10 lg:p-14 border border-gray-200/80 shadow-sm relative overflow-hidden flex flex-col">
              <div className="w-14 h-14 bg-white border border-gray-100 text-[#FF5C00] rounded-2xl flex items-center justify-center mb-8 shadow-sm">
                 <Navigation size={24} strokeWidth={1.5} />
              </div>
              <h3 className="text-3xl font-light text-gray-900 mb-4">Gama BCO</h3>
              <p className="text-base font-light text-gray-500 leading-relaxed mb-10 flex-1">
                 The agile operational layer. Focuses exclusively on tracking shipments, managing daily logistics, and centralizing freight documents without disrupting your current accounting setup.
              </p>
              <ul className="space-y-4 border-t border-gray-200 pt-8">
                 {["Live vessel & container tracking", "Commercial invoice centralization", "Forwarder & carrier API sync"].map((item, i) => (
                   <li key={i} className="flex items-center gap-3 text-sm font-normal text-gray-600 tracking-wide">
                      <Check size={16} strokeWidth={1.5} className="text-[#FF5C00]" /> {item}
                   </li>
                 ))}
              </ul>
           </div>

           {/* Connection node (visual) */}
           <div className="hidden lg:flex flex-col justify-center items-center -mx-4 z-10">
              <div className="w-12 h-12 bg-white rounded-full border border-gray-200 shadow-sm flex items-center justify-center text-gray-400">
                 <ArrowRight size={20} strokeWidth={1.5} />
              </div>
           </div>

           {/* Climax Suite side */}
           <div className="flex-1 bg-[#0B0F19] rounded-[2.5rem] p-10 lg:p-14 border border-gray-800 shadow-[0_20px_60px_rgba(0,0,0,0.15)] relative overflow-hidden flex flex-col group hover:border-[#FF5C00]/40 transition-colors duration-500">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF5C00]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
              
              <div className="w-14 h-14 bg-gray-800 text-white rounded-2xl flex items-center justify-center mb-8 border border-gray-700">
                 <Layers size={24} strokeWidth={1.5} />
              </div>
              <h3 className="text-3xl font-light text-white mb-4 group-hover:text-[#FF5C00] transition-colors">Climax Suite</h3>
              <p className="text-base font-light text-gray-400 leading-relaxed mb-10 flex-1">
                 The massive enterprise ERP. Replaces your entire financial backend, handling everything from multi-currency general ledgers to automated vendor payment reconciliation.
              </p>
              <ul className="space-y-4 border-t border-gray-800 pt-8">
                 {["Full General Ledger accounting", "Automated vendor reconciliation", "Enterprise-scale financial reporting"].map((item, i) => (
                   <li key={i} className="flex items-center gap-3 text-sm font-normal text-gray-300 tracking-wide">
                      <CheckCircle2 size={16} strokeWidth={1.5} className="text-gray-500" /> {item}
                   </li>
                 ))}
              </ul>
           </div>

        </div>

      </div>
    </section>
  );
};

const BcoOperationsExample = () => {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 });

  const steps = [
    {
      phase: "Phase 1: Origin & Booking",
      title: "Consolidating the shipment.",
      desc: "Instead of emailing multiple forwarders back and forth, simply log into the Gama BCO portal. Your international bookings are already logged. Master BOLs, packing lists, and origin terminal updates are instantly centralized via API sync, giving your team immediate access to the ground truth without checking a single spreadsheet.",
      placeholder: "Screenshot: Unified Booking & Document Vault",
      icon: <Box className="text-[#FF5C00]" size={24} strokeWidth={1.5} />
    },
    {
      phase: "Phase 2: In Transit",
      title: "Live tracking & predictive alerts.",
      desc: "Once the vessel departs, stop relying on outdated carrier websites. Instantly view live GPS coordinates directly on the Gama map. As your containers approach their destination, the predictive engine warns you of potential terminal congestion, allowing your drayage team to adjust schedules ahead of time and avoid costly demurrage.",
      placeholder: "Screenshot: Live Map & Exceptions Dashboard",
      icon: <MapPin className="text-[#FF5C00]" size={24} strokeWidth={1.5} />,
      reverse: true
    },
    {
      phase: "Phase 3: Destination & Compliance",
      title: "Automated customs handoff.",
      desc: "Before the cargo even arrives, Gama automatically screens the documentation and triggers an immediate ISF filing alert to your customs broker. You securely download the Commercial Invoice with one click. Zero compliance delays, zero frantic phone calls—just a smooth handover at the port.",
      placeholder: "Screenshot: Compliance Alerts & Customs Handoff",
      icon: <ShieldCheck className="text-[#FF5C00]" size={24} strokeWidth={1.5} />
    }
  ];

  return (
    <section className="py-24 lg:py-32 relative z-10 bg-[#FAFAFA]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        
        <div className={`text-center mb-20 lg:mb-32 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
           <div className="inline-flex items-center space-x-3 px-4 py-1.5 rounded-full border border-gray-200/80 bg-white mb-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
              <span className="flex h-1.5 w-1.5 rounded-full bg-green-500"></span>
              <span className="text-[10px] font-medium text-gray-500 tracking-[0.2em] uppercase">Real-Life Example</span>
           </div>
           <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-tight">
             Managing global shipments <br className="hidden sm:block"/>
             <span className="orange-hover-fx font-normal">without the chaos.</span>
           </h2>
           <p className="text-lg font-light text-gray-500 max-w-2xl mx-auto leading-relaxed">
             See exactly how Gama BCO replaces scattered email threads and fragmented spreadsheets with a single, unified operational timeline.
           </p>
        </div>

        <div className="flex flex-col gap-24 lg:gap-32">
           {steps.map((step, i) => (
             <div key={i} className={`flex flex-col ${step.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20 transition-all duration-1000 delay-${i * 200} transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
                
                {/* Text Content */}
                <div className="w-full lg:w-5/12 flex flex-col">
                   <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center mb-6">
                      {step.icon}
                   </div>
                   <div className="text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-3">{step.phase}</div>
                   <h3 className="text-2xl lg:text-3xl font-normal text-gray-900 mb-6">{step.title}</h3>
                   <p className="text-base lg:text-lg font-light text-gray-500 leading-relaxed">
                     {step.desc}
                   </p>
                </div>

                {/* Screenshot Placeholder (Mac OS Window Style) */}
                <div className="w-full lg:w-7/12">
                   <div className="w-full h-64 sm:h-80 lg:h-[400px] bg-white rounded-[2rem] border border-gray-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col group transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] hover:-translate-y-1">
                      
                      {/* Window Header */}
                      <div className="h-12 bg-gray-50/80 border-b border-gray-100 flex items-center px-5 gap-2.5">
                        <div className="w-3 h-3 rounded-full bg-gray-200 group-hover:bg-red-400 transition-colors duration-300"></div>
                        <div className="w-3 h-3 rounded-full bg-gray-200 group-hover:bg-yellow-400 transition-colors duration-300 delay-75"></div>
                        <div className="w-3 h-3 rounded-full bg-gray-200 group-hover:bg-green-400 transition-colors duration-300 delay-150"></div>
                      </div>
                      
                      {/* Inner Content / Placeholder Area */}
                      <div className="flex-1 flex items-center justify-center relative overflow-hidden bg-white">
                         {/* Subtle grid pattern for technical feel */}
                         <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:2rem_2rem]"></div>
                         
                         {/* Indicator Icon & Text */}
                         <div className="text-center relative z-10 flex flex-col items-center px-6">
                            <Image size={32} className="text-gray-300 mb-4 transform group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
                            <span className="text-sm font-medium text-gray-400 uppercase tracking-widest">{step.placeholder}</span>
                            <span className="text-xs font-light text-gray-400 mt-2 max-w-xs">(Replace with actual CRM screenshot)</span>
                         </div>
                      </div>

                   </div>
                </div>

             </div>
           ))}
        </div>

      </div>
    </section>
  );
};

const BcoUseCase = () => {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.2 });
  const [activeStep, setActiveStep] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const steps = [
    {
      step: "01",
      title: "Consolidate",
      desc: "Instead of scattered emails across multiple forwarders, all Master BOLs and Commercial Invoices are instantly centralized.",
      icon: <Layers size={20} strokeWidth={1.5} />,
      placeholder: "Screenshot: Central Document Vault"
    },
    {
      step: "02",
      title: "Automate",
      desc: "Gama automatically screens documents and triggers an immediate ISF filing alert, ensuring zero compliance delays.",
      icon: <Zap size={20} strokeWidth={1.5} />,
      placeholder: "Screenshot: Automated ISF Alerts"
    },
    {
      step: "03",
      title: "Track",
      desc: "Your containers are visualized on a live map. Alerts notify your team of terminal congestion before demurrage accrues.",
      icon: <MapPin size={20} strokeWidth={1.5} />,
      placeholder: "Screenshot: Live Container Map"
    }
  ];

  // Auto-cycle tabs: only when visible and NOT hovered
  useEffect(() => {
    let interval;
    if (isVisible && !isHovered) {
      interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % steps.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isVisible, isHovered, steps.length]);

  return (
    <section className="py-32 relative z-10 bg-white border-t border-gray-100" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        
        <div className={`text-center mb-20 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-tight">
            Scale effortlessly. <br className="hidden sm:block"/>
            <span className="orange-hover-fx font-normal">See it in action.</span>
          </h2>
          <p className="text-lg font-light text-gray-500 max-w-2xl mx-auto leading-relaxed">
            How a mid-sized exporter handles 50 TEUs using Gama BCO.
          </p>
        </div>

        <div 
          className={`grid lg:grid-cols-12 gap-12 lg:gap-16 items-center transition-all duration-1000 delay-200 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
           
           {/* Left: Interactive Tabs */}
           <div className="lg:col-span-5 flex flex-col gap-4">
              {steps.map((item, i) => {
                 const isActive = activeStep === i;
                 return (
                   <div 
                     key={i} 
                     onClick={() => setActiveStep(i)}
                     className={`cursor-pointer rounded-[2rem] p-6 sm:p-8 transition-all duration-500 border ${isActive ? 'bg-white border-gray-200/80 shadow-[0_15px_40px_rgba(0,0,0,0.05)] scale-[1.02]' : 'bg-transparent border-transparent hover:bg-gray-50/50'}`}
                   >
                      <div className="flex items-center gap-4 mb-4">
                         <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-500 ${isActive ? 'bg-orange-50 text-[#FF5C00]' : 'bg-gray-100 text-gray-400'}`}>
                            {item.icon}
                         </div>
                         <h3 className={`text-xl font-normal transition-colors duration-500 ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>{item.title}</h3>
                      </div>
                      <p className={`text-sm font-light leading-relaxed transition-colors duration-500 ${isActive ? 'text-gray-600' : 'text-gray-400'}`}>
                         {item.desc}
                      </p>
                   </div>
                 )
              })}
           </div>

           {/* Right: Mac OS Window Placeholder */}
           <div className="lg:col-span-7">
              <div className="w-full h-[400px] md:h-[500px] bg-white rounded-[2.5rem] border border-gray-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] relative">
                 
                 {/* Window Header */}
                 <div className="h-12 bg-gray-50/80 border-b border-gray-100 flex items-center px-5 gap-2.5 relative z-20">
                   <div className="w-3 h-3 rounded-full bg-gray-200 hover:bg-red-400 transition-colors duration-300"></div>
                   <div className="w-3 h-3 rounded-full bg-gray-200 hover:bg-yellow-400 transition-colors duration-300 delay-75"></div>
                   <div className="w-3 h-3 rounded-full bg-gray-200 hover:bg-green-400 transition-colors duration-300 delay-150"></div>
                 </div>

                 {/* Subtle grid pattern for technical feel */}
                 <div className="absolute inset-0 top-12 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:2rem_2rem] z-0"></div>

                 {/* Crossfading Placeholders */}
                 <div className="flex-1 relative z-10 flex items-center justify-center">
                    {steps.map((item, i) => (
                      <div 
                        key={i}
                        className={`absolute inset-0 flex flex-col items-center justify-center px-6 text-center transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${activeStep === i ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
                      >
                         <Image size={40} className="text-gray-300 mb-6" strokeWidth={1.5} />
                         <span className="text-base font-medium text-gray-400 uppercase tracking-widest">{item.placeholder}</span>
                         <span className="text-sm font-light text-gray-400 mt-3 max-w-sm">(Replace with actual CRM screenshot)</span>
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


// --- Universal Sections ---

// 15. Final CTA (Outcome Driven & High Impact Tracking Animation)
const FinalCTA = ({ onOpenDemo }) => {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.3 });

  return (
    <section className="py-32 lg:py-48 px-6 sm:px-10 relative z-10 bg-[#FAFAFA]" ref={ref}>
      <div className={`max-w-5xl mx-auto bg-white rounded-[3rem] p-10 sm:p-16 md:p-24 text-center relative overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] transform border border-gray-100 shadow-[0_20px_80px_rgba(0,0,0,0.04)] ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95'}`}>
        
        {/* Ambient Background Glows */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[100px] bg-[#FF5C00]/10 animate-orbit pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[100px] bg-blue-500/10 animate-orbit-reverse pointer-events-none"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] pointer-events-none"></div>

        <div className="relative z-20 max-w-3xl mx-auto flex flex-col items-center">
          
          {/* Synchronized Tracking Reveal Sequence */}
          <div className="relative flex flex-col items-center mb-10 w-full">
             
             {/* Clean, single-layer text with slide-up reveal */}
             <div className="overflow-hidden mb-8 px-2">
                 <h2 className={`text-4xl sm:text-5xl md:text-7xl font-light text-gray-900 tracking-tight leading-[1.1] transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] delay-300 ${isVisible ? 'translate-y-0' : 'translate-y-[120%]'}`}>
                    See exactly <br className="hidden sm:block"/>
                    <span className="text-[#FF5C00] font-normal">how it works.</span>
                 </h2>
             </div>

             {/* Tracking Progress Line */}
             <div className={`relative w-full max-w-md h-[2px] bg-gray-100 rounded-full transition-opacity duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                 <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-200 rounded-full"></div>
                 <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-200 rounded-full"></div>
                 
                 <div 
                   className="absolute top-0 left-0 h-full bg-[#FF5C00] rounded-full flex justify-end items-center"
                   style={{ 
                     width: isVisible ? '100%' : '0%', 
                     transition: 'width 1.5s cubic-bezier(0.25, 1, 0.5, 1) 0.5s' 
                   }}
                 >
                    {/* Glowing Tracking Dot */}
                    <div className="w-4 h-4 bg-white border-2 border-[#FF5C00] rounded-full translate-x-2 shadow-[0_0_15px_rgba(255,92,0,0.5)]"></div>
                 </div>
              </div>
          </div>

          <p className={`text-lg sm:text-xl font-light text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-[800ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Book a walkthrough to see exactly what you get: live <strong>shipment tracking</strong>, centralized <strong>documents</strong>, and how it easily fits into your <strong>daily use</strong>.
          </p>
          
          <div className={`relative inline-block group transition-all duration-1000 delay-[1100ms] ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}>
             {/* Intense Dynamic Outer Aura */}
             <div className="absolute inset-[-4px] bg-gradient-to-r from-[#FF5C00] to-orange-400 rounded-full blur-lg opacity-40 group-hover:opacity-70 group-hover:blur-xl transition-all duration-500 animate-pulse"></div>
             
             {/* Main Button */}
             <button onClick={onOpenDemo} className="relative bg-[#FF5C00] transition-all px-2 pl-8 py-2 rounded-full font-medium text-sm sm:text-base tracking-wide text-white shadow-[0_8px_20px_rgba(255,92,0,0.2)] overflow-hidden flex items-center justify-center gap-6 group-hover:-translate-y-1">
               <span className="relative z-10 py-3">Schedule a Workflow Review</span>
               
               {/* Arrow Housing */}
               <div className="relative z-10 bg-white/20 w-12 h-12 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-[#FF5C00] transition-colors duration-300">
                  <ArrowRight size={18} strokeWidth={2} className="transform group-hover:translate-x-1 animate-bounce-horizontal" />
               </div>

               {/* Shine Sweep Effect */}
               <div className="absolute inset-0 -translate-x-[150%] skew-x-[-20deg] group-hover:animate-[sweep_1s_ease-in-out] bg-gradient-to-r from-transparent via-white/30 to-transparent z-0 pointer-events-none"></div>
             </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// 16. Footer (Minimal)
const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.getElementById('top-of-page')?.scrollIntoView({ behavior: 'smooth' });
  };

  const footerLinks = [
    { title: "Platform", links: ["Gama BCO", "Climax ERP", "Integrations"] },
    { title: "Resources", links: ["Logistics Blog", "API Docs"] },
    { title: "Company", links: ["About Us", "Contact"] }
  ];

  return (
    <footer className="bg-white relative z-10 overflow-hidden pt-24 pb-12 border-t border-gray-200/60">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 w-full flex flex-col">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-0 mb-32">
           
           <div className="lg:col-span-5 flex flex-col lg:pr-16">
               <img src={'/images/logo.svg'} alt='logo ' className='w-30 h-30' />
              <p className="text-sm font-light text-gray-500 mb-2">The operational standard.</p>
              <p className="text-sm font-mono font-light text-gray-400">
                hello@gamasuite.com
              </p>
           </div>

           <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-12 lg:pl-16">
              {footerLinks.map((col, idx) => (
                 <div key={idx} className="flex flex-col">
                    <h4 className="text-[10px] font-normal text-gray-400 uppercase tracking-[0.2em] mb-8">
                      {col.title}
                    </h4>
                    <ul className="space-y-4">
                      {col.links.map(link => (
                        <li key={link}>
                          <a href="#" className="text-sm font-light text-gray-600 hover:text-[#FF5C00] transition-colors duration-300 tracking-wide">
                            {link}
                          </a>
                        </li>
                      ))}
                    </ul>
                 </div>
              ))}
           </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-gray-100">
           <span className="text-[10px] font-normal text-gray-400 uppercase tracking-[0.2em]">© 2026 GAMA SUITE OS</span>
           
           <div className="flex gap-8 text-[10px] font-normal text-gray-400 uppercase tracking-[0.2em] items-center">
              <a href="#" className="hover:text-gray-900 transition-colors">Privacy</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Terms</a>
              <button onClick={scrollToTop} className="flex items-center gap-2 hover:text-[#FF5C00] transition-colors cursor-pointer outline-none">
                 Top <ArrowUpRight size={12} strokeWidth={1.5} className="transform -rotate-45" />
              </button>
           </div>
        </div>
      </div>
    </footer>
  );
};

// 18. Demo Scheduler Modal
const DemoModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(0); 
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setStep(0);
      setSelectedDate(null);
      setSelectedTime(null);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const startDayOffset = 0; 
  const availableDays = [10, 12, 14, 15, 18, 20, 22, 25, 28];
  const timeSlots = ["09:00 AM", "11:30 AM", "02:00 PM", "04:30 PM"];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div 
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity animate-fade-in cursor-pointer"
        onClick={onClose}
      ></div>
      
      <div className="relative w-full max-w-5xl h-[90vh] md:h-[600px] bg-white rounded-[2rem] overflow-hidden flex flex-col md:flex-row shadow-[0_30px_100px_rgba(0,0,0,0.15)] animate-fade-in z-10 border border-gray-100">
         
         <div className="hidden md:flex w-full md:w-[45%] bg-[#FAFAFA] border-r border-gray-100 p-12 flex-col relative overflow-hidden">
            <img src={'/images/logoIcon.svg'} alt="logo " className="w-10 h-10 mb-12 relative z-10" />
            
            <div className="relative z-10">
               <h2 className="text-3xl font-light text-gray-900 leading-[1.2] mb-6 tracking-tight">
                  Schedule a <br/><span className="text-[#FF5C00] font-normal">Workflow Review.</span>
               </h2>
               <p className="text-gray-500 text-sm font-light leading-relaxed mb-10 max-w-sm">
                  Book a 30-minute personalized walkthrough to see the platform in action.
               </p>
               
               <ul className="space-y-5 border-t border-gray-200/60 pt-8">
                  {[
                    "Live shipment tracking in action", 
                    "Centralized document management", 
                    "Integration into your daily use"
                  ].map((point, i) => (
                    <li key={i} className="flex items-start gap-4">
                       <div className="w-5 h-5 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                         <Check size={12} strokeWidth={1.5} className="text-[#FF5C00]"/>
                       </div>
                       <span className="text-sm text-gray-600 font-light tracking-wide">{point}</span>
                    </li>
                  ))}
               </ul>
            </div>
         </div>

         <div className="w-full md:w-[55%] h-full bg-white relative flex flex-col overflow-y-auto overflow-x-hidden p-8 md:p-12 scrollbar-hide">
            
            <button onClick={onClose} className="absolute top-6 right-6 w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-900 transition-all z-50 border border-gray-100">
               <X size={18} strokeWidth={1.5} />
            </button>

            {step === 1 && (
               <button onClick={() => setStep(0)} className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-2 text-[11px] font-normal text-gray-400 hover:text-gray-900 transition-colors z-50 uppercase tracking-[0.2em]">
                  <ArrowLeft size={14} strokeWidth={1.5} /> Back
               </button>
            )}

            <div className="flex-1 flex flex-col pt-10 md:pt-4 relative w-full h-full">
               
               {/* STEP 0: Calendar Selection */}
               <div className={`absolute inset-0 w-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col ${step === 0 ? 'translate-x-0 opacity-100 relative' : '-translate-x-full opacity-0 pointer-events-none'}`}>
                  <h3 className="text-2xl font-normal text-gray-900 mb-2 tracking-tight">Select a Time</h3>
                  <p className="text-sm text-gray-500 font-light mb-8">What day works best for your team?</p>
                  
                  <div className="flex-1 flex flex-col">
                     <div className="flex justify-between items-center mb-8">
                        <span className="text-sm font-medium uppercase tracking-widest text-gray-900">March 2026</span>
                        <div className="flex gap-2">
                           <button className="p-1.5 rounded-full border border-gray-100 text-gray-300 cursor-not-allowed"><ChevronRight size={16} strokeWidth={1.5} className="rotate-180"/></button>
                           <button className="p-1.5 rounded-full border border-gray-200 text-gray-600 hover:border-gray-300 transition-colors"><ChevronRight size={16} strokeWidth={1.5}/></button>
                        </div>
                     </div>

                     <div className="grid grid-cols-7 gap-y-4 gap-x-2 text-center mb-8">
                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => <div key={d} className="text-[10px] font-normal text-gray-400 uppercase tracking-[0.2em]">{d}</div>)}
                        {Array.from({ length: startDayOffset }).map((_, i) => <div key={`empty-${i}`}></div>)}
                        
                        {days.map(d => {
                           const isAvailable = availableDays.includes(d);
                           const isSelected = selectedDate === d;
                           return (
                             <button 
                               key={d}
                               disabled={!isAvailable}
                               onClick={() => { setSelectedDate(d); setSelectedTime(null); }}
                               className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center text-sm font-light transition-all duration-300 relative
                                 ${!isAvailable ? 'text-gray-300 cursor-not-allowed' : ''}
                                 ${isAvailable && !isSelected ? 'bg-transparent hover:bg-gray-50 text-gray-700 cursor-pointer border border-transparent hover:border-gray-200' : ''}
                                 ${isSelected ? 'bg-gray-900 text-white shadow-md border border-gray-900 scale-105' : ''}
                               `}
                             >
                               {d}
                               {isAvailable && !isSelected && <div className="absolute bottom-1.5 w-1 h-1 rounded-full bg-gray-300"></div>}
                             </button>
                           )
                        })}
                     </div>

                     <div className={`transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden ${selectedDate ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="text-[10px] font-normal text-gray-400 uppercase tracking-[0.2em] mb-4 border-t border-gray-100 pt-6 flex items-center gap-2">
                          <Clock size={14} strokeWidth={1.5} className="text-gray-400" /> Available Times
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                           {timeSlots.map(time => (
                              <button 
                                key={time}
                                onClick={() => { setSelectedTime(time); setTimeout(() => setStep(1), 400); }}
                                className={`py-3 rounded-xl border text-xs font-normal tracking-wide transition-all duration-300 ${selectedTime === time ? 'bg-gray-900 border-gray-900 text-white shadow-md' : 'bg-white border-gray-200 text-gray-700 hover:border-gray-400'}`}
                              >
                                {time}
                              </button>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>

               {/* STEP 1: User Details Form */}
               <div className={`absolute inset-0 w-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col justify-center ${step === 1 ? 'translate-x-0 opacity-100 relative' : 'translate-x-full opacity-0 pointer-events-none'}`}>
                  <h3 className="text-2xl font-normal text-gray-900 mb-2 tracking-tight">Your Details</h3>
                  <p className="text-sm text-gray-500 font-light mb-8 flex items-center gap-2">
                     <Calendar size={16} strokeWidth={1.5} className="text-gray-400" />
                     March {selectedDate}, 2026 at {selectedTime}
                  </p>
                  
                  <form className="flex-1 flex flex-col gap-5" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                     <div className="relative group">
                        <User size={18} strokeWidth={1.5} className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-gray-900 transition-colors" />
                        <input required type="text" placeholder="Full Name" className="w-full bg-transparent border-b border-gray-200 py-3 pl-8 focus:outline-none focus:border-gray-900 text-gray-900 font-light text-base transition-colors placeholder-gray-300" />
                     </div>
                     <div className="relative group">
                        <Mail size={18} strokeWidth={1.5} className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-gray-900 transition-colors" />
                        <input required type="email" placeholder="Work Email" className="w-full bg-transparent border-b border-gray-200 py-3 pl-8 focus:outline-none focus:border-gray-900 text-gray-900 font-light text-base transition-colors placeholder-gray-300" />
                     </div>
                     <div className="relative group">
                        <Building size={18} strokeWidth={1.5} className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-gray-900 transition-colors" />
                        <input required type="text" placeholder="Company Name" className="w-full bg-transparent border-b border-gray-200 py-3 pl-8 focus:outline-none focus:border-gray-900 text-gray-900 font-light text-base transition-colors placeholder-gray-300" />
                     </div>

                     <button type="submit" className="mt-8 w-full bg-[#FF5C00] hover:bg-[#E65300] text-white font-normal text-xs tracking-[0.2em] uppercase py-4 rounded-full shadow-[0_8px_20px_rgba(255,92,0,0.15)] transition-all duration-300 hover:-translate-y-0.5">
                        Confirm Booking
                     </button>
                  </form>
               </div>

               {/* STEP 2: Success Screen */}
               <div className={`absolute inset-0 w-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col items-center justify-center text-center ${step === 2 ? 'translate-x-0 opacity-100 relative' : 'translate-x-full opacity-0 pointer-events-none'}`}>
                  <div className="w-16 h-16 bg-green-50 border border-green-100 rounded-full flex items-center justify-center text-green-500 mb-6">
                     <Check size={32} strokeWidth={1.5} className="animate-fade-in" />
                  </div>
                  <h3 className="text-2xl font-normal text-gray-900 mb-3 tracking-tight">You're all set!</h3>
                  <p className="text-sm text-gray-500 font-light max-w-xs leading-relaxed mb-8">
                     A calendar invitation for <br/><span className="font-medium text-gray-700">March {selectedDate} at {selectedTime}</span> <br/>has been sent to your email.
                  </p>
                  <button onClick={onClose} className="px-8 py-3 rounded-full border border-gray-200 font-normal text-xs tracking-wide text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-300">
                     Close Window
                  </button>
               </div>

            </div>
         </div>
      </div>
    </div>
  );
};

export default function App() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [currentRoute, setCurrentRoute] = useState('home');

  useEffect(() => {
    // Force light theme
    document.body.style.backgroundColor = '#FAFAFA';
  }, []);

  return (
    <div id="top-of-page" className="min-h-screen font-sans transition-colors duration-500 overflow-clip bg-[#FAFAFA] text-gray-900">
      
      <style dangerouslySetInnerHTML={{__html: `
        html { scroll-behavior: smooth; }
        body { font-family: 'Inter', system-ui, sans-serif; overflow-x: clip; }
        
        .orange-hover-fx {
          color: #FF5C00;
          transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
          display: inline-block;
          cursor: default;
        }
        .orange-hover-fx:hover {
          transform: translateY(-2px) scale(1.01);
          text-shadow: 0 12px 30px rgba(255, 92, 0, 0.4);
          letter-spacing: 0.01em;
        }

        /* Tech Stack Animated Grid */
        @keyframes gridPan {
          0% { background-position: 0 0; }
          100% { background-position: 0 4rem; }
        }
        .animate-grid-pan {
          animation: gridPan 4s linear infinite;
        }

        /* Tech Stack Orbiting Orbs */
        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(40px) rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) translateX(40px) rotate(-180deg) scale(1.1); }
          100% { transform: rotate(360deg) translateX(40px) rotate(-360deg) scale(1); }
        }
        .animate-orbit {
          animation: orbit 15s infinite linear;
        }
        .animate-orbit-reverse {
          animation: orbit 20s infinite reverse linear;
        }

        /* Button Sweep Effect */
        @keyframes sweep {
          0% { transform: translateX(-150%) skewX(-20deg); }
          100% { transform: translateX(150%) skewX(-20deg); }
        }

        /* Arrow Bounce Effect */
        @keyframes bounce-horizontal {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(4px); }
        }
        .animate-bounce-horizontal {
          animation: bounce-horizontal 1.5s ease-in-out infinite;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }

        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        
        /* Hide Scrollbar */
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}} />

      <ParticleBackground />
      <Navbar onOpenDemo={() => setIsDemoModalOpen(true)} currentRoute={currentRoute} setCurrentRoute={setCurrentRoute} />
      
      <main>
        {currentRoute === 'home' ? (
          <div className="animate-fade-in">
            <HomeHero />
            <SocialProofMarquee />
            <ProductOverview setCurrentRoute={setCurrentRoute} />
            <PlatformFeatures />
            <CrossPlatformExperience />
            <TechStack />
          </div>
        ) : (
          <div className="animate-fade-in">
            <BcoHero />
            <BcoExplanation />
            <BcoVsClimax />
            <BcoOperationsExample />
            <BcoUseCase />
          </div>
        )}
        
        <FinalCTA onOpenDemo={() => setIsDemoModalOpen(true)} />
      </main>

      <Footer />
      
      {/* Schedular Modal Overlay */}
      <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </div>
  );
}