const mongoose = require("mongoose");

const socialSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  facebook: {
    type: String,
    required: false,
  },
  x: {
    type: String,
    required: false,
  },
  instagram: {
    type: String,
    required: false,
  },
  linkedin: {
    type: String,
    required: false,
  },
  telegram: {
    type: String,
    required: false,
  },
  github: {
    type: String,
    required: false,
  },
});

const Social = mongoose.model("Social", socialSchema);

module.exports = Social;
