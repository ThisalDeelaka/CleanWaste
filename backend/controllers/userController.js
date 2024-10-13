const { registerUser, loginUser } = require('../services/userService');
const { confirmPickup, getAlternativeTimeSlots } = require('../services/schedulingService');
const { notifyUpcomingPickup } = require('../services/notificationService');

// Register a new user
const registerUserController = async (req, res) => {
  try {
    const user = await registerUser(req.body);  // Delegates to userService
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login a user
const loginUserController = async (req, res) => {
  try {
    const token = await loginUser(req.body);  // Delegates to userService
    res.json(token);
  } catch (error) {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

// Confirm a pickup request
const confirmPickupForUser = async (req, res) => {
  try {
    const pickup = await confirmPickup(req.user.userId, req.body.wasteType);  // Delegates to schedulingService
    await notifyUpcomingPickup(req.user, pickup.pickupSchedule);  // Notify user
    res.status(201).json(pickup);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get alternative pickup time slots
const getAlternativeSlotsForUser = async (req, res) => {
  try {
    const slots = await getAlternativeTimeSlots(req.user.userId);  // Delegates to schedulingService
    res.json(slots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUserController,
  loginUserController,
  confirmPickupForUser,
  getAlternativeSlotsForUser
};
