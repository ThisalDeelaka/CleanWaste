import React, { useState } from 'react';
import cleanWasteAPI from '../api/cleanWasteAPI';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import Button from '../components/Button';

const UserRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    streetSide: '', // Updated for dropdown selection
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await cleanWasteAPI.post('/users/register', formData);
      console.log('User registered:', response.data);
      navigate('/login');
    } catch (error) {
      console.error('Error registering user', error);
    }
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
          <InputField
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            name="password"
            className="w-full border border-gray-300 p-2 rounded-md"
          />
          <InputField
            label="Address (Street Name)"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address"
            name="address"
            className="w-full border border-gray-300 p-2 rounded-md"
          />
          {/* Dropdown for Street Side */}
          <div className="w-full">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="streetSide">
              Street Side
            </label>
            <select
              name="streetSide"
              value={formData.streetSide}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
            >
              <option value="">Select Street Side</option>
              <option value="Left">Left</option>
              <option value="Right">Right</option>
            </select>
          </div>
          <Button
            text="Register"
            type="submit"
            className="bg-[#175E5E] text-white w-full py-2 rounded-md font-semibold hover:bg-[#134c4c] transition duration-200"
          />
        </form>
        <div className="text-center mt-4 text-gray-500">
          <p>Already have an account? <a href="/login" className="text-[#175E5E] hover:underline">Login</a></p>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
