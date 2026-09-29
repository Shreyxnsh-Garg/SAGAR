import React, { useState, useEffect, Suspense } from 'react';
import sagarLogo from './assets/sagar-logo.png';
import { MapViewer, REGIONAL_INCIDENTS_DATA } from './components/MapViewer';
import { LandingPage } from './components/LandingPage';

const TelemetryDrawer = React.lazy(() => import('./components/TelemetryDrawer').then(m => ({ default: m.TelemetryDrawer })));
const TimeScrubber = React.lazy(() => import('./components/TimeScrubber').then(m => ({ default: m.TimeScrubber })));
const VesselDossierModal = React.lazy(() => import('./components/VesselDossierModal').then(m => ({ default: m.VesselDossierModal })));
const ForensicProofModal = React.lazy(() => import('./components/ForensicProofModal').then(m => ({ default: m.ForensicProofModal })));
const Form356Modal = React.lazy(() => import('./components/Form356Modal').then(m => ({ default: m.Form356Modal })));
const ForensicsView = React.lazy(() => import('./components/ForensicsView').then(m => ({ default: m.ForensicsView })));
const ForwardImpactAnalysis = React.lazy(() => import('./components/ForwardImpactAnalysis').then(m => ({ default: m.ForwardImpactAnalysis })));

export function App() {
  const [timeUtc, setTimeUtc] = useState('');
  const [timeIst, setTimeIst] = useState('');

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      setTimeUtc(now.toUTCString().slice(17, 25) + ' UTC');
      setTimeIst(
        now.toLocaleTimeString('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }) + ' IST'
      );
    };
    updateClocks();
    const timer = setInterval(updateClocks, 1000);
    return () => clearInterval(timer);
  }, []);

  const [timeOffset, setTimeOffset] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [mode, setMode] = useState<'backward' | 'forward'>('backward');
  const [selectedVessel, setSelectedVessel] = useState<any>(null);
  const [counterfactualVesselId, setCounterfactualVesselId] = useState<string | null>(null);
  
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>(null);
  const [isBacktrackActive, setIsBacktrackActive] = useState<boolean>(false);
  const [forensicActiveTab, setForensicActiveTab] = useState<'attribution' | 'impact'>('attribution');
  const [showProofModal, setShowProofModal] = useState<boolean>(false);
  const [showForm356Modal, setShowForm356Modal] = useState<boolean>(false);
  const [showLandingPage, setShowLandingPage] = useState<boolean>(true);

  const handleSelectIncident = (id: string | null) => {
    setSelectedIncidentId(id);
    setIsBacktrackActive(false);
    setCounterfactualVesselId(null);
    setTimeOffset(0);
  };

  const handleActivateBacktrack = () => {
    setIsBacktrackActive(true);
    setTimeOffset(0);
  };

  const handleExportPDF = async () => {
    const { generateViolationReport } = await import('./utils/violationReportPDF');
    generateViolationReport();
  };

  const currentIncident = selectedIncidentId ? REGIONAL_INCIDENTS_DATA[selectedIncidentId] : null;

  if (showLandingPage) {
    return <LandingPage onEnterDashboard={() => setShowLandingPage(false)} />;
  }

  return (
    <Suspense fallback={<div className="w-screen h-screen bg-[#020617] flex items-center justify-center text-cyan-400 font-mono text-sm tracking-widest animate-pulse">INITIALIZING SAGAR...</div>}>
      <div className="w-screen h-screen flex flex-col bg-slate-200/80 overflow-hidden font-sans">
        {/* === ROW 1: PRIMARY TOP COMMAND HEADER === */}
      <header className="h-14 bg-white border-b border-slate-200 px-6 flex items-center justify-between z-30 shrink-0">
        
        {/* Left: Undistorted Logo, Branding & Case Pill */}
        <div className="flex items-center gap-3.5 select-none">
          <div className="w-10 h-10 aspect-square shrink-0 flex items-center justify-center">
            <img 
              src={sagarLogo} 
              alt="SAGAR Logo" 
              className="w-full h-full object-contain aspect-square select-none pointer-events-none" 
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-sans font-black text-base tracking-tight text-slate-950 leading-none">
                SAGAR
              </span>
              <span className="text-[9px] font-mono font-black bg-slate-900 text-white px-1.5 py-0.5 rounded leading-none">
                NTRO
              </span>
              <span className="text-[11px] font-sans font-semibold text-slate-600 leading-none hidden xl:inline">
                National Technical Research Organisation
              </span>
              {selectedIncidentId && (
                <span className="text-[10px] font-mono font-bold bg-red-50 text-red-700 border border-red-200 px-2 py-0.5 rounded uppercase tracking-wider ml-1 leading-none">
                  CASE: {REGIONAL_INCIDENTS_DATA[selectedIncidentId]?.title || selectedIncidentId}
                </span>
              )}
            </div>
            <p className="text-[10px] font-sans font-medium text-slate-700 tracking-tight leading-tight mt-0.5">
              <span className="text-blue-700 font-bold">S</span>atellite{' '}
              <span className="text-blue-700 font-bold">A</span>nalytics for{' '}
              <span className="text-blue-700 font-bold">G</span>eospatial{' '}
              <span className="text-blue-700 font-bold">A</span>nomaly &{' '}
              <span className="text-blue-700 font-bold">R</span>esponsibility-tracing
              <span className="text-slate-400 mx-1.5">•</span>
              <span className="italic text-blue-700 font-semibold font-serif">~ "Spill se Source Tak."</span>
            </p>
          </div>
        </div>

        {/* Right: Sector Status, SAR Badge & Dual UTC + IST Clocks */}
        <div className="flex items-center gap-2.5">
          <div className="hidden lg:flex items-center gap-2 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full text-[10px] font-mono font-bold text-slate-700">
            <span className="w-2 h-2 rounded-full bg-cyan-600 animate-pulse"></span>
            WESTERN EEZ SECTOR SCAN ACTIVE
          </div>

          <span className="px-2 py-1 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 font-mono text-[10px] font-bold">
            SAR ACTIVE
          </span>

          {/* Dual UTC + IST Clock */}
          <div className="flex items-center gap-1 font-mono text-[10px]">
            <div className="bg-slate-900 text-cyan-300 px-2 py-1 rounded font-bold border border-slate-800">
              {timeUtc || '18:50:35 UTC'}
            </div>
            <div className="bg-slate-100 text-slate-800 px-2 py-1 rounded font-bold border border-slate-300">
              {timeIst || '00:20:35 IST'}
            </div>
          </div>
        </div>
      </header>

      {/* === ROW 2: CENTERED FORENSIC TABS & DARK NAVY EXPORT BUTTON === */}
      {isBacktrackActive && selectedIncidentId && (
        <div className="h-12 bg-slate-50 border-b border-slate-200 px-6 flex items-center justify-between z-20 shrink-0">
          
          {/* Left Spacer to keep center alignment balanced */}
          <div className="w-48 hidden md:block"></div>

          {/* Center: Thin, Compact Forensic Tabs */}
          <div className="flex items-center bg-slate-200/90 p-1 rounded-xl border border-slate-300 text-xs font-mono shadow-xs">
            <button
              type="button"
              onClick={() => setForensicActiveTab('attribution')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                forensicActiveTab === 'attribution'
                  ? 'bg-slate-950 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span>FORENSIC ATTRIBUTION</span>
            </button>

            <button
              type="button"
              onClick={() => setForensicActiveTab('impact')}
              className={`px-3.5 py-1.5 rounded-lg text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                forensicActiveTab === 'impact'
                  ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                  : 'text-slate-700 font-bold hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
              <span>IMPACT ANALYSIS & PRECAUTIONS</span>
            </button>
          </div>

          {/* Right: Dark Navy Export Notice Button */}
          <div className="w-48 flex justify-end">
            <button
              type="button"
              onClick={() => setShowForm356Modal(true)}
              className="h-8 px-3 rounded-lg bg-[#0B1528] hover:bg-slate-900 text-slate-100 hover:text-white border border-slate-700/80 font-mono text-[10px] font-bold tracking-wider flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95 transition-all whitespace-nowrap"
              title="Generate court-admissible interdiction warrant under Merchant Shipping Act (Part XI-A)"
            >
              <span className="text-xs">📄</span>
              <span>EXPORT NOTICE (FORM 356)</span>
            </button>
          </div>

        </div>
      )}

      {forensicActiveTab === 'impact' && selectedIncidentId && isBacktrackActive ? (
        <div className="flex-1 overflow-hidden">
          <ForwardImpactAnalysis 
            selectedIncidentId={selectedIncidentId} 
            onBackToSurveillance={() => setForensicActiveTab('attribution')}
          />
        </div>
      ) : (
        <main className="flex-1 p-3.5 flex gap-3.5 h-[calc(100vh-64px)] overflow-hidden">
          {selectedIncidentId && isBacktrackActive && (
            <div className="w-80 h-full bg-[#f8fafc] border border-slate-300 rounded-2xl shadow-sm flex flex-col overflow-hidden shrink-0">
              <TelemetryDrawer incident={currentIncident} />
            </div>
          )}

          <div className="flex-1 h-full flex flex-col gap-3 min-w-0">
            <div className="relative flex-1 w-full h-[calc(100vh-56px)] overflow-hidden">
              
              {/* Floating High-Visibility Home Button on Top-Left of Map */}
              {!selectedIncidentId && (
                <button
                  type="button"
                  onClick={() => setShowLandingPage(true)}
                  className="absolute top-4 left-4 z-[1000] bg-slate-900/90 hover:bg-slate-800 text-cyan-400 border border-cyan-500/40 px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold flex items-center gap-1.5 shadow-lg backdrop-blur-md cursor-pointer transition-all active:scale-95"
                  title="Return to Landing Page"
                >
                  <span>←</span>
                  <span>HOME</span>
                </button>
              )}

              {isBacktrackActive && selectedIncidentId ? (
                <ForensicsView
                  incident={currentIncident}
                  onBack={() => handleSelectIncident(null)}
                  timeOffset={timeOffset}
                  counterfactualVesselId={counterfactualVesselId}
                  onSelectCounterfactual={(id) => setCounterfactualVesselId(prev => prev === id ? null : id)}
                  onSelectVessel={setSelectedVessel}
                  onOpenProofModal={() => setShowProofModal(true)}
                >
                  <MapViewer 
                    timeOffset={timeOffset} 
                    selectedIncidentId={selectedIncidentId}
                    onSelectIncident={handleSelectIncident}
                    isBacktrackActive={isBacktrackActive}
                    onActivateBacktrack={handleActivateBacktrack}
                    counterfactualVesselId={counterfactualVesselId} 
                    onSelectCounterfactual={setCounterfactualVesselId}
                  />
                  <TimeScrubber 
                    isPlaying={isPlaying} 
                    mode={mode} 
                    setIsPlaying={setIsPlaying} 
                    setMode={setMode} 
                    setTimeOffset={setTimeOffset} 
                    timeOffset={timeOffset}
                    incident={currentIncident}
                  />
                </ForensicsView>
              ) : (
                <MapViewer 
                  timeOffset={timeOffset} 
                  selectedIncidentId={selectedIncidentId}
                  onSelectIncident={handleSelectIncident}
                  isBacktrackActive={isBacktrackActive}
                  onActivateBacktrack={handleActivateBacktrack}
                  counterfactualVesselId={counterfactualVesselId} 
                  onSelectCounterfactual={setCounterfactualVesselId}
                />
              )}
            </div>
          </div>
        </main>
      )}

      {selectedVessel && (
        <VesselDossierModal onClose={() => setSelectedVessel(null)} vessel={selectedVessel} onExportPDF={handleExportPDF} onOpenForm356={() => setShowForm356Modal(true)} />
      )}

      {showProofModal && (
        <ForensicProofModal onClose={() => setShowProofModal(false)} selectedIncidentId={selectedIncidentId} />
      )}

        {showForm356Modal && <Form356Modal onClose={() => setShowForm356Modal(false)} selectedIncidentId={selectedIncidentId} />}
      </div>
    </Suspense>
  );
}

export default App;
