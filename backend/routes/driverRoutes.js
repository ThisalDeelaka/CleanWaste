const express = require('express');
const {
  loginDriverController,
  getDriverRoutesController,
  completePickupForDriver
} = require('../controllers/driverController');  // Import driver controller functions

const router = express.Router();

// Driver login
router.post('/login', loginDriverController);

// Get assigned routes (protected route for drivers)
router.get('/routes', getDriverRoutesController);

// Complete a pickup (protected route for drivers)
router.post('/complete-pickup', completePickupForDriver);

module.exports = router;
