import axios from "axios";

// API endpoint
const api = import.meta.env.VITE_API_URL + "/user";

// Register user
const registerUser = async (
  firstName,
  lastName,
  birthDate,
  username,
  email,
  password,
  confirmPassword
) => {
  try {
    const res = await axios.post(
      api + "/register",
      {
        username,
        firstName,
        lastName,
        birthDate,
        email,
        password,
        confirmPassword,
      },
      { withCredentials: true }
    );
    return res;
  } catch (error) {
    return error.response;
  }
};

// Login user
const loginUser = async (email, password) => {
  try {
    const res = await axios.post(
      api + "/login",
      { email, password },
      { withCredentials: true }
    );
    return res;
  } catch (error) {
    return error.response;
  }
};

// Logout user
const logoutUser = async () => {
  try {
    const res = await axios.delete(api + "/logout", { withCredentials: true });
    return res;
  } catch (error) {
    return error.response;
  }
};

// Get user data
const userData = async () => {
  try {
    const res = await axios.get(api + "/profile", { withCredentials: true });
    return res;
  } catch (error) {
    return error.response;
  }
};

// Send verification email
const sendVerificationEmail = async () => {
  try {
    const res = await axios.get(api + "/send-verification-email", {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    return error.response;
  }
};

// Verify email
const verifyEmail = async (token) => {
  try {
    const res = await axios.get(api + `/verify-email/${token}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    return error.response;
  }
};

// Reset password email sender
const resetPasswordEmailSender = async (email) => {
  try {
    const res = await axios.post(
      api + "/reset-password-email-sender",
      { email },
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    return error.response;
  }
};

// Validate reset password token
const validateResetPasswordToken = async (token) => {
  try {
    const res = await axios.get(
      api + `/validate-reset-password-token/${token}`,
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    return error.response;
  }
};

// Reset password
const resetPassword = async (token, password) => {
  try {
    const res = await axios.put(
      api + `/reset-password/${token}`,
      { password },
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    return error.response;
  }
};

// Search for user
const searchForUser = async (search) => {
  try {
    const res = await axios.get(api + `/search-for-user/${search}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    return error.response;
  }
};

// Get all users
const getAllUsers = async () => {
  try {
    const res = await axios.get(api + "/get-all-users", {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    return error.response;
  }
};

// Update user password
const updateUserPassword = async (
  currentPassword,
  newPassword,
  confirmPassword
) => {
  if (newPassword != confirmPassword) {
    return {
      status: 400,
      message: "Passwords do not match",
    };
  }
  if (newPassword.length < 8) {
    return {
      status: 400,
      message: "Password must be at least 8 characters long",
    };
  }
  if (currentPassword == newPassword) {
    return {
      status: 400,
      message: "New password cannot be the same as the current password",
    };
  }
  try {
    const res = await axios.put(
      api + "/update-user-password",
      {
        currentPassword,
        newPassword,
        confirmPassword,
      },
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    return error.response;
  }
};

// Update user name
const updateUserName = async (firstName, lastName) => {
  try {
    const res = await axios.put(
      api + "/update-user-name",
      { firstName, lastName },
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    return error.response;
  }
};

// Update user avatar
const updateUserAvatar = async (formData) => {
  try {
    const res = await axios.put(api + "/update-user-avatar", formData, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    return error.response;
  }
};

// Delete user
const deleteUser = async () => {
  try {
    const res = await axios.delete(api + "/delete-user", {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    return error.response;
  }
};

// Delete user avatar
const deleteUserAvatar = async () => {
  try {
    const res = await axios.delete(api + "/delete-user-avatar", {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    return error.response;
  }
};

// Update user social links
const updateUserSocialLinks = async (social) => {
  try {
    const res = await axios.put(api + "/update-user-social-links", social, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    return error.response;
  }
};

// get user by id
const getUserById = async (id) => {
  try {
    const res = await axios.get(api + `/user/${id}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    return error.response;
  }
};

// update user bio
const updateUserBio = async (bio) => {
  try {
    const res = await axios.put(api + "/update-user-bio", bio, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    return error.response;
  }
};

// Export functions
export {
  registerUser,
  loginUser,
  logoutUser,
  userData,
  sendVerificationEmail,
  verifyEmail,
  resetPasswordEmailSender,
  validateResetPasswordToken,
  resetPassword,
  searchForUser,
  getAllUsers,
  updateUserPassword,
  updateUserName,
  updateUserAvatar,
  deleteUser,
  deleteUserAvatar,
  updateUserSocialLinks,
  getUserById,
  updateUserBio,
};
