const mongoose = require("mongoose");
const validate = require("mongoose-validator");
const mongooseValidator = require("mongoose-validator");

// Validations

// Name should be between 1 and 50 characters
// Name should contain only letters
const nameValidation = [
  mongooseValidator({
    validator: "isLength",
    arguments: [1, 50],
    message: "Name should be between {ARGS[0]} and {ARGS[1]} characters",
  }),
  mongooseValidator({
    validator: "isAlpha",
    message: "Name should contain only letters",
  }),
];

// Email should be valid
const emailValidation = [
  mongooseValidator({
    validator: "isEmail",
    message: "Email should be valid",
  }),
];

const UserSchema = new mongoose.Schema({
  avatar: {
    type: String,
    required: false,
    default: "default.jpg",
  },
  firstName: {
    type: String,
    required: true,
    validate: nameValidation,
  },
  lastName: {
    type: String,
    required: true,
    validate: nameValidation,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: emailValidation,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  emailVerificationCode: {
    type: String,
    required: false,
  },
  emailVerificationCodeExpiresAt: {
    type: Date,
    required: false,
  },
  emailVerificationCodeSentAt: {
    type: Date,
    required: false,
  },
  resetPasswordCode: {
    type: String,
    required: false,
  },
  resetPasswordCodeExpiresAt: {
    type: Date,
    required: false,
  },
  devices: {
    // type: [mongoose.Schema.Types.ObjectId],
    // ref: "Device",
    type: [Object],
    required: false,
    default: [],
  },
  bio: {
    type: String,
    required: false,
    default: "",
  },
  socialMedia: {
    type: mongoose.Schema.ObjectId,
    ref: "Social",
    required: false,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
