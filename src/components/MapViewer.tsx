import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Polygon, Circle, Polyline, Tooltip, useMap, ZoomControl, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export interface SuspectVessel {
  id: string;
  name: string;
  imo: string;
  score: number;
  status: string;
  color: string;
  speed: string;
  start: [number, number];
  intercept: [number, number];
  end: [number, number];
  headingDeg: number;
}

export interface IncidentDataset {
  id: string;
  title: string;
  desc: string;
  sensor: string;
  detectionTime: string;
  sourceTime: string;
  durationHours: number;
  center: [number, number];
  status: 'CRITICAL' | 'RESOLVED' | 'MONITORING';
  color: string;
  sarPolygon: [number, number][];
  sarCenter: [number, number];
  sourceCenter: [number, number];
  slickArea: string;
  slickDim: string;
  confidence: string;
  matchBanner: {
    title: string;
    sub: string;
    score: string;
    bg: string;
  };
  metocean: {
    wind: string;
    current: string;
    leeway: string;
    vector: string;
  };
  metoceanDriftOffsetLat?: number;
  metoceanDriftOffsetLng?: number;
  suspects: SuspectVessel[];
}

export const REGIONAL_INCIDENTS_DATA: Record<string, IncidentDataset> = {
  'inc-mum-01': {
    id: 'inc-mum-01',
    title: 'MUMBAI HIGH SECTOR 4',
    desc: 'Critical unpermitted discharge corridor',
    sensor: 'Sentinel-1 C-SAR',
    detectionTime: '10:00 UTC',
    sourceTime: '07:28 UTC',
    durationHours: 2.53,
    center: [18.9100, 71.3000],
    status: 'CRITICAL',
    color: '#ef4444',
    sarCenter: [18.9450, 71.3700],
    sarPolygon: [[18.9550, 71.3400], [18.9680, 71.3750], [18.9480, 71.4300], [18.9280, 71.3700]],
    sourceCenter: [18.8820, 71.2210],
    slickArea: '18.4 km²',
    slickDim: '8.3 × 2.6 km',
    confidence: '93%',
    matchBanner: {
      title: 'CRITICAL ATTRIBUTION DETECTED',
      sub: 'MV OCEAN STAR throttle dip & track intersect at 07:28 UTC',
      score: '87.4%',
      bg: 'bg-red-500'
    },
    metocean: { wind: '14.2 kts @ 245° WSW', current: '0.42 m/s @ 072° ENE', leeway: '3.1% + 4° Coriolis', vector: '068.5° ENE (0.58 m/s)' },
    metoceanDriftOffsetLat: 0.040,
    metoceanDriftOffsetLng: 0.055,
    suspects: [
      {
        id: 'v1',
        name: 'MV OCEAN STAR',
        imo: '9412086',
        score: 87.4,
        status: 'Primary Culprit',
        color: '#ef4444',
        speed: '11.4 kn (-28% dip)',
        start: [18.8200, 71.0720],
        intercept: [18.8820, 71.2210],
        end: [18.9600, 71.4080],
        headingDeg: 62
      },
      {
        id: 'v2',
        name: 'MT SEA HAWK',
        imo: '9302194',
        score: 41.8,
        status: 'Exonerated',
        color: '#f97316',
        speed: '14.1 kn (Cruise)',
        start: [18.9300, 71.4600],
        intercept: [18.8650, 71.2800],
        end: [18.7900, 71.1000],
        headingDeg: 242
      },
      {
        id: 'v3',
        name: 'MV BLUE WAVE',
        imo: '9184429',
        score: 17.6,
        status: 'Exonerated',
        color: '#10b981',
        speed: '16.8 kn (Normal)',
        start: [19.0100, 71.1800],
        intercept: [18.9250, 71.2700],
        end: [18.8100, 71.3900],
        headingDeg: 135
      }
    ]
  },
  'inc-kham-02': {
    id: 'inc-kham-02',
    title: 'GULF OF KHAMBHAT',
    desc: 'Resolved natural mineral seep sheen',
    sensor: 'RADARSAT-2',
    detectionTime: '06:15 UTC',
    sourceTime: '03:40 UTC',
    durationHours: 2.58,
    center: [20.8500, 71.9500],
    status: 'RESOLVED',
    color: '#10b981',
    sarCenter: [20.8750, 72.0100],
    sarPolygon: [[20.8850, 71.9800], [20.8980, 72.0200], [20.8700, 72.0500], [20.8550, 72.0000]],
    sourceCenter: [20.8100, 71.8600],
    slickArea: '4.2 km²',
    slickDim: '3.1 × 1.4 km',
    confidence: '96%',
    matchBanner: {
      title: 'TRAFFIC EXONERATED // NATURAL SEEP',
      sub: 'All vessel trajectories miss reverse hindcast origin',
      score: 'EXONERATED',
      bg: 'bg-emerald-600'
    },
    metocean: { wind: '9.8 kts @ 210° SSW', current: '0.65 m/s @ 045° NE', leeway: '2.8%', vector: '048.0° NE (0.72 m/s)' },
    metoceanDriftOffsetLat: 0.035,
    metoceanDriftOffsetLng: 0.045,
    suspects: [
      {
        id: 'v4',
        name: 'MT GUJARAT PRIDE',
        imo: '9245110',
        score: 22.1,
        status: 'Exonerated',
        color: '#10b981',
        speed: '13.8 kn (Normal)',
        start: [20.7300, 71.8300],
        intercept: [20.8200, 71.9100],
        end: [20.9300, 71.9900],
        headingDeg: 35
      },
      {
        id: 'v5',
        name: 'CHEM TANKER AL-NOOR',
        imo: '9123890',
        score: 14.3,
        status: 'Exonerated',
        color: '#06b6d4',
        speed: '15.2 kn (Normal)',
        start: [20.9200, 71.8900],
        intercept: [20.8300, 71.7900],
        end: [20.7200, 71.6900],
        headingDeg: 215
      }
    ]
  },
  'inc-ratna-03': {
    id: 'inc-ratna-03',
    title: 'RATNAGIRI CORRIDOR',
    desc: 'Coastal transit monitoring anomaly',
    sensor: 'TerraSAR-X',
    detectionTime: '11:45 UTC',
    sourceTime: '08:50 UTC',
    durationHours: 2.91,
    center: [16.8500, 73.0500],
    status: 'CRITICAL',
    color: '#ef4444',
    sarCenter: [16.8750, 73.1000],
    sarPolygon: [[16.8850, 73.0700], [16.8980, 73.1200], [16.8700, 73.1400], [16.8550, 73.0850]],
    sourceCenter: [16.8100, 72.9600],
    slickArea: '7.8 km²',
    slickDim: '5.2 × 1.8 km',
    confidence: '88%',
    matchBanner: {
      title: 'CRITICAL ATTRIBUTION DETECTED',
      sub: 'Pacific Pioneer directly intersects reverse drift centroid',
      score: '86.8%',
      bg: 'bg-red-500'
    },
    metocean: { wind: '16.5 kts @ 270° W', current: '0.31 m/s @ 110° ESE', leeway: '3.2%', vector: '095.0° E (0.51 m/s)' },
    metoceanDriftOffsetLat: 0.025,
    metoceanDriftOffsetLng: 0.050,
    suspects: [
      {
        id: 'v6',
        name: 'PACIFIC PIONEER',
        imo: '9517822',
        score: 86.8,
        status: 'Primary Culprit',
        color: '#ef4444',
        speed: '12.0 kn (-24% dip)',
        start: [16.9200, 72.9100],
        intercept: [16.8100, 72.9600],
        end: [16.7100, 73.0200],
        headingDeg: 155
      },
      {
        id: 'v7',
        name: 'GOLDEN VOYAGER',
        imo: '9398814',
        score: 29.0,
        status: 'Exonerated',
        color: '#06b6d4',
        speed: '14.5 kn (Normal)',
        start: [16.8300, 72.8200],
        intercept: [16.8650, 72.9800],
        end: [16.9000, 73.1800],
        headingDeg: 68
      }
    ]
  }
};

function CameraBoundsController({ selectedIncidentId, isBacktrackActive }: { selectedIncidentId: string | null; isBacktrackActive: boolean }) {
  const map = useMap();
  useEffect(() => {
    if (!selectedIncidentId) {
      map.setView([18.9000, 71.9000], 6.5, { animate: true });
      return;
    }
    const current = REGIONAL_INCIDENTS_DATA[selectedIncidentId];
    if (current) {
      const points: [number, number][] = [...current.sarPolygon, current.sourceCenter];
      if (isBacktrackActive) {
        current.suspects.forEach(s => points.push(s.start, s.intercept, s.end));
      }
      map.fitBounds(points, {
        paddingTopLeft: [70, 70],
        paddingBottomRight: isBacktrackActive ? [360, 70] : [70, 70],
        maxZoom: 11,
        animate: true,
        duration: 1.0
      });
    }
  }, [selectedIncidentId, isBacktrackActive, map]);
  return null;
}

const getShipMarkerIcon = (color: string, headingDeg: number) => {
  return L.divIcon({
    className: 'custom-vessel-marker',
    html: `
      <div style="position: relative; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; cursor: pointer;">
        <!-- Transparent hover hit target box -->
        <div style="position: absolute; inset: 0; border-radius: 50%; background: transparent;"></div>
        <!-- Rotated ship hull triangle -->
        <div style="transform: rotate(${headingDeg}deg); width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-bottom: 15px solid ${color}; filter: drop-shadow(0 0 4px ${color});"></div>
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 14]
  });
};

interface MapViewerProps {
  timeOffset: number;
  selectedIncidentId: string | null;
  onSelectIncident: (id: string | null) => void;
  isBacktrackActive: boolean;
  onActivateBacktrack: () => void;
  counterfactualVesselId?: string | null;
  onSelectCounterfactual?: (id: string | null) => void;
}

export const MapViewer: React.FC<MapViewerProps> = ({
  timeOffset,
  selectedIncidentId,
  onSelectIncident,
  isBacktrackActive,
  onActivateBacktrack,
  counterfactualVesselId,

}) => {
  const currentIncident = selectedIncidentId ? REGIONAL_INCIDENTS_DATA[selectedIncidentId] : null;

  const maxDelta = currentIncident?.durationHours || 2.53;
  const tNorm = Math.min(Math.max(Math.abs(timeOffset) / maxDelta, 0), 1);
  const isSpillExistent = currentIncident ? Math.abs(timeOffset) <= (currentIncident.durationHours + 0.05) : false;
  
  const currentPlumeCenter: [number, number] = currentIncident ? [
    currentIncident.sarCenter[0] - (currentIncident.sarCenter[0] - currentIncident.sourceCenter[0]) * tNorm,
    currentIncident.sarCenter[1] - (currentIncident.sarCenter[1] - currentIncident.sourceCenter[1]) * tNorm,
  ] : [0, 0];

  return (
    <div className="relative w-full h-full bg-[#0a1118] overflow-hidden select-none">
      
      {!selectedIncidentId && (
        <div className="absolute top-4 right-4 z-[1000] bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-2xl p-4 text-white shadow-2xl font-mono w-80 pointer-events-auto">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2.5">
            <span className="text-xs font-bold text-cyan-400 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              REGIONAL EEZ INCIDENTS
            </span>
            <span className="text-[10px] bg-red-500/20 text-red-300 border border-red-500/30 px-2 py-0.5 rounded font-bold">3 DETECTIONS</span>
          </div>
          <p className="text-[11px] text-slate-300 font-sans mb-3">
            Satellite radar sweeps detected oily anomalies along the Western seaboard. Select a target to initiate investigation:
          </p>
          <div className="space-y-2">
            {Object.values(REGIONAL_INCIDENTS_DATA).map((inc) => (
              <div
                key={inc.id}
                onClick={() => onSelectIncident(inc.id)}
                className="p-2.5 rounded-xl border border-slate-700/80 bg-slate-800/60 hover:bg-slate-800 hover:border-cyan-500 transition-all cursor-pointer flex items-center justify-between text-[11px]"
              >
                <div>
                  <div className="font-bold text-slate-200">{inc.title}</div>
                  <div className="text-[10px] text-slate-400 font-sans">{inc.sensor} • {inc.detectionTime}</div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${inc.status === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border border-red-500/40' : inc.status === 'RESOLVED' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                  {inc.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedIncidentId && currentIncident && (
        <>
          {!isBacktrackActive && (
            <button
              onClick={() => onSelectIncident(null)}
              className="absolute top-4 left-4 z-[1000] bg-slate-900/90 hover:bg-slate-800 text-white text-xs font-bold px-3.5 py-2 rounded-xl border border-slate-700 shadow-xl flex items-center gap-2 cursor-pointer transition-all active:scale-95 pointer-events-auto"
            >
              <span>←</span>
              <span>Return to Regional Surveillance</span>
            </button>
          )}

          {!isBacktrackActive && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] bg-slate-950/90 backdrop-blur-md border border-cyan-500/70 rounded-2xl p-4 shadow-2xl text-center font-mono max-w-md pointer-events-auto">
              <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-1">
                Satellite Target Acquired ({currentIncident.sensor})
              </div>
              <p className="text-xs text-slate-200 mb-3 font-sans">
                Static SAR slick anomaly isolated at {currentIncident.detectionTime}. Correlate historical AIS corridors and calculate reverse Lagrangian advection drift.
              </p>
              <button
                onClick={onActivateBacktrack}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs px-5 py-2.5 rounded-xl uppercase tracking-wider shadow-lg flex items-center gap-2 mx-auto cursor-pointer transition-transform active:scale-95"
              >
                <span>⚡</span> Run Backtrack & AIS Correlation
              </button>
            </div>
          )}

          {isBacktrackActive && (
            <div className="absolute top-16 left-4 z-[1000] bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl p-3 text-white shadow-2xl font-mono w-72 pointer-events-auto">
              <div className="flex items-center justify-between border-b border-slate-750 pb-1.5 mb-2">
                <span className="text-[11px] font-bold text-cyan-400 tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  FORENSIC OVERLAY
                </span>
                <span className="text-[9px] text-slate-400 font-sans">INCOIS / ERA5</span>
              </div>
              <div className="flex flex-col gap-1 text-[10px] pb-2 mb-2 border-b border-slate-800">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Features Legend</span>
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-2 rounded-xs border border-red-500 border-dashed bg-transparent inline-block"></span>
                  <span className="text-slate-200">Observed SAR Slick ({currentIncident.detectionTime})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full border border-sky-400 border-dashed bg-sky-400/20 inline-block"></span>
                  <span className="text-slate-200">Hindcast Source Zone ({currentIncident.sourceTime})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-2 rounded-xs bg-red-600/70 border border-red-500 inline-block"></span>
                  <span className="text-slate-200">Translating Oil Plume</span>
                </div>
                {counterfactualVesselId && (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-3.5 h-2 rounded-xs bg-purple-500/70 border border-purple-500 border-dashed inline-block"></span>
                    <span className="text-purple-300 font-bold">Counterfactual Simulation</span>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-[10px]">
                <div>
                  <span className="text-slate-400 block text-[8px] uppercase">Surface Wind</span>
                  <span className="font-bold text-slate-200">{currentIncident.metocean.wind}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[8px] uppercase">Ocean Current</span>
                  <span className="font-bold text-slate-200">{currentIncident.metocean.current}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[8px] uppercase">Wind Leeway</span>
                  <span className="font-bold text-cyan-300">{currentIncident.metocean.leeway}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[8px] uppercase">Net Drift</span>
                  <span className="font-bold text-emerald-400">{currentIncident.metocean.vector}</span>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      <MapContainer center={[18.9000, 71.9000]} className="w-full h-full" zoom={6.5} zoomControl={false}>
        <TileLayer attribution="&copy; Esri, Maxar, Earthstar Geographics" url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"/>
        <ZoomControl position="topright" />
        <CameraBoundsController isBacktrackActive={isBacktrackActive} selectedIncidentId={selectedIncidentId}/>

        {!selectedIncidentId && Object.values(REGIONAL_INCIDENTS_DATA).map((inc) => (
          <React.Fragment key={inc.id}>
            <Circle 
              center={inc.center} 
              radius={10000}
              pathOptions={{ color: inc.color, fillColor: inc.color, fillOpacity: 0.25, weight: 2, dashArray: '4, 4' }} 
              eventHandlers={{ click: () => onSelectIncident(inc.id) }} 
            />
            <Circle 
              center={inc.center} 
              radius={3500} 
              pathOptions={{ color: '#ffffff', fillColor: inc.color, fillOpacity: 0.9, weight: 2 }} 
              eventHandlers={{ click: () => onSelectIncident(inc.id) }} 
            >
              <Tooltip offset={[0, -12]} className="!bg-slate-950 !text-white !border !border-slate-700 !rounded-xl !p-3 !font-mono !shadow-2xl cursor-pointer" direction="top" interactive={true} permanent>
                <div className="flex flex-col gap-1.5 select-none">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: inc.color }} />
                    <span className="font-bold text-xs" style={{ color: inc.color }}>{inc.title}</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded font-black bg-slate-800 text-slate-300 uppercase">{inc.status}</span>
                  </div>
                  <div className="text-[10px] text-slate-300 font-sans">{inc.desc}</div>
                  <button
                    type="button"
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      onSelectIncident(inc.id);
                    }}
                    className="mt-1 w-full py-1.5 px-3 rounded-lg text-xs font-black uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 active:scale-95 shadow-lg cursor-pointer transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>🔍</span> INITIATE INVESTIGATION →
                  </button>
                </div>
              </Tooltip>
            </Circle>
          </React.Fragment>
        ))}

        {selectedIncidentId && currentIncident && (
          <>
            <Polygon 
              positions={currentIncident.sarPolygon} 
              pathOptions={{ color: '#ef4444', weight: 2, fillOpacity: 0.1, dashArray: '4, 4' }} 
            />

            {isBacktrackActive && (
              <>
                <Circle 
                  center={currentIncident.sourceCenter} 
                  radius={1800} 
                  pathOptions={{ color: '#94a3b8', fillColor: '#38bdf8', fillOpacity: 0.1, weight: 1.5, dashArray: '5, 5' }} 
                />

                {isSpillExistent && (
                  <Circle 
                    center={currentPlumeCenter} 
                    radius={1400} 
                    pathOptions={{ color: '#dc2626', fillColor: '#ef4444', fillOpacity: 0.6, weight: 1.5 }} 
                  />
                )}

                {currentIncident.suspects.map((v) => {
                  const tCur = Math.min(Math.max(Math.abs(timeOffset), 0), 6.0);
                  const tInt = currentIncident.durationHours; 

                  let curLat: number;
                  let curLng: number;

                  if (tCur <= tInt) {
                    const ratio = tInt > 0 ? tCur / tInt : 0;
                    curLat = v.end[0] - (v.end[0] - v.intercept[0]) * ratio;
                    curLng = v.end[1] - (v.end[1] - v.intercept[1]) * ratio;
                  } else {
                    const ratio = (tCur - tInt) / (6.0 - tInt);
                    curLat = v.intercept[0] - (v.intercept[0] - v.start[0]) * ratio;
                    curLng = v.intercept[1] - (v.intercept[1] - v.start[1]) * ratio;
                  }
                  
                  const driftLatDelta = currentIncident.sarCenter[0] - currentIncident.sourceCenter[0];
                  const driftLngDelta = currentIncident.sarCenter[1] - currentIncident.sourceCenter[1];

                  const vesselDischargePos = v.intercept;

                  const cfPlumeAtDetection: [number, number] = [
                    vesselDischargePos[0] + driftLatDelta,
                    vesselDischargePos[1] + driftLngDelta,
                  ];

                  const cfPlumeCenter: [number, number] = [
                    cfPlumeAtDetection[0] - (cfPlumeAtDetection[0] - vesselDischargePos[0]) * tNorm,
                    cfPlumeAtDetection[1] - (cfPlumeAtDetection[1] - vesselDischargePos[1]) * tNorm,
                  ];
                  
                  return (
                    <React.Fragment key={v.id}>
                      <Polyline 
                        positions={[v.start, v.intercept, v.end]} 
                        pathOptions={{ color: v.color, weight: 2, opacity: 0.8, dashArray: '5, 5' }} 
                      />
                      <Marker interactive={true} position={[curLat, curLng]} icon={getShipMarkerIcon(v.color, v.headingDeg)}>
                        <Tooltip sticky={true} offset={[0, -14]} className="!bg-slate-950/95 !text-white !border !border-slate-700 !rounded-md !px-2.5 !py-1 !text-[10px] !font-mono shadow-2xl pointer-events-none" direction="top" opacity={1} permanent={false}>
                          <div className="flex items-center gap-1.5 whitespace-nowrap">
                            <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: v.color }}></span>
                            <span className="font-bold">{v.name}</span>
                            <span className="text-[9px] text-slate-400">({v.speed})</span>
                          </div>
                        </Tooltip>
                      </Marker>
                      
                      {counterfactualVesselId === v.id && isSpillExistent && (
                        <>
                          <Polyline 
                            positions={[[curLat, curLng], cfPlumeCenter]} 
                            pathOptions={{ color: '#c084fc', weight: 1.5, dashArray: '3, 4', opacity: 0.8 }} 
                          />
                          <Circle 
                            center={cfPlumeCenter} 
                            radius={1500} 
                            pathOptions={{ color: '#a855f7', fillColor: '#c084fc', fillOpacity: 0.35, weight: 2, dashArray: '4, 4' }} 
                          >
                            <Tooltip offset={[0, -10]} className="!bg-purple-950 !text-purple-200 !border-purple-500 !text-[9px] !font-mono shadow-xl pointer-events-none" direction="top" permanent={false}>
                              {v.status.includes('Culprit') || v.score > 80 
                                ? 'FORWARD ATTRIBUTION MODEL (HIGH CONVERGENCE)'
                                : 'COUNTERFACTUAL DISPERSION (MISSES OBSERVATION)'}
                            </Tooltip>
                          </Circle>
                        </>
                      )}
                    </React.Fragment>
                  );
                })}
              </>
            )}
          </>
        )}
      </MapContainer>
    </div>
  );
};
