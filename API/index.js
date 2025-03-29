const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const os = require("os");
const connectDB = require('.Comps/db');
require('dotenv').config();
connectDB();

dotenv.config();
const app = express();
const port = process.env.PORT || 7000;

app.use(express.json()); // Parse JSON bodies


// Secret for JWT
const JWT_SECRET = process.env.JWT_SECRET || "mysecretkey";

// Health check
app.get("/api", (req, res) => res.send("API is working"));
app.get("/api/health", (req, res) =>
  res.status(200).json({ message: "API is healthy" })
);
app.get("/api/stats", (req, res) => {
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMem = totalMem - freeMem;

  const cpuLoad = os.loadavg(); // [1min, 5min, 15min]
  const cpus = os.cpus();

  res.json({
    uptime: os.uptime(), // seconds
    platform: os.platform(),
    arch: os.arch(),
    cpu: {
      cores: cpus.length,
      model: cpus[0].model,
      speed: cpus[0].speed, // MHz
      loadavg: cpuLoad,
    },
    memory: {
      total: (totalMem / 1024 ** 3).toFixed(2) + " GB",
      used: (usedMem / 1024 ** 3).toFixed(2) + " GB",
      free: (freeMem / 1024 ** 3).toFixed(2) + " GB",
    },
  });
});



app.listen(port, () => {
  console.log(`API is running on port ${port}`);
});
