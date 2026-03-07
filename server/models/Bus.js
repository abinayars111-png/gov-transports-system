const mongoose = require("mongoose");

const BusSchema = new mongoose.Schema({
  busNumber: String,
  route: { type: mongoose.Schema.Types.ObjectId, ref: "Route" },
  status: String
});

module.exports = mongoose.model("Bus", BusSchema);
