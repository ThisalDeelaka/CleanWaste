const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

router.post('/createEvent', eventController.createEvent);
router.get('/getEvents', eventController.getEventsbyUser);
router.get('/getEventbyId/:eventId', eventController.getEventbyId);
router.get('/getAllUsers', eventController.getAllUsers);
router.get('/getUsersbyId', eventController.getUsersbyId);

module.exports = router;