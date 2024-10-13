// models/WasteRequest.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wasteRequestSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  wasteType: { type: String, enum: ['Organic', 'Recyclable', 'Hazardous', 'E-waste', 'Plastic'], required: true },
  status: { type: String, enum: ['pending', 'assigned', 'picked-up'], default: 'pending' },
  wasteCode: { type: String, required: true, unique: true },
  qrCode: { type: String, unique: true },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    address: { type: String, required: true }
  },
  assignedDriver: { type: Schema.Types.ObjectId, ref: 'User' },
  pickupDate: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('WasteRequest', wasteRequestSchema);
