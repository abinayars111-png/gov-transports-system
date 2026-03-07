const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/bus", require("./routes/busRoutes"));

module.exports = app;
