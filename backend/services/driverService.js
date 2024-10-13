const Driver = require('../models/Driver');
const Pickup = require('../models/Pickup');

// Get assigned routes for a driver
const getAssignedRoutes = async (driverId) => {
  const driver = await Driver.findById(driverId).populate('assignedRoutes');

  if (!driver) {
    throw new Error('Driver not found');
  }

  return driver.assignedRoutes;
};

// Mark a pickup as complete by updating the status of the pickup
const completePickup = async (pickupId, wasteCode) => {
  const pickup = await Pickup.findById(pickupId);
  
  if (!pickup) {
    throw new Error('Pickup not found');
  }

  // Validate the waste code
  if (pickup.wasteCode !== wasteCode) {
    throw new Error('Invalid waste code');
  }

  // Mark pickup as complete
  pickup.status = 'Picked Up';
  await pickup.save();
  
  return pickup;
};

module.exports = {
  getAssignedRoutes,
  completePickup
};
