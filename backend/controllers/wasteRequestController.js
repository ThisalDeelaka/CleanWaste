// controllers/wasteRequestController.js
const wasteRequestService = require('../services/wasteRequestService');

const createWasteRequest = async (req, res) => {
  try {
    const { wasteType, location, userId } = req.body;
    const wasteCode = generateWasteCode(); // Helper function to generate unique waste code
    const wasteRequest = await wasteRequestService.createWasteRequest({ 
      wasteType, location, user: userId, wasteCode, status: 'pending' 
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

// New function to fetch all waste requests for admin (e.g., to display on a map)
const getAllWasteRequests = async (req, res) => {
  try {
    const wasteRequests = await wasteRequestService.getAllWasteRequests(); // You'll need to implement this in the service
    res.json(wasteRequests);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createWasteRequest,
  assignDriver,
  markAsPickedUp,
  getAllWasteRequests  // Exporting the new function
};
