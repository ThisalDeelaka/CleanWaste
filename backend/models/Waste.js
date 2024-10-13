const mongoose = require('mongoose');

const wasteSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true // Organic, Plastic, Hazardous, etc.
  },
  guidelines: {
    type: [String],  // Array of sorting instructions
    required: true
  }
}, {
  timestamps: true
});

const Waste = mongoose.model('Waste', wasteSchema);
module.exports = Waste;
