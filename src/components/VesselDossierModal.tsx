import React, { useState } from 'react';
import { X, Anchor, FileText, ShieldAlert } from 'lucide-react';

interface VesselDossierModalProps {
  vessel: any;
  onClose: () => void;
  onExportPDF: () => void;
  onOpenForm356?: () => void;
}

export const VesselDossierModal: React.FC<VesselDossierModalProps> = ({ vessel, onClose, onExportPDF, onOpenForm356 }) => {
  const [activeTab, setActiveTab] = useState<'registry' | 'legal'>('registry');
  const isCulprit = vessel.score >= 90;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 select-none animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-white border border-slate-300 shadow-2xl rounded-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Institutional Header */}
        <div className="px-6 py-3.5 bg-white border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${isCulprit ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-slate-100 text-slate-700'}`}>
              <ShieldAlert className="w-5 h-5"/>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-black text-slate-900 tracking-tight">{vessel.name}</h2>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded shadow-2xs ${isCulprit ? 'bg-red-600 text-white' : 'bg-slate-200 text-slate-700'}`}>
                  {vessel.score}% ATTRIBUTION CONFIDENCE
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                IMO: {vessel.imo} | MMSI: {vessel.mmsi || '352001842'} | Flag: Panama (PA)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5"/>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50/90 px-6 pt-2 gap-1">
          <button
            onClick={() => setActiveTab('registry')}
            className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'registry' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Anchor className="w-3.5 h-3.5"/>
            <span>Vessel Particulars & Registry</span>
          </button>
          <button
            onClick={() => setActiveTab('legal')}
            className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'legal' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5"/>
            <span>Statutory MARPOL Notice</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-4 text-slate-800 bg-white">
          
          {/* TAB 1: REGISTRY & PARTICULARS */}
          {activeTab === 'registry' && (
            <div className="flex flex-col gap-3.5 text-xs">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex flex-col gap-2">
                <span className="text-[11px] font-bold uppercase text-slate-500 border-b border-slate-200 pb-1">Vessel Specs</span>
                <div className="flex justify-between"><span className="text-slate-500">Vessel Type:</span><span className="font-bold text-slate-900">{vessel.type || 'Bulk Carrier'}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Gross Tonnage (GT):</span><span className="font-bold text-slate-900">42,850 T</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Deadweight (DWT):</span><span className="font-bold text-slate-900">76,400 T</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Year Built:</span><span className="font-bold text-slate-900">2014 (Tsuneishi Corp)</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Flag Registry:</span><span className="font-bold text-slate-900">Panama (Convenience)</span></div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex flex-col gap-2">
                <span className="text-[11px] font-bold uppercase text-slate-500 border-b border-slate-200 pb-1">Ownership & Operations</span>
                <div className="flex justify-between"><span className="text-slate-500">Registered Owner:</span><span className="font-bold text-slate-900">Oceanic Bulk Carrier SA</span></div>
                <div className="flex justify-between"><span className="text-slate-500">P&I Club Insurer:</span><span className="font-bold text-slate-900">Gard P&I (Bermuda)</span></div>
              </div>

              <div className={`border rounded-xl p-3.5 ${isCulprit ? 'bg-red-50 border-red-200 text-red-900' : 'bg-emerald-50 border-emerald-200 text-emerald-900'}`}>
                <span className="text-[11px] font-bold uppercase block mb-1">Current Kinematic Status</span>
                <span className="font-black text-sm">
                  {isCulprit ? 'Speed dip detected at 07:28 UTC: 11.4 kn' : 'Nominal cruise: steady speed, no anomaly'}
                </span>
              </div>
            </div>
          )}

          {/* TAB 2: STATUTORY MARPOL NOTICE */}
          {activeTab === 'legal' && (
            <div className="flex flex-col gap-3 text-xs">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-700">
                <p className="leading-relaxed">
                  Notice is hereby given that the vessel <strong>{vessel.name} (IMO: {vessel.imo})</strong> has been forensically analyzed for non-compliant marine pollution. Under <strong>Section 356 of the Merchant Shipping Act, 1958</strong>, read with <strong>MARPOL 73/78 Annex I</strong>, discharging oily mixtures exceeding 15 ppm without functional OWS within the EEZ is a punishable offense.
                </p>
                {isCulprit && (
                  <p className="mt-3 font-bold text-red-700">
                    Evidentiary analysis confirms operational implication. Vessel is subject to immediate Port State Control (PSC) detention.
                  </p>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={onOpenForm356 || onExportPDF}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#002b49] hover:bg-[#001f35] text-white font-bold text-xs rounded-lg shadow-sm transition-all cursor-pointer active:scale-95"
          >
            <FileText className="w-3.5 h-3.5"/>
            <span>Export Form 356 Notice</span>
          </button>
        </div>

      </div>
    </div>
  );
};
