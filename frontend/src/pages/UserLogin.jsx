import React, { useState } from 'react';
import cleanWasteAPI from '../api/cleanWasteAPI';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import Button from '../components/Button';

const UserLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { login } = useAuth();
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
      const response = await cleanWasteAPI.post('/users/login', formData);
      login(response.data.user, response.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed', error);
      alert('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#175E5E]">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md mx-4">
        <h1 className="text-3xl font-bold text-center text-[#175E5E] mb-6">Clean Waste Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <div className="flex justify-between items-center">
            <Button
              text="Login"
              type="submit"
              className="bg-[#175E5E] text-white w-full py-2 rounded-md font-semibold hover:bg-[#134c4c] transition duration-200"
            />
          </div>
        </form>
        <div className="text-center mt-4 text-gray-500">
          <p>Don't have an account? <a href="/register" className="text-[#175E5E] hover:underline">Sign up</a></p>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
