const fs = require('fs');
const file = '/Users/shreyansh/Desktop/PROJECTS/SAGAR/src/components/LandingPage.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace top chunk
const topChunkOld = `import React, { useState, useEffect } from 'react';
import sagarLogo from '../assets/sagar-logo.png';
import heroGraphic from '../assets/hero-graphic.png';
import stepMonitor from '../assets/step-monitor.png';
import stepDetect from '../assets/step-detect.png';
import stepIdentify from '../assets/step-identify.png';
import stepReport from '../assets/step-report.png';

interface LandingPageProps {
  onEnterDashboard: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterDashboard }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);`;

const topChunkNew = `import React, { useState, useEffect, useRef } from 'react';
import sagarLogo from '../assets/sagar-logo.png';
import heroGraphic from '../assets/hero-graphic.png';
import stepMonitor from '../assets/step-monitor.png';
import stepDetect from '../assets/step-detect.png';
import stepIdentify from '../assets/step-identify.png';
import stepReport from '../assets/step-report.png';

interface LandingPageProps {
  onEnterDashboard: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterDashboard }) => {
  const [scrolled, setScrolled] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [revealedCards, setRevealedCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  
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
        if (entry.isIntersecting && !hasAnimatedRef.current && !isAnimatingRef.current) {
          isAnimatingRef.current = true;
          setIsAnimating(true);
          
          const delays = [500, 1200, 1900, 2600];
          delays.forEach((delay, idx) => {
            setTimeout(() => {
              setRevealedCards((prev) => {
                if (!prev.includes(idx)) return [...prev, idx];
                return prev;
              });
            }, delay);
          });

          setTimeout(() => {
            isAnimatingRef.current = false;
            hasAnimatedRef.current = true;
            setIsAnimating(false);
            setHasAnimated(true);
            observer.disconnect();
          }, 3500);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
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
  }, [isAnimating]);`;

content = content.replace(topChunkOld, topChunkNew);

// Section regex replace
const sectionRegex = /\{\/\* HOW IT WORKS: Organic Amoeba Oil Slick Liquid Blob Cards \*\/\}[\s\S]*?(?=\{\/\* PROBLEM VS SOLUTION SECTION \*\/|\{\/\* Next Section \*\/)/g;

const sectionNew = `{/* HOW IT WORKS: Cinematic Organic Sequential Reveal */}
      <section 
        id="how-it-works" 
        ref={sectionRef} 
        className="py-24 px-6 max-w-7xl mx-auto scroll-mt-20 relative"
      >
        {/* Subtle white/cyan atmospheric background pulse during animation */}
        <div className={\`absolute inset-0 pointer-events-none transition-opacity duration-1000 \${isAnimating ? 'opacity-100' : 'opacity-0'}\`}>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-50/50 via-white/0 to-white/0 animate-pulse"></div>
        </div>

        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 font-mono text-xs font-bold uppercase tracking-wider border border-slate-200">
            <span>🌊</span> Operational Workflow
          </div>
          <h2 className="text-4xl font-black text-slate-950 tracking-tight">
            From Space to Enforcement Action
          </h2>
          <p className="text-sm text-slate-600 font-sans">
            How SAGAR processes raw radar backscatter into legal maritime attribution.
          </p>
        </div>

        {/* 4 Organic Amoeba Liquid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {workflowSteps.map((step, idx) => {
            const isRevealed = revealedCards.includes(idx);
            
            return (
              <div 
                key={idx}
                className="flex flex-col items-center group relative"
              >
                {/* Liquid Blob Shell */}
                <div 
                  style={step.shapeStyle}
                  className={\`w-full aspect-[4/5] sm:aspect-[4/5] bg-white p-6 border border-slate-200 shadow-xl relative overflow-hidden flex flex-col justify-between transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] 
                  \${hasAnimated ? 'group-hover:border-cyan-400 group-hover:shadow-2xl group-hover:-translate-y-3' : ''}
                  \${isRevealed ? 'scale-100 opacity-100 blur-0' : 'scale-75 opacity-0 blur-md translate-y-10'}\`}
                >
                  {/* Subtle Grid/Noise Texture */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
                  
                  {/* Subtle cyan technology accents / tiny floaters */}
                  <div className={\`absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-cyan-500 transition-opacity duration-1000 delay-500 \${isRevealed ? 'opacity-100' : 'opacity-0'} animate-pulse\`}></div>
                  <div className={\`absolute bottom-4 left-4 w-8 h-px bg-cyan-200 transition-all duration-1000 delay-700 \${isRevealed ? 'w-8 opacity-100' : 'w-0 opacity-0'}\`}></div>

                  <div className={\`flex flex-col h-full transition-all duration-1000 delay-300 \${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}\`}>
                    {/* Card Top: Number & Title */}
                    <div className="flex flex-col items-start z-10 space-y-1">
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200">
                        PHASE {step.num}
                      </span>
                      <span className="font-sans font-black text-2xl text-slate-900 tracking-tight">
                        {step.title.toUpperCase()}
                      </span>
                    </div>

                    {/* Card Center: Rectangular Image Area */}
                    <div className="z-10 my-auto py-4 w-full flex items-center justify-center">
                      <div className="w-full h-32 rounded bg-slate-100 overflow-hidden border border-slate-200 shadow-sm relative">
                        <img 
                          src={step.img} 
                          alt={step.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                        />
                        {/* Subtle scanline overlay */}
                        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.02)_50%)] bg-[length:100%_4px] pointer-events-none"></div>
                      </div>
                    </div>

                    {/* Thin horizontal divider */}
                    <div className="w-full h-px bg-slate-200 my-2"></div>

                    {/* Card Bottom: Body Copy */}
                    <div className="z-10">
                      <p className="text-[11px] font-sans text-slate-600 font-medium leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      `;

content = content.replace(sectionRegex, sectionNew);
fs.writeFileSync(file, content);
console.log('Done replacing!');
