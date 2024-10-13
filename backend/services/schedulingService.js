const Pickup = require('../models/Pickup');
const User = require('../models/User');

// Assign pickup schedule to user based on their address and street side
const assignPickupSchedule = async (userId, schedule) => {
  const user = await User.findById(userId);
  
  if (!user) {
    throw new Error('User not found');
  }

  // Assign the schedule (e.g., day of the week)
  user.pickupSchedule = schedule;
  await user.save();
  
  return user.pickupSchedule;
};

// Get available alternative time slots for a user based on nearby routes
const getAlternativeTimeSlots = async (userId) => {
  const user = await User.findById(userId);
  
  if (!user) {
    throw new Error('User not found');
  }

  // Example: Fetch alternative slots (this can be implemented in a more complex way)
  const alternativeSlots = [
    { day: 'Monday', time: '8 AM' },
    { day: 'Thursday', time: '3 PM' },
    { day: 'Saturday', time: '9 AM' },
  ];
  
  return alternativeSlots;
};

// Confirm a pickup by setting a unique waste code and QR code for the pickup
const confirmPickup = async (userId, wasteType) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  const pickup = new Pickup({
    user: user._id,
    wasteType: wasteType,
    wasteCode: generateWasteCode(),
    qrCode: generateQRCode(),
    pickupDate: new Date(),  // You can assign a specific date based on the user's schedule
    recyclingCenter: 'Local Recycling Center',  // Example: Assign nearest recycling center
    status: 'Pending'
  });

  await pickup.save();
  return pickup;
};

// Utility functions to generate waste codes and QR codes
const generateWasteCode = () => {
  return 'WC-' + Math.random().toString(36).substr(2, 9).toUpperCase();  // Example: Random string
};

const generateQRCode = () => {
  return 'QR-' + Math.random().toString(36).substr(2, 9).toUpperCase();  // Example: Random string
};

module.exports = {
  assignPickupSchedule,
  getAlternativeTimeSlots,
  confirmPickup
};
