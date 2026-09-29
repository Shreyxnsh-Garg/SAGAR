import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polygon, Circle, Polyline, Tooltip, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { REGIONAL_INCIDENTS_DATA } from './MapViewer';

interface ForwardImpactProps {
  selectedIncidentId: string | null;
  onBackToSurveillance: () => void;
}

export const ForwardImpactAnalysis: React.FC<ForwardImpactProps> = ({
  selectedIncidentId,
  onBackToSurveillance,
}) => {
  const incident = selectedIncidentId && REGIONAL_INCIDENTS_DATA[selectedIncidentId]
    ? REGIONAL_INCIDENTS_DATA[selectedIncidentId]
    : REGIONAL_INCIDENTS_DATA['inc-mum-01'] || {
        id: 'inc-kham-02',
        title: 'Gulf of Khambhat',
        sensor: 'Sentinel-1A (C-Band SAR)',
        sarCenter: [21.25, 72.35] as [number, number],
        sarPolygon: [
          [21.22, 72.30],
          [21.28, 72.32],
          [21.26, 72.40],
          [21.20, 72.38],
        ] as [number, number][],
      };

  // Continuous Scrubber State (T+0h to T+24h)
  const [forwardHours, setForwardHours] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Auto-play interval up to 48h
  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setForwardHours((prev) => {
          if (prev >= 48) {
            setIsPlaying(false);
            return 48;
          }
          return +(prev + 0.5).toFixed(2);
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Scaled 48-hour drift destination covering an expanded sea area towards the coastline
  const targetLat = incident.sarCenter[0] + 0.45;
  const targetLng = incident.sarCenter[1] + 0.78;

  // Real-time translating plume centroid scaled across 48h
  const tNorm = Math.min(Math.max(forwardHours / 48, 0), 1);
  const dynamicCenter: [number, number] = [
    incident.sarCenter[0] + (targetLat - incident.sarCenter[0]) * tNorm,
    incident.sarCenter[1] + (targetLng - incident.sarCenter[1]) * tNorm,
  ];

  // Dynamic physics scaling over 48h
  const dynamicRadiusKm = 2.0 + (22.0 - 2.0) * Math.pow(tNorm, 0.75);
  const dynamicAreaKm2 = +(4.2 + (148.5 - 4.2) * tNorm).toFixed(1);
  const dynamicThickness = Math.max(+(50 - 43.5 * tNorm).toFixed(1), 4.5);
  const dynamicEvaporation = +(56.4 * Math.pow(tNorm, 0.65)).toFixed(1);

  // 6 Circular Marks at 8-hour intervals (+8h to +48h)
  const coneIntervals = [8, 16, 24, 32, 40, 48];

  // Sector-specific ecological & vulnerability profiles
  const impactData = {
    'inc-mum-01': {
      vulnerableZones: [
        { name: 'Alibaug & Kihim Coastal Sandbars', eta: 'T+22h', risk: 'HIGH', type: 'Tourism / Intertidal Sand' },
        { name: 'Thane Creek & Elephanta Mangrove Fringe', eta: 'T+26h', risk: 'CRITICAL', type: 'Ramsar Wetland & Marine Nursery' },
        { name: 'JNPT Port Approach Navigation Channel', eta: 'T+14h', risk: 'MODERATE', type: 'Commercial Shipping Corridor' },
      ],
      ecologicalEffects: [
        'Intertidal Mangrove Asphyxiation: Pneumatophores clogged with heavy fuel oil residues.',
        'Pelagic Fish Mortality: Toxic hydrocarbon exposure in mackerel and Bombay duck spawning corridors.',
        'Seabird Plumage Fouling: Terns, plovers, and gulls along the Mumbai offshore flyway.',
      ],
      precautions: [
        'Deploy Tier-1 Offshore Containment Booms 8 km southwest of Revdanda Creek.',
        'Apply Type-3 OSD beyond the 20-meter bathymetric depth contour.',
        'Position ICGS Samudra Prahari for high-capacity offshore oil skimming.',
        'Issue immediate advisory to local fishermen associations (Alibaug, Murud) to suspend net hauling.',
      ],
    },
    'inc-kham-02': {
      vulnerableZones: [
        { name: 'Gulf Marine Sanctuary / Mangroves', eta: 'T+14h', risk: 'HIGH', type: 'Protected Marine Ecology' },
        { name: 'Alang Anchorage Transit Corridor', eta: 'T+18h', risk: 'MODERATE', type: 'Vessel Anchorage' },
        { name: 'Dahej Industrial Desalination Intakes', eta: 'T+11h', risk: 'MONITORING', type: 'Industrial Seawater Extraction' },
      ],
      ecologicalEffects: [
        'Rapid natural biodegradation via indigenous hydrocarbonoclastic bacteria.',
        'Minimal pelagic fishery toxicity due to strong macro-tidal mixing (8m tide range).',
        'Suspended sediment adhesion threatening inner creek benthic invertebrates.',
      ],
      precautions: [
        'Deploy 600m heavy-duty curtain boom at Anchor GPS (21°14\'N, 72°08\'E).',
        'Issue NAVTEX safety warning to inbound tankers; suspend bunkering.',
        'Inspect Dahej and Hazira seawater intake screens regularly for hydrocarbon sheen.',
        'Log water column baseline PAH levels (< 2 ppb).',
      ],
    },
    'inc-ratna-03': {
      vulnerableZones: [
        { name: 'Jaigad Estuary & Mirya Bay Reefs', eta: 'T+19h', risk: 'CRITICAL', type: 'Coral & Intertidal Reef' },
        { name: 'Bhatye Beach Turtle Nesting Sites', eta: 'T+24h', risk: 'CRITICAL', type: 'Olive Ridley Nesting Grounds' },
        { name: 'Ratnagiri Deep Sea Fishing Harbor', eta: 'T+15h', risk: 'HIGH', type: 'Fisheries Landing Hub' },
      ],
      ecologicalEffects: [
        'Destruction of pristine rock-pool corals and endemic macroalgal beds along South Konkan coast.',
        'Lethal hydrocarbon ingestion risks for nesting Olive Ridley turtles and juvenile hatchlings.',
        'Direct economic impact on purse-seine fishermen and coastal aquaculture cages.',
      ],
      precautions: [
        'Deploy SCAT advance shoreline assessment strike teams at Mirya Bay.',
        'Position deflection booming at the mouth of Shastri and Jaigad estuaries.',
        'Anchor sorbent barriers along high-tide beach berms prior to tidal peak.',
        'Enforce a 12-nautical-mile temporary commercial fishing exclusion zone.',
      ],
    },
  }[incident.id] || {
    vulnerableZones: [
      { name: 'Gulf Marine Sanctuary / Mangroves', eta: `T+${Math.max(2, Math.round(14 - forwardHours))}h`, risk: 'HIGH', type: 'Protected Estuary' },
      { name: 'Alang Anchorage Corridor', eta: `T+${Math.max(4, Math.round(18 - forwardHours))}h`, risk: 'MODERATE', type: 'Transit Channel' },
      { name: 'Coastal Inhabited Belt', eta: `T+${Math.max(6, Math.round(22 - forwardHours))}h`, risk: 'CRITICAL', type: 'Intertidal Mudflats' },
    ],
    ecologicalEffects: [
      'Estuarine sediment contamination affecting benthic crab & fish nursery beds.',
      'Surface microlayer hydrocarbon toxicity inhibiting algal photosynthesis.',
      'Aerosolized VOC dispersion toward downwind coastal communities.',
    ],
    precautions: [
      'Deploy 600m heavy-duty boom at Anchor GPS coordinates.',
      'Issue NAVTEX safety warning to inbound commercial tankers.',
      'Deploy rapid containment skimmers to the advection front.',
    ],
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-slate-100 text-slate-900 font-sans select-none overflow-hidden">
      
      {/* Top Action Sub-Bar with Continuous Scrubber */}
      <div className="h-14 px-6 bg-white border-b border-slate-200 flex items-center justify-between z-20 shadow-xs shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToSurveillance}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-mono font-bold px-3 py-1.5 rounded-lg border border-slate-300 flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
          >
            <span>←</span> Back to Forensic Mode
          </button>
          <div className="h-5 w-px bg-slate-200 mx-1"></div>
          <div>
            <h1 className="font-mono text-xs font-black text-slate-900 tracking-wider flex items-center gap-1.5">
              <span>🌊</span> FORWARD DRIFT & SHORELINE ACCUMULATION
            </h1>
            <p className="text-[10px] text-slate-500 font-sans">
              Lagrangian Particle Trajectory Forecast // Sector: {incident.title} ({incident.sensor})
            </p>
          </div>
        </div>

        {/* Dynamic Continuous Scrubber */}
        <div className="flex items-center gap-3 bg-slate-100 border border-slate-300 px-3.5 py-1.5 rounded-xl font-mono text-xs shadow-xs">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-7 h-7 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-black flex items-center justify-center cursor-pointer shadow-xs transition-colors"
          >
            {isPlaying ? '⏸' : '▶'}
          </button>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase">T+0h</span>
            <input
              type="range"
              min="0"
              max="48"
              step="0.5"
              value={forwardHours}
              onChange={(e) => {
                setIsPlaying(false);
                setForwardHours(parseFloat(e.target.value));
              }}
              className="w-48 h-1.5 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-cyan-600"
            />
            <span className="text-[10px] font-bold text-slate-500 uppercase">T+48h</span>
          </div>

          <div className="bg-white border border-slate-300 px-2.5 py-1 rounded-md font-black text-cyan-800 text-[11px] shadow-xs min-w-[58px] text-center">
            +{forwardHours.toFixed(1)}h
          </div>
        </div>
      </div>

      {/* Main Workspace Body */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Interactive Leaflet Map */}
        <div className="flex-1 relative h-full">
          <MapContainer center={incident.sarCenter} className="w-full h-full" zoom={10} zoomControl={false}>
            <ZoomControl position="topright"/>
            <TileLayer
              attribution="&copy; Esri, Maxar, Earthstar Geographics"
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />

            {/* Baseline Observed Slick at T-0 */}
            <Polygon
              positions={incident.sarPolygon}
              pathOptions={{ color: '#ef4444', weight: 2, dashArray: '4, 4', fillOpacity: 0.25 }}
            >
              <Tooltip direction="top" permanent>
                <span className="font-mono text-[9px] font-bold text-red-500">T-0h: Observed SAR Slick</span>
              </Tooltip>
            </Polygon>

            {/* Advection Vector Path */}
            <Polyline
              positions={[incident.sarCenter, [targetLat, targetLng]]}
              pathOptions={{ color: '#38bdf8', weight: 2, dashArray: '6, 6', opacity: 0.8 }}
            />

            {/* Progressive Advection Footprints (Dropped as timeline advances past each 8h milestone) */}
            {coneIntervals
              .filter((hourMark) => forwardHours >= hourMark)
              .map((hourMark) => {
                const fraction = hourMark / 48;
                const markCenter: [number, number] = [
                  incident.sarCenter[0] + (targetLat - incident.sarCenter[0]) * fraction,
                  incident.sarCenter[1] + (targetLng - incident.sarCenter[1]) * fraction,
                ];
                const markRadiusMeters = (2.0 + (22.0 - 2.0) * Math.pow(fraction, 0.75)) * 1000;

                return (
                  <Circle 
                    key={hourMark} 
                    center={markCenter} 
                    radius={markRadiusMeters} 
                    pathOptions={{ 
                      color: '#f97316', 
                      fillColor: '#fb923c', 
                      fillOpacity: 0.18, 
                      weight: 2, 
                      dashArray: '4, 4' 
                    }}
                  >
                    {/* Tooltip appears ONLY on hover */}
                    <Tooltip direction="top" sticky>
                      <span className="font-mono text-[10px] font-bold text-slate-800 bg-white/95 px-2 py-1 rounded-md border border-amber-400 shadow-md">
                        +{hourMark}h Footprint ({+(4.2 + (148.5 - 4.2) * fraction).toFixed(0)} km²)
                      </span>
                    </Tooltip>
                  </Circle>
                );
              })}

            {/* Dynamic Continuous Expanding Slick Footprint */}
            <Circle
              center={dynamicCenter}
              radius={dynamicRadiusKm * 1000}
              pathOptions={{
                color: forwardHours >= 20 ? '#ef4444' : forwardHours >= 12 ? '#f59e0b' : '#0284c7',
                fillColor: forwardHours >= 20 ? '#ef4444' : forwardHours >= 12 ? '#f59e0b' : '#38bdf8',
                fillOpacity: 0.35,
                weight: 2,
              }}
            >
              <Tooltip direction="center" permanent>
                <div className="font-mono text-[9px] font-bold text-slate-900 bg-white/95 px-1.5 py-0.5 rounded border border-slate-300 shadow-sm whitespace-nowrap">
                  +{forwardHours.toFixed(1)}h ({dynamicAreaKm2} km²)
                </div>
              </Tooltip>
            </Circle>
          </MapContainer>

          {/* Environmental Drift Telemetry Box on Map */}
          <div className="absolute top-4 left-4 z-[1000] bg-white/95 backdrop-blur-md border border-slate-200 p-3.5 rounded-xl font-mono text-xs w-72 shadow-xl">
            <div className="text-[10px] text-cyan-800 font-bold uppercase tracking-wider mb-2 border-b border-slate-200 pb-1 flex items-center justify-between">
              <span>Drift Telemetry</span>
              <span className="text-emerald-700 font-bold">INCOIS / GNOME</span>
            </div>
            <div className="space-y-1.5 text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-500">Active Horizon:</span>
                <span className="font-bold text-amber-700">T+{forwardHours.toFixed(1)}h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Forecasted Footprint:</span>
                <span className="font-bold text-slate-900">{dynamicAreaKm2} km²</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Avg Emulsion:</span>
                <span className="font-bold text-cyan-700">{dynamicThickness} µm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Evaporation / Loss:</span>
                <span className="font-bold text-emerald-700">{dynamicEvaporation}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Analytical Panel: 3 Vibrant Cards */}
        <div className="w-[460px] bg-slate-50 border-l border-slate-200 flex flex-col overflow-y-auto p-5 font-mono text-xs gap-4 shadow-inner">
          
          {/* Card 1: Coastal Landfall Targets (Amber / Orange Theme) */}
          <div className="bg-white border-2 border-amber-400/80 rounded-2xl p-4 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-amber-400 to-orange-500"></div>
            <div className="text-xs font-black text-amber-700 uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="p-1 rounded-md bg-amber-100 text-amber-600">📍</span>
              <span>Coastal Landfall & Vulnerability Targets</span>
            </div>
            <div className="space-y-2.5">
              {impactData.vulnerableZones.map((zone, idx) => (
                <div 
                  key={idx} 
                  className="p-3 rounded-xl bg-amber-50/50 border border-amber-200/90 flex items-center justify-between hover:border-amber-300 transition-colors shadow-xs"
                >
                  <div>
                    <div className="font-bold text-slate-900 text-xs tracking-tight">{zone.name}</div>
                    <div className="text-[10px] text-amber-800/80 font-sans font-semibold mt-0.5">{zone.type}</div>
                  </div>
                  <span className="text-[10px] font-black px-2.5 py-1 rounded-lg bg-rose-500 text-white shadow-xs tracking-wider">
                    ETA: {zone.eta}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Marine & Ecological Impact (Rose / Red Theme) */}
          <div className="bg-white border-2 border-rose-400/80 rounded-2xl p-4 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-rose-500 to-red-600"></div>
            <div className="text-xs font-black text-rose-700 uppercase tracking-wider mb-2.5 flex items-center gap-2">
              <span className="p-1 rounded-md bg-rose-100 text-rose-600">⚠️</span>
              <span>Marine & Ecological Impact</span>
            </div>
            <div className="space-y-2">
              {impactData.ecologicalEffects.map((eff, idx) => (
                <div 
                  key={idx} 
                  className="p-2.5 rounded-xl bg-rose-50/50 border border-rose-200/90 text-slate-800 text-[11px] font-sans flex items-start gap-2.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5"></span>
                  <span className="leading-snug font-medium text-slate-700">{eff}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Mandated Containment Precautions (Teal / Cyan Theme) */}
          <div className="bg-white border-2 border-teal-400/80 rounded-2xl p-4 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-teal-400 to-cyan-500"></div>
            <div className="text-xs font-black text-teal-800 uppercase tracking-wider mb-2.5 flex items-center gap-2">
              <span className="p-1 rounded-md bg-teal-100 text-teal-700">🛡️</span>
              <span>Mandated Containment Precautions</span>
            </div>
            <div className="space-y-2">
              {impactData.precautions.map((prec, idx) => (
                <div 
                  key={idx} 
                  className="p-3 rounded-xl bg-teal-50/60 border border-teal-200 text-teal-950 flex items-start gap-2.5 shadow-xs hover:border-teal-300 transition-colors"
                >
                  <span className="w-5 h-5 rounded-md bg-teal-600 text-white font-mono font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    {idx + 1}
                  </span>
                  <span className="font-sans text-[11px] font-semibold text-teal-900 leading-snug">
                    {prec}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
