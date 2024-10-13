const express = require("express");
const {
  loginDriverController,
  signupDriverController,
  getDriverRoutesController,
  completePickupForDriver,
} = require("../controllers/driverController");

const router = express.Router();

// Driver signup
router.post("/signup", signupDriverController); // Route for signup

// Driver login
router.post("/login", loginDriverController); // Route for login

// Get assigned routes
router.get("/routes", getDriverRoutesController);

// Complete a pickup
router.post("/complete-pickup", completePickupForDriver);

module.exports = router;
