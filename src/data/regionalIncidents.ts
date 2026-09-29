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
