import { 
  Box, 
  LineChart, Anchor, Plane, Truck, FileText,
  LayoutDashboard, Search, DollarSign, MapPin,
} from 'lucide-react';
import { useEffect, useRef, useState, useCallback } from "react";

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

// --- Animated Moving Border Card ---
const SpotlightCard = ({ children, className = "" }) => {
  const cardRef = useRef(null);
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const progressRef = useRef(0);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const hoveredRef = useRef(false);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setSpotlight({ x: e.clientX - rect.left, y: e.clientY - rect.top, opacity: 1 });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    hoveredRef.current = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    hoveredRef.current = false;
    setSpotlight((s) => ({ ...s, opacity: 0 }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const card = cardRef.current;
    if (!canvas || !card) return;

    const ctx = canvas.getContext('2d');
    const borderRadius = 32;

    const resize = () => {
      canvas.width = card.offsetWidth;
      canvas.height = card.offsetHeight;
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(card);

    const drawRoundedBorderPath = (ctx, w, h, r) => {
      ctx.beginPath();
      ctx.moveTo(r, 0);
      ctx.lineTo(w - r, 0);
      ctx.arcTo(w, 0, w, r, r);
      ctx.lineTo(w, h - r);
      ctx.arcTo(w, h, w - r, h, r);
      ctx.lineTo(r, h);
      ctx.arcTo(0, h, 0, h - r, r);
      ctx.lineTo(0, r);
      ctx.arcTo(0, 0, r, 0, r);
      ctx.closePath();
    };

    // Get total perimeter length
    const getPerimeter = (w, h, r) => {
      return 2 * (w - 2 * r) + 2 * (h - 2 * r) + 2 * Math.PI * r;
    };

    // Get point at a given distance along the border
    const getPointAtDistance = (w, h, r, dist) => {
      const perim = getPerimeter(w, h, r);
      let d = ((dist % perim) + perim) % perim;

      // Segments: top, top-right corner, right, bottom-right corner,
      //           bottom, bottom-left corner, left, top-left corner
      const segments = [
        { len: w - 2 * r, type: 'line', x0: r, y0: 0, dx: 1, dy: 0 },
        { len: (Math.PI / 2) * r, type: 'arc', cx: w - r, cy: r, startAngle: -Math.PI / 2, dir: 1 },
        { len: h - 2 * r, type: 'line', x0: w, y0: r, dx: 0, dy: 1 },
        { len: (Math.PI / 2) * r, type: 'arc', cx: w - r, cy: h - r, startAngle: 0, dir: 1 },
        { len: w - 2 * r, type: 'line', x0: w - r, y0: h, dx: -1, dy: 0 },
        { len: (Math.PI / 2) * r, type: 'arc', cx: r, cy: h - r, startAngle: Math.PI / 2, dir: 1 },
        { len: h - 2 * r, type: 'line', x0: 0, y0: h - r, dx: 0, dy: -1 },
        { len: (Math.PI / 2) * r, type: 'arc', cx: r, cy: r, startAngle: Math.PI, dir: 1 },
      ];

      for (const seg of segments) {
        if (d <= seg.len) {
          if (seg.type === 'line') {
            const t = d / seg.len;
            return { x: seg.x0 + t * seg.dx * seg.len, y: seg.y0 + t * seg.dy * seg.len };
          } else {
            const angle = seg.startAngle + (d / seg.len) * (Math.PI / 2) * seg.dir;
            return { x: seg.cx + Math.cos(angle) * r, y: seg.cy + Math.sin(angle) * r };
          }
        }
        d -= seg.len;
      }
      return { x: r, y: 0 };
    };

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const isHov = hoveredRef.current;

      // Always draw the subtle static border
      ctx.save();
      drawRoundedBorderPath(ctx, w, h, borderRadius);
      ctx.strokeStyle = isHov ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.07)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      if (!isHov) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }

      const perim = getPerimeter(w, h, borderRadius);
      // Advance progress
      progressRef.current = (progressRef.current + perim / 220) % perim;

      const trailLen = perim * 0.22; // trail covers ~22% of perimeter
      const steps = 80;

      for (let i = steps; i >= 0; i--) {
        const dist = progressRef.current - (trailLen / steps) * (steps - i);
        const point = getPointAtDistance(w, h, borderRadius, dist);
        const alpha = (i / steps);
        const size = 1.5 + alpha * 2.5;

        ctx.beginPath();
        ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
        // Orange to white gradient along trail
        const r = Math.round(255);
        const g = Math.round(alpha * 180);
        const b = Math.round(alpha * 80);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha * 0.9})`;
        ctx.fill();
      }

      // Bright head dot
      const head = getPointAtDistance(w, h, borderRadius, progressRef.current);
      const grd = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 8);
      grd.addColorStop(0, 'rgba(255, 200, 100, 1)');
      grd.addColorStop(0.3, 'rgba(255, 92, 0, 0.8)');
      grd.addColorStop(1, 'rgba(255, 92, 0, 0)');
      ctx.beginPath();
      ctx.arc(head.x, head.y, 8, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative rounded-[2rem] overflow-hidden cursor-default transition-all duration-500 cursor-pointer ${className}`}
    >
      {/* Canvas border animation — sits on top as overlay (pointer-events off) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-30 pointer-events-none rounded-[2rem]"
        style={{ width: '100%', height: '100%' }}
      />

      {/* Card background */}
      <div className="absolute inset-0 bg-white/[0.04] group-hover:bg-white/[0.06] transition-all duration-500 rounded-[2rem]" />

      {/* Spotlight radial glow */}
      <div
        className="pointer-events-none absolute inset-0 z-10 rounded-[2rem] transition-opacity duration-300"
        style={{
          opacity: spotlight.opacity,
          background: `radial-gradient(350px circle at ${spotlight.x}px ${spotlight.y}px, rgba(255,92,0,0.09), transparent 70%)`,
        }}
      />
      {/* Top-edge border highlight on hover */}
      <div
        className="pointer-events-none absolute inset-0 z-10 rounded-[2rem] transition-opacity duration-300"
        style={{
          opacity: spotlight.opacity * 0.7,
          background: `radial-gradient(180px circle at ${spotlight.x}px 0px, rgba(255,92,0,0.18), transparent 60%)`,
        }}
      />

      {children}
    </div>
  );
};

export const PlatformFeatures = () => {
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
    <section
      className="py-32 relative z-10 bg-[#0B0F19] border-t border-white/[0.06] overflow-hidden"
      ref={ref}
    >
      {/* Parallax texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.04] bg-fixed pointer-events-none mix-blend-overlay" />

      {/* Animated data grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_65%_65%_at_50%_50%,#000_10%,transparent_100%)] pointer-events-none animate-grid-pan" />

      {/* Orbiting blue glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] bg-blue-600/10 animate-orbit pointer-events-none mix-blend-screen" />

      {/* Orbiting orange glow */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] bg-[#FF5C00]/10 animate-orbit-reverse pointer-events-none mix-blend-screen" />

      {/* Top center radial */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[radial-gradient(ellipse_at_top,rgba(255,92,0,0.06)_0%,transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#FF5C00] mb-6 tracking-tight">
              How it works.
            </h2>
            <p className="text-lg font-light text-slate-200 max-w-xl leading-relaxed">
              A comprehensive toolkit designed to modernize your forwarding operations and empower shippers to self-serve.
            </p>
          </div>
        </div>

        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-[auto] lg:auto-rows-[340px] transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
        >

          {/* Card 1 — Search & Quote */}
          <SpotlightCard className="col-span-1 md:col-span-2 row-span-1">
            <div className="relative h-full p-10 lg:p-12 flex flex-col md:flex-row items-start justify-between z-20">
              <div className="w-full md:w-[45%]">
                <div className="w-14 h-14 rounded-2xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-slate-400 mb-8 group-hover:text-[#FF5C00] group-hover:border-[rgba(255,92,0,0.3)] group-hover:bg-[rgba(255,92,0,0.08)] transition-all duration-500">
                  <Search size={22} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-normal text-white mb-4 tracking-wide ">Search & Quote</h3>
                <p className="text-base font-light text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-500">
                  Fast, reliable freight shipping rates search gives your customers on-demand pricing across all modes—with your controlled markup.
                </p>
              </div>

              <div className="hidden md:flex absolute right-0 bottom-0 w-[45%] h-[85%] bg-[#080C14] rounded-tl-[2rem] border-t border-l border-white/[0.07] flex-col p-8 transition-all duration-700 translate-x-10 translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0">
                <div className="flex justify-between items-center mb-8">
                  <div className="text-[10px] font-normal tracking-[0.2em] uppercase text-[#FF5C00]">CNSHA</div>
                  <div className="flex-1 h-px bg-white/[0.08] mx-5 relative overflow-hidden">
                    <Plane
                      className="absolute top-1/2 -translate-y-1/2 left-0 text-[#FF5C00] opacity-0 group-hover:opacity-100 group-hover:left-[calc(100%-14px)] transition-all duration-[1100ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
                      size={20}
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="text-[10px] font-normal tracking-[0.2em] uppercase text-[#FF5C00]">USLAX</div>
                </div>
                <div className="bg-white/[0.04] p-6 rounded-2xl border border-white/[0.07] mt-auto flex flex-col gap-4">
                  <div className="text-[9px] text-slate-500 uppercase tracking-[0.2em] font-normal">Ocean FCL • 20 Days</div>
                  <div className="flex justify-between items-end">
                    <div className="text-4xl font-light tracking-tight text-white">$1,450</div>
                    <div className="bg-white/[0.06] text-slate-200 border border-white/[0.1] text-[9px] uppercase tracking-[0.15em] px-5 py-2.5 rounded-full font-normal group-hover:bg-[#FF5C00] group-hover:text-white group-hover:border-[#FF5C00] transition-all duration-500 cursor-pointer">
                      Quote
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SpotlightCard>

          {/* Card 2 — Book Shipments */}
          <SpotlightCard className="col-span-1 row-span-1 flex flex-col">
            <div className="relative p-10 lg:p-12 flex flex-col h-full z-20">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-slate-400 mb-8 group-hover:text-[#FF5C00] group-hover:border-[rgba(255,92,0,0.3)] group-hover:bg-[rgba(255,92,0,0.08)] transition-all duration-500">
                <Box size={22} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-normal text-white mb-4 tracking-wide">Book Shipments</h3>
              <p className="text-base font-light text-slate-400 leading-relaxed mb-8 md:mb-0 group-hover:text-slate-300 transition-colors duration-500">
                Hassle-free online booking options allow your customers to self-serve.
              </p>
              <div className="mt-auto w-full hidden md:flex">
                <div className="flex gap-3 opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-14 h-14 bg-white/[0.04] border border-white/[0.07] rounded-full flex items-center justify-center text-slate-400 group-hover:bg-[rgba(255,92,0,0.1)] group-hover:text-[#FF5C00] group-hover:border-[rgba(255,92,0,0.25)] transition-all duration-500 delay-75">
                    <Anchor size={18} strokeWidth={1.5} />
                  </div>
                  <div className="w-14 h-14 bg-white/[0.04] border border-white/[0.07] rounded-full flex items-center justify-center text-slate-400 group-hover:text-slate-200 transition-all duration-500 delay-150">
                    <Plane size={18} strokeWidth={1.5} />
                  </div>
                  <div className="w-14 h-14 bg-white/[0.04] border border-white/[0.07] rounded-full flex items-center justify-center text-slate-400 group-hover:text-slate-200 transition-all duration-500 delay-200">
                    <Truck size={18} strokeWidth={1.5} />
                  </div>
                </div>
              </div>
            </div>
          </SpotlightCard>

          {/* Card 3 — Real-Time Tracking (tall) */}
          <SpotlightCard className="col-span-1 row-span-1 md:row-span-2 flex flex-col">
            <div className="relative p-10 lg:p-12 z-20 flex flex-col h-full">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-slate-400 mb-8 group-hover:text-[#FF5C00] group-hover:border-[rgba(255,92,0,0.3)] group-hover:bg-[rgba(255,92,0,0.08)] transition-all duration-500">
                <MapPin size={22} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-normal text-white mb-4 tracking-wide">Real-Time Tracking</h3>
              <p className="text-base font-light text-slate-400 mb-10 leading-relaxed group-hover:text-slate-300 transition-colors duration-500">
                Crystal clear visibility from pick-up through delivery, keeping customers updated.
              </p>
              <div className="relative flex-1 mt-auto pl-4 hidden md:flex flex-col opacity-50 group-hover:opacity-100 transition-opacity duration-700">
                <div className="relative h-[220px] flex flex-col justify-between">
                  <div className="absolute left-[7px] top-[10px] bottom-[10px] w-px bg-white/[0.08] z-0" />
                  <div className="absolute left-[7px] top-[10px] w-px bg-gradient-to-b from-[#FF5C00] to-[rgba(255,92,0,0.1)] h-0 group-hover:h-[calc(100%-20px)] transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] z-10" />
                  {[
                    { label: "Origin Port", delay: "delay-0" },
                    { label: "Ocean Transit", delay: "delay-[400ms]" },
                    { label: "Destination", delay: "delay-[900ms]" },
                  ].map(({ label, delay }, i) => (
                    <div key={i} className="relative z-20 flex items-center gap-6">
                      <div className={`w-4 h-4 rounded-full bg-[#0B0F19] border-2 ${i === 0 ? 'border-[#FF5C00]' : 'border-white/20'} group-hover:border-[#FF5C00] transition-colors duration-300 ${delay} flex-shrink-0`} />
                      <div className={`text-sm font-light ${i === 0 ? 'text-slate-200' : 'text-slate-500'} group-hover:text-slate-200 transition-colors duration-300 ${delay}`}>
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SpotlightCard>

          {/* Card 4 — Manage Shipments */}
          <SpotlightCard className="col-span-1 row-span-1 flex flex-col">
            <div className="relative p-10 lg:p-12 z-20 flex flex-col h-full">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-slate-400 mb-8 group-hover:text-[#FF5C00] group-hover:border-[rgba(255,92,0,0.3)] group-hover:bg-[rgba(255,92,0,0.08)] transition-all duration-500">
                <LayoutDashboard size={22} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-normal text-white mb-4 tracking-wide">Manage Shipments</h3>
              <p className="text-base font-light text-slate-400 leading-relaxed mb-8 md:mb-0 group-hover:text-slate-300 transition-colors duration-500">
                Through an easy-to-use interface, customers can edit bookings and download documents.
              </p>
              <div className="mt-auto hidden md:flex">
                <div className="w-full max-w-[240px] bg-[#080C14] rounded-2xl border border-white/[0.07] p-5 group-hover:-translate-y-3 transition-transform duration-700 ease-out">
                  <div className="flex justify-between items-center border-b border-white/[0.06] pb-4 mb-4">
                    <span className="text-[10px] font-normal text-slate-500 tracking-[0.2em] uppercase">SHP-9021</span>
                    <span className="text-[9px] text-emerald-400 font-normal uppercase tracking-[0.15em]">Active</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-slate-400 group-hover:text-[#FF5C00] group-hover:border-[rgba(255,92,0,0.25)] group-hover:bg-[rgba(255,92,0,0.07)] transition-all duration-500">
                      <FileText size={15} strokeWidth={1.5} />
                    </div>
                    <span className="text-sm font-light text-slate-300">BOL_Final.pdf</span>
                  </div>
                </div>
              </div>
            </div>
          </SpotlightCard>

          {/* Card 5 — Pay Invoices */}
          <SpotlightCard className="col-span-1 row-span-1 flex flex-col">
            <div className="relative p-10 lg:p-12 z-20 flex flex-col h-full">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-slate-400 mb-8 group-hover:text-[#FF5C00] group-hover:border-[rgba(255,92,0,0.3)] group-hover:bg-[rgba(255,92,0,0.08)] transition-all duration-500">
                <DollarSign size={22} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-normal text-white mb-4 tracking-wide">Pay Invoices</h3>
              <p className="text-base font-light text-slate-400 leading-relaxed mb-8 md:mb-0 group-hover:text-slate-300 transition-colors duration-500">
                Quick and easy payment options allow your customers to securely pay online.
              </p>
              <div className="mt-auto hidden md:flex">
                <div className="w-full max-w-[220px] bg-[#080C14] rounded-2xl border border-white/[0.07] p-6 group-hover:-translate-y-3 transition-transform duration-700 ease-out">
                  <div className="text-[9px] font-normal text-slate-500 tracking-[0.2em] uppercase mb-4">Invoice #9942</div>
                  <div className="text-3xl font-light text-white mb-6">$3,250</div>
                  <div className="w-full py-3 bg-white/[0.06] border border-white/[0.09] text-slate-200 text-[9px] uppercase tracking-[0.15em] font-normal rounded-full text-center transition-all duration-500 group-hover:bg-[#FF5C00] group-hover:border-[#FF5C00] group-hover:text-white">
                    Pay Now
                  </div>
                </div>
              </div>
            </div>
          </SpotlightCard>

          {/* Card 6 — Actionable Insights (wide) */}
          <SpotlightCard className="col-span-1 md:col-span-2 row-span-1">
            <div className="relative h-full p-10 lg:p-12 flex flex-col md:flex-row items-start justify-between z-20">
              <div className="w-full md:w-[45%]">
                <div className="w-14 h-14 rounded-2xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-slate-400 mb-8 group-hover:text-[#FF5C00] group-hover:border-[rgba(255,92,0,0.3)] group-hover:bg-[rgba(255,92,0,0.08)] transition-all duration-500">
                  <LineChart size={22} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-normal text-white mb-4 tracking-wide">Actionable Insights</h3>
                <p className="text-base font-light text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-500">
                  Actionable information from analytical tools empowers your customers, making you an invaluable partner. Real-time data is readily accessible.
                </p>
              </div>

              <div className="hidden md:flex absolute right-0 bottom-0 w-[45%] h-[85%] bg-[#080C14] rounded-tl-[2rem] border-t border-l border-white/[0.07] flex-col p-8 transition-all duration-700 translate-x-10 translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0">
                <div className="flex justify-between items-center mb-10">
                  <div className="text-[10px] uppercase tracking-[0.2em] font-normal text-slate-500">Spend Analysis</div>
                  <div className="text-emerald-400 text-xs font-normal tracking-wide">+14.2%</div>
                </div>
                <div className="flex-1 flex items-end justify-between gap-3 border-b border-white/[0.06] pb-4">
                  {chartHeights.map((classes, i) => (
                    <div key={i} className="w-full bg-white/[0.03] rounded-t-lg h-full relative flex items-end overflow-hidden">
                      <div
                        className={`w-full bg-white/[0.15] rounded-t-lg transition-all duration-700 ease-out group-hover:bg-[rgba(255,92,0,0.65)] ${classes}`}
                        style={{ transitionDelay: `${i * 55}ms` }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SpotlightCard>

        </div>
      </div>
    </section>
  );
};