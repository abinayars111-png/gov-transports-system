require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = require("../config/db");
const Route = require("../models/Route");

async function run() {
  await connectDB();

  const alangulam = await Route.find({
    $or: [
      { from: /Alangulam/i },
      { to: /Alangulam/i },
      { routeName: /Alangulam/i },
      { stops: /Alangulam/i },
    ],
  })
    .select("routeName busNumber from to stops")
    .lean();

  const surandai = await Route.find({
    $or: [
      { from: /Surandai/i },
      { to: /Surandai/i },
      { routeName: /Surandai/i },
      { stops: /Surandai/i },
    ],
  })
    .select("routeName busNumber from to stops")
    .lean();

  console.log("Alangulam matches:", alangulam.length);
  console.log(alangulam);
  console.log("Surandai matches:", surandai.length);
  console.log(surandai);

  await mongoose.disconnect();
}

run().catch(async (err) => {
  console.error("Inspect routes failed:", err);
  try {
    await mongoose.disconnect();
  } catch {
    // ignore
  }
  process.exit(1);
});
