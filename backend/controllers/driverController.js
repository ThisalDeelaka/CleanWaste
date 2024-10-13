const { loginDriver } = require('../services/driverService');
const { getAssignedRoutes, completePickup } = require('../services/driverService');

// Login driver
const loginDriverController = async (req, res) => {
  try {
    const token = await loginDriver(req.body);  // Delegates to driverService
    res.json({ token });
  } catch (error) {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

// Get assigned routes
const getDriverRoutesController = async (req, res) => {
  try {
    const routes = await getAssignedRoutes(req.driver.driverId);  // Delegates to driverService
    res.json(routes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Complete a pickup
const completePickupForDriver = async (req, res) => {
  try {
    const pickup = await completePickup(req.body.pickupId, req.body.wasteCode);  // Delegates to driverService
    res.json(pickup);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  loginDriverController,
  getDriverRoutesController,
  completePickupForDriver
};
