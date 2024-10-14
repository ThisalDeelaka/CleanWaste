const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // Import the cors package
const { connectDB } = require("./config/db"); // Import the database connection
const app = express();

dotenv.config();

// Connect to MongoDB (Singleton pattern)
connectDB();

// Middleware for CORS
app.use(cors()); // Add CORS middleware

// Middleware for parsing JSON requests
app.use(express.json());

// Import routes
const userRoutes = require("./routes/userRoutes");
const wasteRequestRoutes = require("./routes/wasteRequestRoutes");
const driverRoutes = require("./routes/driverRoutes");
const adminRoutes = require("./routes/adminRoutes");
const placeRoutes = require("./routes/placeRoutes");

// Routes
app.use("/api/users", userRoutes);
app.use("/api/waste-requests", wasteRequestRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/admin", adminRoutes);
app.use('/api', placeRoutes);

// Remove the listen function from here
module.exports = app;
