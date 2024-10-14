const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Create a event (user-specific)
router.post('/createEvent', eventController.createEvent);

// get user events
router.get('/getEvents', eventController.getEvents);

module.exports = router;