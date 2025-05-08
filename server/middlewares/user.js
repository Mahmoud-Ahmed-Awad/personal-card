const {
  verifyToken,
  generateToken,
  saveTokenInCookies,
} = require("../controllers/user");
const User = require("../models/User");

const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const deviceToken = req.cookies.deviceToken;

    if (!deviceToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (!token) {
      const decoded = verifyToken(deviceToken);

      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const token = generateToken(user._id);
      saveTokenInCookies(res, token);
      req.user = user;
      next();
    }
    const decoded = verifyToken(token);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

const NotLoggedIn = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    return res.status(403).json({ message: "You are already logged in" });
  }
  next();
};

const isEmailVerified = async (req, res, next) => {
  if (!req.user.isEmailVerified) {
    return res.status(401).json({
      message: "Email not verified",
      user: {
        id: req.user._id,
        username: req.user.username,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        isEmailVerified: req.user.isEmailVerified,
        avatar: `${req.protocol}://${req.get("host")}/uploads/avatars/${
          req.user.avatar
        }`,
      },
    });
  }
  next();
};

module.exports = {
  isLoggedIn,
  NotLoggedIn,
  isEmailVerified,
};
