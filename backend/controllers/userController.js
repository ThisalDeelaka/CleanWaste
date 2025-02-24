import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { registerUser, findUserByEmail, findUserById, findUsersByRole } from '../services/userService.js';
import { jwtSecret } from '../config/db.js';

export const register = async (req, res) => {
  try {
    const { name, email, password, role, address } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await registerUser({
      name,
      email,
      password: hashedPassword,
      role,
      address,
    });

    res.status(201).json({ message: "User registered", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      jwtSecret,
      { expiresIn: "4h" }
    );

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

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await findUserById(userId);
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllDrivers = async (req, res) => {
  try {
    const drivers = await findUsersByRole("driver");
    res.json(drivers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
