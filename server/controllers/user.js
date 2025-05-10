// import required modules
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
// import user model
const User = require("../models/User");
const Social = require("../models/Social");

// This function checks if a user already exists in the database
const userExists = async (email) => {
  const user = await User.findOne({ email });
  if (user) {
    return true;
  }
  return false;
};

// This function generates a JWT token for the user
const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

// This function verifies the JWT token
const verifyToken = (token) => {
  if (!token) {
    return false;
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (!payload) {
      return false;
    }
    return payload;
  } catch (error) {
    return false;
  }
};

// This function saves the token in cookies
const saveTokenInCookies = async (res, token) => {
  await res.cookie("token", token, {
    maxAge: 60 * 60 * 1000, // 1 hour
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
};

// Function to register a new user
const registerUser = async (req, res) => {
  // Destructure request body
  const {
    username,
    firstName,
    lastName,
    birthDate,
    email,
    password,
    confirmPassword,
  } = req.body;

  // Validate request body
  if (
    !username ||
    !firstName ||
    !lastName ||
    !birthDate ||
    !email ||
    !password ||
    !confirmPassword
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (password.length < 8 || password.length > 20) {
    return res
      .status(400)
      .json({ message: "Password must be between 8 and 20 characters" });
  }

  if (password != confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  // Check if user already exists
  const userExistsResult = await userExists(email);
  if (userExistsResult) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, +process.env.SALT_ROUNDS);

  // Create new user
  try {
    const socialMedia = new Social();
    const user = new User({
      username,
      firstName,
      lastName,
      birthDate,
      email,
      password: hashedPassword,
    });
    socialMedia.user = user._id;
    await socialMedia.save();
    user.socialMedia = socialMedia._id;
    // Save user to database
    await user.save();

    // Create JWT token
    const token = generateToken(user);

    // Set token in cookie
    await saveTokenInCookies(res, token);
    await saveDeviceToken(req, res, user);
    req.user = user;

    // const { email } = req.user;

    user.emailVerificationCode = crypto.randomBytes(32).toString("hex");
    user.emailVerificationCodeExpiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1 hour
    await user.save();
    const emailToken = user.emailVerificationCode;
    const verificationLink = `${process.env.FRONTEND_URL}/verify-email/${emailToken}`;
    const emailBody = `
    <h1>Verify Your Email</h1>
    <p>Click the link below to verify your email</p>
    <a href="${verificationLink}">Verify Email</a>
  `;
    const emailSubject = "Verify Your Email";
    const emailFrom = process.env.EMAIL_FROM;
    const emailTo = email;
    const emailHtml = emailBody;
    const emailText = emailBody;
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_SECURE, // true for 465, false for other ports
      auth: {
        user: emailFrom,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: emailFrom,
      to: emailTo,
      subject: emailSubject,
      html: emailHtml,
      text: emailText,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .json({ message: "Error sending verification email" });
      } else {
      }
    });

    // Return success response
    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (errors) {
    console.log(errors);

    const errorMessage = errors.errors;
    let message = {};
    for (const error in errorMessage) {
      message[error] = errorMessage[error].message;
    }
    return res.status(500).json({ message: message });
  }
};

// Function to save device token
const saveDeviceToken = async (req, res, user) => {
  const deviceToken = jwt.sign(
    { id: user._id, userAgent: req.headers["user-agent"] },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
  res.cookie("deviceToken", deviceToken, {
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  user.devices.push({
    token: deviceToken,
    userAgent: req.headers["user-agent"],
  });
  await user.save();
};

// Function to Login To Exists user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (await userExists(email)) {
    const user = await User.findOne({ email: email });
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = generateToken(user);
      await saveTokenInCookies(res, token);
      await saveDeviceToken(req, res, user);
      return res.status(200).json({ message: "Logged in successfully", user });
    }
  }
  return res.status(401).json({ message: "Email Or Password Is Incorrect" });
};

// Function to logout user
const logoutUser = async (req, res) => {
  const user = await User.findById(req.user._id);
  user.devices = user.devices.filter(
    (device) => device.token !== req.cookies.deviceToken
  );
  await user.save();
  res.clearCookie("token");
  res.clearCookie("deviceToken");
  res.status(200).json({ message: "Logged out successfully" });
};

// Function to get user profile
const profile = (req, res) => {
  let avatar;
  if (
    fs.existsSync(path.join(__dirname, "../uploads/avatars", req.user.avatar))
  ) {
    avatar = req.user.avatar;
  } else {
    avatar = "default.jpg";
    fs.copyFileSync(
      path.join(__dirname, "../uploads/avatars", "default.jpg"),
      path.join(__dirname, "../uploads/avatars", req.user.avatar)
    );
  }
  return res.status(200).json({
    user: {
      id: req.user._id,
      username: req.user.username,
      avatar: `${req.protocol}://${req.get("host")}/uploads/avatars/${avatar}`,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      isEmailVerified: req.user.isEmailVerified,
      birthDate: req.user.birthDate,
      createdAt: req.user.createdAt,
      updatedAt: req.user.updatedAt,
      devices: req.user.devices.map((device) => ({
        // token: device.token,
        userAgent: device.userAgent.slice(13, 23),
      })),
      socialMedia: req.user.socialMedia,
      bio: req.user.bio,
    },
  });
};

// Function to get user by id
const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).select(
    "_id username avatar firstName lastName birthDate socialMedia bio"
  );
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  let avatar;
  if (fs.existsSync(path.join(__dirname, "../uploads/avatars", user.avatar))) {
    avatar = user.avatar;
  } else {
    avatar = "default.jpg";
    fs.copyFileSync(
      path.join(__dirname, "../uploads/avatars", "default.jpg"),
      path.join(__dirname, "../uploads/avatars", user.avatar)
    );
  }
  user.avatar = `${req.protocol}://${req.get(
    "host"
  )}/uploads/avatars/${avatar}`;
  user.socialMedia = await Social.findById(user.socialMedia);
  return res.status(200).json({
    user: user,
  });
};

// Function to update user bio
const updateUserBio = async (req, res) => {
  const { bio } = req.body;
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  user.bio = bio;
  await user.save();
  return res.status(200).json({ message: "Bio updated successfully" });
};

// Function to update user social
const updateUserSocial = async (req, res) => {
  const { facebook, x, instagram, linkedin, gmail, github } = req.body || {
    facebook: req.user.social.facebook,
    x: req.user.social.x,
    instagram: req.user.social.instagram,
    linkedin: req.user.social.linkedin,
    gmail: req.user.social.gmail,
    github: req.user.social.github,
  };
  const user = await User.findById(req.user._id);
  const social = await Social.findById(user.socialMedia);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  social.facebook = facebook;
  social.x = x;
  social.instagram = instagram;
  social.linkedin = linkedin;
  social.gmail = gmail;
  social.github = github;
  await social.save();
  return res.status(200).json({ message: "Social updated successfully" });
};

// Function to verify email
const verifyEmail = async (req, res) => {
  const { token } = req.params;
  const user = await User.findOne({ emailVerificationCode: token });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  if (user.isEmailVerified) {
    return res.status(400).json({ message: "Email already verified" });
  }
  if (!user.emailVerificationCode) {
    return res.status(400).json({ message: "Verification code not found" });
  }
  if (user.emailVerificationCodeExpiresAt < Date.now()) {
    return res.status(400).json({ message: "Verification code expired" });
  }
  user.emailVerificationCode = null;
  user.emailVerificationCodeExpiresAt = null;
  user.isEmailVerified = true;
  await user.save();
  res.json({ message: "Email verified successfully" });
};

// Function to send verification email
const sendVerificationEmail = async (req, res) => {
  const { email } = req.user;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  if (user.isEmailVerified) {
    return res.status(400).json({ message: "Email already verified" });
  }
  user.emailVerificationCode = crypto.randomBytes(32).toString("hex");
  user.emailVerificationCodeExpiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1 hour
  await user.save();
  const token = user.emailVerificationCode;
  const verificationLink = `${process.env.FRONTEND_URL}/verify-email/${token}`;
  const emailBody = `
    <h1>Verify Your Email</h1>
    <p>Click the link below to verify your email</p>
    <a href="${verificationLink}">Verify Email</a>
  `;
  const emailSubject = "Verify Your Email";
  const emailFrom = process.env.EMAIL_FROM;
  const emailTo = email;
  const emailHtml = emailBody;
  const emailText = emailBody;
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    auth: {
      user: emailFrom,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: emailFrom,
    to: emailTo,
    subject: emailSubject,
    html: emailHtml,
    text: emailText,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Error sending verification email" });
    } else {
      return res.status(200).json({ message: "Verification email sent" });
    }
  });
};

// Function to update user
const updateUserName = async (req, res) => {
  const { firstName, lastName } = req.body;
  if (!firstName && !lastName) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const user = await User.findByIdAndUpdate(req.user._id, {
    firstName,
    lastName,
  });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json({ message: "User updated successfully", user });
};

const updateUserAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No avatar file uploaded" });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If user already has an avatar, delete the old one
    if (user.avatar != "default.jpg") {
      const oldAvatarPath = path.join(
        __dirname,
        "../uploads/avatars",
        user.avatar
      );
      if (fs.existsSync(oldAvatarPath)) {
        fs.unlinkSync(oldAvatarPath);
      }
    }

    // Update user with new avatar filename
    user.avatar = req.file.filename;
    await user.save();

    res.status(200).json({
      message: "Avatar updated successfully",
      avatar: `${req.protocol}://${req.get("host")}/uploads/avatars/${
        user.avatar
      }`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating avatar" });
  }
};

const renewToken = async (req, res) => {
  const token = generateToken(req.user);
  await saveTokenInCookies(res, token);
  return res.status(200).json({ message: "Token renewed successfully" });
};

// Function to delete user
const deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.user._id);
  res.status(200).json({ message: "User deleted successfully" });
};

// Function to delete user avatar
const deleteUserAvatar = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  if (user.avatar != "default.jpg") {
    const oldAvatarPath = path.join(
      __dirname,
      "../uploads/avatars",
      user.avatar
    );
    if (fs.existsSync(oldAvatarPath)) {
      fs.unlinkSync(oldAvatarPath);
    }
    user.avatar = "default.jpg";
    await user.save();
    return res.status(200).json({ message: "Avatar deleted successfully" });
  } else {
    return res.status(400).json({ message: "No User Avatar To Delete" });
  }
};

// Function to get all users
const getAllUsers = async (req, res) => {
  const users = await User.find();
  return res.status(200).json({ users });
};

// Function to search for a user
const searchForUser = async (req, res) => {
  const { search } = req.query;
  const users = await User.find({ $text: { $search: search } });
  if (!users) {
    return res.status(404).json({ message: "No users found" });
  }
  return res.status(200).json({ users });
};

// Function to reset password
const resetPasswordEmailSender = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  user.resetPasswordCode = crypto.randomBytes(32).toString("hex");
  user.resetPasswordCodeExpiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1 hour
  await user.save();
  const token = user.resetPasswordCode;
  const resetPasswordLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;
  const emailBody = `
    <h1>Reset Your Password</h1>
    <p>Click the link below to reset your password</p>
    <a href="${resetPasswordLink}">Reset Password</a>
  `;
  const emailSubject = "Reset Your Password";
  const emailFrom = process.env.EMAIL_FROM;
  const emailTo = email;
  const emailHtml = emailBody;
  const emailText = emailBody;
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    auth: {
      user: emailFrom,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: emailFrom,
    to: emailTo,
    subject: emailSubject,
    html: emailHtml,
    text: emailText,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    }
  });
  return res.status(200).json({ message: "Reset password email sent" });
};

// Function to validate reset password token
const validateResetPasswordToken = async (req, res) => {
  const { token } = req.params;
  const user = await User.findOne({ resetPasswordCode: token });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  if (user.resetPasswordCodeExpiresAt < Date.now()) {
    return res.status(400).json({ message: "Reset password code expired" });
  }
  return res.status(200).json({ message: "Reset password code is valid" });
};

// Function to reset password
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const user = await User.findOne({ resetPasswordCode: token });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  if (user.resetPasswordCodeExpiresAt < Date.now()) {
    return res.status(400).json({ message: "Reset password code expired" });
  }
  const { password } = req.body;
  user.password = await bcrypt.hash(password, +process.env.SALT_ROUNDS);
  await user.save();
  return res.status(200).json({ message: "Password reset successfully" });
};

// Function to update user password
const updateUserPassword = async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;
  const user = await User.findById(req.user._id);
  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Current password is incorrect" });
  }
  if (newPassword != confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }
  if (newPassword.length < 8) {
    return res
      .status(400)
      .json({ message: "Password must be at least 8 characters long" });
  }
  if (currentPassword == newPassword) {
    return res.status(400).json({
      message: "New password cannot be the same as the current password",
    });
  }
  user.password = await bcrypt.hash(newPassword, +process.env.SALT_ROUNDS);
  await user.save();
  return res.status(200).json({ message: "Password updated successfully" });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  verifyToken,
  profile,
  verifyEmail,
  sendVerificationEmail,
  updateUserName,
  updateUserAvatar,
  deleteUserAvatar,
  deleteUser,
  renewToken,
  getAllUsers,
  searchForUser,
  resetPasswordEmailSender,
  resetPassword,
  validateResetPasswordToken,
  generateToken,
  updateUserPassword,
  saveTokenInCookies,
  getUserById,
  updateUserSocial,
  updateUserBio,
};
