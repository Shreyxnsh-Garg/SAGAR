import React, { useState, useEffect } from 'react';
import sagarLogo from '../assets/sagar-logo.png';
import { FileText } from 'lucide-react';

interface TacticalHUDProps {
  onExportPDF: () => void;
  onOpenProof: () => void;
  onOpenForm356?: () => void;
  activeTab: 'SURVEILLANCE' | 'FORWARD_IMPACT';
  setActiveTab: (tab: 'SURVEILLANCE' | 'FORWARD_IMPACT') => void;
}

export const TacticalHUD: React.FC<TacticalHUDProps> = ({ onExportPDF, onOpenProof, onOpenForm356, activeTab, setActiveTab }) => {
  const [utcTime, setUtcTime] = useState('');
  const [istTime, setIstTime] = useState('');

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().slice(17, 25) + ' UTC');
      setIstTime(now.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour12: false }) + ' IST');
    };
    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="w-full h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shadow-xs z-50">
      <div className="flex items-center gap-4">
        {/* Official Sovereign Emblem */}
        <div className="relative flex items-center justify-center p-0.5 rounded-full bg-gradient-to-b from-slate-200 to-slate-400 shadow-sm shrink-0">
          <img
            src={sagarLogo}
            alt="SAGAR Forensic Seal"
            className="h-12 w-12 object-cover rounded-full"
          />
        </div>

        {/* Vertical Divider */}
        <div className="h-10 w-[1.5px] bg-slate-200 shrink-0" />

        {/* 2-Tier Institutional Title Block */}
        <div className="flex flex-col justify-center select-none">
          {/* Top Row: Acronym + Full Form Expansion */}
          <div className="flex items-baseline gap-2.5 flex-wrap">
            <h1 className="text-xl font-black tracking-tight text-slate-900 leading-none">
              SAGAR
            </h1>
            <span className="text-slate-300 font-light text-sm">—</span>
            <span className="text-xs font-semibold text-slate-700 tracking-tight">
              <strong className="text-blue-700 font-black">S</strong>atellite{' '}
              <strong className="text-blue-700 font-black">A</strong>nalytics for{' '}
              <strong className="text-blue-700 font-black">G</strong>eospatial{' '}
              <strong className="text-blue-700 font-black">A</strong>nomaly &{' '}
              <strong className="text-blue-700 font-black">R</strong>esponsibility-tracing
            </span>
          </div>

          {/* Bottom Row: Agency Designation + Motto */}
          <div className="flex items-center gap-2 mt-1 text-[11px] font-medium text-slate-500">
            <span className="bg-slate-900 text-white font-bold text-[9px] tracking-wider px-1.5 py-0.5 rounded uppercase">
              NTRO
            </span>
            <span className="font-semibold text-slate-700">
              National Technical Research Organisation
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-blue-700 font-bold italic tracking-wide">
              ~ "Spill se Source Tak"
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 font-mono">
          <button
            onClick={() => setActiveTab('SURVEILLANCE')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'SURVEILLANCE'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            🎯 Forensic Surveillance
          </button>
          <button
            onClick={() => setActiveTab('FORWARD_IMPACT')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'FORWARD_IMPACT'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <span>🌊</span> Forward Accumulation
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          <span>SAR STREAM ACTIVE</span>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 font-mono">
          <span>{utcTime}</span>
          <span className="text-slate-300 font-sans">|</span>
          <span>{istTime}</span>
        </div>

        <button
          onClick={onOpenProof}
          className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold px-3.5 py-2 rounded-lg shadow-sm border border-blue-600 transition-all cursor-pointer active:scale-95"
          title="Open Multi-Vessel Elimination Matrix & Kinematic Curves"
        >
          <span className="text-sm">⚖️</span>
          <span>Forensic Proof Matrix</span>
        </button>

        <button
          onClick={onOpenForm356 || onExportPDF}
          className="flex items-center gap-2 bg-[#002b49] hover:bg-[#001f35] text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition-all cursor-pointer active:scale-95"
        >
          <FileText className="w-4 h-4"/>
          <span>ICG Form 356 Dossier</span>
        </button>
      </div>
    </header>
  );
};