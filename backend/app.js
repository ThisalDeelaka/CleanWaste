// app.js
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db"); // Import the database connection
const app = express();

dotenv.config();

// Connect to MongoDB (Singleton pattern)
connectDB();

// Import routes
const userRoutes = require("./routes/userRoutes");
const wasteRequestRoutes = require("./routes/wasteRequestRoutes");
const driverRoutes = require("./routes/driverRoutes");
const adminRoutes = require("./routes/adminRoutes");

// Middleware for parsing JSON requests
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/waste-requests", wasteRequestRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/admin", adminRoutes);

// Remove the listen function from here
module.exports = app;
