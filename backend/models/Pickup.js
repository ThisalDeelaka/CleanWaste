const mongoose = require('mongoose');

const pickupSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  wasteType: {
    type: String,
    required: true // Organic, Recyclable, Hazardous, etc.
  },
  wasteCode: {
    type: String,
    required: true
  },
  qrCode: {
    type: String,
    required: true
  },
  pickupDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    default: 'Pending' // Pending, Picked Up, Missed
  },
  recyclingCenter: {
    type: String, // Name of the recycling center
    required: true
  }
}, {
  timestamps: true
});

const Pickup = mongoose.model('Pickup', pickupSchema);
module.exports = Pickup;
