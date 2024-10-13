const User = require('../models/User');
const Driver = require('../models/Driver');

// Assign a pickup schedule to a user
const assignUserPickupSchedule = async (userId, schedule) => {
  const user = await User.findById(userId);
  
  if (!user) {
    throw new Error('User not found');
  }

  user.pickupSchedule = schedule;
  await user.save();
  
  return user;
};

// Assign a route to a driver
const assignRouteToDriver = async (driverId, pickupId) => {
  const driver = await Driver.findById(driverId);
  
  if (!driver) {
    throw new Error('Driver not found');
  }

  driver.assignedRoutes.push(pickupId);
  await driver.save();

  return driver;
};

module.exports = {
  assignUserPickupSchedule,
  assignRouteToDriver
};
