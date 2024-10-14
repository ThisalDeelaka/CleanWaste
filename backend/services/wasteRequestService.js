// services/wasteRequestService.js
const WasteRequest = require('../models/WasteRequest');
const notificationService = require('./notificationService');  // Optional for notifications

const createWasteRequest = async (requestData) => {
  const wasteRequest = new WasteRequest(requestData);
  await wasteRequest.save();
  return wasteRequest;
};

const assignDriverToWasteRequest = async (requestId, driverId) => {
  const wasteRequest = await WasteRequest.findById(requestId);
  wasteRequest.assignedDriver = driverId;
  wasteRequest.status = 'assigned';
  await wasteRequest.save();
  notificationService.notifyUser(wasteRequest.user, 'Your waste request has been assigned to a driver.');
  return wasteRequest;
};

const markWasteAsPickedUp = async (requestId) => {
  const wasteRequest = await WasteRequest.findById(requestId);
  wasteRequest.status = 'picked-up';
  await wasteRequest.save();
  notificationService.notifyUser(wasteRequest.user, 'Your waste has been picked up.');
  return wasteRequest;
};

// New function to get all waste requests for admin
const getAllWasteRequests = async () => {
  return await WasteRequest.find().populate('user assignedDriver');  // Optionally, populate user and driver details
};

const getWasteRequestsByUserId = async (userId) => {
  return await WasteRequest.find({ user: userId }); // Find all waste requests for the given user
};


module.exports = {
  createWasteRequest,
  assignDriverToWasteRequest,
  markWasteAsPickedUp,
  getAllWasteRequests,
  getWasteRequestsByUserId  
};
