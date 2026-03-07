const Route = require("../models/Route");

exports.getStops = async (req, res) => {
  const routes = await Route.find();
  const stops = new Set();

  routes.forEach(r =>
    r.stops.forEach(s => stops.add(s.name))
  );

  res.json([...stops]);
};

exports.searchRoutes = async (req, res) => {
  const { from, to } = req.query;

  const routes = await Route.find({
    "stops.name": { $all: [from, to] }
  });

  const filtered = routes.filter(route => {
    const fromIndex = route.stops.findIndex(s => s.name === from);
    const toIndex = route.stops.findIndex(s => s.name === to);
    return fromIndex < toIndex;
  });

  res.json(filtered);
};

exports.getRouteById = async (req, res) => {
  const route = await Route.findById(req.params.id);
  res.json(route);
};
