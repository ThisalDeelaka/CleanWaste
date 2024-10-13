const express = require('express');
const {
  registerUserController,
  loginUserController,
  confirmPickupForUser,
  getAlternativeSlotsForUser
} = require('../controllers/userController');  // Import user controller functions

const router = express.Router();

// Register a new user
router.post('/register', registerUserController);

// Login a user
router.post('/login', loginUserController);

// Confirm a pickup request (requires authentication middleware)
router.post('/pickup/confirm', confirmPickupForUser);

// Get alternative pickup time slots (requires authentication middleware)
router.get('/pickup/alternative-slots', getAlternativeSlotsForUser);

module.exports = router;
