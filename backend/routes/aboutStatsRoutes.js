const express = require("express");
const axios = require("axios");

const router = express.Router();

const AboutStat = require("../models/AboutStat");


// ==========================================
// GET ALL ABOUT STATS
// ==========================================

router.get("/", async (req, res) => {
  try {
    const stats = await AboutStat.find();

    res.json(stats);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message
    });
  }
});


// ==========================================
// GET GOOGLE DRIVE IMAGE
// ==========================================

router.get("/image/:id", async (req, res) => {

  try {

    const stat = await AboutStat.findById(req.params.id);

    if (!stat) {
      return res.status(404).json({
        message: "About stat not found"
      });
    }

    const googleDriveUrl = stat.photo;

    if (!googleDriveUrl) {
      return res.status(404).json({
        message: "Image URL not found"
      });
    }


    // Extract Google Drive file ID

    const match = googleDriveUrl.match(
      /\/file\/d\/([^/]+)/
    );

    if (!match) {
      return res.status(400).json({
        message: "Invalid Google Drive URL"
      });
    }

    const fileId = match[1];


    // Google Drive direct download URL

    const downloadUrl =
      `https://drive.usercontent.google.com/download?id=${fileId}&export=download&confirm=t`;


    // Request image from Google Drive

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
      "Google Drive image error:",
      err.message
    );

    res.status(500).json({
      message: "Unable to load image"
    });

  }

});


module.exports = router;