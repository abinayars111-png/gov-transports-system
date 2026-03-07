require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = require("../config/db");
const Route = require("../models/Route");

async function run() {
  await connectDB();

  const updates = [
    {
      filter: {
        $or: [
          { from: /^Alangulam\s*$/i, to: /^Surandai\s*$/i },
          { routeName: /^Alangulam\s*-\s*Surandai\s*$/i },
        ],
      },
      update: { $set: { busNumber: "105A" } },
      label: "Alangulam → Surandai = 105A",
    },
    {
      filter: {
        $or: [
          { from: /^Surandai\s*$/i, to: /^Alangulam\s*$/i },
          { routeName: /^Surandai\s*-\s*Alangulam\s*$/i },
        ],
      },
      update: { $set: { busNumber: "95B" } },
      label: "Surandai → Alangulam = 95B",
    },
  ];

  for (const u of updates) {
    const result = await Route.updateMany(u.filter, u.update);
    console.log(`${u.label}: matched=${result.matchedCount}, modified=${result.modifiedCount}`);
  }

  await mongoose.disconnect();
}

run().catch(async (err) => {
  console.error("Fix bus numbers failed:", err);
  try {
    await mongoose.disconnect();
  } catch {
    // ignore
  }
  process.exit(1);
});
