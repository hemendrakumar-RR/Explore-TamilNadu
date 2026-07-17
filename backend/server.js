const dns = require("dns");

// Force Cloudflare DNS
dns.setServers(["1.1.1.1", "1.0.0.1"]);
const bookingRoutes = require("./routes/bookingRoutes");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();

connectDB();

app.use(cors({
  origin: "https://explore-tamil-nadu.vercel.app",
  credentials: true
}));app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);

app.get("/", (req, res) => {
  res.send("Explore Tamil Nadu Backend Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});