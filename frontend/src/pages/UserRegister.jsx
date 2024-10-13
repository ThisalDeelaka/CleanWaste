import React, { useState } from 'react';
import cleanWasteAPI from '../api/cleanWasteAPI';
import { useNavigate } from 'react-router-dom';  // Import useNavigate instead of useHistory
import InputField from '../components/InputField';
import Button from '../components/Button';

const UserRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    streetSide: '',
  });
  
  const navigate = useNavigate();  // Replace useHistory with useNavigate

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await cleanWasteAPI.post('/users/register', formData);  // Send registration request
      console.log('User registered:', response.data);
      navigate('/login');  // Redirect to login after successful registration
    } catch (error) {
      console.error('Error registering user', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Registration</h1>
      <form onSubmit={handleSubmit}>
        <InputField
          label="Name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          name="name"
        />
        <InputField
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          name="email"
        />
        <InputField
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          name="password"
        />
        <InputField
          label="Address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter your address"
          name="address"
        />
        <InputField
          label="Street Side"
          value={formData.streetSide}
          onChange={handleChange}
          placeholder="Left or Right"
          name="streetSide"
        />
        <Button text="Register" type="submit" />
      </form>
    </div>
  );
};

export default UserRegister;
