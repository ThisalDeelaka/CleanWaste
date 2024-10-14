// controllers/placeController.js
const placeService = require('../services/placeService');

// Add a new place
exports.addPlace = async (req, res) => {
  const { streetName, binCount } = req.body;
  try {
    const newPlace = await placeService.addPlace(streetName, binCount);
    res.status(201).json(newPlace);
  } catch (error) {
    res.status(500).json({ message: 'Error adding place' });
  }
};

// Get all places
exports.getAllPlaces = async (req, res) => {
  try {
    const places = await placeService.getAllPlaces();
    res.status(200).json(places);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching places' });
  }
};

// Mark a place as collected
exports.markAsCollected = async (req, res) => {
  const { placeId } = req.params;
  try {
    const updatedPlace = await placeService.markAsCollected(placeId);
    res.status(200).json(updatedPlace);
  } catch (error) {
    res.status(500).json({ message: 'Error marking place as collected' });
  }
};

// Report bin overflow
exports.reportOverflow = async (req, res) => {
  const { placeId } = req.params;
  try {
    const updatedPlace = await placeService.reportOverflow(placeId);
    res.status(200).json(updatedPlace);
  } catch (error) {
    res.status(500).json({ message: 'Error reporting overflow' });
  }
};
