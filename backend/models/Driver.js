// models/DriverAssignment.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const driverAssignmentSchema = new Schema(
  {
    driver: { type: Schema.Types.ObjectId, ref: "User", required: true },
    assignedStreet: { type: String, required: true },
    assignmentDate: { type: Date, default: Date.now },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DriverAssignment", driverAssignmentSchema);
