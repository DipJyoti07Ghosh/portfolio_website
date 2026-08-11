const mongoose = require("mongoose");

const aboutStatSchema = new mongoose.Schema({
  label: String,
  value: String,
  subtitle: String,
  photo: String,
  redirectUrl: String
});

module.exports = mongoose.model("AboutStat", aboutStatSchema);