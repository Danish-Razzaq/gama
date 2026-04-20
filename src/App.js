import React, { useState, useEffect, useRef } from 'react';
import { 
  Moon, Sun, Play, ChevronRight, Zap, Box, Map, ShieldCheck, 
  LineChart, ArrowRight, Menu, X, CheckCircle2, Star,
  Smartphone, Globe, Anchor, Plane, Truck, FileText, Bell,
  Mail, FileSpreadsheet, AlertTriangle, Activity,
  LayoutDashboard, Search, DollarSign, RefreshCw
} from 'lucide-react';

// --- Custom Hooks ---

// Hook for scroll-triggered animations
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

// --- Components ---

// 1. Interactive Background (Particle Network)
const ParticleBackground = ({ isDark }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;
    let mouse = { x: null, y: null };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const numParticles = Math.min(window.innerWidth / 15, 100); // Responsive particle count
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const particleColor = isDark ? 'rgba(0, 255, 255, 0.5)' : 'rgba(10, 25, 47, 0.2)';
      const lineColor = isDark ? 'rgba(0, 255, 255, ' : 'rgba(10, 25, 47, ';

      particles.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off walls
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();

        // Connect particles
        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `${lineColor}${1 - distance / 120})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Connect to mouse
        if (mouse.x != null) {
          const dxMouse = p.x - mouse.x;
          const dyMouse = p.y - mouse.y;
          const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
          if (distMouse < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            // Highlight color near mouse
            ctx.strokeStyle = isDark ? `rgba(255, 107, 0, ${1 - distMouse / 150})` : `rgba(255, 107, 0, ${1 - distMouse / 150})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    canvas.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });

    resizeCanvas();
    drawParticles();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
};

// 2. Navigation
const Navbar = ({ isDark, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'py-3 backdrop-blur-md bg-white/70 dark:bg-[#060B19]/80 shadow-lg dark:shadow-cyan-900/20 border-b border-gray-200/50 dark:border-cyan-900/30' 
        : 'py-5 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF6B00] to-orange-400 flex items-center justify-center text-white font-bold text-xl group-hover:scale-105 transition-transform">
            G
          </div>
          <span className="text-xl font-bold tracking-tight text-[#0A192F] dark:text-white">
            Gama<span className="text-[#FF6B00]">Suite</span>
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {['Platform', 'Integrations', 'About Us', 'Resources'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-[#FF6B00] dark:hover:text-[#FF6B00] transition-colors relative group">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF6B00] transition-all group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Right Actions */}
        <div className="hidden md:flex items-center space-x-6">
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300">
            {isDark ? <Sun size={20} className="animate-spin-slow" /> : <Moon size={20} className="animate-bounce-slight" />}
          </button>
          <button className="text-sm font-semibold text-[#0A192F] dark:text-white hover:text-[#FF6B00] dark:hover:text-[#FF6B00] transition-colors">
            Sign In
          </button>
          <button className="btn-liquid px-6 py-2.5 rounded-full text-white font-semibold shadow-[0_0_15px_rgba(255,107,0,0.4)] dark:shadow-[0_0_20px_rgba(255,107,0,0.6)]">
            Schedule a Demo
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-gray-800 dark:text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-[#060B19] border-b border-gray-200 dark:border-gray-800 p-6 flex flex-col space-y-4 shadow-xl">
           {['Platform', 'Integrations', 'About Us', 'Resources'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-lg font-medium text-gray-800 dark:text-gray-200">{item}</a>
          ))}
          <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-800">
            <button onClick={toggleTheme} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full">
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="btn-liquid px-6 py-2 rounded-full text-white font-semibold">Demo</button>
          </div>
        </div>
      )}
    </nav>
  );
};

// 3. Hero Section
const Hero = () => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden z-10" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
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

        {/* Right Content - Abstract 3D UI Representation */}
        <div className={`relative hidden lg:block transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
          <div className="relative w-full aspect-square max-w-lg mx-auto">
            {/* Base glowing orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-tr from-blue-500/20 to-orange-500/20 dark:from-cyan-500/20 dark:to-[#FF6B00]/20 rounded-full blur-3xl"></div>
            
            {/* Dashboard Mockup Layered CSS */}
            <div className="absolute top-10 right-0 w-full h-[80%] bg-white/80 dark:bg-[#0A192F]/80 backdrop-blur-xl rounded-2xl border border-white/40 dark:border-cyan-500/30 shadow-2xl transform rotate-y-[-15deg] rotate-x-[5deg] transition-transform duration-700 hover:rotate-y-0 hover:rotate-x-0 group">
              {/* Header */}
              <div className="h-12 border-b border-gray-200 dark:border-gray-700/50 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              {/* Content Grid */}
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

              {/* Floating Widgets */}
              <div className="absolute -left-12 top-20 bg-white dark:bg-[#112240] p-4 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 flex items-center gap-3 animate-float">
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg text-green-600 dark:text-green-400">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Invoice #402</div>
                  <div className="text-sm font-bold dark:text-white">Paid in Full</div>
                </div>
              </div>

              <div className="absolute -right-8 bottom-20 bg-white dark:bg-[#112240] p-4 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 flex items-center gap-3 animate-float-delayed">
                <div className="bg-blue-100 dark:bg-cyan-900/30 p-2 rounded-lg text-blue-600 dark:text-cyan-400">
                  <Map size={20} />
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Shipment G-88</div>
                  <div className="text-sm font-bold dark:text-white">Arrived at Port</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// 4. Social Proof Marquee
const Marquee = () => {
  const logos = [
    { name: "CargoWise", icon: <Globe size={28} /> },
    { name: "Maersk", icon: <Anchor size={28} /> },
    { name: "FedEx", icon: <Plane size={28} /> },
    { name: "DHL", icon: <Truck size={28} /> },
    { name: "Sealink", icon: <Anchor size={28} /> },
    { name: "Guided Imports", icon: <Box size={28} /> },
  ];

  // Duplicate for seamless infinite scroll
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

// 5. Before & After Slider (Upgraded Visuals & Layout)
const BeforeAfterSlider = () => {
  const [ref, isVisible] = useScrollReveal();
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);

  const handleMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let clientX;
    
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
    } else {
      clientX = e.clientX;
    }

    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPos(percent);
  };

  const sidebarMenu = [
    { icon: <LayoutDashboard size={14} />, label: 'Dashboard', active: true },
    { icon: <LineChart size={14} />, label: 'Analytics' },
    { icon: <Search size={14} />, label: 'Rates & Bookings' },
    { icon: <FileText size={14} />, label: 'Inquiry' },
    { icon: <Box size={14} />, label: 'Shipments' },
    { icon: <DollarSign size={14} />, label: 'Financials' },
  ];

  return (
    <section className="py-24 relative z-10" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-[#0A192F] dark:text-white mb-4">
            The <span className="text-[#FF6B00]">Gama</span> Difference
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">Drag the slider to see how we transform chaos into a sleek customer experience.</p>
        </div>

        <div 
          ref={containerRef}
          className={`relative w-full h-[500px] md:h-[700px] rounded-[2.5rem] overflow-hidden cursor-ew-resize shadow-2xl transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'} border border-gray-200 dark:border-gray-800`}
          onMouseMove={handleMove}
          onTouchMove={handleMove}
        >
          {/* BACKGROUND LAYER: Before (The Chaos) - strict z-10 stacking context */}
          <div className="absolute inset-0 z-10 bg-[#E5E5E5] dark:bg-[#1A1A1A] overflow-hidden flex items-center justify-center select-none">
             {/* Messy Grid/Lines */}
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/notebook.png')] opacity-30"></div>
             
             {/* Tangled SVG Lines representing confusion */}
             <svg className="absolute inset-0 w-full h-full opacity-20" stroke="currentColor">
                <path d="M100 100 Q 300 500 500 200 T 900 600" fill="transparent" strokeWidth="4" className="text-red-500" />
                <path d="M200 600 Q 400 100 800 300 T 1000 100" fill="transparent" strokeWidth="4" className="text-gray-600" />
             </svg>

             {/* Floating UI Mess */}
             <div className="relative w-full h-full max-w-5xl mx-auto">
                {/* Spreadsheet */}
                <div className="absolute top-[10%] left-[5%] md:left-[10%] w-64 md:w-80 bg-white shadow-xl border border-gray-300 transform -rotate-6 p-4 rounded-sm animate-float">
                   <div className="flex items-center gap-2 mb-3 border-b pb-2 text-green-700">
                     <FileSpreadsheet size={16} /> <span className="text-xs font-bold">RATES_FINAL_v7_copy(2).xlsx</span>
                   </div>
                   <div className="grid grid-cols-4 gap-1 opacity-50">
                     {[...Array(16)].map((_, i) => <div key={i} className={`h-2 rounded-sm ${i % 4 === 0 ? 'bg-gray-400' : 'bg-gray-200'}`}></div>)}
                   </div>
                </div>

                {/* Angry Email */}
                <div className="absolute top-[40%] left-[2%] md:left-[15%] w-72 bg-white shadow-xl border-l-4 border-red-500 transform rotate-3 p-4 rounded-md animate-float-delayed z-20">
                   <div className="flex items-center justify-between mb-2">
                     <span className="text-xs font-bold text-gray-800">Fwd: RE: URGENT Update</span>
                     <Mail size={14} className="text-gray-400" />
                   </div>
                   <p className="text-[10px] text-gray-600 font-serif leading-tight">"Where is my container? You said it would arrive Tuesday. I cannot find the tracking link..."</p>
                </div>

                {/* Sticky Note */}
                <div className="absolute bottom-[20%] left-[10%] md:left-[25%] w-40 h-40 bg-yellow-200 shadow-md transform -rotate-12 p-4 animate-float z-30" style={{ boxShadow: '3px 3px 10px rgba(0,0,0,0.1)' }}>
                   <p className="text-sm font-marker text-gray-800 italic" style={{ fontFamily: '"Comic Sans MS", cursive, sans-serif' }}>Call Customs ASAP!! Missing BL for shipment G-12.</p>
                </div>

                {/* Another Spreadsheet / Error Box */}
                <div className="absolute top-[20%] right-[10%] w-64 bg-red-50 border border-red-200 shadow-xl transform rotate-6 p-4 rounded-md animate-float z-20">
                   <div className="flex items-center gap-2 text-red-600 mb-2">
                     <AlertTriangle size={16} /> <span className="text-sm font-bold">System Error</span>
                   </div>
                   <div className="text-xs text-red-500">Manual API sync failed. Please update records in 3 different systems.</div>
                </div>
                
                {/* Background Mess */}
                <div className="absolute bottom-[10%] right-[20%] w-80 bg-white shadow-xl border border-gray-200 p-4 transform -rotate-3 opacity-80 animate-float-delayed z-10">
                   <div className="h-4 w-1/2 bg-gray-200 mb-2"></div>
                   <div className="h-3 w-3/4 bg-gray-100 mb-1"></div>
                   <div className="h-3 w-5/6 bg-gray-100"></div>
                </div>
             </div>

             {/* Center Label for Before */}
             <div className="absolute bottom-8 left-8 bg-black/60 backdrop-blur-md text-white px-6 py-2 rounded-full font-bold uppercase tracking-widest text-sm shadow-lg border border-white/10 z-40">
                The Chaos
             </div>
          </div>

          {/* FOREGROUND LAYER: After (Organized UI) - strict z-20 stacking context ensures wipes are clean */}
          <div 
            className="absolute inset-0 z-20 bg-gray-50 dark:bg-[#060B19] border-r-[3px] md:border-r-[5px] border-[#FF6B00] overflow-hidden select-none shadow-[10px_0_30px_rgba(0,0,0,0.1)] dark:shadow-[10px_0_30px_rgba(0,0,0,0.5)]"
            style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
          >
            <div className="absolute inset-0 flex items-center justify-center p-3 md:p-8 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100/50 via-white to-gray-50 dark:from-cyan-900/20 dark:via-[#0A192F] dark:to-[#060B19]">
                
                {/* Premium Dashboard Mockup - Responsive to Light/Dark Mode */}
                <div className="w-full max-w-6xl h-full max-h-[600px] bg-white/95 dark:bg-[#0A192F]/95 backdrop-blur-xl rounded-xl border border-gray-200 dark:border-cyan-900/50 shadow-[0_0_50px_rgba(0,0,0,0.1)] dark:shadow-[0_0_50px_rgba(0,255,255,0.05)] flex overflow-hidden">
                   
                   {/* Left Sidebar */}
                   <div className="hidden md:flex w-48 lg:w-56 bg-gray-50/90 dark:bg-[#040812]/90 border-r border-gray-200 dark:border-cyan-900/40 flex-col py-5 z-10">
                      <div className="px-5 flex items-center gap-3 mb-8">
                         <div className="w-6 h-6 rounded bg-[#FF6B00] flex items-center justify-center text-white font-bold text-xs">G</div>
                         <span className="text-gray-900 dark:text-white font-bold text-sm tracking-wide">GAMASUITE</span>
                      </div>
                      <div className="flex-1 px-3 space-y-1">
                         {sidebarMenu.map((item, i) => (
                           <div key={i} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${item.active ? 'bg-blue-50 dark:bg-cyan-900/40 text-blue-600 dark:text-cyan-400 border-l-[3px] border-blue-600 dark:border-cyan-400' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white border-l-[3px] border-transparent'}`}>
                             {item.icon} <span>{item.label}</span>
                           </div>
                         ))}
                      </div>
                   </div>

                   {/* Main Content Area */}
                   <div className="flex-1 flex flex-col min-w-0">
                      
                      {/* Top Header */}
                      <div className="h-14 border-b border-gray-200 dark:border-cyan-900/40 flex items-center justify-between px-6 bg-white/60 dark:bg-[#0A192F]/60">
                         <Menu size={18} className="text-gray-500 dark:text-gray-400 cursor-pointer" />
                         <div className="flex items-center gap-6">
                            <div className="hidden lg:flex flex-col items-end">
                              <span className="flex items-center gap-1.5 text-[10px] text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider"><RefreshCw size={10} className="text-blue-600 dark:text-cyan-400"/> Last Sync Time</span>
                              <span className="text-xs text-gray-900 dark:text-white font-bold">2:43 PM</span>
                            </div>
                            <div className="hidden md:flex flex-col items-start border-l border-gray-200 dark:border-cyan-900/50 pl-6">
                              <span className="text-[10px] text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider">Active Customer</span>
                              <span className="text-xs text-gray-900 dark:text-white font-bold">AAA LOGISTICS</span>
                            </div>
                            <div className="flex items-center gap-3 bg-gray-100 dark:bg-[#112240] px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700/50 cursor-pointer hover:bg-gray-200 dark:hover:bg-[#1A2F50] transition-colors ml-2">
                               <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-white text-[10px] font-bold">AT</div>
                               <span className="hidden sm:block text-xs text-gray-800 dark:text-white font-bold">ADMIN TEST ACCOUNT ▾</span>
                            </div>
                         </div>
                      </div>

                      {/* Dashboard Body */}
                      <div className="flex-1 p-4 lg:p-6 flex flex-col gap-4 overflow-hidden">
                         
                         {/* 4 Stat Cards Row */}
                         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-red-50 dark:bg-gradient-to-br dark:from-red-500/20 dark:to-red-900/10 border border-red-200 dark:border-red-500/20 rounded-lg p-3 md:p-4 shadow-sm relative overflow-hidden">
                              <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/10 rounded-full blur-xl -mr-4 -mt-4"></div>
                              <div className="text-red-600 dark:text-red-400 text-lg md:text-xl font-bold mb-1">327 Bookings</div>
                              <div className="text-red-500 dark:text-red-500/70 text-[10px] md:text-xs font-semibold">Total Bookings</div>
                            </div>
                            <div className="bg-green-50 dark:bg-gradient-to-br dark:from-green-500/20 dark:to-green-900/10 border border-green-200 dark:border-green-500/20 rounded-lg p-3 md:p-4 shadow-sm relative overflow-hidden">
                              <div className="absolute top-0 right-0 w-16 h-16 bg-green-500/10 rounded-full blur-xl -mr-4 -mt-4"></div>
                              <div className="text-green-600 dark:text-green-400 text-lg md:text-xl font-bold mb-1">320 Bookings</div>
                              <div className="text-green-500 dark:text-green-500/70 text-[10px] md:text-xs font-semibold">Booking Utilized</div>
                            </div>
                            <div className="bg-yellow-50 dark:bg-gradient-to-br dark:from-yellow-500/20 dark:to-yellow-900/10 border border-yellow-200 dark:border-yellow-500/20 rounded-lg p-3 md:p-4 shadow-sm relative overflow-hidden">
                              <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-500/10 rounded-full blur-xl -mr-4 -mt-4"></div>
                              <div className="text-yellow-600 dark:text-yellow-400 text-lg md:text-xl font-bold mb-1">7 Bookings</div>
                              <div className="text-yellow-500 dark:text-yellow-500/70 text-[10px] md:text-xs font-semibold">Booking Cancelled</div>
                            </div>
                            <div className="bg-blue-50 dark:bg-gradient-to-br dark:from-blue-500/20 dark:to-blue-900/10 border border-blue-200 dark:border-blue-500/20 rounded-lg p-3 md:p-4 shadow-sm relative overflow-hidden">
                              <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 rounded-full blur-xl -mr-4 -mt-4"></div>
                              <div className="text-blue-600 dark:text-cyan-400 text-lg md:text-xl font-bold mb-1">98 %</div>
                              <div className="text-blue-500 dark:text-cyan-500/70 text-[10px] md:text-xs font-semibold">Utilization</div>
                            </div>
                         </div>

                         {/* Map Area Widget */}
                         <div className="flex-1 bg-gray-50 dark:bg-[#040812] border border-gray-200 dark:border-cyan-900/40 rounded-lg relative overflow-hidden min-h-[150px]">
                            {/* Map Texture & Base */}
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                            
                            {/* Map UI Controls */}
                            <div className="absolute top-3 left-3 bg-white/80 dark:bg-[#0A192F]/80 backdrop-blur border border-gray-200 dark:border-cyan-900/50 rounded shadow-lg z-20 flex items-center px-3 py-1.5 cursor-pointer">
                               <span className="text-xs text-gray-800 dark:text-white font-semibold mr-2">Last Milestones</span>
                               <span className="text-[10px] text-gray-500 dark:text-gray-400">▼</span>
                            </div>
                            
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col bg-white/80 dark:bg-[#0A192F]/80 backdrop-blur border border-gray-200 dark:border-cyan-900/50 rounded overflow-hidden shadow-lg z-20">
                               <div className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 cursor-pointer border-b border-gray-200 dark:border-gray-700/50"><Anchor size={14} className="text-blue-600 dark:text-cyan-400"/></div>
                               <div className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 cursor-pointer border-b border-gray-200 dark:border-gray-700/50"><Plane size={14} className="text-gray-500 dark:text-gray-400"/></div>
                               <div className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 cursor-pointer border-b border-gray-200 dark:border-gray-700/50"><Truck size={14} className="text-gray-500 dark:text-gray-400"/></div>
                               <div className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 cursor-pointer font-bold text-gray-800 dark:text-white text-center">+</div>
                               <div className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 cursor-pointer font-bold text-gray-800 dark:text-white text-center border-t border-gray-200 dark:border-gray-700/50">-</div>
                            </div>

                            <div className="absolute bottom-2 right-2 text-[8px] text-gray-500">Map data ©2026 Gama OS</div>

                            {/* Animated SVG Map Nodes & Routes */}
                            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid slice">
                               <defs>
                                 <filter id="glow-cyan" x="-50%" y="-50%" width="200%" height="200%">
                                   <feGaussianBlur stdDeviation="3" result="blur" />
                                   <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                 </filter>
                                 <filter id="glow-orange" x="-50%" y="-50%" width="200%" height="200%">
                                   <feGaussianBlur stdDeviation="3" result="blur" />
                                   <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                 </filter>
                                 <filter id="glow-green" x="-50%" y="-50%" width="200%" height="200%">
                                   <feGaussianBlur stdDeviation="3" result="blur" />
                                   <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                 </filter>
                               </defs>

                               {/* Routes Lines (Dashed) */}
                               <path d="M 250 120 Q 365 50 480 100" fill="none" className="stroke-blue-200 dark:stroke-cyan-500/30" strokeWidth="2" strokeDasharray="4,4" />
                               <path d="M 500 140 Q 650 250 800 220" fill="none" className="stroke-orange-200 dark:stroke-orange-500/30" strokeWidth="2" strokeDasharray="4,4" />
                               <path d="M 750 180 Q 500 300 220 180" fill="none" className="stroke-green-200 dark:stroke-green-500/30" strokeWidth="2" strokeDasharray="4,4" />

                               {/* Moving Shipments (Glowing dots traveling along paths) */}
                               <circle r="5" className="fill-blue-500 dark:fill-cyan-400" filter="url(#glow-cyan)">
                                  <animateMotion dur="5s" repeatCount="indefinite" path="M 250 120 Q 365 50 480 100" />
                               </circle>
                               <circle r="6" className="fill-orange-500 dark:fill-[#FF6B00]" filter="url(#glow-orange)">
                                  <animateMotion dur="7s" repeatCount="indefinite" path="M 500 140 Q 650 250 800 220" />
                               </circle>
                               <circle r="5" className="fill-green-500 dark:fill-[#10B981]" filter="url(#glow-green)">
                                  <animateMotion dur="9s" repeatCount="indefinite" path="M 750 180 Q 500 300 220 180" />
                               </circle>

                               {/* US/LATAM Cluster (Green) */}
                               <circle cx="150" cy="140" r="8" fill="#10B981" fillOpacity="0.8" className="animate-pulse" />
                               <circle cx="180" cy="160" r="6" fill="#10B981" fillOpacity="0.8" />
                               <circle cx="220" cy="180" r="10" fill="#10B981" fillOpacity="0.8" className="animate-pulse" />
                               <circle cx="250" cy="120" r="6" fill="#10B981" fillOpacity="0.8" />
                               
                               {/* Europe/Africa Cluster (Yellow) */}
                               <circle cx="480" cy="100" r="8" fill="#F59E0B" fillOpacity="0.8" />
                               <circle cx="500" cy="140" r="10" fill="#F59E0B" fillOpacity="0.8" className="animate-pulse" />
                               <circle cx="530" cy="80" r="6" fill="#F59E0B" fillOpacity="0.8" />
                               
                               {/* Asia Cluster (Red) */}
                               <circle cx="750" cy="180" r="6" fill="#EF4444" fillOpacity="0.8" />
                               <circle cx="800" cy="220" r="10" fill="#EF4444" fillOpacity="0.8" className="animate-pulse" />
                               <circle cx="820" cy="192" r="8" fill="#EF4444" fillOpacity="0.8" />
                               <circle cx="850" cy="240" r="6" fill="#EF4444" fillOpacity="0.8" className="animate-pulse" />
                            </svg>
                         </div>

                         {/* Bottom Row: Analytics & Financials */}
                         <div className="h-36 md:h-40 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Pie Chart Analysis */}
                            <div className="bg-white/60 dark:bg-[#112240]/60 border border-gray-200 dark:border-cyan-900/40 rounded-lg p-4 flex flex-col relative overflow-hidden shadow-sm">
                               <div className="text-gray-900 dark:text-white text-sm font-bold mb-3">Pie Chart Analysis</div>
                               <div className="flex gap-2 mb-2 relative z-10">
                                  <div className="bg-gray-50 dark:bg-[#0A192F] border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-[10px] px-2.5 py-1 rounded shadow-sm flex items-center gap-1 cursor-pointer">Sea <span className="text-[8px]">▼</span></div>
                                  <div className="bg-gray-50 dark:bg-[#0A192F] border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-[10px] px-2.5 py-1 rounded shadow-sm flex items-center gap-1 cursor-pointer">Milestones <span className="text-[8px]">▼</span></div>
                               </div>
                               
                               {/* CSS Semi-Circle Chart positioned at bottom center */}
                               <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-48 h-24 overflow-hidden flex justify-center items-end">
                                  <div className="w-48 h-48 rounded-full relative" style={{ background: 'conic-gradient(#3B82F6 0% 55%, #F59E0B 55% 75%, #EF4444 75% 100%)' }}>
                                    {/* Inner cutout for Donut feel (optional, but looks premium) */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white dark:bg-[#112240] rounded-full"></div>
                                  </div>
                               </div>
                            </div>

                            {/* My Financials */}
                            <div className="bg-white/60 dark:bg-[#112240]/60 border border-gray-200 dark:border-cyan-900/40 rounded-lg p-4 flex flex-col justify-between relative shadow-sm">
                               <div className="flex justify-between items-center mb-1">
                                  <div className="text-gray-900 dark:text-white text-sm font-bold">My Financials</div>
                                  <div className="text-blue-600 dark:text-cyan-400 text-[10px] font-bold cursor-pointer hover:underline">See All</div>
                               </div>
                               
                               <div className="text-[10px] grid grid-cols-2 gap-4 mt-2">
                                  <div className="space-y-2">
                                     <div>
                                        <div className="text-gray-500 font-semibold mb-0.5">Invoice#</div>
                                        <div className="text-gray-800 dark:text-gray-300 font-mono">EI-00009-2021</div>
                                     </div>
                                     <div>
                                        <div className="text-gray-500 mb-0.5">May 18, 2021</div>
                                     </div>
                                  </div>
                                  <div>
                                     <div className="text-gray-500 font-semibold mb-1">Booking# <span className="text-gray-800 dark:text-gray-300 font-mono font-normal">EB-00009-2021</span></div>
                                     <div className="flex items-center gap-2 mt-2">
                                        <div className="text-center">
                                           <div className="text-gray-800 dark:text-gray-300 font-bold">USA</div>
                                           <div className="text-gray-500 dark:text-gray-600 text-[8px]">(May 18)</div>
                                        </div>
                                        <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600 relative">
                                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t border-r border-gray-300 dark:border-gray-600 transform rotate-45"></div>
                                        </div>
                                        <div className="text-center">
                                           <div className="text-gray-800 dark:text-gray-300 font-bold">PAKISTAN</div>
                                           <div className="text-gray-500 dark:text-gray-600 text-[8px]">(May 23)</div>
                                        </div>
                                     </div>
                                  </div>
                               </div>
                               
                               <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700/50 flex justify-between items-end">
                                 <div className="text-xs text-gray-500 dark:text-gray-400 font-semibold">Balance Amount:</div>
                                 <div className="text-xl text-gray-900 dark:text-white font-bold tracking-tight">USD 206</div>
                               </div>
                            </div>
                         </div>

                      </div>
                   </div>
                </div>
                
             {/* Center Label for After */}
             <div className="absolute bottom-8 right-8 bg-white/80 dark:bg-[#0A192F]/80 backdrop-blur-md text-[#0A192F] dark:text-white px-6 py-2 rounded-full font-bold uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(0,255,255,0.3)] border border-gray-200 dark:border-cyan-400/30 z-30">
                The Control Tower
             </div>
            </div>
          </div>

          {/* Slider Handle - strict z-30 stacking context to stay firmly on top */}
          <div 
            className="absolute top-0 bottom-0 w-1 md:w-1.5 bg-white dark:bg-[#FF6B00] shadow-[0_0_10px_rgba(0,0,0,0.2)] dark:shadow-[0_0_20px_rgba(255,107,0,0.8)] z-30 cursor-ew-resize hover:bg-gray-100 dark:hover:bg-orange-100 transition-colors"
            style={{ left: `calc(${sliderPos}% - 2px)` }}
          >
            {/* Center Knobs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-[0_0_20px_rgba(0,0,0,0.3)] dark:shadow-[0_0_20px_rgba(0,0,0,0.5)] border-4 border-[#FF6B00] flex items-center justify-center pointer-events-none group-hover:scale-110 transition-transform">
              <div className="flex space-x-0.5 md:space-x-1 text-[#FF6B00]">
                <ChevronRight size={16} className="rotate-180 -mr-2 md:-mr-3" strokeWidth={3} />
                <ChevronRight size={16} strokeWidth={3} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// 6. Core Features (Interactive Bento Grid)
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
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl">Everything you need to provide a Tier-1 digital experience, out of the box. Hover over the tools to see them in action.</p>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px] transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>

          {/* Card 1: Search & Quote (Wide) */}
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

              {/* Animated UI Mockup (Fixed Framing) */}
              <div className="hidden md:flex absolute right-0 bottom-0 w-[50%] h-[80%] bg-white dark:bg-[#112240] rounded-tl-[2rem] border-t border-l border-gray-200 dark:border-cyan-900/50 shadow-[-10px_-10px_30px_rgba(0,0,0,0.05)] dark:shadow-[-10px_-10px_30px_rgba(0,255,255,0.02)] transition-all duration-700 origin-bottom-right scale-95 group-hover:scale-100 opacity-90 group-hover:opacity-100 flex-col p-6">
                <div className="flex justify-between items-center mb-6">
                   <div className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-md text-sm font-bold dark:text-white">SHA</div>
                   <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700 mx-4 relative">
                      <Plane className="absolute top-1/2 left-0 -translate-y-1/2 text-gray-400 group-hover:text-[#FF6B00] group-hover:left-[calc(100%-1rem)] transition-all duration-1000 ease-in-out delay-100" size={16}/>
                   </div>
                   <div className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-md text-sm font-bold dark:text-white">LAX</div>
                </div>
                <div className="bg-blue-50 dark:bg-cyan-900/20 p-4 rounded-xl border border-blue-100 dark:border-cyan-900/50 mt-auto">
                   <div className="text-xs text-blue-600 dark:text-cyan-400 font-semibold mb-1">Ocean FCL • 20 Days</div>
                   <div className="flex justify-between items-end">
                      <div className="text-3xl font-black text-[#0A192F] dark:text-white">$1,450</div>
                      <div className="bg-[#FF6B00] text-white text-sm px-4 py-2 rounded-lg font-bold shadow-lg group-hover:bg-orange-600 transition-colors duration-300">Book Now</div>
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Track & Trace (Tall) */}
          <div className="group relative rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0A192F] shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 col-span-1 row-span-2 flex flex-col">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] dark:opacity-[0.05] group-hover:opacity-[0.1] transition-opacity duration-500"></div>
             <div className="relative p-8 z-10 flex flex-col h-full">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-cyan-900/30 flex items-center justify-center text-blue-600 dark:text-cyan-400 mb-6 transition-transform duration-500 group-hover:scale-110">
                  <Map size={24} />
                </div>
                <h3 className="text-2xl font-bold text-[#0A192F] dark:text-white mb-3">Track & Trace</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8">Crystal clear, real-time visibility across ocean, air, and road. Stop the "where is my cargo?" emails forever.</p>

                {/* Vertical Timeline UI (Perfectly Synchronized Sync Layout) */}
                <div className="relative flex-1 mt-auto pl-2 flex flex-col">
                   <div className="relative h-[140px] flex flex-col justify-between">
                     {/* Background Line */}
                     <div className="absolute left-[9px] top-[10px] bottom-[10px] w-0.5 bg-gray-200 dark:bg-gray-800 z-0"></div>
                     
                     {/* Animated Progress Line - Linear easing keeps the speed constant so the timing lines up perfectly */}
                     <div className="absolute left-[9px] top-[10px] w-0.5 bg-[#FF6B00] h-0 group-hover:h-[calc(100%-20px)] transition-all duration-1000 ease-linear z-10"></div>

                     {/* Top Node */}
                     <div className="relative z-20 flex items-center gap-4">
                       <div className="w-5 h-5 rounded-full bg-white dark:bg-[#0A192F] border-[4px] border-[#FF6B00] shadow-[0_0_10px_rgba(255,107,0,0.5)] flex-shrink-0"></div>
                       <div>
                         <div className="text-sm font-bold dark:text-white leading-tight">Origin Port</div>
                         <div className="text-xs text-gray-500 mt-0.5">Departed</div>
                       </div>
                     </div>
                     
                     {/* Middle Node - Waits 500ms on the way down, and waits 500ms on the way back up */}
                     <div className="relative z-20 flex items-center gap-4">
                       <div className="w-5 h-5 rounded-full bg-white dark:bg-[#0A192F] border-[4px] border-gray-200 dark:border-gray-700 group-hover:border-[#FF6B00] transition-all duration-300 delay-500 flex-shrink-0 group-hover:shadow-[0_0_10px_rgba(255,107,0,0.5)]"></div>
                       <div>
                         <div className="text-sm font-bold dark:text-white leading-tight">Ocean Transit</div>
                         <div className="text-xs text-gray-500 mt-0.5">In Progress</div>
                       </div>
                     </div>
                     
                     {/* Bottom Node - Waits 900ms on the way down, but reacts IMMEDIATELY (0ms) on the way back up */}
                     <div className="relative z-20 flex items-center gap-4 opacity-50 group-hover:opacity-100 transition-opacity duration-300 delay-0 group-hover:delay-[800ms]">
                       <div className="w-5 h-5 rounded-full bg-white dark:bg-[#0A192F] border-[4px] border-gray-200 dark:border-gray-700 group-hover:border-[#FF6B00] transition-all duration-300 delay-0 group-hover:delay-[900ms] flex-shrink-0 group-hover:shadow-[0_0_10px_rgba(255,107,0,0.5)]"></div>
                       <div>
                         <div className="text-sm font-bold dark:text-white leading-tight">Destination</div>
                         {/* Swapping Text Container */}
                         <div className="relative h-4 w-20 mt-0.5">
                           <div className="absolute inset-0 text-xs text-gray-500 transition-opacity duration-300 delay-0 group-hover:delay-[800ms] group-hover:opacity-0">Pending</div>
                           <div className="absolute inset-0 text-xs text-[#FF6B00] font-semibold opacity-0 transition-opacity duration-300 delay-0 group-hover:delay-[900ms] group-hover:opacity-100">Arrived</div>
                         </div>
                       </div>
                     </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Card 3: Secure Payments */}
          <div className="group relative rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0A192F] shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 col-span-1 row-span-1 flex flex-col">
             <div className="absolute inset-0 bg-gradient-to-t from-gray-50/50 to-transparent dark:from-gray-800/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
             <div className="relative p-8 z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300 transition-transform duration-500 group-hover:scale-110">
                    <ShieldCheck size={24} />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-[#0A192F] dark:text-white mb-2">Secure Payments</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">One-click online payments reducing your DSO natively.</p>

                {/* Animated Invoice UI */}
                <div className="mt-auto pt-4 flex justify-center">
                   <div className="w-full max-w-[200px] bg-white dark:bg-[#112240] rounded-xl p-4 border border-gray-100 dark:border-gray-700 shadow-md group-hover:-translate-y-2 transition-transform duration-500 relative overflow-hidden">
                      <div className="flex justify-between items-center mb-3">
                         <div className="h-2 w-10 bg-gray-200 dark:bg-gray-600 rounded"></div>
                         <div className="h-2 w-6 bg-gray-200 dark:bg-gray-600 rounded"></div>
                      </div>
                      <div className="text-xl font-black dark:text-white mb-4">$3,250</div>
                      <div className="w-full py-2 bg-[#0A192F] dark:bg-white text-white dark:text-[#0A192F] text-xs font-bold rounded text-center transition-colors duration-300">
                         Pay Invoice
                      </div>
                      
                      {/* PAID Stamp */}
                      <div className="absolute inset-0 bg-green-500/95 flex items-center justify-center opacity-0 scale-150 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out">
                         <div className="border-[3px] border-white text-white font-black text-2xl px-4 py-1 rounded-lg transform -rotate-12">
                           PAID
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Card 4: Actionable Analytics */}
          <div className="group relative rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0A192F] shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 col-span-1 row-span-1 flex flex-col">
             <div className="absolute inset-0 bg-gradient-to-tr from-indigo-50/50 to-transparent dark:from-indigo-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
             <div className="relative p-8 z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 transition-transform duration-500 group-hover:scale-110">
                    <LineChart size={24} />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-[#0A192F] dark:text-white mb-2">Actionable Analytics</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Supply chain insights that help your clients optimize spend.</p>

                {/* Animated Chart UI */}
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

// 7. Integration Ecosystem
const Integrations = () => {
  const [ref, isVisible] = useScrollReveal();

  // Custom component for the Magnetic Hover Effect
  const MagneticNode = ({ children, x, y, delayClass = "" }) => {
    const areaRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
      if (!areaRef.current) return;
      const { left, top, width, height } = areaRef.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      // Calculate pull strength - higher divisor means softer pull
      setPosition({ 
        x: (e.clientX - centerX) * 0.35, 
        y: (e.clientY - centerY) * 0.35 
      });
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    return (
      <div 
        className="absolute z-20"
        style={{ left: x, top: y }}
      >
        {/* Centering Layer (Isolated from animation transform) */}
        <div className="absolute -translate-x-1/2 -translate-y-1/2">
          {/* Floating Animation Layer */}
          <div className={delayClass}>
            {/* Invisible larger hover area to catch the mouse early */}
            <div 
              ref={areaRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="p-12 relative flex items-center justify-center z-20 cursor-pointer group"
            >
               {/* Visible card element */}
               <div 
                 className="w-24 h-24 md:w-32 md:h-32 flex flex-col items-center justify-center gap-2 bg-white/90 dark:bg-[#112240]/90 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 group-hover:border-[#FF6B00]/60 dark:group-hover:border-cyan-400/60 group-hover:shadow-[0_15px_40px_rgba(255,107,0,0.25)] dark:group-hover:shadow-[0_15px_40px_rgba(0,255,255,0.25)] transition-all"
                 style={{ 
                   transform: `translate(${position.x}px, ${position.y}px)`, 
                   // Smooth spring-like return when mouse leaves, crisp tracking when moving
                   transition: position.x === 0 ? 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.3s' : 'transform 0.1s linear, border-color 0.3s' 
                 }}
               >
                  {children}
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const integrationNodes = [
    { id: 1, name: "CargoWise", icon: <Globe size={32} className="text-blue-600 dark:text-cyan-400" />, x: "20%", y: "15%", delay: "animate-float" },
    { id: 2, name: "Airlines", icon: <Plane size={32} className="text-sky-500 dark:text-sky-400" />, x: "80%", y: "20%", delay: "animate-float-delayed" },
    { id: 3, name: "Ocean Lines", icon: <Anchor size={32} className="text-indigo-600 dark:text-indigo-400" />, x: "25%", y: "85%", delay: "animate-float-delayed" },
    { id: 4, name: "Accounting", icon: <LineChart size={32} className="text-green-600 dark:text-green-400" />, x: "75%", y: "85%", delay: "animate-float" },
    { id: 5, name: "CRM", icon: <ShieldCheck size={32} className="text-purple-600 dark:text-purple-400" />, x: "8%", y: "50%", delay: "animate-float" },
    { id: 6, name: "Customs", icon: <Box size={32} className="text-orange-500" />, x: "92%", y: "50%", delay: "animate-float-delayed" },
  ];

  return (
    <section id="integrations" className="py-32 relative overflow-hidden z-10" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <h2 className="text-3xl md:text-5xl font-bold text-[#0A192F] dark:text-white mb-6">
            We don't replace your systems. <br/>
            <span className="text-[#FF6B00]">We make them invisible.</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-16 max-w-3xl mx-auto">
            GamaSuite sits on top of your existing TMS, pulling data dynamically and presenting it beautifully. Hover over the nodes to see our robust connections.
          </p>

          {/* Expanded Abstract Integration Map */}
          <div className="relative w-full max-w-5xl mx-auto h-[600px] md:h-[750px] flex items-center justify-center border border-gray-100/50 dark:border-cyan-900/10 rounded-[4rem] bg-gradient-to-b from-transparent to-gray-50/50 dark:to-[#040812]/50">
            
            {/* Center Node Background Ripple Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full border border-[#FF6B00]/20 dark:border-[#FF6B00]/30 animate-ping" style={{ animationDuration: '3s' }}></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full border border-[#FF6B00]/10 dark:border-cyan-400/20 animate-ping" style={{ animationDuration: '4s', animationDelay: '1.5s' }}></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] rounded-full border border-blue-500/5 dark:border-cyan-500/10"></div>

            {/* Connecting SVG Lines */}
            <svg className="absolute inset-0 w-full h-full z-0" style={{ filter: 'drop-shadow(0px 0px 6px rgba(0,255,255,0.3))' }}>
               {integrationNodes.map((node) => (
                 <line 
                    key={`line-${node.id}`} 
                    x1="50%" y1="50%" 
                    x2={node.x} y2={node.y} 
                    stroke="currentColor" 
                    className="text-blue-200 dark:text-cyan-900/70 stroke-[3px]" 
                    strokeDasharray="8,10"
                 >
                   <animate attributeName="stroke-dashoffset" from="100" to="0" dur="3s" repeatCount="indefinite" />
                 </line>
               ))}
            </svg>

            {/* Interactive Orbiting Nodes */}
            {integrationNodes.map((node) => (
              <MagneticNode key={node.id} x={node.x} y={node.y} delayClass={node.delay}>
                 {node.icon}
                 <span className="font-bold text-xs md:text-sm text-[#0A192F] dark:text-white mt-2">{node.name}</span>
              </MagneticNode>
            ))}

            {/* Central Gama Node */}
            <div className="absolute z-30 flex flex-col items-center justify-center">
              <div className="w-40 h-40 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-[#FF6B00] to-orange-500 shadow-[0_0_80px_rgba(255,107,0,0.5)] flex flex-col items-center justify-center animate-pulse-slow border-4 border-white dark:border-[#0A192F]">
                <span className="text-white font-black text-4xl md:text-6xl tracking-tight mb-1">Gama</span>
                <span className="text-orange-100 text-sm md:text-base font-bold tracking-[0.3em] uppercase">Suite</span>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

// 8. Testimonials (3D Carousel)
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

// 9. Mobile Experience (Sticky Scroll)
const MobileExperience = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef([]);

  const mobileFeatures = [
    {
      title: "Real-time Tracking",
      desc: "Give your shippers complete peace of mind. They can view active shipments, check estimated times of arrival, and see exact locations on the map.",
      icon: <Map className="text-blue-500 dark:text-cyan-400" size={24} />
    },
    {
      title: "Instant Document Access",
      desc: "No more email chains for missing paperwork. Users can instantly access, upload, and review customs documents, bills of lading, and invoices.",
      icon: <FileText className="text-orange-500" size={24} />
    },
    {
      title: "Push Notifications",
      desc: "Proactive communication built-in. Your clients get instantly notified when a shipment clears customs, reaches a port, or requires action.",
      icon: <Bell className="text-green-500" size={24} />
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const viewportCenter = window.innerHeight / 2;
      let closestIndex = 0;
      let minDistance = Infinity;

      sectionRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const center = rect.top + rect.height / 2;
          const distance = Math.abs(viewportCenter - center);
          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = index;
          }
        }
      });
      setActiveIndex(closestIndex);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative z-10 bg-white/30 dark:bg-[#030610]/30 border-y border-gray-100 dark:border-gray-800/50">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row relative">

        {/* Left Scrollable Text */}
        <div className="w-full lg:w-1/2 pb-[30vh]">
           <div className="pt-[10vh] mb-[15vh] lg:mb-[30vh]">
             <h2 className="text-4xl md:text-5xl font-bold text-[#0A192F] dark:text-white mb-6">
               Your supply chain, <br/>
               <span className="text-[#FF6B00]">in their pocket.</span>
             </h2>
             <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md">
               Provide your shippers with a fully-featured mobile app. Everything they need, perfectly synced with your TMS.
             </p>
           </div>

           <div className="space-y-[20vh] lg:space-y-[40vh]">
             {mobileFeatures.map((f, i) => (
                <div
                  key={i}
                  ref={el => sectionRefs.current[i] = el}
                  className={`transition-all duration-700 flex flex-col justify-center ${
                    activeIndex === i ? 'opacity-100 scale-100' : 'opacity-30 scale-95'
                  }`}
                >
                    <div className="w-14 h-14 rounded-2xl bg-white dark:bg-[#112240] border border-gray-100 dark:border-gray-700 flex items-center justify-center mb-6 shadow-sm">
                      {f.icon}
                    </div>
                    <h3 className="text-3xl font-bold text-[#0A192F] dark:text-white mb-4">{f.title}</h3>
                    <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-md">{f.desc}</p>
                </div>
             ))}
           </div>
        </div>

        {/* Right Sticky Phone */}
        <div className="w-full lg:w-1/2 h-screen sticky top-0 hidden lg:flex items-center justify-center">
           <div className="relative w-[300px] h-[600px] bg-gray-900 rounded-[3rem] border-8 border-gray-800 shadow-2xl overflow-hidden transform transition-transform duration-700">
             {/* Notch */}
             <div className="absolute top-0 inset-x-0 h-6 bg-gray-900 rounded-b-3xl w-40 mx-auto z-30"></div>

             {/* Screen Container */}
             <div className="absolute inset-0 z-20 bg-[#060B19]">
                {/* Status Bar */}
                <div className="absolute top-0 w-full h-12 flex justify-between items-center px-6 text-xs text-white z-50">
                   <span className="font-semibold tracking-wider">9:41</span>
                   <div className="flex gap-1.5 items-center">
                      <Zap size={12} fill="currentColor" />
                      <div className="w-5 h-2.5 border border-white rounded-[3px] p-[1px] relative">
                         <div className="bg-white w-full h-full rounded-[1px]"></div>
                         <div className="absolute -right-[3px] top-1/2 -translate-y-1/2 w-[2px] h-1 bg-white rounded-r-[1px]"></div>
                      </div>
                   </div>
                </div>

                <div className="relative w-full h-full pt-12 overflow-hidden">
                  {/* Screen 0: Tracking */}
                  <div className={`absolute inset-0 pt-12 p-6 flex flex-col bg-white dark:bg-[#060B19] transition-all duration-700 ease-out ${activeIndex === 0 ? 'opacity-100 translate-x-0 z-10' : 'opacity-0 -translate-x-12 z-0 pointer-events-none'}`}>
                     <div className="flex justify-between items-center mb-8">
                       <div className="font-bold text-lg dark:text-white">Active Shipments</div>
                       <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-cyan-900/30 flex items-center justify-center">
                         <Map size={14} className="text-blue-500 dark:text-cyan-400"/>
                       </div>
                     </div>
                     <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl p-5 mb-6 shadow-lg">
                       <div className="text-sm opacity-80 mb-1">G-88 • Ocean Freight</div>
                       <div className="text-2xl font-bold">In Transit</div>
                       <div className="mt-4 flex justify-between text-sm">
                         <span>HKG</span>
                         <span className="opacity-50">⟶</span>
                         <span>LAX</span>
                       </div>
                       <div className="w-full h-1 bg-white/30 rounded-full mt-3">
                         <div className="w-2/3 h-full bg-white rounded-full relative">
                           <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_5px_white]"></div>
                         </div>
                       </div>
                     </div>
                     <div className="space-y-4 flex-1">
                       <div className="text-sm font-bold text-gray-500">Timeline</div>
                       {[1,2,3].map(i => (
                         <div key={i} className="flex gap-3 items-center">
                           <div className="w-2 h-2 rounded-full bg-[#FF6B00]"></div>
                           <div className="flex-1 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl border border-gray-100 dark:border-gray-700">
                             <div className="text-sm font-semibold dark:text-white">Customs Cleared</div>
                             <div className="text-xs text-gray-500">2 hours ago</div>
                           </div>
                         </div>
                       ))}
                     </div>
                  </div>

                  {/* Screen 1: Documents */}
                  <div className={`absolute inset-0 pt-12 p-6 flex flex-col bg-white dark:bg-[#060B19] transition-all duration-700 ease-out ${activeIndex === 1 ? 'opacity-100 translate-x-0 z-10' : activeIndex < 1 ? 'opacity-0 translate-x-12 z-0 pointer-events-none' : 'opacity-0 -translate-x-12 z-0 pointer-events-none'}`}>
                     <div className="flex justify-between items-center mb-6">
                       <div className="font-bold text-lg dark:text-white">Documents</div>
                     </div>
                     <div className="bg-orange-50 dark:bg-[#FF6B00]/10 rounded-2xl p-6 border border-orange-200 dark:border-[#FF6B00]/30 border-dashed mb-6 text-center text-orange-600 dark:text-[#FF6B00] flex flex-col items-center">
                        <div className="w-12 h-12 bg-white dark:bg-[#112240] rounded-full flex items-center justify-center mb-3 shadow-sm border border-gray-100 dark:border-gray-700">
                          <FileText size={20} className="text-[#FF6B00]"/>
                        </div>
                        <span className="text-sm font-semibold">Tap to scan document</span>
                     </div>
                     <div className="space-y-3 flex-1">
                       <div className="text-sm font-bold text-gray-500 mb-2">Recent Files</div>
                       {[
                         { name: 'Commercial_Invoice.pdf', size: '124 KB', type: 'pdf', icon: <FileText size={16}/> },
                         { name: 'Bill_of_Lading.pdf', size: '2.1 MB', type: 'pdf', icon: <FileText size={16}/> },
                         { name: 'Customs_Decl.png', size: '840 KB', type: 'img', icon: <Zap size={16}/> }
                       ].map((doc, i) => (
                         <div key={i} className="flex gap-3 items-center bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl border border-gray-100 dark:border-gray-700">
                           <div className={`p-2 rounded-lg ${doc.type === 'pdf' ? 'bg-red-100 text-red-500 dark:bg-red-900/30' : 'bg-blue-100 text-blue-500 dark:bg-cyan-900/30 dark:text-cyan-400'}`}>
                              {doc.icon}
                           </div>
                           <div className="flex-1 overflow-hidden">
                              <div className="text-sm font-semibold dark:text-white truncate">{doc.name}</div>
                              <div className="text-xs text-gray-500">{doc.size}</div>
                           </div>
                         </div>
                       ))}
                     </div>
                  </div>

                  {/* Screen 2: Notifications */}
                  <div className={`absolute inset-0 pt-12 p-6 flex flex-col bg-white dark:bg-[#060B19] transition-all duration-700 ease-out ${activeIndex === 2 ? 'opacity-100 translate-y-0 z-10' : 'opacity-0 translate-y-12 z-0 pointer-events-none'}`}>
                      <div className="flex justify-between items-center mb-8">
                        <div className="font-bold text-lg dark:text-white">Alerts</div>
                        <div className="relative p-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300">
                          <Bell size={16} />
                          <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-white dark:border-[#060B19]"></span>
                        </div>
                      </div>

                      <div className="space-y-3 flex-1">
                        <div className="flex gap-3 items-start p-3 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-100 dark:border-red-800/30">
                           <div className="p-2 bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 rounded-full mt-1">
                             <Bell size={14} />
                           </div>
                           <div>
                             <div className="text-sm font-bold text-red-700 dark:text-red-400">Action Required</div>
                             <div className="text-xs text-red-600/80 dark:text-red-300/80 mt-1">Missing commercial invoice for Shipment G-88.</div>
                           </div>
                        </div>
                        {[
                          { title: 'Customs Cleared', desc: 'Shipment G-87 cleared in LAX', icon: <CheckCircle2 size={14} />, bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-600 dark:text-green-400' },
                          { title: 'Arrived at Port', desc: 'Vessel docked at Port of Long Beach', icon: <Anchor size={14} />, bg: 'bg-blue-100 dark:bg-cyan-900/30', text: 'text-blue-600 dark:text-cyan-400' },
                          { title: 'Payment Received', desc: 'Invoice #402 paid in full', icon: <ShieldCheck size={14} />, bg: 'bg-gray-100 dark:bg-gray-800', text: 'text-gray-700 dark:text-gray-300' }
                        ].map((notif, i) => (
                          <div key={i} className="flex gap-3 items-start p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
                             <div className={`p-2 rounded-full mt-1 ${notif.bg} ${notif.text}`}>
                               {notif.icon}
                             </div>
                             <div>
                               <div className="text-sm font-bold dark:text-white">{notif.title}</div>
                               <div className="text-xs text-gray-500 mt-1">{notif.desc}</div>
                             </div>
                          </div>
                        ))}
                      </div>
                  </div>
                </div>
             </div>
           </div>
        </div>
      </div>
    </section>
  );
};

// 10. Final CTA
const FinalCTA = ({ isDark }) => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section className="py-24 px-6 relative z-10" ref={ref}>
      <div className={`max-w-5xl mx-auto rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden transition-all duration-1000 transform ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'} ${
        isDark 
          ? 'bg-[#0A192F] border border-cyan-900/30' 
          : 'bg-gradient-to-b from-blue-50 to-white border border-blue-100 shadow-xl'
      }`}>
        {/* Glowing Aura (Dark mode specific) */}
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

// 11. Footer
const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-white dark:bg-[#030610] border-t border-gray-200 dark:border-gray-800 pt-20 pb-10 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
             <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-[#FF6B00] flex items-center justify-center text-white font-bold text-xl">
                G
              </div>
              <span className="text-xl font-bold tracking-tight text-[#0A192F] dark:text-white">
                Gama<span className="text-[#FF6B00]">Suite</span>
              </span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
              The operating system for modern freight forwarders. Elevate your customer experience today.
            </p>
            <div className="flex space-x-4">
               {/* Social placeholders */}
               <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-[#FF6B00] hover:text-white transition-colors cursor-pointer group">
                 <svg className="w-5 h-5 group-hover:-translate-y-1 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
               </div>
               <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-[#FF6B00] hover:text-white transition-colors cursor-pointer group">
                  <svg className="w-5 h-5 group-hover:-translate-y-1 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
               </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-[#0A192F] dark:text-white mb-6">Platform</h4>
            <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
              {['Features', 'Integrations', 'Security', 'Pricing'].map(l => <li key={l}><a href="#" className="hover:text-[#FF6B00] transition-colors">{l}</a></li>)}
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-[#0A192F] dark:text-white mb-6">Company</h4>
            <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
              {['About Us', 'Careers', 'Blog', 'Contact'].map(l => <li key={l}><a href="#" className="hover:text-[#FF6B00] transition-colors">{l}</a></li>)}
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-[#0A192F] dark:text-white mb-6">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
              <li>1-800-GAMA-NOW</li>
              <li>hello@gamasuite.com</li>
              <li>100 Tech Hub Blvd, Suite 400<br/>San Francisco, CA</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">© 2026 GamaSuite. All rights reserved.</p>
          <button onClick={scrollToTop} className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-[#FF6B00] hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <svg className="w-5 h-5 transform -rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>
      </div>
    </footer>
  );
};

// --- Main App Component ---
export default function App() {
  // Default to dark mode ("Command Center")
  const [isDark, setIsDark] = useState(true);

  // Apply dark class to body based on state to ensure native Tailwind support
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#060B19';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#F8F9FA';
    }
  }, [isDark]);

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 ${isDark ? 'dark bg-[#060B19] text-white' : 'bg-[#F8F9FA] text-[#0A192F]'}`}>
      
      {/* Global CSS for complex animations that Tailwind arbitrary values struggle with cleanly */}
      <style dangerouslySetInnerHTML={{__html: `
        :root {
          --color-brand-orange: #FF6B00;
        }
        body { font-family: 'Inter', system-ui, sans-serif; }
        
        .btn-liquid {
          background: linear-gradient(90deg, #FF6B00, #ff8c33, #FF6B00);
          background-size: 200% auto;
          transition: 0.5s;
        }
        .btn-liquid:hover {
          background-position: right center;
        }

        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.33%); } /* Assuming 3 identical sets */
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float 6s ease-in-out 3s infinite; }
        
        @keyframes bounce-slight {
          0%, 100% { transform: translateY(-10%); animation-timing-function: cubic-bezier(0.8,0,1,1); }
          50% { transform: translateY(0); animation-timing-function: cubic-bezier(0,0,0.2,1); }
        }
        .animate-bounce-slight { animation: bounce-slight 2s infinite; }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        
        .animate-pulse-slow { animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
      `}} />

      <ParticleBackground isDark={isDark} />
      <Navbar isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />
      
      <main>
        <Hero />
        <Marquee />
        <BeforeAfterSlider />
        <Features />
        <Integrations />
        <Testimonials />
        <MobileExperience />
        <FinalCTA isDark={isDark} />
      </main>

      <Footer />
    </div>
  );
}

