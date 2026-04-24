'use client'
import React, { useState, useEffect, useRef } from 'react';
import {
    Map, ShieldCheck, LineChart, CheckCircle2,
    Smartphone, FileText, Bell, AlertTriangle,
    LayoutDashboard, MapPin, Navigation
} from 'lucide-react';

// ─── Data ─────────────────────────────────────────────────────────────────────
const platformFeatures = [
    {
        title: "Global Command Center",
        desc: "Give your shippers a comprehensive desktop dashboard. Track all active containerized loads and manage the supply chain from a single screen.",
        icon: LayoutDashboard,
        tag: "Dashboard",
    },
    {
        title: "Centralized Documents",
        desc: "End the email chaos. Customers can securely access, upload, and approve bills of lading, commercial invoices, and customs documents.",
        icon: FileText,
        tag: "Documents",
    },
    {
        title: "Port Compliance & Alerts",
        desc: "Stay ahead of customs holds and terminal fees. Automate ISF filings and trigger real-time demurrage warnings before costs accrue.",
        icon: ShieldCheck,
        tag: "Compliance",
    },
    {
        title: "Analytics & Insights",
        desc: "Provide comprehensive reporting on freight spend, lane performance, and carbon footprint directly from the dashboard.",
        icon: LineChart,
        tag: "Analytics",
    },
    {
        title: "Supply Chain In Their Pocket",
        desc: "Take the experience fully mobile. Provide a white-labeled iOS and Android app so clients can receive instant push notifications on the go.",
        icon: Smartphone,
        tag: "Mobile App",
    },
];

// ─── Screens ──────────────────────────────────────────────────────────────────
const Screen0 = () => (
  <div className="absolute inset-0 bg-[#F7F8FA] flex items-center justify-center">
    
    <div className="flex items-center justify-center w-full h-full">
      <img
        src="/images/img-1.png"
        alt="img"
        className="p-4"
      />
    </div>

  </div>
);

const Screen1 = () => (
    <div className="absolute inset-0 bg-[#F7F8FA] flex items-center justify-center">
    
    <div className="flex items-center justify-center w-full h-full">
      <img
        src="/images/img-2.png"
        alt="img"
        className="p-18"
      />
    </div>

  </div>
);

const Screen2 = () => (
   <div className="absolute inset-0 bg-[#F7F8FA] flex items-center justify-center">
    
    <div className="flex items-center justify-center w-full h-full">
      <img
        src="/images/img-3.png"
        alt="img"
        className="p-24"
      />
    </div>

  </div>
);

const Screen3 = () => (
    <div className="absolute inset-0 bg-[#F7F8FA] flex">
        <div className="w-36 bg-white border-r border-gray-100 p-5 flex flex-col gap-3">
            <div className="w-6 h-6 bg-gray-50 rounded-lg mb-5 mt-1" />
            {['w-full', 'w-5/6 border-l-2 border-[#FF5C00] bg-orange-50 pl-2', 'w-2/3'].map((cls, i) => (
                <div key={i} className={`h-1.5 ${cls} bg-gray-100 rounded-full`} />
            ))}
        </div>
        <div className="flex-1 p-5 flex flex-col gap-4">
            <div className="flex gap-3 h-20">
                <div className="flex-1 bg-white border border-gray-100 rounded-xl p-4 flex flex-col justify-center shadow-sm">
                    <div className="h-1.5 w-14 bg-gray-200 rounded-full mb-3" />
                    <div className="h-4 w-20 bg-gray-800 rounded-full" />
                </div>
                <div className="flex-1 bg-white border border-gray-100 rounded-xl p-4 flex flex-col justify-center items-end shadow-sm">
                    <div className="h-1.5 w-16 bg-gray-200 rounded-full mb-3" />
                    <div className="h-4 w-14 bg-green-400 rounded-full" />
                </div>
            </div>
            <div className="flex-1 bg-white border border-gray-100 rounded-xl p-4 flex items-end gap-2 shadow-sm">
                {[40, 60, 30, 80, 50, 35, 65].map((h, i) => (
                    <div key={i} className={`flex-1 rounded-t-sm ${i === 3 ? 'bg-[#FF5C00]/70' : 'bg-blue-100'}`} style={{ height: `${h}%` }} />
                ))}
            </div>
        </div>
    </div>
);

const Screen4 = () => (
    <div className="absolute inset-0 bg-[#F7F8FA] flex flex-col pt-14 px-5">
        <div className="flex justify-between items-center mb-6 px-1">
            <div className="w-14 h-2 bg-gray-200 rounded-full" />
            <div className="w-8 h-8 rounded-full bg-white border border-gray-200 shadow-sm" />
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-4 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-full blur-2xl" />
            <div className="text-[9px] text-gray-400 tracking-widest uppercase mb-2">SHP-9021</div>
            <div className="text-lg font-normal text-gray-900 mb-5">In Transit</div>
            <div className="flex justify-between text-[10px] text-gray-400 mb-3">
                <span>SHA</span><span className="opacity-30">——</span><span>LAX</span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="w-2/3 h-full bg-[#FF5C00] rounded-full" />
            </div>
        </div>
        <div className="flex flex-col gap-2.5">
            <div className="text-[9px] text-gray-400 uppercase tracking-[0.2em] mb-1 px-1">Recent Activity</div>
            {[
                { icon: Bell, color: 'text-[#FF5C00]', bg: 'bg-orange-50', label: 'Customs Cleared', time: '12 mins ago' },
                { icon: MapPin, color: 'text-blue-500', bg: 'bg-blue-50', label: 'Departed Origin', time: '2 days ago' },
            ].map(({ icon: Icon, color, bg, label, time }, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-xl p-3.5 flex items-center gap-3 shadow-sm">
                    <div className={`w-9 h-9 rounded-full ${bg} flex items-center justify-center ${color} flex-shrink-0`}>
                        <Icon size={15} strokeWidth={1.5} />
                    </div>
                    <div>
                        <div className="text-[11px] font-medium text-gray-800">{label}</div>
                        <div className="text-[10px] text-gray-400 mt-0.5">{time}</div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const SCREENS = [Screen0, Screen1, Screen2, Screen3, Screen4];

// ─── Device ───────────────────────────────────────────────────────────────────
const DeviceShell = ({ activeIndex }) => {
    const isMobile = activeIndex === 4;
    return (
        <div className="relative flex flex-col items-center">
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px] pointer-events-none transition-all duration-1000 ${isMobile ? 'w-44 h-[300px] bg-[#FF5C00]/10' : 'w-[480px] h-[260px] bg-blue-200/50'}`} />
            <div className={`relative flex flex-col overflow-hidden z-20 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${isMobile
                    ? 'w-[230px] h-[440px] rounded-[2.8rem] border-[6px] border-gray-800 shadow-[0_40px_80px_rgba(0,0,0,0.2)] bg-gray-800'
                    : 'w-[560px] h-[360px] rounded-t-2xl rounded-b-none border-[8px] border-b-[14px] border-gray-200 shadow-[0_20px_60px_rgba(0,0,0,0.1)] bg-gray-200'
                }`}>
                <div className={`absolute left-1/2 -translate-x-1/2 rounded-full z-30 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${isMobile ? 'top-2.5 w-16 h-4 bg-gray-900' : 'top-[-4px] w-1.5 h-1.5 bg-gray-400'}`} />
                <div className={`relative w-full h-full overflow-hidden transition-all duration-1000 ${isMobile ? 'rounded-[2.2rem]' : 'rounded-sm'}`}>
                    {SCREENS.map((ScreenComp, i) => (
                        <div key={i} className="absolute inset-0  transition-all duration-700" style={{
                            opacity: activeIndex === i ? 1 : 0,
                            transform: activeIndex === i ? 'scale(1) translateY(0)' : activeIndex > i ? 'scale(0.97) translateY(-6px)' : 'scale(1.02) translateY(6px)',
                            pointerEvents: activeIndex === i ? 'auto' : 'none',
                        }}>
                            <ScreenComp />
                        </div>
                    ))}
                </div>
            </div>
            <div className={`bg-gray-100 border border-gray-200 border-t-0 relative z-10 flex items-start justify-center transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${isMobile ? 'w-0 h-0 opacity-0 overflow-hidden' : 'w-[620px] h-4 opacity-100 rounded-b-2xl -mt-[1px]'}`}>
                <div className="w-20 h-1 bg-gray-300 rounded-b-md" />
            </div>
            {!isMobile && <div className="w-[480px] h-2 bg-black/8 blur-md rounded-full mt-0.5" />}
        </div>
    );
};

// ─── Main ─────────────────────────────────────────────────────────────────────
export const CrossPlatformExperience = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [mounted, setMounted] = useState(false);
    // The outer wrapper is tall (5 × 100vh) so scroll has room
    // The inner content is sticky at top:0, height:100vh
    const wrapperRef = useRef(null);

    useEffect(() => { setMounted(true); }, []);

    useEffect(() => {
        if (!mounted) return;

        const handleScroll = () => {
            const el = wrapperRef.current;
            if (!el) return;

            const rect = el.getBoundingClientRect();
            const scrolled = -rect.top;                        // how far we've scrolled into the section
            const total = el.offsetHeight - window.innerHeight; // total scrollable distance
            // progress: 0 at top, 1 at bottom
            const progress = Math.max(0, Math.min(1, scrolled / total));
            // map progress to step index
            const step = Math.min(
                platformFeatures.length - 1,
                Math.floor(progress * platformFeatures.length)
            );
            setActiveIndex(step);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [mounted]);

    if (!mounted) return null;

    const feature = platformFeatures[activeIndex];
    const Icon = feature.icon;

    return (
        // Tall wrapper — gives 5 scroll steps worth of space
        <div
            ref={wrapperRef}
            className="relative"
            style={{ height: `${platformFeatures.length * 100}vh` }}
        >
            {/* Sticky inner — always 100vh tall, content changes as you scroll */}
            <div className="sticky top-0 h-screen bg-white border-y border-gray-100 overflow-hidden z-10">

                {/* Subtle bg */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] pointer-events-none" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_10%,transparent_100%)] pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 sm:px-10 h-full flex flex-col-reverse lg:flex-row">

                    {/* ── LEFT: text panel ── */}
                    <div className="w-full lg:w-[45%] h-full flex flex-col justify-center pr-0 lg:pr-16 order-2 lg:order-1 py-10 lg:py-0">

                        {/* Section label */}
                        <div className="inline-flex items-center space-x-3 px-4 py-1.5 rounded-full border border-gray-200 bg-white shadow-sm mb-3 sm:mb-10 self-start">
                            <span className="flex h-1.5 w-1.5 rounded-full bg-[#FF5C00]" />
                            <span className="text-[10px] font-normal text-gray-500 tracking-[0.2em] uppercase">Omnichannel</span>
                        </div>

                        {/* Section heading — stays fixed */}
                        <div className="mb-4 sm:mb-10">
                            <h2 className="text-3xl sm:text-4xl xl:text-5xl font-light text-gray-900 tracking-tight leading-[1.12]">
                                Your supply chain,
                                <br />
                                <span className="text-[#FF5C00] font-light">on every screen.</span>
                            </h2>
                        </div>

                        {/* Active step card — transitions on step change */}
                        <div
                            key={activeIndex}
                            className="flex flex-col"
                            style={{ animation: 'stepIn 0.55s cubic-bezier(0.22,1,0.36,1) forwards' }}
                        >
                            {/* Icon + tag */}
                            <div className="flex items-center gap-3 mb-2 sm:mb-5">
                                <div className="w-11 h-11 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center flex-shrink-0">
                                    <Icon size={20} className="text-[#FF5C00]" strokeWidth={1.5} />
                                </div>
                                <span className="text-[10px] font-medium text-[#FF5C00] uppercase tracking-[0.22em]">
                                    {feature.tag}
                                </span>
                            </div>

                            {/* Title */}
                            <h3 className="text-2xl sm:text-3xl font-normal text-gray-900 leading-snug mb-4">
                                {feature.title}
                            </h3>

                            {/* Orange line */}
                            <div className="w-10 h-0.5 bg-[#FF5C00] rounded-full mb-2 sm:mb-5"
                                style={{ animation: 'lineGrow 0.6s cubic-bezier(0.22,1,0.36,1) forwards' }}
                            />

                            {/* Desc */}
                            <p className="text-base font-light text-gray-500 leading-relaxed max-w-md">
                                {feature.desc}
                            </p>
                        </div>

                        {/* ── Step dots + progress bar ── */}
                        <div className=" mt-4 sm:mt-10 flex flex-col gap-4">
                            {/* Dots */}
                            <div className="flex items-center gap-2.5">
                                {platformFeatures.map((_, i) => (
                                    <div key={i} className={`rounded-full transition-all duration-500 ${i === activeIndex
                                            ? 'w-7 h-2 bg-[#FF5C00]'
                                            : i < activeIndex
                                                ? 'w-2 h-2 bg-[#FF5C00]/35'
                                                : 'w-2 h-2 bg-gray-200'
                                        }`} />
                                ))}
                                {/* <span className="ml-auto text-[10px] text-gray-400 tabular-nums">
                                    {String(activeIndex + 1).padStart(2, '0')} / {String(platformFeatures.length).padStart(2, '0')}
                                </span> */}
                            </div>

                            {/* Progress track */}
                            {/* <div className="w-full h-0.5 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-[#FF5C00] rounded-full transition-all duration-700 ease-out"
                                    style={{ width: `${((activeIndex + 1) / platformFeatures.length) * 100}%` }}
                                />
                            </div> */}

                            {/* <p className="text-[10px] text-gray-400 font-light">
                                Scroll to explore all features
                            </p> */}
                        </div>
                    </div>

                    {/* ── RIGHT: device ── */}
                    <div className="w-full lg:w-[55%] h-[45vh]  lg:h-full flex items-center justify-center order-1 lg:order-2 border-b border-gray-100 lg:border-none overflow-hidden bg-gray-50/50 lg:bg-transparent">
                        <div className="transform scale-[0.52] sm:scale-[0.68] lg:scale-[0.85] xl:scale-100 origin-center transition-transform duration-700">
                            <DeviceShell activeIndex={activeIndex} />
                        </div>
                    </div>

                </div>
            </div>

            {/* Keyframes */}
            <style>{`
        @keyframes stepIn {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes lineGrow {
          from { width: 0;    opacity: 0; }
          to   { width: 40px; opacity: 1; }
        }
      `}</style>
        </div>
    );
};