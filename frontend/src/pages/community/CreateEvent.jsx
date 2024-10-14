import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import cleanWasteAPI from '../../api/cleanWasteAPI';
import Map from '../../components/Map';
import { useAuth } from "../../context/AuthContext";

export default function CreateEvent() {
  const [eventLocation,setEventLocation] = useState(null);
  const navigate = useNavigate();
  const { auth } = useAuth();
  console.log(auth);

  const [formData, setFormData] = useState({
    Eventname: '',
    EventDescription: '',
    EventDate: '',
    EventTime: '',
    eventLocation,
    setby: auth.user._id
  });
  

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
    const { Eventname,EventDescription,EventTime,EventDate } = formData;
    if ( !Eventname || !EventDescription || !EventTime || !EventDate || !eventLocation) {
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

  return (
    <div className='flex items-center justify-center min-h-screen bg-[#175E5E]'>
      <div className='bg-white shadow-lg rounded-lg p-8 w-full max-w-md mx-4'>
      <h1 className="text-3xl font-bold text-center text-[#175E5E] mb-6">Event Creation</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Event Name"
            value={formData.Eventname}
            onChange={handleChange}
            placeholder="Enter a name for Your Event"
            name="Eventname "
            className="w-full border border-gray-300 p-2 rounded-md"
          />
          <InputField
            label="Event Description"
            value={formData.EventDescription}
            onChange={handleChange}
            placeholder="Enter a description for Your Event"
            name="EventDescription"
            className="w-full border border-gray-300 p-2 rounded-md h-32"
          />
          <InputField
            label="Event Date"
            type="date"
            value={formData.EventDate}
            onChange={handleChange}
            placeholder="Enter the date of the Event"
            name="EventDate"
            className="w-full border border-gray-300 p-2 rounded-md"
          />
          <InputField
            label="Event Time"
            type="time"
            value={formData.EventTime}
            onChange={handleChange}
            placeholder="Enter the time of the Event"
            name="EventTime"
            className="w-full border border-gray-300 p-2 rounded-md"
          />
          <p className="text-lg text-gray-700 mb-4 text-center">
          Please click on the map to select the location where you holding the Event.
          </p>
          <div className="w-full max-w-4xl mx-auto mb-4">
          <Map onLocationSelect={setEventLocation} />
        </div>
          <Button
            text="Create Event"
            type="submit"
            className="bg-[#175E5E] text-white w-full py-2 rounded-md font-semibold hover:bg-[#134c4c] transition duration-200"
          />
        </form>

      </div>

    </div>
  )
}
