// controllers/driverController.js
const driverService = require("../services/driverService");
const userService = require("../services/userService");
const notificationService = require("../services/notificationService");
const wasteRequestService = require("../services/wasteRequestService"); // New service for waste requests

// Get pickups assigned to a driver
const getAssignedPickups = async (req, res) => {
  try {
    const driverId = req.user.userId; // Extracted from JWT
    const pickups = await driverService.getAssignedPickups(driverId);
    res.json(pickups);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get waste requests for the driver's assigned street
// Get waste requests for the driver's assigned street
const getWasteRequestsByAssignedStreet = async (req, res) => {
  try {
    const { street } = req.query;

    // Check if the street parameter is provided
    if (!street) {
      return res
        .status(400)
        .json({ message: "Street query parameter is required" });
    }

    // Log the received street for debugging
    console.log("Received street: ", street);

    // Fetch waste requests for the street
    const wasteRequests = await wasteRequestService.getWasteRequestsByStreet(
      street
    );

    // If no requests are found, return a 404
    if (!wasteRequests || wasteRequests.length === 0) {
      return res
        .status(404)
        .json({ message: "No waste requests found for this street." });
    }

    res.json(wasteRequests);
  } catch (error) {
    console.error("Error fetching waste requests:", error); // Log the full error
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Assign a pickup task to a driver
const assignPickupToDriver = async (req, res) => {
  try {
    const { driverId, street, pickupDate } = req.body;

    const assignment = await driverService.assignPickupToDriver(
      driverId,
      street,
      pickupDate
    );

    const driverMessage = `You have been assigned a new task for ${street} on ${new Date(
      pickupDate
    ).toLocaleDateString()}.`;
    await notificationService.notifyUser(driverId, driverMessage);

    // Notify all users on the street
    const usersOnStreet = await userService.findUsersByStreet(street);
    const userMessage = `Your pickup driver is coming to ${street} on ${new Date(
      pickupDate
    ).toLocaleDateString()}.`;
    for (const user of usersOnStreet) {
      await notificationService.notifyUser(user._id, userMessage);
    }

    res.status(201).json({
      message: "Pickup task assigned successfully, notifications sent.",
      assignment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAssignedPickups,
  assignPickupToDriver,
  getWasteRequestsByAssignedStreet,
};
