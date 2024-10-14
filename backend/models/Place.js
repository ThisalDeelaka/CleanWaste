// models/Place.js
const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  streetName: {
    type: String,
    enum: [
      'Vihara Road',
      'Waliwita Road',
      'E.A. Jayasinghe Road',
      'Gamunu Pura',
      'Samanala Pedesa'
    ],
    required: true
  },
  binCount: {
    type: Number,
    default: 1,
  },
  isCollected: {
    type: Boolean,
    default: false,
  },
  overflowReported: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Place', placeSchema);
