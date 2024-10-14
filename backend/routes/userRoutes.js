// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// User registration
router.post('/register', userController.register);

// User login
router.post('/login', userController.login);

// Get user profile (requires authentication)
router.get('/profile', authMiddleware.verifyToken, userController.getUserProfile);

// Get all drivers (admin only)
router.get('/drivers', authMiddleware.verifyToken, authMiddleware.isAdmin, userController.getAllDrivers);

module.exports = router;
