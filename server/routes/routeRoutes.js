const express = require("express");
const router = express.Router();
const {
  getStops,
  searchRoutes,
  getRouteDetails
} = require("../controllers/routeController");

router.get("/stops", getStops);
router.get("/search", searchRoutes);
router.get("/:id", getRouteDetails);

module.exports = router;
