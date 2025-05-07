const {
  verifyToken,
  generateToken,
  saveTokenInCookies,
} = require("../controllers/user");
const User = require("../models/User");

const isLoggedIn = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    const deviceToken = req.cookies.deviceToken;
    if (!deviceToken) {
      return res.status(401).json({ message: "Access denied" });
    }
    const devicePayload = verifyToken(deviceToken);
    if (!devicePayload) {
      res.clearCookie("deviceToken");
      return res.status(401).json({ message: "Access denied" });
    }
    req.user = await User.findById(devicePayload.id);
    if (!req.user) {
      res.clearCookie("deviceToken");
      return res.status(401).json({ message: "Access denied" });
    }
    const token = generateToken(req.user);
    await saveTokenInCookies(res, token);
    next();
  }

  const payload = verifyToken(token);
  if (!payload) {
    res.clearCookie("token");
    res.clearCookie("deviceToken");
    return res.status(401).json({ message: "Access denied" });
  }

  const user = await User.findById(payload.id);
  if (!user) {
    res.clearCookie("token");
    res.clearCookie("deviceToken");
    return res.status(401).json({ message: "Access denied" });
  }

  req.user = user;
  next();
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
