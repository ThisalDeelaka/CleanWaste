const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
const registerUser = async ({ name, email, password, address, streetSide }) => {
  // Check if the user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error('User already exists');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create and save the new user
  const user = new User({
    name,
    email,
    password: hashedPassword,
    address,
    streetSide,
  });

  await user.save();
  return {
    message: 'User registered successfully',
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
      streetSide: user.streetSide,
    }
  };
};

// Login a user
const loginUser = async ({ email, password }) => {
  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Check if the password matches
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  // Generate a JWT token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    }
  };
};

module.exports = {
  registerUser,
  loginUser
};
