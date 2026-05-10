const User = require("../models/User");

// Get Profile
exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user).select("-password");
  res.json(user);
};

// Update Profile
exports.updateProfile = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user,
    req.body,
    { new: true }
  ).select("-password");

  res.json(user);
};