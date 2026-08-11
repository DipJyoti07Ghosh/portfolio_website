const express = require("express");
const axios = require("axios");

const router = express.Router();

const Project = require("../models/Project");

// ==========================================
// GET ALL PROJECTS
// ==========================================

router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();

    res.json(projects);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message
    });
  }
});

// ==========================================
// GET GOOGLE DRIVE PROJECT IMAGE
// ==========================================

router.get("/image/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found"
      });
    }

    const googleDriveUrl = project.image;

    if (!googleDriveUrl) {
      return res.status(404).json({
        message: "Google Drive URL not found"
      });
    }

    // Extract Google Drive FILE ID
    const match = googleDriveUrl.match(
      /\/file\/d\/([^/]+)/
    );

    if (!match) {
      return res.status(400).json({
        message: "Invalid Google Drive URL"
      });
    }

    const fileId = match[1];

    // Google Drive download URL
    const downloadUrl =
      `https://drive.usercontent.google.com/download?id=${fileId}&export=download&confirm=t`;

    // Download image
    const response = await axios.get(
      downloadUrl,
      {
        responseType: "arraybuffer"
      }
    );

    // Send image to browser
    res.set(
      "Content-Type",
      response.headers["content-type"] || "image/jpeg"
    );

    res.set(
      "Cache-Control",
      "public, max-age=86400"
    );

    res.send(response.data);

  } catch (err) {
    console.error(
      "Project Google Drive error:",
      err.message
    );

    res.status(500).json({
      message: "Unable to load project image"
    });
  }
});

module.exports = router;