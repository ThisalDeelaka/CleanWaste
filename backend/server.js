const app = require("./app"); // Import the app created in app.js
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
