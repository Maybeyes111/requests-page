// server.js
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

// Variabel penyimpanan
let totalRequests = 0;
let startTime = Date.now();

// Middleware hitung request
app.use((req, res, next) => {
  totalRequests++;
  next();
});

// Endpoint untuk ambil data
app.get("/stats", (req, res) => {
  const elapsedSeconds = (Date.now() - startTime) / 1000;
  const avgPerSecond = (totalRequests / elapsedSeconds).toFixed(2);

  res.json({
    total_requests: totalRequests,
    avg_per_second: avgPerSecond,
    uptime_seconds: Math.floor(elapsedSeconds),
  });
});

// Root route
app.get("/", (req, res) => {
  res.send("Request counter API is running 🚀");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
