const express = require("express");
const axios = require("axios");

const router = express.Router();

const Certificate = require("../models/Certificate");

// ==========================================
// GET ALL CERTIFICATES
// ==========================================

router.get("/", async (req, res) => {
  try {
    const certificates = await Certificate.find();

    res.json(certificates);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message
    });
  }
});

// ==========================================
// GET GOOGLE DRIVE CERTIFICATE IMAGE
// ==========================================

router.get("/image/:id", async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);

    if (!certificate) {
      return res.status(404).json({
        message: "Certificate not found"
      });
    }

    const googleDriveUrl = certificate.image;

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

    // Get image from Google Drive
    const response = await axios.get(
      downloadUrl,
      {
        responseType: "arraybuffer"
      }
    );

    // Tell browser this is an image
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
      "Certificate Google Drive error:",
      err.message
    );

    res.status(500).json({
      message: "Unable to load certificate image"
    });
  }
});

module.exports = router;