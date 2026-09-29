export const INCIDENT_DETAILS = {
  incidentId: "OS-2026-014",
  detectionTime: "10:00 UTC | 18 May 2026",
  locationName: "Mumbai High Offshore Sector, Arabian Sea EEZ",
  centerCoordinates: [18.9500, 71.3500],
  areaKm2: 18.4,
  lengthKm: 8.3,
  widthKm: 2.6,
  estimatedAgeHours: 2.6,
  detectionConfidence: 93,
  mostProbableSourceWindow: "07:20 - 07:45 UTC (72% Probability)",
  oceanCurrent: "0.42 m/s @ 072° ENE",
  surfaceWind: "6.8 m/s @ 245° WSW"
};

export const SUSPECT_VESSELS = [
  {
    rank: 1,
    name: "MV OCEAN STAR",
    imo: "9412086",
    mmsi: "352001842",
    flag: "Panama",
    type: "Bulk Carrier",
    score: 91,
    speedKnots: 11.4,
    distanceKm: 0.42,
    status: "Critical Match",
    counterfactualOverlap: 87
  },
  {
    rank: 2,
    name: "MT SEA HAWK",
    imo: "9302194",
    mmsi: "636019231",
    flag: "Liberia",
    type: "Crude Oil Tanker",
    score: 68,
    speedKnots: 14.1,
    distanceKm: 3.85,
    status: "Investigate",
    counterfactualOverlap: 42
  },
  {
    rank: 3,
    name: "MV BLUE WAVE",
    imo: "9184429",
    mmsi: "419000812",
    flag: "India",
    type: "Container Ship",
    score: 43,
    speedKnots: 16.8,
    distanceKm: 7.20,
    status: "Low Probability",
    counterfactualOverlap: 18
  }
];
