const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/db');  // Ensure jwtSecret is imported correctly

const verifyToken = (req, res, next) => {
  // Extract the token from the Authorization header, usually in the format "Bearer <token>"
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
  
  if (!token) {
    return res.status(403).json({ message: 'No token provided.' });
  }

  // Verify the token using the secret key
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to authenticate token.' });
    }

    // Attach the decoded token (user info) to the request object
    req.user = decoded;
    next();  // Proceed to the next middleware or route handler
  });
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required.' });
  }
  next();  // User is admin, proceed to the next middleware or route handler
};

const isDriver = (req, res, next) => {
  if (req.user.role !== 'driver') {
    return res.status(403).json({ message: 'Driver access required.' });
  }
  next();  // User is driver, proceed to the next middleware or route handler
};

module.exports = {
  verifyToken,
  isAdmin,
  isDriver
};
