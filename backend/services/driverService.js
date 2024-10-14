// services/driverService.js
const DriverAssignment = require("../models/Driver");
const WasteRequest = require("../models/WasteRequest");

const getAssignedPickups = async (driverId) => {
  return await DriverAssignment.find({ driver: driverId, completed: false });
};

const assignPickupToDriver = async (driverId, street, pickupDate) => {
  const existingAssignment = await DriverAssignment.findOne({
    driver: driverId,
    assignedStreet: street,
    completed: false,
  });

  if (existingAssignment) {
    throw new Error(
      "This driver already has an uncompleted assignment for this street."
    );
  }

  const assignment = new DriverAssignment({
    driver: driverId,
    assignedStreet: street,
    assignmentDate: pickupDate,
  });

  await assignment.save();
  return assignment;
};

module.exports = {
  getAssignedPickups,
  assignPickupToDriver,
};
