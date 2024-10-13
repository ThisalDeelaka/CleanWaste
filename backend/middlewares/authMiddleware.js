// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const config = require('../config/db');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'No token provided.' });

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) return res.status(500).json({ message: 'Failed to authenticate token.' });
    req.user = decoded;  // Extract user data from token
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin access required.' });
  next();
};

const isDriver = (req, res, next) => {
  if (req.user.role !== 'driver') return res.status(403).json({ message: 'Driver access required.' });
  next();
};

module.exports = {
  verifyToken,
  isAdmin,
  isDriver
};
