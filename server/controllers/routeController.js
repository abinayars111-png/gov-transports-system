const Route = require("../models/Route");
const { getSegment, findSegments } = require("../services/routeSegmentService");

function resolveBusNumber(route, segmentFrom, segmentTo) {
  const overrides = {
    "alangulam|surandai": "105A",
    "surandai|alangulam": "95B",
  };
  const key = `${(segmentFrom || "").trim().toLowerCase()}|${(segmentTo || "")
    .trim()
    .toLowerCase()}`;
  return overrides[key] || route.busNumber;
}

exports.getStops = async (req, res) => {
  const routes = await Route.find();
  const stops = new Set();

  routes.forEach(route => {
    if (route.from) stops.add(route.from.trim());
    if (route.to) stops.add(route.to.trim());
    (route.stops || []).forEach(stop => stop && stops.add(stop.trim()));
  });

  res.json([...stops].filter(Boolean).sort((a, b) => a.localeCompare(b)));
};

exports.searchRoutes = async (req, res) => {
  const { from, to } = req.query;
  if (!from || !to) return res.json([]);

  const routes = await Route.find();
  const matches = findSegments(routes, from, to);

  const enhanced = matches.map(({ route, segment }) => ({
    _id: route._id,
    routeName: route.routeName,
    busNumber: resolveBusNumber(route, segment.fromName, segment.toName),
    from: segment.fromName,
    to: segment.toName,
    distance: segment.distance,
    eta: segment.eta,
    coordinates: segment.segmentCoordinates,
    stops: segment.segmentStops
  }));

  res.json(enhanced);
};

exports.getRouteDetails = async (req, res) => {
  const route = await Route.findById(req.params.id);
  if (!route) return res.status(404).json({ message: "Route not found" });

  const { from, to } = req.query;

  if (from && to) {
    const segment = getSegment(route, from, to);
    if (segment) {
      return res.json({
        _id: route._id,
        routeName: route.routeName,
        busNumber: resolveBusNumber(route, segment.fromName, segment.toName),
        from: segment.fromName,
        to: segment.toName,
        distance: segment.distance,
        eta: segment.eta,
        coordinates: segment.segmentCoordinates,
        stops: segment.segmentStops
      });
    }
  }

  const calculateETA = require("../services/etaService");
  const eta = calculateETA(route.distance);
  res.json({ ...route._doc, eta });
};
