const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
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
  assignedRoutes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pickup'
  }],
  status: {
    type: String,
    default: 'Active' // Active, Inactive
  }
}, {
  timestamps: true
});

const Driver = mongoose.model('Driver', driverSchema);
module.exports = Driver;
