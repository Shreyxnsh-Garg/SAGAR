import React from 'react';
import { X, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { SUSPECT_VESSELS } from '../data/incidentData';

interface CounterfactualReplayModalProps {
  onClose: () => void;
}

export const CounterfactualReplayModal: React.FC<CounterfactualReplayModalProps> = ({ onClose }) => {
  const culprit = SUSPECT_VESSELS[0];

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 select-none">
      <div className="w-full max-w-2xl bg-white border border-slate-300 shadow-2xl rounded-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-700" />
            <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide">
              Forensic Digital Twin // Counterfactual Overlap Replay
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 flex flex-col gap-4 text-xs text-slate-700">
          <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 flex items-start justify-between">
            <div>
              <p className="text-[11px] font-bold text-blue-900 uppercase">Primary Suspect Test: {culprit.name}</p>
              <p className="text-slate-600 mt-0.5">IMO: {culprit.imo} | MMSI: {culprit.mmsi} | Flag: {culprit.flag}</p>
              <p className="text-slate-800 font-semibold mt-2">
                Simulated Bilge Discharge at 07:28 UTC (11.4 kn) correlates directly with Sentinel-1 SAR slick morphology.
              </p>
            </div>
            <div className="text-right">
              <span className="inline-block bg-blue-700 text-white font-black text-sm px-3 py-1 rounded-lg shadow-sm">
                87.4% Match
              </span>
              <p className="text-[10px] text-blue-800 font-bold mt-1">CRITICAL MATCH</p>
            </div>
          </div>

          {/* Morphological Comparison Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="bg-slate-100 px-4 py-2 font-bold text-slate-800 text-[11px] uppercase border-b border-slate-200">
              Counterfactual Morphological Overlap Audit
            </div>
            <div className="divide-y divide-slate-100">
              <div className="px-4 py-2.5 flex justify-between items-center bg-emerald-50/40">
                <span className="font-semibold text-slate-900">MV OCEAN STAR (Simulated Run)</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 87.4% Overlap (CORRELATED)
                </span>
              </div>
              <div className="px-4 py-2.5 flex justify-between items-center">
                <span className="text-slate-600">MT SEA HAWK (Counterfactual Baseline)</span>
                <span className="font-semibold text-slate-500 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> 41.8% Overlap (REJECTED)
                </span>
              </div>
              <div className="px-4 py-2.5 flex justify-between items-center">
                <span className="text-slate-600">MV BLUE WAVE (Counterfactual Baseline)</span>
                <span className="font-semibold text-slate-500 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> 17.6% Overlap (REJECTED)
                </span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-[11px] text-slate-600 leading-relaxed">
            <span className="font-bold text-slate-800">Legal Evidentiary Framework: </span>
            This counterfactual replay satisfies ISO/IEC 27037 standards for digital evidence preservation and provides sovereign forensic proof under MARPOL Annex I & UNCLOS Art. 211.
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors cursor-pointer"
          >
            Close Audit
          </button>
        </div>
      </div>
    </div>
  );
};
