// controllers/driverController.js
const driverService = require('../services/driverService');
const userService = require('../services/userService'); // Assuming you have userService to fetch users
const notificationService = require('../services/notificationService');

const getAssignedPickups = async (req, res) => {
  try {
    const driverId = req.user.userId;  // Extracted from JWT
    const pickups = await driverService.getAssignedPickups(driverId);
    res.json(pickups);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const assignPickupToDriver = async (req, res) => {
  try {
    const { driverId, street, pickupDate } = req.body;

    // Use the driverService to assign the task to the driver
    const assignment = await driverService.assignPickupToDriver(driverId, street, pickupDate);

    // Notify the driver
    const driverMessage = `You have been assigned a new task for ${street} on ${new Date(pickupDate).toLocaleDateString()}.`;
    await notificationService.notifyUser(driverId, driverMessage);

    // Notify all users on the street
    const usersOnStreet = await userService.findUsersByStreet(street); // Assuming this function exists
    const userMessage = `Your pickup driver is coming to ${street} on ${new Date(pickupDate).toLocaleDateString()}.`;
    for (const user of usersOnStreet) {
      await notificationService.notifyUser(user._id, userMessage);
    }

    res.status(201).json({ message: "Pickup task assigned successfully, notifications sent.", assignment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAssignedPickups,
  assignPickupToDriver
};
