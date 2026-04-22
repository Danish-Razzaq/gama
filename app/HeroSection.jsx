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

import { PlatformFeatures } from './components/HowItWorks'
import { CrossPlatformExperience } from './components/CrossPlatformExperience'
import { BcoOperationsExample } from './components/BcoOperationsExample'


// --- Custom Hooks ---
const useScrollReveal = (options = { threshold: 0.1 }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, options);

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options.threshold, mounted]);

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted]);

  const navigate = (route) => {
    setCurrentRoute(route);
    setMobileMenuOpen(false);
    if (mounted) window.scrollTo(0, 0);
  };

  return (
    <>
      {/* ── Keyframes for the orange underline on active link ── */}
      <style>{`
        @keyframes navUnderline {
          from { width: 0; opacity: 0; }
          to   { width: 100%; opacity: 1; }
        }
      `}</style>

      <nav
        className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'py-3' : 'py-6 lg:py-7'
          }`}
      >
        {/* ── Background panel — switches from transparent to dark glass ── */}
        <div
          className={`absolute inset-0 transition-all duration-500 ${scrolled
              ? 'bg-[#0d0e169e] backdrop-blur-xl border-b border-white/[0.07] shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
              : 'bg-transparent border-b border-transparent'
            }`}
        />

        {/* ── Optional: thin orange top accent line when scrolled ── */}
        <div
          className={`absolute top-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF5C00]/60 to-transparent transition-all duration-700 ${scrolled ? 'w-full opacity-100' : 'w-0 opacity-0'
            }`}
        />

        <div className="max-w-7xl mx-auto px-6 sm:px-10 flex justify-between items-center relative z-10">

          {/* Logo */}
          <div
            onClick={() => navigate('home')}
            className="flex items-center gap-3 group cursor-pointer z-50 transition-all duration-300 "
          >
            <img src={`
              ${scrolled ? '/images/logo-white.svg' : '/images/logo.svg '}`} alt="logo" />
          </div>

          {/* ── Desktop Nav Pills ── */}
          <div
            className={`hidden lg:flex items-center space-x-1 px-2 py-2 rounded-full border transition-all duration-500 ${scrolled
                ? 'bg-white/[0.05] border-white/[0.08] backdrop-blur-md'
                : 'bg-white/60 backdrop-blur-md border-gray-200/60 shadow-[0_2px_10px_rgba(0,0,0,0.01)]'
              }`}
          >
            {/* BCO link */}
            <button
              onClick={() => navigate('bco')}
              className={`relative px-5 py-2 rounded-full text-[13px] font-normal tracking-wide transition-all duration-300 ${scrolled
                  ? 'text-white hover:text-white hover:bg-white/[0.06]'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100/60'
                }`}
            >
              Gama BCO
              {currentRoute === 'bco' && (
                <span
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 h-[2px] rounded-full bg-[#FF5C00]"
                  style={{ animation: 'navUnderline 0.3s ease forwards' }}
                />
              )}
            </button>

            {/* Other nav items */}
            {['Platform', 'Integrations', 'Company'].map((item) => (
              <button
                key={item}
                onClick={() => navigate('home')}
                className={`px-5 py-2 rounded-full text-[13px] font-normal tracking-wide transition-all duration-300 ${scrolled
                    ? 'text-white hover:text-white hover:bg-white/[0.06]'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100/60'
                  }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* ── Desktop Actions ── */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              className={`text-[13px] font-normal tracking-wide transition-colors duration-300 px-4 py-2 rounded-full ${scrolled
                  ? 'text-white/70 hover:text-white hover:bg-white/[0.06]'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100/60'
                }`}
            >
              Log In
            </button>

            <button
              onClick={onOpenDemo}
              className={`relative px-6 py-2.5 rounded-full font-normal text-[13px] tracking-wide transition-all duration-300 overflow-hidden group hover:-translate-y-0.5 ${scrolled
                  ? 'bg-[#FF5C00] text-white shadow-[0_0_20px_rgba(255,92,0,0.35)] hover:shadow-[0_0_28px_rgba(255,92,0,0.5)]'
                  : 'bg-[#FF5C00] text-white shadow-[0_4px_14px_rgba(255,92,0,0.25)] hover:shadow-[0_6px_20px_rgba(255,92,0,0.35)]'
                }`}
            >
              {/* Shimmer sweep on hover */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              <span className="relative z-10">Book Demo</span>
            </button>
          </div>

          {/* ── Mobile Toggle ── */}
          <div className="flex items-center gap-3 lg:hidden z-50">
            <button
              className={`p-2 rounded-lg transition-all duration-300 ${scrolled
                  ? 'text-white hover:bg-white/[0.08]'
                  : 'text-gray-800 hover:bg-gray-100/60'
                }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        <div
          className={`lg:hidden absolute top-full left-0 w-full transition-all duration-500 ease-in-out overflow-hidden ${mobileMenuOpen
              ? 'max-h-[500px] opacity-100'
              : 'max-h-0 opacity-0'
            }`}
        >
          {/* Glass panel */}
          <div className="bg-[#0B0F19]/95 backdrop-blur-xl border-b border-white/[0.07] shadow-[0_20px_40px_rgba(0,0,0,0.5)] px-6 py-6">

            {/* Nav links */}
            <div className="flex flex-col gap-1 mb-6">
              {[
                { label: 'Home', route: 'home' },
                { label: 'Gama BCO', route: 'bco' },
                { label: 'Platform', route: 'home' },
                { label: 'Integrations', route: 'home' },
                { label: 'Company', route: 'home' },
              ].map(({ label, route }) => (
                <button
                  key={label}
                  onClick={() => navigate(route)}
                  className={`text-left px-4 py-3 rounded-xl text-[15px] font-light transition-all duration-200 ${currentRoute === route && route !== 'home'
                      ? 'text-[#FF5C00] bg-[rgba(255,92,0,0.07)]'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-white/[0.06] mb-6" />

            {/* CTA buttons */}
            <div className="flex flex-col gap-3">
              <button className="text-[14px] font-normal text-slate-300 py-3 px-4 rounded-xl hover:bg-white/[0.05] hover:text-white transition-all duration-200 text-left">
                Log In
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenDemo(); }}
                className="relative bg-[#FF5C00] text-white py-3.5 rounded-full font-normal text-[14px] tracking-wide shadow-[0_0_20px_rgba(255,92,0,0.3)] overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-active:translate-x-full transition-transform duration-500" />
                <span className="relative z-10">Book a Demo</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
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
            The operational standard <br className="hidden sm:block" />
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
          <div key={idx} className="mx-16 text-xl font-light tracking-widest text-gray-600 uppercase select-none">
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
            The complete suite. <br className="hidden sm:block" />
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


// 7. Cross Platform Experience (Restored & Styled to Minimal Aesthetic)


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
            <div
              key={i}
              className="group relative overflow-hidden rounded-[1rem] lg:rounded-[2.5rem] p-8 min-h-[200px] md:min-h-[240px]
  /* Base Style: Deep Depth & Glassmorphism */
  bg-[radial-gradient(120%_120%_at_50%_10%,rgba(255,255,255,0.03)_0%,rgba(11,15,25,1)_100%)]
  border border-white/[0.05]
  flex flex-col items-center justify-center cursor-pointer
  transition-all duration-700 ease-[cubic-bezier(0.2,1,0.2,1)]
  
  /* Constant Shadow (Resting State) */
  shadow-[0_15px_35px_-5px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.05)]
  
  /* Hover State */
  hover:-translate-y-4 hover:border-white/[0.15]
  hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.7),0_0_20px_rgba(255,92,0,0.1)]"
            >
              {/* 1. Permanent Ambient Background Glow (Resting State) */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1/4 bg-[#FF5C00]/5 blur-[60px] pointer-events-none" />

              {/* 1. THE CLASSIC PARTIAL BORDER (Top & Left) */}
              <div className="absolute inset-0 rounded-[2rem] pointer-events-none">
                {/* Top Border - Tapered */}
                <div className="absolute top-0 left-8 right-8 h-[1.5px] bg-gradient-to-r from-transparent via-[#FF5C00] to-transparent via-[#FF5C00]/50 transition-all duration-700" />
                {/* Left Border - Tapered */}
                <div className="absolute bottom-0 left-8 right-8 h-[1.5px] bg-gradient-to-r from-transparent via-[#FF5C00] to-transparent via-[#FF5C00]/50 transition-all duration-700" />
              </div>

              {/* 2. Soft Edge Light (Shows when NOT hovered) */}
              <div className="absolute inset-0  rounded-[1rem] lg:rounded-[2.5rem] bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />

              {/* 3. Icon Container - Now looks like a 'gem' at rest */}
              <div
                className="relative z-10 w-16 h-16 rounded-2xl
    bg-gradient-to-br from-white/[0.08] to-transparent
    border border-white/[0.1]
    flex items-center justify-center mb-6
    shadow-xl backdrop-blur-xl transition-all duration-700
    group-hover:scale-110 group-hover:rotate-[8deg] group-hover:border-[#FF5C00]/50
    group-hover:shadow-[0_0_40px_rgba(255,92,0,0.2)]"
              >
                <Activity
                  size={26}
                  strokeWidth={1.2}
                  className="text-white/40 group-hover:text-[#FF5C00] transition-all duration-500"
                />
              </div>

              {/* 4. Typography Stacking */}
              <div className="relative z-10 flex flex-col items-center text-center">
                <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-bold mb-3 
      group-hover:text-[#FF5C00] transition-colors duration-500">
                  {node.label}
                </span>
                <h3 className="text-2xl font-light tracking-tight text-white/80 
      group-hover:text-white group-hover:font-medium transition-all duration-500">
                  {node.name}
                </h3>
              </div>

              {/* 5. The "Hidden" Bottom Detail */}
              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#FF5C00]/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-in-out" />
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
            Take control of your <br />
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



const BcoUseCase = () => {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.2 });
  const [activeStep, setActiveStep] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredImg, setIsHoveredImg] = useState(true);

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
            Scale effortlessly. <br className="hidden sm:block" />
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
                  className={`cursor-pointer rounded-[2rem] p-6 sm:p-8 transition-all duration-500 border ${isActive ? 'bg-white border-[#FF5C00] shadow-[0_15px_40px_rgba(0,0,0,0.05)] scale-[1.02]' : 'bg-transparent border-gray-200 hover:bg-gray-50/50'}`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-500 ${isActive ? 'bg-orange-50 text-[#FF5C00]' : 'bg-gray-100 text-gray-500'}`}>
                      {item.icon}
                    </div>
                    <h3 className={`text-xl font-normal transition-colors duration-500 ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>{item.title}</h3>
                  </div>
                  <p className={`text-sm font-light leading-relaxed transition-colors duration-500 ${isActive ? 'text-gray-600' : 'text-gray-500'}`}>
                    {item.desc}
                  </p>
                </div>
              )
            })}
          </div>

          {/* Right: Mac OS Window Placeholder */}
          <div className="lg:col-span-7"

          >
            <div className="  w-full h-[400px] md:h-[500px] bg-white rounded-[2.5rem] border border-gray-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] relative">

              {/* Window Header */}
              {/* macOS header */}
              <div className="h-11 bg-[#0d0e169e] border-b border-white/[0.06] flex items-center px-5 gap-2.5 flex-shrink-0 relative z-20">
                <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${hoveredImg ? 'bg-red-500' : 'bg-white/[0.1]'}`} />
                <div className={`w-3 h-3 rounded-full transition-colors duration-300 delay-75 ${hoveredImg ? 'bg-yellow-400' : 'bg-white/[0.1]'}`} />
                <div className={`w-3 h-3 rounded-full transition-colors duration-300 delay-150 ${hoveredImg ? 'bg-emerald-400' : 'bg-white/[0.1]'}`} />
                <div className="ml-4 flex-1 max-w-[240px] h-6 rounded-md bg-white/[0.04] border border-white/[0.06] flex items-center px-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500/60 mr-2 flex-shrink-0" />
                  <div className="h-1.5 w-24 rounded-full bg-white/[0.08]" />
                </div>
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
                    <Image size={40} className="text-[#FF5C00] mb-6" strokeWidth={1.5} />
                    <span className="text-base font-medium text-gray-400 uppercase tracking-widest">{item.placeholder}</span>
                    <span className="text-sm font-light text-[#FF5C00] mt-3 max-w-sm">(Replace with actual CRM screenshot)</span>
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
                See exactly <br className="hidden sm:block" />
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToTop = () => {
    if (mounted) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const topElement = document.getElementById('top-of-page');
      if (topElement) {
        topElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setStep(0);
      setSelectedDate(null);
      setSelectedTime(null);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen, mounted]);

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
              Schedule a <br /><span className="text-[#FF5C00] font-normal">Workflow Review.</span>
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
                    <Check size={12} strokeWidth={1.5} className="text-[#FF5C00]" />
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
                    <button className="p-1.5 rounded-full border border-gray-100 text-gray-300 cursor-not-allowed"><ChevronRight size={16} strokeWidth={1.5} className="rotate-180" /></button>
                    <button className="p-1.5 rounded-full border border-gray-200 text-gray-600 hover:border-gray-300 transition-colors"><ChevronRight size={16} strokeWidth={1.5} /></button>
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
                A calendar invitation for <br /><span className="font-medium text-gray-700">March {selectedDate} at {selectedTime}</span> <br />has been sent to your email.
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    // Force light theme
    document.body.style.backgroundColor = '#FAFAFA';
  }, [mounted]);

  return (
    <div id="top-of-page" className="min-h-screen font-sans transition-colors duration-500 overflow-clip bg-[#FAFAFA] text-gray-900">

      <style dangerouslySetInnerHTML={{
        __html: `
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