const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  technologies: [String],
  image: String,
  liveDemo: String,
  github: String,
  featured: Boolean
});

module.exports = mongoose.model("Project", projectSchema);