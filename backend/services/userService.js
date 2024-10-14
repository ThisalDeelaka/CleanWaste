// services/userService.js
const User = require('../models/User');

const registerUser = async (userData) => {
  const user = new User(userData);
  await user.save();
  return user;
};

const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const findUserById = async (userId) => {
  return await User.findById(userId).populate('wasteRequests');
};

const findUsersByRole = async (role) => {
  return await User.find({ role });  // Fetches users with the specified role
};

// New function to find users by street
const findUsersByStreet = async (street) => {
  return await User.find({ 'address.street': street });
};

module.exports = {
  registerUser,
  findUserByEmail,
  findUserById,
  findUsersByRole,
  findUsersByStreet // Export the new function
};
