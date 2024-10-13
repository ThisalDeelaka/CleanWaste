const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  streetSide: {
    type: String,
    required: true // Left or Right
  },
  pickupSchedule: {
    type: String // Day of the week (e.g., Wednesday)
  },
  wasteHistory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pickup'
  }],
  subscriptionStatus: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;
