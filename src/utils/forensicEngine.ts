export interface Coordinates {
  lat: number;
  lng: number;
}

export interface VesselWaypoint {
  time: string; // ISO string or UTC
  lat: number;
  lng: number;
  speed: number;
  heading: number;
}

export interface ForensicVessel {
  id: string;
  imo: string;
  name: string;
  type: string;
  waypoints: VesselWaypoint[];
  flag?: string;
  tonnage?: number;
  owner?: string;
}

export interface EnvironmentalVectors {
  currentU: number; // m/s eastward
  currentV: number; // m/s northward
  windU: number;    // m/s eastward
  windV: number;    // m/s northward
  leewayFactor?: number; // standard: 0.03 (3%)
}

// 1. Dynamic Lagrangian Reverse Drift: Calculates centroid at any time offset (hours)
export function calculateLagrangianCentroid(
  initialCentroid: Coordinates,
  hoursAgo: number,
  env: EnvironmentalVectors
): Coordinates {
  const leeway = env.leewayFactor ?? 0.03;
  const netU = env.currentU + leeway * env.windU; // m/s
  const netV = env.currentV + leeway * env.windV; // m/s

  // 1 deg latitude ≈ 111,139 m, 1 deg longitude ≈ 111,139 * cos(lat) m
  const metersPerDegLat = 111139;
  const metersPerDegLng = 111139 * Math.cos((initialCentroid.lat * Math.PI) / 180);

  // Negative sign because we are running backward in time (hindcasting)
  const deltaY = -(netV * (hoursAgo * 3600)) / metersPerDegLat;
  const deltaX = -(netU * (hoursAgo * 3600)) / metersPerDegLng;

  return {
    lat: initialCentroid.lat + deltaY,
    lng: initialCentroid.lng + deltaX,
  };
}

// 2. Dynamic AIS Waypoint Interpolator: Finds exact position & speed of any vessel at timeOffset
export function interpolateVesselPosition(
  waypoints: VesselWaypoint[],
  timeFraction: number // 0.0 (start) to 1.0 (end)
): { lat: number; lng: number; speed: number; heading: number } {
  if (waypoints.length === 0) return { lat: 0, lng: 0, speed: 0, heading: 0 };
  if (waypoints.length === 1) return waypoints[0];

  const exactIndex = timeFraction * (waypoints.length - 1);
  const lowerIndex = Math.floor(exactIndex);
  const upperIndex = Math.min(waypoints.length - 1, Math.ceil(exactIndex));
  const remainder = exactIndex - lowerIndex;

  const p1 = waypoints[lowerIndex];
  const p2 = waypoints[upperIndex];

  return {
    lat: p1.lat + (p2.lat - p1.lat) * remainder,
    lng: p1.lng + (p2.lng - p1.lng) * remainder,
    speed: parseFloat((p1.speed + (p2.speed - p1.speed) * remainder).toFixed(1)),
    heading: p1.heading + (p2.heading - p1.heading) * remainder,
  };
}

// 3. Dynamic Fay Spreading Model for Multi-Patch Field:
// Returns particle clusters dynamically computed from centroid and age of spill
export function computeDynamicSlickConstellation(
  currentCentroid: Coordinates,
  ageHours: number, // 0 hours at discharge, increases forward
) {
  // Directional diffusion angles (8 compass angles in radians)
  const angles = [0, 0.785, 1.57, 2.356, 3.14, 3.926, 4.71, 5.497];
  
  // Radial dispersion coefficient based on spill age
  const dispersionScale = Math.sqrt(Math.max(0.01, ageHours));

  return angles.map((angle, idx) => {
    const radialDistanceKm = 0.8 * dispersionScale * (0.8 + 0.4 * Math.sin(idx * 2));
    const latOffset = (radialDistanceKm * Math.cos(angle)) / 111.139;
    const lngOffset = (radialDistanceKm * Math.sin(angle)) / (111.139 * Math.cos((currentCentroid.lat * Math.PI) / 180));

    return {
      id: `patch_${idx}`,
      lat: currentCentroid.lat + latOffset,
      lng: currentCentroid.lng + lngOffset,
      radius: Math.max(400, 1200 * dispersionScale * (0.6 + 0.3 * Math.cos(idx))),
      opacity: Math.max(0.15, Math.min(0.75, 0.8 - 0.12 * ageHours)),
    };
  });
}
