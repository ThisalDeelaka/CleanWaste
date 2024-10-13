import React, { useState } from 'react';
import cleanWasteAPI from '../../api/cleanWasteAPI';
import { useDriverAuth } from '../../context/driverAuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';  // Import icons for Show/Hide Password
import InputField from '../../components/InputField';  // Assuming you have this component
import Button from '../../components/Button';

const DriverLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);  // State for toggling password visibility
  const { login } = useDriverAuth();  // Using the login function from DriverAuthContext
  const navigate = useNavigate();

  // Function to handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.email || !formData.password) {
      alert('Please fill out both email and password.');
      return;
    }

    try {
      // Send login request to the API
      const response = await cleanWasteAPI.post('/drivers/login', formData);

      // If successful, store the driver and token in DriverAuthContext
      login(response.data.driver, response.data.token);
      
      // Navigate to driver home page after successful login
      navigate('/driverHomePage');
    } catch (error) {
      console.error('Login failed', error);
      alert('Invalid email or password. Please try again.');
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#175E5E]">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md mx-4">
        <h1 className="text-3xl font-bold text-center text-[#175E5E] mb-6">Driver Login</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <InputField
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            name="email"
            className="w-full border border-gray-300 p-2 rounded-md"
          />
          
          {/* Password Input */}
          <div className="relative">
            <InputField
              label="Password"
              type={showPassword ? "text" : "password"}  // Toggle input type based on state
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              name="password"
              className="w-full border border-gray-300 p-2 rounded-md"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-10 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}  {/* Toggle icon based on state */}
            </button>
          </div>
          
          {/* Login Button */}
          <Button
            text="Login"
            type="submit"
            className="bg-[#175E5E] text-white w-full py-2 rounded-md font-semibold hover:bg-[#134c4c] transition duration-200"
          />
        </form>
        
        {/* Signup Link */}
        <div className="text-center mt-4 text-gray-500">
          <p>Don't have an account? <Link to="/driverRegister" className="text-[#175E5E] hover:underline">Sign up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default DriverLogin;
