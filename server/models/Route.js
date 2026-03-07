const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema(
  {
    routeName: String,
    busNumber: String,
    from: String,
    to: String,
    stops: [String],
    coordinates: [
      {
        lat: Number,
        lng: Number
      }
    ],
    distance: Number,
    duration: Number
  },
  { timestamps: true }
);

module.exports = mongoose.model("Route", routeSchema);
