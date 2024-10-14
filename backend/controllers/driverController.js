// controllers/driverController.js
const driverService = require('../services/driverService');

const getAssignedPickups = async (req, res) => {
  try {
    const driverId = req.user.userId;  // Extracted from JWT
    const pickups = await driverService.getAssignedPickups(driverId);
    res.json(pickups);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAssignedPickups
};
