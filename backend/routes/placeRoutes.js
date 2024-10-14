// routes/placeRoutes.js
const express = require('express');
const placeController = require('../controllers/placeController');

const router = express.Router();

// Add a new place (Admin adds)
router.post('/addPlace', placeController.addPlace);

// Get all places (Collector views the list)
router.get('/places', placeController.getAllPlaces);

// Mark a place as collected
router.post('/collect/:placeId', placeController.markAsCollected);

// Report bin overflow
router.post('/overflow/:placeId', placeController.reportOverflow);

module.exports = router;
