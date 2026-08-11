const express = require("express");
const router = express.Router();

const Project = require("../models/Project");
const Certificate = require("../models/Certificate");
const AboutStat = require("../models/AboutStat");
const Gallery = require("../models/Gallery");

router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    const certificates = await Certificate.find();
    const aboutStats = await AboutStat.find();
    const galleryImages = await Gallery.find();

    res.json({
      projects,
      certificates,
      aboutStats,
      galleryImages
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

module.exports = router;