const Waste = require('../models/Waste');

// Create a new waste type
const createWasteTypeController = async (req, res) => {
  try {
    const waste = new Waste(req.body);
    await waste.save();
    res.status(201).json({ message: 'Waste type created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get sorting guidelines for a waste type
const getWasteGuidelinesController = async (req, res) => {
  try {
    const waste = await Waste.findOne({ type: req.params.type });
    if (!waste) {
      return res.status(404).json({ message: 'Waste type not found' });
    }
    res.json({ type: waste.type, guidelines: waste.guidelines });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createWasteTypeController,
  getWasteGuidelinesController
};
