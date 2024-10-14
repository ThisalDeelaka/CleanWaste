// services/wasteRequestService.js
const WasteRequest = require("../models/WasteRequest");
const notificationService = require("./notificationService");
const User = require("../models/User"); // Optional for notifications

const getWasteRequestsByStreet = async (street) => {
  try {
    // Find users with the matching street address
    const users = await User.find({ "address.street": street.trim() });

    // Extract user IDs
    const userIds = users.map((user) => user._id);

    // Find waste requests for these users
    const wasteRequests = await WasteRequest.find({ user: { $in: userIds } });

    return wasteRequests;
  } catch (error) {
    console.error("Error in getWasteRequestsByStreet:", error);
    throw new Error("Error fetching waste requests by street");
  }
};

module.exports = {
  getWasteRequestsByStreet,
};

const createWasteRequest = async (requestData) => {
  const wasteRequest = new WasteRequest(requestData);
  await wasteRequest.save();
  return wasteRequest;
};

const assignDriverToWasteRequest = async (requestId, driverId) => {
  const wasteRequest = await WasteRequest.findById(requestId);
  wasteRequest.assignedDriver = driverId;
  wasteRequest.status = "assigned";
  await wasteRequest.save();
  notificationService.notifyUser(
    wasteRequest.user,
    "Your waste request has been assigned to a driver."
  );
  return wasteRequest;
};

const markWasteAsPickedUp = async (requestId) => {
  const wasteRequest = await WasteRequest.findById(requestId);
  wasteRequest.status = "picked-up";
  await wasteRequest.save();
  notificationService.notifyUser(
    wasteRequest.user,
    "Your waste has been picked up."
  );
  return wasteRequest;
};

// New function to get all waste requests for admin
const getAllWasteRequests = async () => {
  return await WasteRequest.find().populate("user assignedDriver"); // Optionally, populate user and driver details
};

const getWasteRequestsByUserId = async (userId) => {
  return await WasteRequest.find({ user: userId }); // Find all waste requests for the given user
};

module.exports = {
  createWasteRequest,
  assignDriverToWasteRequest,
  markWasteAsPickedUp,
  getAllWasteRequests,
  getWasteRequestsByUserId,
  getWasteRequestsByStreet,
};
