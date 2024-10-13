const { loginAdmin } = require('../services/adminService');
const { assignUserPickupSchedule, assignRouteToDriver } = require('../services/adminService');

// Admin login
const loginAdminController = async (req, res) => {
  try {
    const token = await loginAdmin(req.body);  // Delegates to adminService
    res.json({ token });
  } catch (error) {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

// Assign pickup schedule to a user
const assignPickupScheduleController = async (req, res) => {
  try {
    const user = await assignUserPickupSchedule(req.body.userId, req.body.schedule);  // Delegates to adminService
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Assign route to a driver
const assignDriverRouteController = async (req, res) => {
  try {
    const driver = await assignRouteToDriver(req.body.driverId, req.body.route);  // Delegates to adminService
    res.json(driver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  loginAdminController,
  assignPickupScheduleController,
  assignDriverRouteController
};
