'use client'
import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import DotGrid from '../UI/DotGrid';

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

// ─── FinalCTA ─────────────────────────────────────────────────────────────────
export const FinalCTA = ({ onOpenDemo }) => {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.3 });

  return (
    <section
      className="py-32 lg:py-48 px-6 sm:px-10 relative z-10 bg-[#FAFAFA] overflow-hidden"
      ref={ref}
    >
      {/* ── Keyframes ── */}
      <style>{`
        @keyframes orbDrift {
          0%,100% { transform: translate(0,0); }
          40%     { transform: translate(60px,-40px); }
          70%     { transform: translate(-30px,30px); }
        }
        @keyframes shimmerSweep {
          0%   { transform: translateX(-150%) skewX(-20deg); }
          100% { transform: translateX(280%)  skewX(-20deg); }
        }
        @keyframes bounceH {
          0%,100% { transform: translateX(0); }
          50%     { transform: translateX(3px); }
        }
      `}</style>

      {/* ── LAYER 1: DotGrid — absolute fill, z-0, pointer-events off ── */}
      {/*
          DotGrid from react-bits needs position:absolute + inset-0 so it
          fills the section without pushing content down.
          We wrap it in a div that is absolute-positioned and sits BELOW
          everything else (z-0). The section itself has position:relative
          so this anchors correctly.
      */}
      <div className="absolute inset-0 z-0">
        <DotGrid
          dotSize={4}
          gap={22}
          baseColor="#FFCBA4"
          activeColor="#FF5C00"
          proximity={140}
          shockRadius={220}
          shockStrength={4}
          resistance={800}
          returnDuration={1.2}
        />
      </div>

      {/* ── LAYER 2: soft orange corner glows (above grid, below card) ── */}
      <div className="absolute top-[-20%] left-[-10%] w-[55%] h-[55%] rounded-full blur-[140px] bg-[#FF5C00]/[0.09] pointer-events-none z-[1] animate-[orbDrift_14s_ease-in-out_infinite]"/>
      <div className="absolute bottom-[-20%] right-[-10%] w-[55%] h-[55%] rounded-full blur-[140px] bg-[#FF5C00]/[0.09] pointer-events-none z-[1] animate-[orbDrift_18s_ease-in-out_infinite_reverse]"/>

      {/* ── LAYER 3: center fade so card background stays clean white ── */}
      {/*
          A radial gradient overlay that fades from #FAFAFA in the very
          center (where the card is) to transparent at the edges — so the
          DotGrid is vivid at the edges but the card area feels clean.
      */}
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          background:
            'radial-gradient(ellipse 70% 65% at 50% 50%, rgba(250,250,250,0.82) 0%, rgba(250,250,250,0) 100%)',
        }}
      />

      {/* ── LAYER 4: White card — z-10 so it sits above all bg layers ── */}
      <div
        className={`relative z-10 max-w-5xl mx-auto bg-white rounded-[3rem] p-10 sm:p-16 md:p-24 text-center overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] transform border border-gray-100 shadow-[0_20px_80px_rgba(0,0,0,0.06)] ${
          isVisible
            ? 'translate-y-0 opacity-100 scale-100'
            : 'translate-y-20 opacity-0 scale-95'
        }`}
      >
        {/* Card inner ambient glows */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[100px] bg-[#FF5C00]/10 pointer-events-none animate-[orbDrift_12s_ease-in-out_infinite]"/>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[100px] bg-blue-500/10 pointer-events-none animate-[orbDrift_16s_ease-in-out_infinite_reverse]"/>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] pointer-events-none"/>

        {/* Card content */}
        <div className="relative z-20 max-w-3xl mx-auto flex flex-col items-center">

          {/* Headline + tracking line */}
          <div className="relative flex flex-col items-center mb-10 w-full">

            <div className="overflow-hidden mb-8 px-2">
              <h2
                className={`text-4xl sm:text-5xl md:text-7xl font-light text-gray-900 tracking-tight leading-[1.1] transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] delay-300 ${
                  isVisible ? 'translate-y-0' : 'translate-y-[120%]'
                }`}
              >
                See exactly <br className="hidden sm:block"/>
                <span className="text-[#FF5C00] font-normal">how it works.</span>
              </h2>
            </div>

            {/* Tracking progress line */}
            <div
              className={`relative w-full max-w-md h-[2px] bg-gray-100 rounded-full transition-opacity duration-1000 delay-500 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-200 rounded-full"/>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-200 rounded-full"/>
              <div
                className="absolute top-0 left-0 h-full bg-[#FF5C00] rounded-full flex justify-end items-center"
                style={{
                  width: isVisible ? '100%' : '0%',
                  transition: 'width 1.5s cubic-bezier(0.25,1,0.5,1) 0.5s',
                }}
              >
                <div className="w-4 h-4 bg-white border-2 border-[#FF5C00] rounded-full translate-x-2 shadow-[0_0_15px_rgba(255,92,0,0.5)]"/>
              </div>
            </div>
          </div>

          {/* Description */}
          <p
            className={`text-lg sm:text-xl font-light text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-[800ms] ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Book a walkthrough to see exactly what you get: live{' '}
            <strong className="text-gray-700 font-medium">shipment tracking</strong>, centralized{' '}
            <strong className="text-gray-700 font-medium">documents</strong>, and how it easily fits
            into your <strong className="text-gray-700 font-medium">daily use</strong>.
          </p>

          {/* CTA Button */}
          <div
            className={`relative inline-block group transition-all duration-1000 delay-[1100ms] ${
              isVisible
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-8 scale-95'
            }`}
          >
            {/* Outer aura */}
            <div className="absolute inset-[-4px] bg-gradient-to-r from-[#FF5C00] to-orange-400 rounded-full blur-lg opacity-40 group-hover:opacity-70 group-hover:blur-xl transition-all duration-500 animate-pulse"/>

            <button
              onClick={onOpenDemo}
              className="relative bg-[#FF5C00] transition-all px-2 pl-8 py-2 rounded-full font-medium text-sm sm:text-base tracking-wide text-white shadow-[0_8px_20px_rgba(255,92,0,0.25)] overflow-hidden flex items-center justify-center gap-6 group-hover:-translate-y-1"
            >
              <span className="relative z-10 py-3">Schedule a Workflow Review</span>

              <div className="relative z-10 bg-white/20 w-12 h-12 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-[#FF5C00] transition-colors duration-300">
                <ArrowRight
                  size={18}
                  strokeWidth={2}
                  style={{ animation: 'bounceH 1.2s ease-in-out infinite' }}
                />
              </div>

              {/* Shimmer sweep */}
              <div className="absolute inset-0 -translate-x-[150%] skew-x-[-20deg] group-hover:[animation:shimmerSweep_0.9s_ease-in-out] bg-gradient-to-r from-transparent via-white/30 to-transparent z-0 pointer-events-none"/>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};