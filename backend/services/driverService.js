const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Driver = require("../models/Driver");
const Pickup = require("../models/Pickup");

// Get assigned routes for a driver
const getAssignedRoutes = async (driverId) => {
  const driver = await Driver.findById(driverId).populate("assignedRoutes");

  if (!driver) {
    throw new Error("Driver not found");
  }

  return driver.assignedRoutes;
};

// Mark a pickup as complete by updating the status of the pickup
const completePickup = async (pickupId, wasteCode) => {
  const pickup = await Pickup.findById(pickupId);

  if (!pickup) {
    throw new Error("Pickup not found");
  }

  // Validate the waste code
  if (pickup.wasteCode !== wasteCode) {
    throw new Error("Invalid waste code");
  }

  // Mark pickup as complete
  pickup.status = "Picked Up";
  await pickup.save();

  return pickup;
};

// Sign up a new driver
const signupDriver = async (driverData) => {
  const { name, email, password } = driverData;

  // Check if driver with the same email already exists
  const existingDriver = await Driver.findOne({ email });
  if (existingDriver) {
    throw new Error("Driver already exists with this email");
  }

  // Hash the password before saving the driver
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new driver
  const driver = new Driver({
    name,
    email,
    password: hashedPassword,
  });

  await driver.save();

  return driver;
};

// Driver login function
const loginDriver = async ({ email, password }) => {
  // Check if driver exists with the given email
  const driver = await Driver.findOne({ email });
  if (!driver) {
    throw new Error("Driver not found");
  }

  // Check if the password matches
  const isMatch = await bcrypt.compare(password, driver.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  // Generate a JWT token
  const token = jwt.sign(
    { driverId: driver._id, email: driver.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return token;
};

module.exports = {
  getAssignedRoutes,
  completePickup,
  signupDriver,
  loginDriver, // Now includes login functionality
};
