require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");
const routeRoutes = require("./routes/routeRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/routes", routeRoutes);

// Serve frontend static files
app.use(express.static(path.join(__dirname, "../public")));

// ✅ Root URL redirect to login page
app.get("/", (req, res) => {
  res.redirect("/login.html");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
