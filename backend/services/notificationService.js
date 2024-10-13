// services/notificationService.js
const User = require('../models/User');

const notifyUser = async (userId, message) => {
  const user = await User.findById(userId);
  user.notifications.push({ message });
  await user.save();
};

module.exports = {
  notifyUser
};
