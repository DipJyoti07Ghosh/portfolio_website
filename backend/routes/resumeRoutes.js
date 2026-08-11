const express = require("express");
const router = express.Router();

const Resume = require("../models/Resume");

router.get("/", async (req, res) => {
  try {
    const resume = await Resume.findOne();

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    res.json(resume);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;