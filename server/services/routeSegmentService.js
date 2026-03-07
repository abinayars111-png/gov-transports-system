const calculateDistance = require("./distanceService");
const calculateETA = require("./etaService");

/**
 * Build ordered waypoints for a route: [from, ...stops, to].
 * Coordinates may be fewer than waypoints (e.g. 4 coords for 5 names); we map by index and use last coord when missing.
 */
function getOrderedWaypoints(route) {
  const names = [route.from, ...(route.stops || []), route.to].filter(Boolean);
  const coords = (route.coordinates || []).map(c => ({ lat: c.lat, lng: c.lng }));
  const n = coords.length;
  if (n === 0) return names.map(name => ({ name: (name || "").trim(), lat: undefined, lng: undefined }));
  return names.map((name, i) => {
    const c = coords[Math.min(i, n - 1)];
    return { name: (name || "").trim(), lat: c?.lat, lng: c?.lng };
  });
}

function findWaypointIndex(waypoints, place) {
  const lower = (place || "").trim().toLowerCase();
  return waypoints.findIndex(w => (w.name || "").toLowerCase() === lower);
}

/**
 * Get segment between two places on a route.
 * Returns null if either place not found or from is not before to.
 */
function getSegment(route, fromPlace, toPlace) {
  const waypoints = getOrderedWaypoints(route);
  const fromIndex = findWaypointIndex(waypoints, fromPlace);
  const toIndex = findWaypointIndex(waypoints, toPlace);

  if (fromIndex === -1 || toIndex === -1 || fromIndex >= toIndex) return null;

  const segmentWaypoints = waypoints.slice(fromIndex, toIndex + 1);
  const segmentCoords = segmentWaypoints
    .map(w => ({ lat: w.lat, lng: w.lng }))
    .filter(c => c.lat != null && c.lng != null);
  if (segmentCoords.length < 2) return null;

  const distance = parseFloat(calculateDistance(segmentCoords));
  const eta = calculateETA(distance);

  return {
    fromIndex,
    toIndex,
    segmentCoordinates: segmentCoords,
    segmentStops: segmentWaypoints.map(w => w.name),
    distance,
    eta,
    fromName: waypoints[fromIndex].name,
    toName: waypoints[toIndex].name
  };
}

/**
 * Find all routes that contain both from and to (in order) and return segment info.
 */
function findSegments(routes, fromPlace, toPlace) {
  const results = [];
  for (const route of routes) {
    const segment = getSegment(route, fromPlace, toPlace);
    if (segment) {
      results.push({
        route,
        segment
      });
    }
  }
  return results;
}

module.exports = {
  getOrderedWaypoints,
  getSegment,
  findSegments
};
