'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Box, MapPin, ShieldCheck, Image } from 'lucide-react';

// ─── useScrollReveal ──────────────────────────────────────────────────────────
const useScrollReveal = (options = { threshold: 0.1 }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (!mounted) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); }
    }, options);
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options.threshold, mounted]);
  return [ref, isVisible];
};

// ─── StepBadge ────────────────────────────────────────────────────────────────
// The numbered circle with count-up + rotating dashed ring + pulse on reveal
const StepBadge = ({ number, isVisible, delay = 0 }) => {
  const [displayNum, setDisplayNum] = useState(0);
  const target = parseInt(number, 10);

  useEffect(() => {
    if (!isVisible) return;
    const t = setTimeout(() => {
      let n = 0;
      const tick = () => {
        n += 1;
        setDisplayNum(n);
        if (n < target) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(t);
  }, [isVisible, target, delay]);

  return (
    <div
      className="relative flex items-center justify-center w-14 h-14 flex-shrink-0"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale(1)' : 'scale(0.4)',
        transition: `opacity 0.5s ease ${delay}ms, transform 0.6s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms`,
      }}
    >
      {/* Pulse ring — one-shot on reveal */}
      {isVisible && (
        <div
          className="absolute inset-0 rounded-full border border-[#FF5C00]/40"
          style={{ animation: `badgePulse 1.2s ease-out ${delay}ms 1 forwards` }}
        />
      )}
      {/* Slow rotating dashed ring */}
      <div
        className="absolute w-[68px] h-[68px] rounded-full border border-dashed border-[#FF5C00]/20"
        style={{ animation: 'spin 14s linear infinite' }}
      />
      {/* Solid circle */}
      <div className="relative w-14 h-14 rounded-full bg-[rgba(255,92,0,0.08)] border border-[#FF5C00]/35 flex items-center justify-center z-10">
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,92,0,0.18),transparent_70%)]" />
        <span className="text-[#FF5C00] text-sm font-light tracking-[0.15em] z-10 tabular-nums select-none">
          {String(displayNum).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
};

// ─── AnimatedConnector ────────────────────────────────────────────────────────
// An SVG curved path drawn between two step badges.
// Uses stroke-dashoffset animation — the most reliable way to animate a line.
const AnimatedConnector = ({ isVisible, delay = 0, reverse = false }) => {
  const pathRef = useRef(null);
  const [length, setLength] = useState(300);

  useEffect(() => {
    if (pathRef.current) {
      setLength(pathRef.current.getTotalLength());
    }
  }, []);

  // The path: a gentle S-curve from top-center down to bottom-center
  // reverse flips the horizontal arc direction for visual variety
  const d = reverse
    ? 'M 60 0 C 60 40, 0 60, 0 100 C 0 140, 60 160, 60 200'
    : 'M 0 0 C 0 40, 60 60, 60 100 C 60 140, 0 160, 0 200';

  return (
    <div className="hidden lg:flex justify-center w-full h-[200px] my-[-20px] relative z-0 pointer-events-none">
      <svg
        width="60"
        height="200"
        viewBox="0 0 60 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        overflow="visible"
      >
        {/* Static dim track */}
        <path
          d={d}
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        />

        {/* Animated fill path */}
        <path
          ref={pathRef}
          d={d}
          stroke="url(#connectorGrad)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          style={{
            strokeDasharray: length,
            strokeDashoffset: isVisible ? 0 : length,
            transition: `stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
          }}
        />

        {/* Travelling dot — moves along path using CSS animation */}
        {isVisible && (
          <circle r="3" fill="#FF5C00" opacity="0.9">
            <animateMotion
              dur="1.4s"
              begin={`${delay}ms`}
              fill="freeze"
              calcMode="spline"
              keySplines="0.4 0 0.2 1"
            >
              <mpath href={`#cp-${delay}`} />
            </animateMotion>
          </circle>
        )}

        {/* Named path for animateMotion */}
        <path
          id={`cp-${delay}`}
          d={d}
          fill="none"
          stroke="none"
        />

        {/* Glow dot at the end */}
        {isVisible && (
          <circle
            r="4"
            fill="rgba(255,92,0,0.6)"
            style={{
              filter: 'blur(2px)',
              opacity: isVisible ? 1 : 0,
              transition: `opacity 0.3s ease ${delay + 1300}ms`,
            }}
          >
            <animateMotion
              dur="1.4s"
              begin={`${delay}ms`}
              fill="freeze"
              calcMode="spline"
              keySplines="0.4 0 0.2 1"
            >
              <mpath href={`#cp-${delay}`} />
            </animateMotion>
          </circle>
        )}

        <defs>
          <linearGradient id="connectorGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF5C00" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#FF5C00" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FF5C00" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

// ─── WindowCard ───────────────────────────────────────────────────────────────
const WindowCard = ({ placeholder, isVisible, delay = 0 }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="w-full h-64 sm:h-80 lg:h-[420px] rounded-[2rem] border border-white/[0.07] overflow-hidden flex flex-col relative"
      style={{
        background: 'rgba(255,255,255,0.04)',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms, box-shadow 0.4s ease`,
        boxShadow: hovered
          ? '0 0 0 1px rgba(255,92,0,0.2), 0 32px 64px rgba(0,0,0,0.4)'
          : '0 20px 48px rgba(0,0,0,0.3)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="absolute inset-0 rounded-[2rem] pointer-events-none transition-opacity duration-500 z-10"
        style={{
          opacity: hovered ? 1 : 0,
          background: 'radial-gradient(500px circle at 50% 0%, rgba(255,92,0,0.08), transparent 60%)',
        }}
      />
      {/* macOS header */}
      <div className="h-11 bg-white/[0.03] border-b border-white/[0.06] flex items-center px-5 gap-2.5 flex-shrink-0 relative z-20">
        <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${hovered ? 'bg-red-500' : 'bg-white/[0.1]'}`} />
        <div className={`w-3 h-3 rounded-full transition-colors duration-300 delay-75 ${hovered ? 'bg-yellow-400' : 'bg-white/[0.1]'}`} />
        <div className={`w-3 h-3 rounded-full transition-colors duration-300 delay-150 ${hovered ? 'bg-emerald-400' : 'bg-white/[0.1]'}`} />
        <div className="ml-4 flex-1 max-w-[240px] h-6 rounded-md bg-white/[0.04] border border-white/[0.06] flex items-center px-3">
          <div className="w-2 h-2 rounded-full bg-emerald-500/60 mr-2 flex-shrink-0" />
          <div className="h-1.5 w-24 rounded-full bg-white/[0.08]" />
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_20%,transparent_100%)]" />
        <div className="text-center relative z-10 flex flex-col items-center px-8">
          <div className={`w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-5 transition-all duration-500 ${hovered ? 'border-[rgba(255,92,0,0.25)] bg-[rgba(255,92,0,0.06)]' : ''}`}>
            <Image size={22} className={`transition-colors duration-500 ${hovered ? 'text-[#FF5C00]' : 'text-slate-600'}`} strokeWidth={1.5} />
          </div>
          <span className="text-[10px] font-normal text-slate-500 uppercase tracking-[0.2em] leading-relaxed">{placeholder}</span>
          <span className="text-[10px] font-light text-slate-600 mt-2">(Replace with actual screenshot)</span>
        </div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_bottom_right,rgba(255,92,0,0.05),transparent_70%)]" />
      </div>
    </div>
  );
};

// ─── BcoOperationsExample ─────────────────────────────────────────────────────
export const BcoOperationsExample = () => {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 });

  const steps = [
    {
      phase: 'Phase 1: Origin & Booking',
      title: 'Consolidating the shipment.',
      desc: 'Instead of emailing multiple forwarders back and forth, simply log into the Gama BCO portal. Your international bookings are already logged. Master BOLs, packing lists, and origin terminal updates are instantly centralized via API sync, giving your team immediate access to the ground truth without checking a single spreadsheet.',
      placeholder: 'Unified Booking & Document Vault',
      icon: <Box className="text-[#FF5C00]" size={22} strokeWidth={1.5} />,
      number: '01',
      tags: ['API Sync', 'Auto BOL', 'Doc Vault'],
    },
    {
      phase: 'Phase 2: In Transit',
      title: 'Live tracking & predictive alerts.',
      desc: 'Once the vessel departs, stop relying on outdated carrier websites. Instantly view live GPS coordinates directly on the Gama map. As your containers approach their destination, the predictive engine warns you of potential terminal congestion, allowing your drayage team to adjust schedules ahead of time and avoid costly demurrage.',
      placeholder: 'Live Map & Exceptions Dashboard',
      icon: <MapPin className="text-[#FF5C00]" size={22} strokeWidth={1.5} />,
      number: '02',
      reverse: true,
      tags: ['Live GPS', 'Predictive ETA', 'Demurrage Alerts'],
    },
    {
      phase: 'Phase 3: Destination & Compliance',
      title: 'Automated customs handoff.',
      desc: 'Before the cargo even arrives, Gama automatically screens the documentation and triggers an immediate ISF filing alert to your customs broker. You securely download the Commercial Invoice with one click. Zero compliance delays, zero frantic phone calls—just a smooth handover at the port.',
      placeholder: 'Compliance Alerts & Customs Handoff',
      icon: <ShieldCheck className="text-[#FF5C00]" size={22} strokeWidth={1.5} />,
      number: '03',
      tags: ['ISF Filing', 'Auto Screening', 'One-click Docs'],
    },
  ];

  return (
    <section
      className="py-24 lg:py-32 relative z-10 bg-[#0B0F19] overflow-hidden"
      ref={ref}
    >
      {/* ── Global keyframes ── */}
      <style>{`
        @keyframes badgePulse {
          0%   { transform: scale(1);   opacity: 0.7; }
          70%  { transform: scale(2.2); opacity: 0.2; }
          100% { transform: scale(2.8); opacity: 0;   }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>

      {/* ── Background layers ── */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.04] bg-fixed pointer-events-none mix-blend-overlay" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_65%_65%_at_50%_50%,#000_10%,transparent_100%)] pointer-events-none animate-grid-pan" />
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] bg-blue-600/10 animate-orbit pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] bg-[#FF5C00]/10 animate-orbit-reverse pointer-events-none mix-blend-screen" />
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[radial-gradient(ellipse_at_top,rgba(255,92,0,0.05)_0%,transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">

        {/* ── Header ── */}
        <div
          className="text-center mb-20 lg:mb-28"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 1s ease, transform 1s ease',
          }}
        >
          <div className="inline-flex items-center space-x-3 px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] mb-6 backdrop-blur-sm">
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="text-[10px] font-normal text-slate-400 tracking-[0.2em] uppercase">Real-Life Example</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6 tracking-tight">
            Managing global shipments{' '}
            <br className="hidden sm:block" />
            <span className="text-[#FF5C00] font-normal">without the chaos.</span>
          </h2>
          <p className="text-lg font-light text-slate-400 max-w-2xl mx-auto leading-relaxed">
            See exactly how Gama BCO replaces scattered email threads and fragmented spreadsheets with a single, unified operational timeline.
          </p>
        </div>

        {/* ── Steps + Connectors ── */}
        <div className="flex flex-col">
          {steps.map((step, i) => (
            <React.Fragment key={i}>

              {/* ── Step row ── */}
              <div
                className={`flex flex-col ${step.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-10 lg:gap-16`}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                  transition: `opacity 1s ease ${i * 220}ms, transform 1s ease ${i * 220}ms`,
                }}
              >
                {/* Text + badge side */}
                <div className="w-full lg:w-5/12 flex items-start gap-5">
                  {/* StepBadge */}
                  <StepBadge
                    number={step.number}
                    isVisible={isVisible}
                    delay={i * 220 + 80}
                  />

                  {/* Text */}
                  <div className="flex flex-col flex-1 min-w-0 pt-1">
                    <div className="text-[10px] font-normal text-slate-500 uppercase tracking-[0.2em] mb-3">
                      {step.phase}
                    </div>
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-[rgba(255,92,0,0.07)] border border-[rgba(255,92,0,0.2)] flex items-center justify-center flex-shrink-0">
                        {step.icon}
                      </div>
                      <h3 className="text-xl lg:text-2xl font-normal text-white leading-tight">{step.title}</h3>
                    </div>
                    <div className="w-10 h-px bg-gradient-to-r from-[#FF5C00]/60 to-transparent mb-4" />
                    <p className="text-sm lg:text-base font-light text-slate-400 leading-relaxed">{step.desc}</p>
                    <div className="flex flex-wrap gap-2 mt-5">
                      {step.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] uppercase tracking-[0.18em] text-slate-400 border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 rounded-full hover:border-[rgba(255,92,0,0.3)] hover:text-[#FF5C00] transition-colors duration-300 cursor-default"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Window card side */}
                <div className="w-full lg:w-7/12">
                  <WindowCard
                    placeholder={step.placeholder}
                    isVisible={isVisible}
                    delay={i * 220 + 160}
                  />
                </div>
              </div>

              {/* ── Animated SVG connector between steps ── */}
              {i < steps.length - 1 && (
                <AnimatedConnector
                  isVisible={isVisible}
                  delay={i * 220 + 600}
                  reverse={step.reverse}
                />
              )}

            </React.Fragment>
          ))}
        </div>

      </div>
    </section>
  );
};