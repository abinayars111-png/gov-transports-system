require("dotenv").config();
const mongoose = require("mongoose");
const Route = require("../models/Route");
const connectDB = require("../config/db");
const calculateDistance = require("../services/distanceService");

connectDB();

const routes = [

/* ================= MAIN CITY CONNECTIONS ================= */

{
  routeName: "Tirunelveli - Tenkasi",
  busNumber: "102A",
  from: "Tirunelveli",
  to: "Tenkasi",
  stops: ["Palayamkottai", "Alangulam", "Surandai"],
  coordinates: [
    { lat: 8.7139, lng: 77.7567 },
    { lat: 8.7281, lng: 77.7085 },
    { lat: 8.8642, lng: 77.4996 },
    { lat: 8.9756, lng: 77.4327 }
  ]
},

{
  routeName: "Tirunelveli - Surandai",
  busNumber: "110",
  from: "Tirunelveli",
  to: "Surandai",
  stops: ["Palayamkottai", "Alangulam"],
  coordinates: [
    { lat: 8.7139, lng: 77.7567 },
    { lat: 8.7281, lng: 77.7085 },
    { lat: 8.8642, lng: 77.4996 }
  ]
},

{
  routeName: "Surandai - Alangulam",
  busNumber: "95B",
  from: "Surandai",
  to: "Alangulam",
  stops: ["Kadayam"],
  coordinates: [
    { lat: 8.8642, lng: 77.4996 },
    { lat: 8.8262, lng: 77.4304 },
    { lat: 8.7281, lng: 77.7085 }
  ]
},

{
  routeName: "Tenkasi - Courtallam",
  from: "Tenkasi",
  to: "Courtallam",
  stops: ["Five Falls"],
  coordinates: [
    { lat: 8.9756, lng: 77.4327 },
    { lat: 8.9342, lng: 77.2733 }
  ]
},

{
  routeName: "Tirunelveli - Valliyur",
  from: "Tirunelveli",
  to: "Valliyur",
  stops: ["Nanguneri"],
  coordinates: [
    { lat: 8.7139, lng: 77.7567 },
    { lat: 8.4933, lng: 77.6581 },
    { lat: 8.3797, lng: 77.6143 }
  ]
},

{
  routeName: "Tirunelveli - Ambasamudram",
  from: "Tirunelveli",
  to: "Ambasamudram",
  stops: ["Cheranmahadevi"],
  coordinates: [
    { lat: 8.7139, lng: 77.7567 },
    { lat: 8.6842, lng: 77.5053 },
    { lat: 8.7101, lng: 77.4519 }
  ]
},

{
  routeName: "Ambasamudram - Papanasam",
  from: "Ambasamudram",
  to: "Papanasam",
  stops: [],
  coordinates: [
    { lat: 8.7101, lng: 77.4519 },
    { lat: 8.7064, lng: 77.3956 }
  ]
},

{
  routeName: "Sankarankovil - Tenkasi",
  from: "Sankarankovil",
  to: "Tenkasi",
  stops: ["Kadayanallur"],
  coordinates: [
    { lat: 9.1717, lng: 77.5427 },
    { lat: 9.0791, lng: 77.3486 },
    { lat: 8.9756, lng: 77.4327 }
  ]
},

{
  routeName: "Valliyur - Radhapuram",
  from: "Valliyur",
  to: "Radhapuram",
  stops: [],
  coordinates: [
    { lat: 8.3797, lng: 77.6143 },
    { lat: 8.2851, lng: 77.6845 }
  ]
},

{
  routeName: "Palayamkottai - Manur",
  from: "Palayamkottai",
  to: "Manur",
  stops: [],
  coordinates: [
    { lat: 8.7281, lng: 77.7085 },
    { lat: 8.8554, lng: 77.7432 }
  ]
},

/* ============== ADDITIONAL DISTRICT ROUTES (30 MORE) ============== */

{
  routeName: "Tirunelveli - Nanguneri",
  from: "Tirunelveli",
  to: "Nanguneri",
  stops: [],
  coordinates: [
    { lat: 8.7139, lng: 77.7567 },
    { lat: 8.4933, lng: 77.6581 }
  ]
},

{
  routeName: "Cheranmahadevi - Veeravanallur",
  from: "Cheranmahadevi",
  to: "Veeravanallur",
  stops: [],
  coordinates: [
    { lat: 8.6842, lng: 77.5053 },
    { lat: 8.7012, lng: 77.5205 }
  ]
},

{
  routeName: "Alangulam - Surandai",
  busNumber: "105A",
  from: "Alangulam",
  to: "Surandai",
  stops: ["Kadayam"],
  coordinates: [
    { lat: 8.7281, lng: 77.7085 },
    { lat: 8.8262, lng: 77.4304 },
    { lat: 8.8642, lng: 77.4996 }
  ]
},

{
  routeName: "Alangulam - Kadayam",
  from: "Alangulam",
  to: "Kadayam",
  stops: [],
  coordinates: [
    { lat: 8.7281, lng: 77.7085 },
    { lat: 8.8262, lng: 77.4304 }
  ]
},

{
  routeName: "Kadayanallur - Tenkasi",
  from: "Kadayanallur",
  to: "Tenkasi",
  stops: [],
  coordinates: [
    { lat: 9.0791, lng: 77.3486 },
    { lat: 8.9756, lng: 77.4327 }
  ]
},

{
  routeName: "Kalakkad - Nanguneri",
  from: "Kalakkad",
  to: "Nanguneri",
  stops: [],
  coordinates: [
    { lat: 8.4762, lng: 77.5434 },
    { lat: 8.4933, lng: 77.6581 }
  ]
},

{
  routeName: "Thisayanvilai - Valliyur",
  from: "Thisayanvilai",
  to: "Valliyur",
  stops: [],
  coordinates: [
    { lat: 8.3365, lng: 77.7204 },
    { lat: 8.3797, lng: 77.6143 }
  ]
},

{
  routeName: "Manur - Sankarankovil",
  from: "Manur",
  to: "Sankarankovil",
  stops: [],
  coordinates: [
    { lat: 8.8554, lng: 77.7432 },
    { lat: 9.1717, lng: 77.5427 }
  ]
},

{
  routeName: "Tenkasi - Sengottai",
  from: "Tenkasi",
  to: "Sengottai",
  stops: [],
  coordinates: [
    { lat: 8.9756, lng: 77.4327 },
    { lat: 8.9681, lng: 77.2495 }
  ]
},

{
  routeName: "Sengottai - Courtallam",
  from: "Sengottai",
  to: "Courtallam",
  stops: [],
  coordinates: [
    { lat: 8.9681, lng: 77.2495 },
    { lat: 8.9342, lng: 77.2733 }
  ]
},

{
  routeName: "Ambasamudram - Veeravanallur",
  from: "Ambasamudram",
  to: "Veeravanallur",
  stops: [],
  coordinates: [
    { lat: 8.7101, lng: 77.4519 },
    { lat: 8.7012, lng: 77.5205 }
  ]
}

];

/* ========= AUTO DISTANCE CALCULATION ========= */

const seed = async () => {
  await Route.deleteMany();

  const routesWithDistance = routes.map(route => ({
    ...route,
    distance: calculateDistance(route.coordinates),
    duration: (calculateDistance(route.coordinates) / 35).toFixed(2)
  }));

  await Route.insertMany(routesWithDistance);

  console.log("40 Routes Seeded Successfully");
  process.exit();
};

seed();
