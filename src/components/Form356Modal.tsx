import React, { useRef } from 'react';
import { X, Printer, Download } from 'lucide-react';

interface Form356ModalProps {
  onClose: () => void;
  selectedIncidentId: string | null;
}

export const Form356Modal: React.FC<Form356ModalProps> = ({ onClose, selectedIncidentId }) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  let refId = 'SAGAR-ICG-2026-0927-MUM-01';
  let coords = '18.9480° N, 71.3720° E @ 07:28:14 UTC';
  let sensor = 'Sentinel-1 C-SAR @ 10:00:00 UTC';
  let suspectName = 'MV OCEAN STAR';
  let imoMmsi = 'IMO 9412086 / MMSI 352001842 / Panama (PA)';
  let shipType = 'Gearless Bulk Carrier | 42,850 GT | 76,400 DWT';
  let speedAnomaly = '11.4 kn (-28% speed drop during discharge window)';
  let interceptDist = '0.42 km (Within 95% Confidence Ellipse)';
  let confidence = '87.4% IoU Morphological Match (Rank 1 Culprit)';
  let isSeep = false;
  let exonerationTable = null;
  let toEntity = "The Master, Registered Owner (Oceanic Bulk Carrier SA), and P&I Insurer (Gard P&I Bermuda) of the vessel designated herein.";

  if (selectedIncidentId === 'inc-kham-02') {
    refId = 'SAGAR-ICG-2026-0927-KHAM-02';
    coords = '21.0500° N, 72.1000° E @ 14:00:00 UTC';
    sensor = 'RADARSAT-2 @ 16:30:00 UTC (EEZ Zone 2)';
    isSeep = true;
    toEntity = "Directorate General of Hydrocarbons / ONGC Environment Cell";
    exonerationTable = (
      <>
        <tr>
          <td className="p-2 font-bold">MT GUJARAT PRIDE</td>
          <td className="p-2 font-mono">3.10 km</td>
          <td className="p-2">Normal Cruise</td>
          <td className="p-2 font-mono">22.1% IoU</td>
          <td className="p-2 font-bold text-emerald-700">EXONERATED</td>
        </tr>
        <tr>
          <td className="p-2 font-bold">CHEM TANKER AL-NOOR</td>
          <td className="p-2 font-mono">5.80 km</td>
          <td className="p-2">Normal Cruise</td>
          <td className="p-2 font-mono">14.3% IoU</td>
          <td className="p-2 font-bold text-emerald-700">EXONERATED</td>
        </tr>
      </>
    );
  } else if (selectedIncidentId === 'inc-ratna-03') {
    refId = 'SAGAR-ICG-2026-0927-RAT-03';
    coords = '16.8500° N, 73.1000° E @ 08:50:00 UTC';
    sensor = 'Sentinel-2 Multispectral @ 11:15:00 UTC';
    suspectName = 'PACIFIC PIONEER';
    imoMmsi = 'IMO 9876543 / MMSI 413009876 / China (CN)';
    shipType = 'Crude Oil Tanker | 110,000 GT';
    speedAnomaly = '13.2 kn (-12% speed drop)';
    interceptDist = '1.15 km (Within Confidence Ellipse)';
    confidence = '58.4% IoU Morphological Match (Under Review)';
    toEntity = "The Master, Registered Owner, and P&I Insurer of PACIFIC PIONEER.";
    exonerationTable = (
      <>
        <tr>
          <td className="p-2 font-bold">GOLDEN VOYAGER</td>
          <td className="p-2 font-mono">4.50 km</td>
          <td className="p-2">Normal Cruise</td>
          <td className="p-2 font-mono">29.0% IoU</td>
          <td className="p-2 font-bold text-emerald-700">EXONERATED</td>
        </tr>
      </>
    );
  } else {
    exonerationTable = (
      <>
        <tr>
          <td className="p-2 font-bold">MT SEA HAWK (IMO 9302194)</td>
          <td className="p-2 font-mono">3.85 km</td>
          <td className="p-2">14.1 kn (Normal Cruise)</td>
          <td className="p-2 font-mono">41.8% IoU</td>
          <td className="p-2 font-bold text-emerald-700">EXONERATED</td>
        </tr>
        <tr>
          <td className="p-2 font-bold">MV BLUE WAVE (IMO 9184429)</td>
          <td className="p-2 font-mono">7.20 km</td>
          <td className="p-2">16.8 kn (Normal Cruise)</td>
          <td className="p-2 font-mono">17.6% IoU</td>
          <td className="p-2 font-bold text-emerald-700">EXONERATED</td>
        </tr>
      </>
    );
  }

  return (
    <div className="fixed inset-0 z-[2500] flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 select-none print:p-0 print:bg-white">
      <div className="w-full max-w-4xl bg-white border border-slate-300 shadow-2xl rounded-2xl flex flex-col max-h-[94vh] overflow-hidden print:border-none print:shadow-none print:max-h-none print:rounded-none">
        
        <div className="px-6 py-3.5 bg-[#002b49] text-white flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-lg bg-blue-500/20 text-white font-mono text-xs">⚖️ LEGAL</span>
            <div>
              <h2 className="text-sm font-black tracking-wide uppercase">Statutory Notice Under Section 356</h2>
              <p className="text-[10px] text-blue-200">Merchant Shipping Act, 1958 // Directorate General of Shipping & ICG</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5"/>
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-blue-300 hover:text-white rounded-lg hover:bg-blue-900/50 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4"/>
            </button>
          </div>
        </div>

        <div ref={printRef} className="p-8 overflow-y-auto flex-1 text-slate-900 text-xs font-serif leading-relaxed print:p-0 print:overflow-visible">
          <div className="text-center border-b-2 border-slate-900 pb-4 mb-6">
            <div className="text-[10px] font-sans font-bold tracking-widest uppercase text-slate-600 mb-1">
              Government of India // Ministry of Ports, Shipping and Waterways
            </div>
            <h1 className="text-lg font-black tracking-tight uppercase font-sans text-slate-950">
              DIRECTORATE GENERAL OF SHIPPING / INDIAN COAST GUARD
            </h1>
            <div className="text-xs font-sans font-semibold text-slate-700 mt-1">
              MARITIME SAFETY & ENVIRONMENT PROTECTION DIVISION — WESTERN SEABOARD
            </div>
            <div className="mt-3 inline-block bg-slate-100 border border-slate-400 px-3 py-1 rounded text-[11px] font-mono font-bold tracking-wider uppercase text-slate-900">
              FORM 356-E // STATUTORY POLLUTION NOTICE & DETENTION ADVISORY
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6 font-sans text-[11px] border border-slate-200 bg-slate-50/70 p-3 rounded-lg">
            <div>
              <span className="font-bold text-slate-600 block text-[9px] uppercase">Incident Ref ID:</span>
              <span className="font-mono font-bold text-slate-900">{refId}</span>
            </div>
            <div>
              <span className="font-bold text-slate-600 block text-[9px] uppercase">Statutory Authority:</span>
              <span className="font-semibold text-slate-900">Sections 356-J & 356-K, Merchant Shipping Act, 1958</span>
            </div>
            <div>
              <span className="font-bold text-slate-600 block text-[9px] uppercase">Discharge Coordinate & Time:</span>
              <span className="font-mono text-slate-900">{coords}</span>
            </div>
            <div>
              <span className="font-bold text-slate-600 block text-[9px] uppercase">Detection Sensor:</span>
              <span className="font-semibold text-slate-900">{sensor}</span>
            </div>
          </div>

          <div className="space-y-3 mb-6 text-slate-800">
            <p>
              <strong>TO:</strong> {toEntity}
            </p>
            
            {isSeep ? (
              <p className="bg-emerald-50 text-emerald-900 p-3 border border-emerald-200 rounded-lg">
                <strong>NOTICE OF FINDING:</strong> Analysis of the anomaly shows it to be a natural seabed mineral seep. All adjacent vessel traffic has been fully exonerated from discharge attribution. No regulatory enforcement action will be taken.
              </p>
            ) : (
              <>
                <p>
                  <strong>NOTICE IS HEREBY GIVEN</strong> that hydrodynamic hindcast analysis and multi-source kinematic AIS telemetry conducted via Project SAGAR have conclusively attributed an unpermitted oily bilge/sludge discharge within the Exclusive Economic Zone (EEZ) of India to your vessel:
                </p>

                <div className="border border-slate-300 rounded-lg overflow-hidden my-3">
                  <table className="w-full text-left font-sans text-[11px]">
                    <tbody className="divide-y divide-slate-200">
                      <tr className="bg-slate-100/60 font-bold">
                        <td className="p-2 w-1/3">Vessel Name</td>
                        <td className="p-2 text-red-700 font-black">{suspectName}</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-semibold text-slate-600">IMO / MMSI / Flag</td>
                        <td className="p-2 font-mono">{imoMmsi}</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-semibold text-slate-600">Vessel Type & Tonnage</td>
                        <td className="p-2">{shipType}</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-semibold text-slate-600">Speed Anomaly at Spill</td>
                        <td className="p-2 font-mono text-red-700 font-bold">{speedAnomaly}</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-semibold text-slate-600">Spatial Centroid Intercept</td>
                        <td className="p-2 font-mono">{interceptDist}</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-semibold text-slate-600">Lagrangian Overlap Confidence</td>
                        <td className="p-2 font-bold text-red-700">{confidence}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p>
                  Discharge of oily mixtures with hydrocarbon concentration exceeding 15 ppm without certified 
                  Oily Water Separator (OWS) operation violates <strong>MARPOL 73/78 Annex I Regulation 15</strong> and 
                  attracts criminal detention under Section 356-K of the Merchant Shipping Act.
                </p>
              </>
            )}
          </div>

          <div className="mb-6">
            <h3 className="font-sans font-bold text-xs uppercase text-slate-900 border-b border-slate-300 pb-1 mb-2">
              Schedule A: Forensic Elimination of Adjacent Traffic
            </h3>
            <table className="w-full text-left font-sans text-[10px] border border-slate-200">
              <thead className="bg-slate-100 font-bold text-slate-700 border-b border-slate-200">
                <tr>
                  <th className="p-2">Vessel Identifier</th>
                  <th className="p-2">Intercept Distance</th>
                  <th className="p-2">Speed Curve</th>
                  <th className="p-2">Simulated Plume Overlap</th>
                  <th className="p-2">Disposition</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {exonerationTable}
              </tbody>
            </table>
          </div>

          {!isSeep && (
            <div className="bg-amber-50 border border-amber-300 rounded-lg p-3.5 mb-6 text-amber-950 font-sans text-[11px]">
              <span className="font-black text-amber-900 block mb-1 uppercase tracking-wide">
                Mandatory Directives to Master:
              </span>
              <ul className="list-disc pl-4 space-y-1">
                <li>Retain and preserve all Oil Record Book (Part I & II) entries without modification.</li>
                <li>Preserve electronic engine data logger records for 06:00 to 09:00 UTC on date of incident.</li>
                <li>Prepare for Flag State and Port State Control (PSC) boarding inspection upon arrival at next anchorage.</li>
              </ul>
            </div>
          )}

          <div className="grid grid-cols-2 gap-8 pt-4 border-t border-slate-300 font-sans text-[10px]">
            <div>
              <div className="font-bold uppercase text-slate-800">Forensic Lead Officer:</div>
              <div className="font-mono text-slate-600 mt-1">SAGAR Autonomous Advection Core v2.4</div>
              <div className="text-slate-500">Validated by ICG Western Command (RHQ-W)</div>
            </div>
            <div className="text-right">
              <div className="font-bold uppercase text-slate-800">Authorized Signatory:</div>
              <div className="mt-4 border-b border-slate-400 w-48 ml-auto"></div>
              <div className="text-slate-600 mt-1 font-semibold">Principal Officer, MMD Mumbai</div>
            </div>
          </div>
        </div>

        <div className="px-6 py-3 bg-slate-100 border-t border-slate-200 flex items-center justify-between print:hidden">
          <span className="text-[11px] text-slate-500 font-sans">
            ISO/IEC 27037 Compliant Digital Evidence Chain of Custody
          </span>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 text-slate-700 font-bold text-xs rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-[#002b49] hover:bg-blue-900 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5"/>
              <span>Export PDF Notice</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
