// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const wasteRequestController = require('../controllers/wasteRequestController');
const authMiddleware = require('../middlewares/authMiddleware');

// Admin view all waste requests on the map
router.get('/all-waste-requests', authMiddleware.verifyToken, authMiddleware.isAdmin, wasteRequestController.getAllWasteRequests);

module.exports = router;
