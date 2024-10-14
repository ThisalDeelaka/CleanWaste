const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wasteRequestSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    wasteType: [
      {
        type: String,
        enum: [
          "Organic Waste",
          "Paper Waste",
          "E-waste",
          "Hazardous Waste",
          "Plastic Waste",
          "Recycle Waste",
          "Metal Waste",
        ],
        required: true,
      },
    ],

    status: {
      type: String,
      enum: ["pending", "assigned", "picked-up"],
      default: "pending",
    },
    wasteCode: { type: String, unique: true },
    qrCode: { type: String, unique: true, sparse: true },
    location: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
      address: { type: String },
    },
    assignedDriver: { type: Schema.Types.ObjectId, ref: "User" },
    pickupDate: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("WasteRequest", wasteRequestSchema);
