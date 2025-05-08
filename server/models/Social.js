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
    default: "",
  },
  x: {
    type: String,
    required: false,
    default: "",
  },
  instagram: {
    type: String,
    required: false,
    default: "",
  },
  linkedin: {
    type: String,
    required: false,
    default: "",
  },
  telegram: {
    type: String,
    required: false,
    default: "",
  },
  github: {
    type: String,
    required: false,
    default: "",
  },
});

const Social = mongoose.model("Social", socialSchema);

module.exports = Social;
