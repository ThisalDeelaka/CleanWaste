const express = require('express');
const {
  createWasteTypeController,
  getWasteGuidelinesController
} = require('../controllers/wasteController');  // Import waste controller functions

const router = express.Router();

// Create a new waste type (admin-protected route)
router.post('/create', createWasteTypeController);

// Get sorting guidelines for a specific waste type (public route)
router.get('/guidelines/:type', getWasteGuidelinesController);

module.exports = router;
