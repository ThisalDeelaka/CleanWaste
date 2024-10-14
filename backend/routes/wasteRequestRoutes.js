// routes/wasteRequestRoutes.js
const express = require("express");
const router = express.Router();
const wasteRequestController = require("../controllers/wasteRequestController");
const authMiddleware = require("../middlewares/authMiddleware");

// Create a waste request (user-specific)
router.post(
  "/create",
  authMiddleware.verifyToken,
  wasteRequestController.createWasteRequest
);

// Assign driver to a waste request (admin-specific)
router.post(
  "/assign-driver",
  authMiddleware.verifyToken,
  authMiddleware.isAdmin,
  wasteRequestController.assignDriver
);

// Get all waste requests (user-specific)
router.get(
  "/all-waste-requests",
  authMiddleware.verifyToken,
  wasteRequestController.getAllWasteRequests
);

// Mark waste as picked up (driver-specific)
router.post(
  "/mark-picked-up",
  authMiddleware.verifyToken,
  authMiddleware.isDriver,
  wasteRequestController.markAsPickedUp // Ensure this is the correct controller method
);

// Get waste requests for a specific user
router.get("/user/:userId", wasteRequestController.getUserWasteRequests);

module.exports = router;
