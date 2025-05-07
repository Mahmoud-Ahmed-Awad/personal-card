const express = require("express");
const userController = require("../controllers/user");
const userMiddlewares = require("../middlewares/user");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/avatars");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname +
        "-" +
        req.user.id +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

const router = express.Router();

// register user
router.post(
  "/register",
  userMiddlewares.NotLoggedIn,
  userController.registerUser
);
// login user
router.post("/login", userMiddlewares.NotLoggedIn, userController.loginUser);
// get profile
router.get(
  "/profile",
  userMiddlewares.isLoggedIn,
  userMiddlewares.isEmailVerified,
  userController.profile
);
// logout user
router.delete("/logout", userMiddlewares.isLoggedIn, userController.logoutUser);
// verify email
router.get("/verify-email/:token", userController.verifyEmail);
// send verification email
router.get(
  "/send-verification-email",
  userMiddlewares.isLoggedIn,
  userController.sendVerificationEmail
);
// update user name
router.put(
  "/update-user-name",
  userMiddlewares.isLoggedIn,
  userController.updateUserName
);
// update user avatar
router.put(
  "/update-user-avatar",
  userMiddlewares.isLoggedIn,
  upload.single("avatar"),
  userController.updateUserAvatar
);
// delete user
router.delete(
  "/delete-user",
  userMiddlewares.isLoggedIn,
  userController.deleteUser
);
// delete user avatar
router.delete(
  "/delete-user-avatar",
  userMiddlewares.isLoggedIn,
  userController.deleteUserAvatar
);
// get all users
router.get(
  "/get-all-users",
  userMiddlewares.isLoggedIn,
  userController.getAllUsers
);
// search for user
router.get(
  "/search-for-user/:search",
  userMiddlewares.isLoggedIn,
  userController.searchForUser
);
// reset password email sender
router.post(
  "/reset-password-email-sender",
  userMiddlewares.NotLoggedIn,
  userController.resetPasswordEmailSender
);
// validate reset password token
router.get(
  "/validate-reset-password-token/:token",
  userMiddlewares.NotLoggedIn,
  userController.validateResetPasswordToken
);
// reset password
router.put(
  "/reset-password/:token",
  userMiddlewares.NotLoggedIn,
  userController.resetPassword
);
// update user password
router.put(
  "/update-user-password",
  userMiddlewares.isLoggedIn,
  userController.updateUserPassword
);
// update user social
router.put(
  "/update-user-social",
  userMiddlewares.isLoggedIn,
  userMiddlewares.isEmailVerified,
  userController.updateUserSocial
);
// update user bio
router.put(
  "/update-user-bio",
  userMiddlewares.isLoggedIn,
  userMiddlewares.isEmailVerified,
  userController.updateUserBio
);
// get user by id
router.get("/user/:id", userController.getUserById);

module.exports = router;
