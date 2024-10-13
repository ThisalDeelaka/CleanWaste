// controllers/adminController.js
const adminService = require('../services/adminService');

const registerDriver = async (req, res) => {
  try {
    const { name, email, password, address } = req.body;
    const driver = await adminService.registerDriver({ name, email, password, address });
    res.status(201).json({ message: 'Driver registered successfully', driver });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  registerDriver
};
