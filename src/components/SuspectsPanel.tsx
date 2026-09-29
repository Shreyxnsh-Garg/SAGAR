import React from 'react';
import { ShieldAlert } from 'lucide-react';

interface SuspectsPanelProps {
  onSelectVessel: (vessel: any) => void;
  counterfactualVesselId: string | null;
  onSelectCounterfactual: (id: string | null) => void;
  onOpenProofModal: () => void;
  timeOffset: number;
  incident: any;
}

export const SuspectsPanel: React.FC<SuspectsPanelProps> = ({ 
  onSelectVessel, 
  counterfactualVesselId, 
  onSelectCounterfactual, 
  onOpenProofModal, 
  timeOffset, 
  incident 
}) => {
  if (!incident) return null;

  const maxDelta = incident.durationHours || 2.53;
  const isIntercept = timeOffset >= maxDelta - 0.15 && timeOffset <= maxDelta + 0.15;
  const suspects = incident.suspects || [];

  return (
    <aside className="w-full h-full flex flex-col p-4 gap-3 bg-slate-100 overflow-y-auto select-none">
      {isIntercept ? (
        <div className={`${incident.matchBanner.bg} text-white p-3 rounded-xl shadow-md border flex items-center justify-between animate-pulse`}>
          <div className="flex items-center gap-2">
            <span className="text-base">🚨</span>
            <div>
              <h4 className="text-xs font-black tracking-wide uppercase">{incident.matchBanner.title}</h4>
              <p className="text-[10px] text-white/90 font-semibold">{incident.matchBanner.sub}</p>
            </div>
          </div>
          <span className="bg-white/20 text-white font-black text-xs px-2 py-0.5 rounded shadow-xs">
            {incident.matchBanner.score}
          </span>
        </div>
      ) : (
        <div className="bg-slate-100 border border-slate-200 p-2.5 rounded-xl flex items-center justify-between text-slate-600">
          <span className="text-[11px] font-bold uppercase tracking-wider">Target Correlation Mode</span>
          <span className="text-[10px] font-semibold text-slate-500">Scrub timeline to {incident.sourceTime}</span>
        </div>
      )}

      <div className="flex items-center justify-between pb-2 border-b border-slate-300">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-red-600" />
          <h2 className="text-xs font-black uppercase tracking-wider text-slate-800">Top Suspect Vessels</h2>
        </div>
        <span className="text-[10px] font-bold bg-slate-200 text-slate-600 px-2 py-0.5 rounded border border-slate-300">
          {suspects.length} Targets
        </span>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 flex items-center justify-between text-[11px]">
        <div>
          <span className="text-slate-500 font-medium">AIS Corridor Ingestion:</span>
          <span className="font-extrabold text-slate-800 ml-1">184 Vessels</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-slate-400 font-light">→</span>
          <span className="bg-blue-100 text-blue-800 font-bold px-1.5 py-0.5 rounded text-[10px]">
            {suspects.length} Correlated
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3 p-1">
        <button
          type="button"
          onClick={onOpenProofModal}
          style={{ backgroundColor: '#1d4ed8', color: '#ffffff' }}
          className="w-full p-3 rounded-xl shadow-md border border-blue-400/50 flex items-center justify-between font-mono transition-all hover:brightness-110 active:scale-[0.98] cursor-pointer mb-3"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-950/70 border border-blue-300/40 flex items-center justify-center text-base shadow shrink-0">
              ⚖️
            </div>
            <div className="text-left flex flex-col">
              <span className="text-[11px] font-black tracking-wide text-white uppercase leading-none">
                FORENSIC PROOF MATRIX
              </span>
              <span className="text-[9px] text-blue-100 font-sans font-normal leading-tight mt-1">
                Multi-Ship Speed Curves & Elimination Log
              </span>
            </div>
          </div>
          <span className="text-sm font-black text-white ml-2">
            →
          </span>
        </button>

        {suspects.map((vessel: any, index: number) => {
          const isPrime = index === 0;
          return (
            <div
              key={vessel.id || vessel.imo}
              onClick={() => onSelectVessel(vessel)}
              className={isPrime
                ? (isIntercept ? "bg-red-50/80 border-2 border-red-600 ring-4 ring-red-500/40 rounded-lg p-3.5 flex flex-col gap-2 transition-all duration-200 ease-out scale-[1.02] hover:scale-[1.04] hover:shadow-md hover:border-blue-400 cursor-pointer" : "bg-white border-2 border-blue-500 rounded-lg p-3.5 shadow-sm flex flex-col gap-2 transition-all duration-200 ease-out hover:scale-[1.02] hover:shadow-md hover:border-blue-400 cursor-pointer")
                : "bg-white border border-slate-300 rounded-lg p-3 flex flex-col gap-1.5 shadow-xs transition-all duration-200 ease-out hover:scale-[1.02] hover:shadow-md hover:border-blue-400 cursor-pointer"
              }
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xs font-bold text-slate-900 flex flex-wrap items-center gap-1.5">
                    {vessel.name}
                    {isPrime && isIntercept && (
                      <span className="animate-pulse bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded">DIRECT INTERCEPT</span>
                    )}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium font-mono uppercase mt-0.5">
                    IMO: {vessel.imo}
                  </p>
                </div>
                {isPrime ? (
                  <span className="bg-red-600 text-white font-black text-xs px-2.5 py-0.5 rounded shadow-xs">
                    {vessel.score}% Match
                  </span>
                ) : (
                  <span className="bg-slate-100 text-slate-700 font-bold text-[10px] px-2 py-0.5 rounded border border-slate-200">
                    {vessel.score}%
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-200/60 text-[11px]">
                <div>
                  <span className="text-slate-500 font-sans text-xs">
                    Status:{' '}
                    <strong className={vessel.status === 'Primary Culprit' ? 'text-rose-600 font-black' : 'text-emerald-600 font-black'}>
                      {vessel.status}
                    </strong>
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 font-medium">AIS Correlation: </span>
                  <span className="font-bold text-slate-900">{vessel.score}%</span>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectCounterfactual(counterfactualVesselId === vessel.id ? null : vessel.id);
                }}
                className={`mt-2.5 w-full py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                  counterfactualVesselId === vessel.id
                    ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-sm ring-2 ring-purple-300'
                    : 'bg-cyan-50 hover:bg-cyan-100 text-cyan-800 border border-cyan-300'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span>{counterfactualVesselId === vessel.id ? '✕' : '🌐'}</span>
                  <span>{counterfactualVesselId === vessel.id ? 'Clear Simulation' : 'Run Counterfactual'}</span>
                </div>
                {counterfactualVesselId === vessel.id && (
                  <span className="text-[10px] bg-purple-800/80 px-1.5 py-0.5 rounded text-white font-mono">ACTIVE</span>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </aside>
  );
};