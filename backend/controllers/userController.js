// controllers/userController.js
const userService = require("../services/userService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/db");

const register = async (req, res) => {
  try {
    const { name, email, password, role, address } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user (or driver depending on role)
    const user = await userService.registerUser({
      name,
      email,
      password: hashedPassword,
      role, // Role will be either 'user' or 'driver'
      address,
    });

    res.status(201).json({ message: "User registered", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.findUserByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      config.jwtSecret,
      { expiresIn: "4h" }
    );

    // Return both the user and token in the response
    res.json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: token,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.userId; // Extracted from JWT
    const user = await userService.findUserById(userId);
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// controllers/userController.js

const getAllDrivers = async (req, res) => {
  try {
    const drivers = await userService.findUsersByRole("driver");
    res.json(drivers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
  getUserProfile,
  getAllDrivers,
};
