const express = require('express');
const {
  loginAdminController,
  assignPickupScheduleController,
  assignDriverRouteController
} = require('../controllers/adminController');  // Import admin controller functions

const router = express.Router();

// Admin login
router.post('/login', loginAdminController);

// Assign pickup schedule to a user (requires admin authentication)
router.post('/assign-pickup-schedule', assignPickupScheduleController);

// Assign a route to a driver (requires admin authentication)
router.post('/assign-driver-route', assignDriverRouteController);

module.exports = router;
