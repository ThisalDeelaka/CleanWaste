import React, { useState } from 'react';
import cleanWasteAPI from '../api/cleanWasteAPI';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import InputField from '../components/InputField';
import Button from '../components/Button';

const UserRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: {
      street: '',
      city: '',
      postalCode: '',
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('address')) {
      const [_, key] = name.split('.');  // Get the key (street, city, postalCode)
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [key]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    const { name, email, password, address } = formData;
    if (!name || !email || !password || !address.street || !address.city || !address.postalCode) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      const response = await cleanWasteAPI.post('/users/register', formData);
      console.log('User registered:', response.data);
      navigate('/login');  // Redirect to login page after successful registration
    } catch (error) {
      console.error('Error registering user', error);
      alert('Registration failed. Please try again.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#175E5E]">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md mx-4">
        <h1 className="text-3xl font-bold text-center text-[#175E5E] mb-6">User Registration</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            name="name"
            className="w-full border border-gray-300 p-2 rounded-md"
          />
          <InputField
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            name="email"
            className="w-full border border-gray-300 p-2 rounded-md"
          />
          <div className="relative">
            <InputField
              label="Password"
              type={showPassword ? "text" : "password"}
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
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Address Fields */}
          <InputField
            label="Street"
            value={formData.address.street}
            onChange={handleChange}
            placeholder="Enter your street"
            name="address.street"
            className="w-full border border-gray-300 p-2 rounded-md"
          />
          <InputField
            label="City"
            value={formData.address.city}
            onChange={handleChange}
            placeholder="Enter your city"
            name="address.city"
            className="w-full border border-gray-300 p-2 rounded-md"
          />
          <InputField
            label="Postal Code"
            value={formData.address.postalCode}
            onChange={handleChange}
            placeholder="Enter your postal code"
            name="address.postalCode"
            className="w-full border border-gray-300 p-2 rounded-md"
          />

          <Button
            text="Register"
            type="submit"
            className="bg-[#175E5E] text-white w-full py-2 rounded-md font-semibold hover:bg-[#134c4c] transition duration-200"
          />
        </form>
        <div className="text-center mt-4 text-gray-500">
          <p>Already have an account? <Link to="/login" className="text-[#175E5E] hover:underline">Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
