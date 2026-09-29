import React, { useState, useEffect, useRef } from 'react';
import sagarLogo from '../assets/sagar-logo.png';
import heroGraphic from '../assets/hero-graphic.png';
import stepMonitor from '../assets/step-monitor.png';
import stepDetect from '../assets/step-detect.png';
import stepIdentify from '../assets/step-identify.png';
import stepReport from '../assets/step-report.png';
import maritimeEnforcementGap from '../assets/maritime-enforcement-gap.png';
import waterVideo from '../assets/water-bg.mp4';

interface LandingPageProps {
  onEnterDashboard: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterDashboard }) => {
  const [scrolled, setScrolled] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [revealedCards, setRevealedCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const endMarkerRef = useRef<HTMLDivElement>(null);
  
  const hasAnimatedRef = useRef(false);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setHasAnimated(true);
      hasAnimatedRef.current = true;
      setRevealedCards([0, 1, 2, 3]);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        // Trigger animation only when the end marker (bottom of section) is reached
        if (entry.isIntersecting && !hasAnimatedRef.current && !isAnimatingRef.current) {
          isAnimatingRef.current = true;
          setIsAnimating(true);
          
          const delays = [0, 600, 1200, 1800];
          delays.forEach((delay, idx) => {
            setTimeout(() => {
              setRevealedCards((prev) => {
                if (!prev.includes(idx)) return [...prev, idx];
                return prev;
              });
            }, delay);
          });

          // Wait for sequence to complete + 600ms highlight/buffer time before unlocking
          setTimeout(() => {
            isAnimatingRef.current = false;
            hasAnimatedRef.current = true;
            setIsAnimating(false);
            setHasAnimated(true);
            observer.disconnect();
          }, 2400); 
        }
      },
      { threshold: 0, rootMargin: "0px 0px 0px 0px" } 
    );

    if (endMarkerRef.current) {
      observer.observe(endMarkerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isAnimating) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isAnimating]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const workflowSteps = [
    {
      num: '01',
      title: 'Monitor',
      img: stepMonitor,
      desc: 'Synthetic Aperture Radar (SAR) continuously scans the Exclusive Economic Zone regardless of cloud cover, monsoon weather, or night hours.',
    },
    {
      num: '02',
      title: 'Detect',
      img: stepDetect,
      desc: 'Computer vision algorithms identify surface capillary-wave damping to segment slick boundaries and distinguish oil from biogenic lookalikes.',
    },
    {
      num: '03',
      title: 'Identify',
      img: stepIdentify,
      desc: 'Kinematic drift models backtrack the spill to the exact discharge window, correlating AIS tracks, course deviations, and speed anomalies.',
    },
    {
      num: '04',
      title: 'Report',
      img: stepReport,
      desc: 'Generates court-admissible ICG Form 356 evidentiary packets with metocean drift vectors and legal proof for immediate interdiction.',
    }
  ];

  return (
    <div className="min-h-screen bg-[#fcfdfd] text-slate-950 font-sans selection:bg-cyan-500 selection:text-white">
      
      {/* Fixed Sticky Header */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-12 flex items-center ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200' : 'bg-transparent'}`}>
        <div className="w-full px-4 lg:px-8 flex items-center justify-between">
          
          {/* Left Branding */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 flex items-center justify-center shrink-0">
              <img src={sagarLogo} alt="SAGAR" className="w-full h-full object-contain drop-shadow" />
            </div>
            <div className="flex flex-col justify-center gap-0.5">
              <div className="flex items-center gap-2">
                <span className="font-sans font-black text-lg tracking-tight text-slate-950 leading-none">
                  SAGAR
                </span>
                <span className="text-[9px] font-mono font-black bg-slate-900 text-white px-1.5 py-0.5 rounded leading-none">
                  NTRO
                </span>
                <span className="text-xs font-sans font-semibold text-slate-700 leading-none hidden xl:inline">
                  National Technical Research Organisation
                </span>
              </div>
              <p className="text-[11px] font-sans font-medium text-slate-800 tracking-tight leading-none">
                <span className="text-blue-700 font-black">S</span>atellite{' '}
                <span className="text-blue-700 font-black">A</span>nalytics for{' '}
                <span className="text-blue-700 font-black">G</span>eospatial{' '}
                <span className="text-blue-700 font-black">A</span>nomaly &{' '}
                <span className="text-blue-700 font-black">R</span>esponsibility-tracing
                <span className="text-slate-400 mx-1.5">•</span>
                <span className="italic text-blue-700 font-bold font-serif">~ "Spill se Source Tak."</span>
              </p>
            </div>
          </div>

          {/* Center Links */}
          <div className="hidden md:flex items-center gap-8 font-sans font-semibold text-[13px] text-slate-600">
            <a href="#home" className="hover:text-slate-900 hover:-translate-y-0.5 transition-all duration-300 leading-none">Home</a>
            <a href="#how-it-works" className="hover:text-slate-900 hover:-translate-y-0.5 transition-all duration-300 leading-none">How It Works</a>
            <a href="#problem-solution" className="hover:text-slate-900 hover:-translate-y-0.5 transition-all duration-300 leading-none">Operational Problem</a>
            <a href="#capabilities" className="hover:text-slate-900 hover:-translate-y-0.5 transition-all duration-300 leading-none">Capabilities</a>
            <a href="#enforcement" className="hover:text-slate-900 hover:-translate-y-0.5 transition-all duration-300 leading-none">Legal Dossier</a>
          </div>

          {/* Right Branding */}
          <div className="flex items-center">
            <div className="hidden xl:flex flex-col text-right justify-center gap-0.5">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-none">Government of India</span>
              <span className="text-sm font-bold text-slate-800 tracking-tight leading-none">Ministry of Ports, Shipping & Waterways</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 min-h-screen flex items-center justify-center overflow-hidden">
        {/* Full Bleed Background (starts below navbar) */}
        <div className="absolute top-[76px] inset-x-0 bottom-0 z-0">
          <img 
            src={heroGraphic} 
            alt="Satellite Detecting Oil Spill At Sea" 
            className="w-full h-full object-cover select-none object-center brightness-[0.4]" 
          />
          {/* Bottom Gradient for smooth transition */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#fcfdfd] via-[#fcfdfd]/10 to-transparent pointer-events-none"></div>
          
          {/* Scanning Ray Sweep */}
          <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen">
            <div className="w-full h-48 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent -translate-y-full animate-[scan_6s_ease-in-out_infinite]"></div>
          </div>
        </div>

        {/* Hero Foreground Content - Left-Aligned & Shifted Upwards */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-12 flex justify-start items-start pt-8 lg:pt-12 min-h-[calc(100vh-64px)]">
          <div className="max-w-2xl w-full flex flex-col items-start text-left space-y-5">
            
            {/* Active Radar Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/40 text-cyan-300 font-mono text-[11px] font-bold backdrop-blur-md shadow-lg">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span>SAR BEAM ACTIVE // SATELLITE MONITORING</span>
            </div>

            {/* Primary Heading, Acronym, and New Prominent Headline */}
            <div className="space-y-3">
              <h1 className="font-sans font-black text-7xl md:text-8xl lg:text-[7rem] tracking-tight text-white leading-none drop-shadow-[0_4px_14px_rgba(0,0,0,0.85)]">
                SAGAR
              </h1>
              
              <p className="text-base md:text-lg font-sans font-medium text-slate-200 tracking-tight leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                <span className="text-cyan-400 font-black text-lg md:text-xl">S</span>atellite{' '}
                <span className="text-cyan-400 font-black text-lg md:text-xl">A</span>nalytics for{' '}
                <span className="text-cyan-400 font-black text-lg md:text-xl">G</span>eospatial{' '}
                <span className="text-cyan-400 font-black text-lg md:text-xl">A</span>nomaly &{' '}
                <span className="text-cyan-400 font-black text-lg md:text-xl">R</span>esponsibility-tracing
                <span className="block mt-2 italic text-cyan-300 font-bold font-serif text-base md:text-lg">~ "Spill se Source Tak."</span>
              </p>

              {/* High-Impact Main Headline */}
              <h2 className="text-4xl md:text-5xl lg:text-5xl font-black text-white tracking-tight leading-tight pt-2 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                Detecting Illegal Oil Spills <br /> at Sea
              </h2>
            </div>

            {/* Descriptive Body Copy */}
            <p className="text-base md:text-lg text-slate-200 font-sans leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] max-w-xl">
              SAGAR combines multi-frequency Synthetic Aperture Radar, hydrodynamic backward particle modeling, and maritime AIS intelligence to attribute illegal oil discharges at sea directly to responsible vessels.
            </p>

            {/* Call-to-Action Buttons */}
            <div className="flex flex-wrap items-center justify-start gap-4 pt-2">
              <button
                onClick={onEnterDashboard}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-7 py-3 rounded-xl font-mono text-xs font-black transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] active:scale-95 cursor-pointer flex items-center gap-2 group"
              >
                <span>Explore Live Surveillance Map</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
              <button
                onClick={() => scrollTo('how-it-works')}
                className="bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 px-6 py-3 rounded-xl font-mono text-xs font-bold transition-all backdrop-blur-md active:scale-95 cursor-pointer"
              >
                How It Works ↓
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* HOW IT WORKS: Cinematic Organic Sequential Reveal */}
      <section 
        id="how-it-works" 
        ref={sectionRef} 
        className="relative bg-white"
      >
        {/* Outer wrapper to allow some scrolling before triggering */}
        <div className="h-[120svh] relative w-full">
          
          {/* Sticky Container - exactly viewport height */}
          <div className="sticky top-0 h-[100svh] w-full flex flex-col justify-center overflow-hidden pt-16 lg:pt-20">
            
            {/* Subtle white/cyan atmospheric background pulse during animation */}
            <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}>
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-50/50 via-white/0 to-white/0 animate-pulse"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 lg:px-6 w-full relative z-10 flex flex-col items-center">
              <div className="text-center max-w-2xl mx-auto mb-8 lg:mb-10 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 font-mono text-xs font-bold uppercase tracking-wider border border-slate-200">
                  <span>🌊</span> Operational Workflow
                </div>
                <h2 className="text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
                  From Space to Enforcement Action
                </h2>
                <p className="text-sm text-slate-600 font-sans">
                  How SAGAR processes raw radar backscatter into legal maritime attribution.
                </p>
              </div>

              {/* 4 Workflow Steps on Complete Graphic Assets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10 w-full justify-items-center">
                {workflowSteps.map((step, idx) => {
                  const isRevealed = revealedCards.includes(idx);
                  return (
                  <div 
                    key={idx}
                    className={`relative flex flex-col items-center group transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isRevealed ? 'opacity-100 translate-y-0 scale-100 blur-0' : 'opacity-0 translate-y-12 scale-95 blur-sm'} ${hasAnimated ? 'hover:-translate-y-3' : ''}`}
                  >
                    <div className="relative w-full max-w-[300px] lg:max-w-[320px] flex flex-col items-center justify-center">
                      <img 
                        src={step.img} 
                        alt={step.title} 
                        className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.03]" 
                      />
                    </div>
                  </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          
          {/* Dedicated End Marker at the absolute bottom of the scroll area */}
          <div ref={endMarkerRef} className="h-px w-full absolute bottom-0 pointer-events-none" />
        </div>
      </section>

      {/* PROBLEM VS SOLUTION SECTION */}
      <section id="problem-solution" className="pt-4 lg:pt-8 scroll-mt-16 w-full relative bg-[#fcfdfd] overflow-hidden">
        
        {/* Main Graphic Layer */}
        <div className="w-full flex justify-center relative z-10 pb-8">
          <img 
            src={maritimeEnforcementGap} 
            alt="The Maritime Enforcement Void" 
            className="w-full h-auto max-w-none block object-contain drop-shadow-md relative z-0" 
          />
          {/* Fade image into deep maritime blue */}
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0c2340] via-[#0c2340]/90 to-transparent z-10 pointer-events-none"></div>
        </div>
      </section>

      {/* FLOWING WATER TRANSITION 1: Problem/Solution -> Unique Features (ONLY INSTANCE) */}
      <div className="relative w-full h-[240px] md:h-[300px] flex items-center justify-center overflow-hidden bg-[#075985]">
        
        {/* Stage 1 & 2: Top fade from deep maritime blue into rich ocean blue */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0c2340] via-[#0c2340]/90 to-transparent z-20 pointer-events-none"></div>
        
        {/* Stage 2: Soft atmospheric haze (cyan highlights) */}
        <div className="absolute inset-0 bg-cyan-400/10 mix-blend-screen z-10 pointer-events-none"></div>
        
        {/* Stage 3 & 4: Flowing water blending in */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden opacity-90">
          <video
            autoPlay
            loop
            muted
            playsInline
            src={waterVideo}
            className="w-full h-[150%] object-cover -translate-y-[20%] filter brightness-110 contrast-110 saturate-125 mix-blend-screen"
          />
        </div>
        
        {/* Stage 5 & 6: Bottom fade gradually becoming deep ocean navy for Unique Features */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#020617] via-[#020617]/95 to-transparent z-20 pointer-events-none"></div>
        
      </div>

      {/* 5. DEFENSE-GRADE CAPABILITIES (Independent Background) */}
      <section 
        id="capabilities" 
        className="pt-16 pb-12 px-6 bg-[#020617] relative overflow-hidden scroll-mt-16 -mt-px border-none"
      >
        
        {/* Seamless Atmospheric Top Fade blending with the transition */}
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-[#020617] via-[#020617]/80 to-transparent z-10 pointer-events-none"></div>

        {/* === VIDEO BACKGROUND LAYER === */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Deep ocean base */}
          <div className="absolute inset-0 bg-[#020617]"></div>
          
          <video
            autoPlay
            loop
            muted
            playsInline
            src={waterVideo}
            className="absolute inset-0 w-full h-full object-cover opacity-75 scale-105 filter brightness-100 contrast-110 saturate-125 mix-blend-screen"
          />

          {/* Dark translucent overlay for consistent readability */}
          <div className="absolute inset-0 bg-[#020617]/50"></div>
          
          {/* Top and Bottom gradient feathering to blend with transitions */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/90 via-transparent to-[#020617]/90"></div>
          
          {/* Subtle tactical grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#082f4915_1px,transparent_1px),linear-gradient(to_bottom,#082f4915_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        </div>

        {/* === FOREGROUND OBSIDIAN GLASS BENTO CARDS === */}
        <div className="relative z-10 max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 font-mono text-[11px] font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(6,182,212,0.25)] backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
              PROPRIETARY ALGORITHMIC ADVANTAGE
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
              Engineered Beyond Standard Satellite Tracking
            </h2>
            <p className="text-sm md:text-base text-slate-300 font-sans max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
              Autonomous hydrodynamic time-reversal, kinematic anomaly profiling, and court-admissible legal attribution pipelines.
            </p>
          </div>

          {/* 4 Frosted Glass Bento HUD Cards (Water moves smoothly behind them) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            
            {/* CARD 01: Reverse Drift (Lagrangian Hindcasting) */}
            <div className="group relative rounded-3xl p-8 bg-slate-950/45 backdrop-blur-md border border-slate-700/60 hover:bg-slate-950/60 shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:border-cyan-500/60 hover:shadow-[0_0_35px_rgba(6,182,212,0.25)] transition-all duration-500 flex flex-col justify-between overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/25 transition-all pointer-events-none"></div>
              
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-13 h-13 rounded-2xl bg-cyan-950/70 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)] group-hover:scale-105 group-hover:border-cyan-400 transition-all">
                    <svg className="w-6 h-6 animate-[spin_12s_linear_infinite]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <span className="font-mono text-[10px] font-bold text-cyan-400/80 px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-800">
                    MODULE // HINDCAST-01
                  </span>
                </div>

                <div className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  HYDRODYNAMIC TIME-INVERSION
                </div>
                <h3 className="text-2xl font-black text-white mb-3 tracking-tight group-hover:text-cyan-200 transition-colors">
                  Lagrangian Drift Hindcasting
                </h3>
                <p className="text-xs text-slate-300 font-sans leading-relaxed mb-6">
                  Standard surveillance only spots oil days late. SAGAR runs hydrodynamic particle models backward in time across historical wind, current, and tidal fields to isolate the exact GPS discharge centroid <span className="text-cyan-300 font-mono">(X₀, Y₀, t₀)</span>.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="text-slate-500">BACKTRACK Δt:</span>
                  <span className="text-cyan-400 font-bold">-04h:22m</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded text-[10px] font-bold">
                  <span>CENTROID MATCHED</span>
                </div>
              </div>
            </div>

            {/* CARD 02: Kinematic AIS Anomaly & Exoneration */}
            <div className="group relative rounded-3xl p-8 bg-slate-950/45 backdrop-blur-md border border-slate-700/60 hover:bg-slate-950/60 shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:border-red-500/60 hover:shadow-[0_0_35px_rgba(239,68,68,0.25)] transition-all duration-500 flex flex-col justify-between overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-2xl group-hover:bg-red-500/25 transition-all pointer-events-none"></div>

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-13 h-13 rounded-2xl bg-red-950/60 border border-red-500/30 flex items-center justify-center text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.2)] group-hover:scale-105 group-hover:border-red-400 transition-all">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <span className="font-mono text-[10px] font-bold text-red-400/80 px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-800">
                    MODULE // FORENSIC-02
                  </span>
                </div>

                <div className="text-[11px] font-mono font-bold text-red-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                  BEHAVIORAL PATTERN TELEMETRY
                </div>
                <h3 className="text-2xl font-black text-white mb-3 tracking-tight group-hover:text-red-200 transition-colors">
                  AIS Kinematic Speed Profiling
                </h3>
                <p className="text-xs text-slate-300 font-sans leading-relaxed mb-6">
                  Cross-checks vessel tracks against the release envelope to catch signature polluter behavior: sudden speed drops <span className="text-red-300 font-mono">(14.2 → 7.1 kts)</span> to dump slops without triggering engine alarms, while systematically exonerating innocent traffic.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="text-slate-500">SPEED DIP:</span>
                  <span className="text-red-400 font-bold">-48% @ 02:40 UTC</span>
                </div>
                <div className="flex items-center gap-1.5 text-cyan-400 bg-cyan-950/60 border border-cyan-800/50 px-2 py-0.5 rounded text-[10px] font-bold">
                  <span>14 SHIPS EXONERATED</span>
                </div>
              </div>
            </div>

            {/* CARD 03: Dynamic Forward Drift Scrubbing */}
            <div className="group relative rounded-3xl p-8 bg-slate-950/45 backdrop-blur-md border border-slate-700/60 hover:bg-slate-950/60 shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:border-amber-500/60 hover:shadow-[0_0_35px_rgba(245,158,11,0.25)] transition-all duration-500 flex flex-col justify-between overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/25 transition-all pointer-events-none"></div>

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-13 h-13 rounded-2xl bg-amber-950/60 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)] group-hover:scale-105 group-hover:border-amber-400 transition-all">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="font-mono text-[10px] font-bold text-amber-400/80 px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-800">
                    MODULE // PROJECTION-03
                  </span>
                </div>

                <div className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  PREDICTIVE CRISIS MANAGEMENT
                </div>
                <h3 className="text-2xl font-black text-white mb-3 tracking-tight group-hover:text-amber-200 transition-colors">
                  Forward Drift Scrubbing & Vectors
                </h3>
                <p className="text-xs text-slate-300 font-sans leading-relaxed mb-6">
                  Interactive multi-hour predictive timeline simulation modeling slick dispersion, weathering, and shoreline impact. Generates exact nautical coordinates for Coast Guard vessels to deploy containment booms before coastal landfalls.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="text-slate-500">SIMULATION:</span>
                  <span className="text-amber-400 font-bold">0 to +48 HOURS</span>
                </div>
                <div className="flex items-center gap-1.5 text-amber-400 bg-amber-950/60 border border-amber-800/50 px-2 py-0.5 rounded text-[10px] font-bold">
                  <span>BOOM VECTORS READY</span>
                </div>
              </div>
            </div>

            {/* CARD 04: Court-Admissible Dossier Generation */}
            <div className="group relative rounded-3xl p-8 bg-slate-950/45 backdrop-blur-md border border-slate-700/60 hover:bg-slate-950/60 shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:border-emerald-500/60 hover:shadow-[0_0_35px_rgba(16,185,129,0.25)] transition-all duration-500 flex flex-col justify-between overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/25 transition-all pointer-events-none"></div>

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-13 h-13 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)] group-hover:scale-105 group-hover:border-emerald-400 transition-all">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <span className="font-mono text-[10px] font-bold text-emerald-400/80 px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-800">
                    MODULE // STATUTORY-04
                  </span>
                </div>

                <div className="text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  COURT-ADMISSIBLE LEGAL ARTIFACTS
                </div>
                <h3 className="text-2xl font-black text-white mb-3 tracking-tight group-hover:text-emerald-200 transition-colors">
                  Automated ICG Form 356 Dossier
                </h3>
                <p className="text-xs text-slate-300 font-sans leading-relaxed mb-6">
                  Compiles verified satellite telemetry, hydrodynamic proofs, and vessel records into tamper-proof PDF dossiers locked with cryptographic SHA-256 signatures, ready for prosecution under the Indian Merchant Shipping Act.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="text-slate-500">HASH:</span>
                  <span className="text-emerald-400 font-bold">SHA-256 VALIDATED</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded text-[10px] font-bold">
                  <span>ICG FORM 356 READY</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* === 5. PRE-FOOTER INTERDICTION CTA (Bridge to Live Surveillance) === */}
      <section className="bg-gradient-to-b from-[#020617] via-[#030712] to-[#030712] py-20 px-6 border-t border-slate-800/80 relative overflow-hidden select-none -mt-px">
        
        {/* Ambient Radar Glow Effect */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-[600px] h-[250px] bg-cyan-500/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          
          {/* Status Chip */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 text-cyan-300 font-mono text-[10px] font-bold uppercase tracking-widest border border-cyan-800/60 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
            <span>NATIONAL MARITIME SURVEILLANCE GRID ACTIVE</span>
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              Ready for Live Maritime Interdiction?
            </h2>
            <p className="text-sm text-slate-400 font-sans max-w-xl mx-auto leading-relaxed">
              Launch into the multi-sector radar workspace to inspect active satellite passes, backward drift attributions, and forward shoreline containment vectors.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={onEnterDashboard}
              className="px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-black tracking-wider uppercase transition-all shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] cursor-pointer active:scale-95 flex items-center gap-2.5"
            >
              <span>Explore Live Surveillance Map</span>
              <span className="text-base leading-none">→</span>
            </button>

            <button
              type="button"
              onClick={() => scrollTo('home')}
              className="px-5 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700/80 font-mono text-xs font-bold tracking-wide transition-all cursor-pointer"
            >
              ↑ Back to Top
            </button>
          </div>

          {/* Ingestion Metric Line */}
          <div className="pt-4 flex items-center justify-center gap-6 text-[11px] font-mono text-slate-500">
            <div className="flex items-center gap-2">
              <span className="text-cyan-400">●</span> 3 Active Offshore Sectors
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400">●</span> Sentinel-1A / RISAT-1A Ingestion
            </div>
            <span>•</span>
            <div>Zero Latency Attribution</div>
          </div>

        </div>
      </section>

      {/* 6. INSTITUTIONAL SOVEREIGN FOOTER (No Logo, No Launch Button) */}
      <footer id="enforcement" className="bg-[#030712] text-slate-400 scroll-mt-16 pt-8 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Main Footer Multi-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
            
            {/* Col 1 & 2: Platform Scope & Institutional Mandate */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="font-sans font-black text-xl text-white tracking-tight">SAGAR</span>
                <span className="text-[10px] font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-800/60 px-2 py-0.5 rounded">
                  NTRO // ICG OPERATIONAL NODE
                </span>
              </div>
              
              <p className="text-xs text-slate-400 font-sans leading-relaxed max-w-sm">
                Satellite Analytics for Geospatial Anomaly & Responsibility-tracing. Operating continuous radar sweeps, Lagrangian reverse-drift modeling, and vessel attribution across India’s 2.01 million km² Exclusive Economic Zone.
              </p>

              <div className="pt-2 flex flex-col gap-1.5 text-[11px] font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-slate-300">24/7 MARITIME WATCHSTANDER NODE:</span>
                  <span className="text-cyan-400 font-bold">ONLINE</span>
                </div>
                <div className="text-slate-500">
                  CLEARANCE: RESTRICTED // SOVEREIGN ENFORCEMENT
                </div>
              </div>
            </div>

            {/* Col 3: Sensor Feeds & Intelligence Pipeline */}
            <div className="space-y-3">
              <div className="text-[11px] font-mono font-bold text-white tracking-widest uppercase flex items-center gap-1.5">
                <span className="text-cyan-400">▪</span> Sensor Pipelines
              </div>
              <ul className="space-y-2 text-xs font-sans">
                <li className="hover:text-cyan-300 transition-colors cursor-default">
                  Synthetic Aperture Radar (SAR C/X-Band)
                </li>
                <li className="hover:text-cyan-300 transition-colors cursor-default">
                  S-AIS & Coastal AIS Transponder Streams
                </li>
                <li className="hover:text-cyan-300 transition-colors cursor-default">
                  INCOIS / HYCOM Ocean Current Grid
                </li>
                <li className="hover:text-cyan-300 transition-colors cursor-default">
                  ECMWF 10m Marine Wind Shear Models
                </li>
                <li className="hover:text-cyan-300 transition-colors cursor-default">
                  NCMRWF Surface Flux Hindcasting
                </li>
              </ul>
            </div>

            {/* Col 4: Legal & Statutory Framework */}
            <div className="space-y-3">
              <div className="text-[11px] font-mono font-bold text-white tracking-widest uppercase flex items-center gap-1.5">
                <span className="text-cyan-400">▪</span> Statutory Matrix
              </div>
              <ul className="space-y-2 text-xs font-sans">
                <li className="hover:text-cyan-300 transition-colors cursor-default">
                  Merchant Shipping Act, 1958 (Part XI-A)
                </li>
                <li className="hover:text-cyan-300 transition-colors cursor-default">
                  ICG Form 356 Statutory Evidentiary Dossier
                </li>
                <li className="hover:text-cyan-300 transition-colors cursor-default">
                  MARPOL 73/78 Annex I Regulations
                </li>
                <li className="hover:text-cyan-300 transition-colors cursor-default">
                  UNCLOS Art. 220 Coastal State Enforcement
                </li>
                <li className="hover:text-cyan-300 transition-colors cursor-default">
                  Bonn Agreement Appearance Code (BAAC)
                </li>
              </ul>
            </div>

            {/* Col 5: Quick Navigation & Interdiction Ops */}
            <div className="space-y-3">
              <div className="text-[11px] font-mono font-bold text-white tracking-widest uppercase flex items-center gap-1.5">
                <span className="text-cyan-400">▪</span> Command Navigation
              </div>
              <ul className="space-y-2 text-xs font-sans">
                <li>
                  <button onClick={() => scrollTo('home')} className="hover:text-cyan-300 transition-colors cursor-pointer text-left">
                    Home Portal
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo('how-it-works')} className="hover:text-cyan-300 transition-colors cursor-pointer text-left">
                    Operational Workflow
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo('problem-solution')} className="hover:text-cyan-300 transition-colors cursor-pointer text-left">
                    The Enforcement Problem
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo('capabilities')} className="hover:text-cyan-300 transition-colors cursor-pointer text-left">
                    Forensic Capabilities
                  </button>
                </li>
                <li className="pt-2">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[10px] font-mono">
                    <span className="text-slate-400 block">ICG Pollution Hotline:</span>
                    <span className="text-cyan-400 font-bold text-xs">1554 (Toll Free // 24x7)</span>
                  </div>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Legal & Sovereign Disclaimers Bar */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-sans text-slate-400">
            <div>
              © 2026 National Technical Research Organisation (NTRO) // Indian Coast Guard (ICG). All Sovereign Rights Reserved.
            </div>

            <div className="flex items-center gap-4 font-mono text-[10px]">
              <span className="text-slate-400">SECURE NODE: IN-MUM-NODE-04</span>
              <span className="text-slate-500">•</span>
              <span className="text-cyan-400 font-bold">~ Spill se Source Tak ~</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
};
