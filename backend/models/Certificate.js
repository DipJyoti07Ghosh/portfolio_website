const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
  title: String,
  issuer: String,
  date: String,
  description: String,
  link: String,
  image: String
});

module.exports = mongoose.model("Certificate", certificateSchema);