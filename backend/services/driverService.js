// services/driverService.js
const WasteRequest = require('../models/WasteRequest');

const getAssignedPickups = async (driverId) => {
  return await WasteRequest.find({ assignedDriver: driverId, status: 'assigned' });
};

module.exports = {
  getAssignedPickups
};
