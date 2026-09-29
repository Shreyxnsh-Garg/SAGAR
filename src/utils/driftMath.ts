import type { LatLngTuple } from 'leaflet';

export const getSlickCoordinatesAtTime = (tHoursAgo: number): LatLngTuple => {
  // At t=0: [18.9500, 71.3500]
  // At t=2.6: [18.8820, 71.2210]
  const lat0 = 18.9500, lng0 = 71.3500;
  const lat2_6 = 18.8820, lng2_6 = 71.2210;
  
  const dLat = (lat0 - lat2_6) / 2.6; // ~0.0261 deg/hr
  const dLng = (lng0 - lng2_6) / 2.6; // ~0.0496 deg/hr
  
  return [lat0 - dLat * tHoursAgo, lng0 - dLng * tHoursAgo];
};

export const getVesselPositionAtTime = (vesselId: string, tHoursAgo: number): LatLngTuple => {
  if (vesselId === 'MV OCEAN STAR') {
    // Intercepts at t=2.6h at [18.8820, 71.2210]
    const latInt = 18.8820, lngInt = 71.2210;
    const vLat = -0.015;
    const vLng = 0.025;
    const deltaT = tHoursAgo - 2.6;
    return [latInt - vLat * deltaT, lngInt - vLng * deltaT];
  } else if (vesselId === 'MT SEA HAWK') {
    return [18.8000 + 0.01 * tHoursAgo, 71.4000 - 0.03 * tHoursAgo];
  } else {
    // MV BLUE WAVE
    return [19.0000 - 0.02 * tHoursAgo, 71.1000 + 0.04 * tHoursAgo];
  }
};

export const getOrganicSlickPolygon = (center: LatLngTuple, lengthKm: number, widthKm: number, rotationDeg: number, numPoints: number = 16): LatLngTuple[] => {
  const points: LatLngTuple[] = [];
  const latRatio = 1 / 111.32; 
  const lngRatio = 1 / (111.32 * Math.cos(center[0] * (Math.PI / 180)));
  
  for (let i = 0; i < numPoints; i++) {
    const angle = (i / numPoints) * 2 * Math.PI;
    
    const radiusVariation = 1.0 + 0.2 * Math.sin(3 * angle) + 0.1 * Math.cos(7 * angle) + 0.05 * Math.sin(11 * angle);
    
    const rL = (lengthKm / 2) * radiusVariation;
    const rW = (widthKm / 2) * radiusVariation;
    
    const rot = rotationDeg * (Math.PI / 180);
    
    const x0 = rW * Math.cos(angle);
    const y0 = rL * Math.sin(angle);
    
    const xRot = x0 * Math.cos(rot) - y0 * Math.sin(rot);
    const yRot = x0 * Math.sin(rot) + y0 * Math.cos(rot);
    
    points.push([
      center[0] + yRot * latRatio,
      center[1] + xRot * lngRatio
    ]);
  }
  
  return points;
};
