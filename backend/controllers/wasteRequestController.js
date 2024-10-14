// controllers/wasteRequestController.js

const wasteRequestService = require('../services/wasteRequestService');

// Helper function to generate a unique waste code
const generateWasteCode = () => {
  const randomString = Math.random().toString(36).substring(2, 8).toUpperCase();
  const timestamp = Date.now().toString().slice(-6); // Take last 6 digits of timestamp
  return `WASTE-${randomString}-${timestamp}`;
};

const createWasteRequest = async (req, res) => {
  try {
    const { wasteType, location, userId } = req.body;

    if (!location || !location.latitude || !location.longitude) {
      return res.status(400).json({ message: 'Location is required and must include latitude and longitude.' });
    }

    const wasteCode = generateWasteCode(); // Generate a unique waste code
    const wasteRequest = await wasteRequestService.createWasteRequest({ 
      wasteType, 
      location, 
      user: userId, 
      wasteCode, 
      status: 'pending' 
    });

    res.status(201).json(wasteRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const assignDriver = async (req, res) => {
  try {
    const { requestId, driverId } = req.body;
    const updatedRequest = await wasteRequestService.assignDriverToWasteRequest(requestId, driverId);
    res.json(updatedRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const markAsPickedUp = async (req, res) => {
  try {
    const { requestId } = req.body;
    const updatedRequest = await wasteRequestService.markWasteAsPickedUp(requestId);
    res.json(updatedRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllWasteRequests = async (req, res) => {
  try {
    const wasteRequests = await wasteRequestService.getAllWasteRequests(); 
    res.json(wasteRequests);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createWasteRequest,
  assignDriver,
  markAsPickedUp,
  getAllWasteRequests
};
