// services/adminService.js
const User = require('../models/User');
const bcrypt = require('bcrypt');

const registerDriver = async (driverData) => {
  const hashedPassword = await bcrypt.hash(driverData.password, 10);
  const driver = new User({
    name: driverData.name,
    email: driverData.email,
    password: hashedPassword,
    role: 'driver',  // Automatically set the role to "driver"
    address: driverData.address
  });
  await driver.save();
  return driver;
};

module.exports = {
  registerDriver
};
