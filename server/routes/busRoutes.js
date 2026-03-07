const router = require("express").Router();
const { getStops, searchRoutes, getRouteById } =
  require("../controllers/busController");
const { protect } = require("../middleware/authMiddleware");

router.get("/stops", protect, getStops);
router.get("/search", protect, searchRoutes);
router.get("/route/:id", protect, getRouteById);

module.exports = router;
