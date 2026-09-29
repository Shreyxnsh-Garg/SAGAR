import React from 'react';
import { Activity, Compass, Wind } from 'lucide-react';

interface TelemetryDrawerProps {
  incident: any;
}

export const TelemetryDrawer: React.FC<TelemetryDrawerProps> = ({ incident }) => {
  if (!incident) return null;

  return (
    <aside className="w-full h-full flex flex-col p-4 gap-3 bg-slate-100 overflow-y-auto select-none">
      <div className="flex items-center justify-between pb-2 border-b border-slate-300">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-blue-600" />
          <h2 className="text-xs font-black uppercase tracking-wider text-slate-800">Telemetry Data</h2>
        </div>
      </div>

      {/* Detected Slick */}
      <div className="bg-white border border-slate-300 rounded-lg p-3.5 shadow-sm flex flex-col gap-2 hover:border-slate-400 transition-colors">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase text-slate-600">Detected Slick (SAR)</span>
          <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">{incident.sensor}</span>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-1">
          <div>
            <p className="text-[11px] font-medium text-slate-500">Area</p>
            <p className="text-xs font-black text-slate-900">{incident.slickArea}</p>
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-500">Dimensions</p>
            <p className="text-xs font-black text-slate-900">{incident.slickDim}</p>
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-500">Est. Age</p>
            <p className="text-xs font-black text-slate-900">{incident.durationHours} hrs</p>
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-500">Confidence</p>
            <p className="text-xs font-black text-emerald-700">{incident.confidence}</p>
          </div>
        </div>
      </div>

      {/* Source Probability */}
      <div className="bg-white border border-slate-300 rounded-lg p-3.5 shadow-sm flex flex-col gap-2 hover:border-slate-400 transition-colors">
        <div className="flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-blue-600" />
          <span className="text-[11px] font-bold uppercase text-slate-600">Source Probability</span>
        </div>
        <p className="text-xs font-black text-slate-900 bg-blue-50 border border-blue-200 rounded p-2">
          {incident.sourceTime} ({incident.matchBanner.score} Probability)
        </p>
        {incident.status === 'CRITICAL' && (
          <div className="bg-red-50 text-red-700 border border-red-200 text-[11px] p-2 rounded-md font-medium mt-1">
            <p className="font-bold">Forward Drift Alert:</p>
            <p>Reaching Zone B in 18-24 hrs</p>
          </div>
        )}
      </div>

      {/* Environmental Forces */}
      <div className="bg-white border border-slate-300 rounded-lg p-3.5 shadow-sm flex flex-col gap-2 hover:border-slate-400 transition-colors">
        <div className="flex items-center gap-1.5">
          <Wind className="w-3.5 h-3.5 text-blue-600" />
          <span className="text-[11px] font-bold uppercase text-slate-600">Environmental Forces</span>
        </div>
        <div className="flex flex-col gap-1.5 mt-1">
          <div className="flex justify-between">
            <span className="text-[11px] font-medium text-slate-500">Surface Current:</span>
            <span className="text-xs font-black text-slate-900">{incident.metocean.current}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[11px] font-medium text-slate-500">Surface Wind:</span>
            <span className="text-xs font-black text-slate-900">{incident.metocean.wind}</span>
          </div>
        </div>
      </div>
    </aside>
  );
};