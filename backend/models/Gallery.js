const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: ""
  }
});

module.exports = mongoose.model("Gallery", gallerySchema);