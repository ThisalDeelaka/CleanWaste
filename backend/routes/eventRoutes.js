const mongo = require('mongodb');
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const authMiddleware = require('../middlewares/authMiddleware');

// Create a event (user-specific)
router.post('/create', authMiddleware.verifyToken, eventController.createEvent);

// get user events
router.get('/get', authMiddleware.verifyToken, eventController.getUserEvents);

module.exports = router;