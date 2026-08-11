const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const portfolioRoutes = require("./routes/portfolioRoutes");
const certificateRoutes = require("./routes/certificateRoutes");
const aboutStatsRoutes = require("./routes/aboutStatsRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const projectRoutes = require("./routes/projectRoutes");
const resumeRoutes = require("./routes/resumeRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// ==========================================
// MONGODB
// ==========================================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    console.log(
      "Database:",
      mongoose.connection.db.databaseName
    );
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// ==========================================
// ROOT
// ==========================================

app.get("/", (req, res) => {
  res.send("Portfolio Backend Running");
});

// ==========================================
// API ROUTES
// ==========================================

app.use("/api/portfolio", portfolioRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/about-stats", aboutStatsRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/resume", resumeRoutes);

// ==========================================
// SERVER
// ==========================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});