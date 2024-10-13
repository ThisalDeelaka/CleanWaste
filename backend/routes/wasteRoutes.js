const express = require('express');
const {
  createWasteTypeController,
  getWasteGuidelinesController,
  getAllWasteTypesController  // Import the new controller
} = require('../controllers/wasteController');  // Import waste controller functions

const router = express.Router();

// Route to create a new waste type
router.post('/create', createWasteTypeController);

// Route to get sorting guidelines for a waste type
router.get('/guidelines/:type', getWasteGuidelinesController);

// Route to get all waste types
router.get('/waste-types', getAllWasteTypesController);  // New route for fetching all waste types

module.exports = router;
