// routes/driverRoutes.js
const express = require("express");
const router = express.Router();
const driverController = require("../controllers/driverController");
const authMiddleware = require("../middlewares/authMiddleware");

// Get assigned pickups for a driver (driver-specific)
router.get(
  "/assigned-pickups",
  authMiddleware.verifyToken,
  authMiddleware.isDriver,
  driverController.getAssignedPickups
);

// Get waste requests for a street assigned to the driver
router.get(
  "/pickup-requests",
  authMiddleware.verifyToken,
  authMiddleware.isDriver,
  driverController.getWasteRequestsByAssignedStreet
);

// Assign a pickup task to a driver (admin only)
router.post(
  "/assign-pickup",
  authMiddleware.verifyToken,
  authMiddleware.isAdmin,
  driverController.assignPickupToDriver
);

module.exports = router;
