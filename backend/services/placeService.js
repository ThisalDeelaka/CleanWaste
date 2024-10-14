// services/placeService.js
const Place = require('../models/Place');

// Add a new place
exports.addPlace = async (streetName, binCount) => {
  const place = new Place({
    streetName,
    binCount
  });
  return await place.save();
};

// Get all places
exports.getAllPlaces = async () => {
  return await Place.find();
};

// Mark a place as collected
exports.markAsCollected = async (placeId) => {
  return await Place.findByIdAndUpdate(placeId, { isCollected: true });
};

// Report bin overflow
exports.reportOverflow = async (placeId) => {
  return await Place.findByIdAndUpdate(placeId, { overflowReported: true });
};
