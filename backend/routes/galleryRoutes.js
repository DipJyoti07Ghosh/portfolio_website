const express = require("express");
const axios = require("axios");

const router = express.Router();

const Gallery = require("../models/Gallery");


// ==========================================
// GET ALL GALLERY IMAGES
// ==========================================

router.get("/", async (req, res) => {
  try {

    const images = await Gallery.find();

    res.json(images);

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

    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({
        message: "Gallery image not found"
      });
    }


    const googleDriveUrl = gallery.image;

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


    // Tell browser that this is an image

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
      "Gallery Google Drive error:",
      err.message
    );

    res.status(500).json({
      message: "Unable to load gallery image"
    });

  }

});


module.exports = router;