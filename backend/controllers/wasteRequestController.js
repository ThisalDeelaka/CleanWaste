// controllers/wasteRequestController.js

const wasteRequestService = require("../services/wasteRequestService");
const qrcode = require("qrcode"); // Import QR code library

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
      return res
        .status(400)
        .json({
          message:
            "Location is required and must include latitude and longitude.",
        });
    }

    const wasteCode = generateWasteCode(); // Generate a unique waste code

    // Create waste request without QR code first
    let wasteRequest = await wasteRequestService.createWasteRequest({
      wasteType,
      location,
      user: userId,
      wasteCode,
      status: "pending",
    });

    // Generate QR code using waste code or any other relevant info
    const qrCodeData = `Waste Code: ${wasteCode}\nUser: ${userId}\nLocation: (${location.latitude}, ${location.longitude})`;
    const qrCode = await qrcode.toDataURL(qrCodeData); // Generate base64 encoded QR code

    // Update the waste request with the generated QR code
    wasteRequest.qrCode = qrCode;
    await wasteRequest.save();

    res.status(201).json(wasteRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const assignDriver = async (req, res) => {
  try {
    const { requestId, driverId } = req.body;
    const updatedRequest = await wasteRequestService.assignDriverToWasteRequest(
      requestId,
      driverId
    );
    res.json(updatedRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const markAsPickedUp = async (req, res) => {
  try {
    const { requestId } = req.body;
    const updatedRequest = await wasteRequestService.markWasteAsPickedUp(
      requestId
    );
    res.json(updatedRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUserWasteRequests = async (req, res) => {
  try {
    const { userId } = req.params; // Get userId from route parameters
    const wasteRequests = await wasteRequestService.getWasteRequestsByUserId(userId); // Call the service to get user-specific waste requests
    res.json(wasteRequests); // Send response with the waste requests
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
  getAllWasteRequests,
  getUserWasteRequests
};
