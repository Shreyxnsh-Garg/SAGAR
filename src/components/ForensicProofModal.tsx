import React from 'react';
import { X, ShieldCheck, CheckCircle2, Activity } from 'lucide-react';

interface ForensicProofModalProps {
  onClose: () => void;
  selectedIncidentId: string | null;
}

export const ForensicProofModal: React.FC<ForensicProofModalProps> = ({ onClose, selectedIncidentId }) => {
  // Configs based on incident
  let title = "Forensic Attribution & Elimination Proof";
  let subtitle = "Comparative Analysis";
  
  let graphContent = null;
  let matrixRows = null;
  let verdict = null;

  if (selectedIncidentId === 'inc-kham-02') {
    subtitle = "Hydrodynamic Analysis of Gulf of Khambhat Natural Seep";
    graphContent = (
      <>
        <div className="flex gap-4 mb-3 text-[11px] font-bold">
          <span className="flex items-center gap-1.5 text-emerald-600"><span className="w-3 h-0.5 bg-emerald-500"></span> 🟢 MT GUJARAT PRIDE (Normal)</span>
          <span className="flex items-center gap-1.5 text-sky-600"><span className="w-3 h-0.5 bg-sky-500"></span> 🔵 CHEM TANKER AL-NOOR (Normal)</span>
        </div>
        <div className="w-full h-44 bg-white border border-slate-200 rounded-lg p-3 relative flex flex-col justify-end">
          <svg className="w-full h-32 overflow-visible" viewBox="0 0 500 100" preserveAspectRatio="none">
            <line x1="0" y1="20" x2="500" y2="20" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="0" y1="50" x2="500" y2="50" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="0" y1="80" x2="500" y2="80" stroke="#f1f5f9" strokeWidth="1" />
            <polyline fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points="0,35 500,35" />
            <polyline fill="none" stroke="#0ea5e9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points="0,55 500,55" />
          </svg>
          <div className="flex justify-between text-[10px] font-semibold text-slate-500 pt-2 border-t border-slate-100 mt-2">
            <span>02:00</span><span>03:00</span><span>04:00</span><span>05:00</span><span>06:15</span>
          </div>
        </div>
      </>
    );
    matrixRows = (
      <>
        <tr>
          <td className="p-3 font-semibold text-slate-700">Distance to Reverse Drift</td>
          <td className="p-3 text-slate-500">3.1 km</td>
          <td className="p-3 text-slate-500">5.8 km</td>
        </tr>
        <tr>
          <td className="p-3 font-semibold text-slate-700">Speed Anomaly</td>
          <td className="p-3 text-slate-500">Normal</td>
          <td className="p-3 text-slate-500">Normal</td>
        </tr>
        <tr>
          <td className="p-3 font-semibold text-slate-700">Forward Simulation Overlap</td>
          <td className="p-3 text-slate-500">22.1%</td>
          <td className="p-3 text-slate-500">14.3%</td>
        </tr>
        <tr>
          <td className="p-3 font-semibold text-slate-700">Legal Status</td>
          <td className="p-3 bg-emerald-50 font-bold text-emerald-700">EXONERATED</td>
          <td className="p-3 bg-emerald-50 font-bold text-emerald-700">EXONERATED</td>
        </tr>
      </>
    );
    verdict = (
      <ul className="list-disc pl-5 text-xs text-slate-700 space-y-1">
        <li><strong>Both vessels exonerated.</strong></li>
        <li>Spatial kinematics prove slick origin preceded traffic corridor entry.</li>
        <li>Verified as seabed mineral seep. (No Discharge).</li>
      </ul>
    );
  } else if (selectedIncidentId === 'inc-ratna-03') {
    subtitle = "Kinematic & Hydrodynamic Analysis of Ratnagiri Corridor";
    graphContent = (
      <>
        <div className="flex gap-4 mb-3 text-[11px] font-bold">
          <span className="flex items-center gap-1.5 text-amber-600"><span className="w-3 h-0.5 bg-amber-500"></span> 🟠 PACIFIC PIONEER (Review)</span>
          <span className="flex items-center gap-1.5 text-sky-600"><span className="w-3 h-0.5 bg-sky-500"></span> 🔵 GOLDEN VOYAGER (Normal)</span>
        </div>
        <div className="w-full h-44 bg-white border border-slate-200 rounded-lg p-3 relative flex flex-col justify-end">
          <div
            className="absolute top-0 bottom-6 bg-amber-500/10 border-x-2 border-amber-500 border-dashed pointer-events-none flex flex-col items-center justify-start pt-1.5"
            style={{ left: '40%', width: '20%' }}
          >
            <span className="text-[9px] font-black text-amber-700 bg-white/95 border border-amber-300 px-1.5 py-0.5 rounded shadow-xs text-center whitespace-nowrap">
              SUSPECT WINDOW (08:30 - 09:10 UTC)
            </span>
          </div>
          <svg className="w-full h-32 overflow-visible" viewBox="0 0 500 100" preserveAspectRatio="none">
            <line x1="0" y1="20" x2="500" y2="20" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="0" y1="50" x2="500" y2="50" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="0" y1="80" x2="500" y2="80" stroke="#f1f5f9" strokeWidth="1" />
            <polyline fill="none" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" points="0,20 150,22 250,35 300,25 500,22" />
            <polyline fill="none" stroke="#0ea5e9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points="0,60 500,60" />
            <circle cx="250" cy="35" r="5" fill="#f59e0b" />
          </svg>
          <div className="flex justify-between text-[10px] font-semibold text-slate-500 pt-2 border-t border-slate-100 mt-2">
            <span>07:00</span><span>08:00</span><span className="text-amber-700 font-extrabold">08:50 UTC</span><span>10:00</span><span>11:45</span>
          </div>
        </div>
      </>
    );
    matrixRows = (
      <>
        <tr>
          <td className="p-3 font-semibold text-slate-700">Distance to Reverse Drift</td>
          <td className="p-3 bg-amber-50 font-black text-amber-700">1.15 km</td>
          <td className="p-3 text-slate-500">4.50 km</td>
        </tr>
        <tr>
          <td className="p-3 font-semibold text-slate-700">Speed Anomaly</td>
          <td className="p-3 bg-amber-50 font-black text-amber-700">-12% drop</td>
          <td className="p-3 text-slate-500">Normal</td>
        </tr>
        <tr>
          <td className="p-3 font-semibold text-slate-700">Forward Simulation Overlap</td>
          <td className="p-3 bg-amber-50 font-black text-amber-700">58.4% Match</td>
          <td className="p-3 text-slate-500">29.0%</td>
        </tr>
        <tr>
          <td className="p-3 font-semibold text-slate-700">Legal Status</td>
          <td className="p-3 bg-amber-100 font-black text-amber-900">UNDER REVIEW</td>
          <td className="p-3 bg-emerald-50 font-bold text-emerald-700">EXONERATED</td>
        </tr>
      </>
    );
    verdict = (
      <ul className="list-disc pl-5 text-xs text-slate-700 space-y-1">
        <li><strong>GOLDEN VOYAGER</strong> maintained steady transit.</li>
        <li><strong>PACIFIC PIONEER</strong> shows minor speed anomaly inside confidence ellipse.</li>
        <li>Status remains under review pending additional SAR passes.</li>
      </ul>
    );
  } else {
    // default inc-mum-01
    subtitle = "Comparative Kinematic & Hydrodynamic Analysis of Mumbai High Corridor Traffic";
    graphContent = (
      <>
        <div className="flex gap-4 mb-3 text-[11px] font-bold">
          <span className="flex items-center gap-1.5 text-red-700"><span className="w-3 h-0.5 bg-red-600"></span> 🔴 MV OCEAN STAR (Anomalous)</span>
          <span className="flex items-center gap-1.5 text-amber-600"><span className="w-3 h-0.5 bg-amber-500"></span> 🟠 MT SEA HAWK (Normal)</span>
          <span className="flex items-center gap-1.5 text-emerald-600"><span className="w-3 h-0.5 bg-emerald-500"></span> 🟢 MV BLUE WAVE (Normal)</span>
        </div>
        <div className="w-full h-44 bg-white border border-slate-200 rounded-lg p-3 relative flex flex-col justify-end">
          <div
            className="absolute top-0 bottom-6 bg-red-500/10 border-x-2 border-red-500 border-dashed pointer-events-none flex flex-col items-center justify-start pt-1.5"
            style={{ left: '52%', width: '22%' }}
          >
            <span className="text-[9px] font-black text-red-700 bg-white/95 border border-red-300 px-1.5 py-0.5 rounded shadow-xs text-center whitespace-nowrap">
              DISCHARGE WINDOW (07:20 - 07:45 UTC)
            </span>
          </div>
          <svg className="w-full h-32 overflow-visible" viewBox="0 0 500 100" preserveAspectRatio="none">
            <line x1="0" y1="20" x2="500" y2="20" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="0" y1="50" x2="500" y2="50" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="0" y1="80" x2="500" y2="80" stroke="#f1f5f9" strokeWidth="1" />
            <polyline fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points="0,55 500,55" />
            <polyline fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points="0,15 500,15" />
            <polyline fill="none" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" points="10,22 80,24 160,20 240,48 300,88 380,26 490,18" />
            <circle cx="300" cy="88" r="6" fill="#dc2626" className="animate-ping" />
            <circle cx="300" cy="88" r="4" fill="#dc2626" />
          </svg>
          <div className="flex justify-between text-[10px] font-semibold text-slate-500 pt-2 border-t border-slate-100 mt-2">
            <span>04:00</span><span>05:30</span><span>07:00</span><span className="text-red-700 font-extrabold">07:28 UTC (Dip)</span><span>08:30</span><span>10:00</span>
          </div>
        </div>
      </>
    );
    matrixRows = (
      <>
        <tr>
          <td className="p-3 font-semibold text-slate-700">Distance to Reverse Drift</td>
          <td className="p-3 bg-red-50 font-black text-red-700">0.42 km (Direct Hit)</td>
          <td className="p-3 text-slate-500">3.85 km</td>
          <td className="p-3 text-slate-500">7.20 km</td>
        </tr>
        <tr>
          <td className="p-3 font-semibold text-slate-700">Speed Anomaly</td>
          <td className="p-3 bg-red-50 font-black text-red-700">-28% drop (11.4 kn)</td>
          <td className="p-3 text-slate-500">Normal</td>
          <td className="p-3 text-slate-500">Normal</td>
        </tr>
        <tr>
          <td className="p-3 font-semibold text-slate-700">Forward Simulation Overlap</td>
          <td className="p-3 bg-red-50 font-black text-red-700">87.4% Match</td>
          <td className="p-3 text-slate-500">31.2%</td>
          <td className="p-3 text-slate-500">12.8%</td>
        </tr>
        <tr>
          <td className="p-3 font-semibold text-slate-700">Legal Status</td>
          <td className="p-3 bg-red-100 font-black text-red-900">PRIMARY SUSPECT</td>
          <td className="p-3 bg-emerald-50 font-bold text-emerald-700">EXONERATED</td>
          <td className="p-3 bg-emerald-50 font-bold text-emerald-700">EXONERATED</td>
        </tr>
      </>
    );
    verdict = (
      <ul className="list-disc pl-5 text-xs text-slate-700 space-y-1">
        <li><strong>MT SEA HAWK & MV BLUE WAVE</strong> maintained steady cruise speeds entirely outside the drift probability centroid.</li>
        <li><strong>MV OCEAN STAR</strong> executed an anomalous -28% engine throttle drop precisely inside the discharge spatio-temporal window.</li>
        <li>Multi-vector analysis legally exonerates collateral traffic and isolates MV OCEAN STAR for MARPOL Annex I violation.</li>
      </ul>
    );
  }

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 select-none animate-in fade-in duration-150">
      <div className="w-full max-w-4xl bg-white border border-slate-300 shadow-2xl rounded-2xl overflow-hidden flex flex-col max-h-[95vh]">
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-slate-800 p-2 rounded-lg border border-slate-700">
              <ShieldCheck className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight">{title}</h2>
              <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-6 text-slate-800 bg-white">
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-black uppercase text-slate-800 flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-600" />
              Multi-Vessel Kinematic Speed Comparison
            </h3>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              {graphContent}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-black uppercase text-slate-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Forensic Elimination Matrix
            </h3>
            <div className="border border-slate-300 rounded-xl overflow-hidden bg-white shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 text-[11px]">
                  <tr>
                    <th className="p-3">Forensic Parameter</th>
                    {selectedIncidentId === 'inc-kham-02' ? (
                      <>
                        <th className="p-3 text-slate-500">MT GUJARAT PRIDE</th>
                        <th className="p-3 text-slate-500">CHEM TANKER AL-NOOR</th>
                      </>
                    ) : selectedIncidentId === 'inc-ratna-03' ? (
                      <>
                        <th className="p-3 bg-amber-50 text-amber-800">PACIFIC PIONEER</th>
                        <th className="p-3 text-slate-500">GOLDEN VOYAGER</th>
                      </>
                    ) : (
                      <>
                        <th className="p-3 bg-red-50 text-red-800">MV OCEAN STAR (Attributed)</th>
                        <th className="p-3 text-slate-500">MT SEA HAWK</th>
                        <th className="p-3 text-slate-500">MV BLUE WAVE</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-[11px]">
                  {matrixRows}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col gap-1.5">
            <h4 className="text-[11px] font-black uppercase text-slate-500 mb-1">Evidentiary Verdict</h4>
            {verdict}
          </div>
        </div>
      </div>
    </div>
  );
};
