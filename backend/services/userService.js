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

module.exports = {
  registerUser,
  findUserByEmail,
  findUserById
};
