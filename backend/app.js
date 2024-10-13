const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db"); // MongoDB connection
const cors = require("cors"); // Import the cors middleware
const userRoutes = require("./routes/userRoutes");
const driverRoutes = require("./routes/driverRoutes");
const adminRoutes = require("./routes/adminRoutes");
const wasteRoutes = require("./routes/wasteRoutes");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize express app
const app = express();

// Use cors middleware to enable CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middleware to parse incoming JSON requests
app.use(express.json());

// Routes
app.use("/api/users", userRoutes); // User-related routes
app.use("/api/drivers", driverRoutes); // Driver-related routes
app.use("/api/admin", adminRoutes); // Admin-related routes
app.use("/api/waste", wasteRoutes); // Waste management routes

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "An internal server error occurred." });
});

// Export the app for the server.js to use
module.exports = app;
