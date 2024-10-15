import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import cleanWasteAPI from '../../api/cleanWasteAPI';
import Map from '../../components/eventMap';
import { useAuth } from "../../context/AuthContext";
import Navbar from '../../components/Navbar';

export default function CreateEvent() {
  const [eventLocation,setEventLocation] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const navigate = useNavigate();
  const { auth } = useAuth();

  const [formData, setFormData] = useState({
    Eventname: '',
    EventDescription: '',
    EventDate: '',
    EventTime: '',
    eventLocation,
    eventUsers: [],
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

  useEffect(() => {
    if (searchTerm) {
      const fetchUsers = async () => {
        try {
          const response = await cleanWasteAPI.get(`/event/getAllUsers?query=${searchTerm}`, {id:auth.user._id} );
          setUsers(response.data);
        } catch (error) {
          console.error('Failed to fetch users', error);
        }
      };
      fetchUsers();
    }
  }, [searchTerm]);


  const handleUserSelection = (user) => {
    if (!selectedUsers.includes(user)) {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const handleRemoveSelectedUser = (user) => {
    setSelectedUsers(selectedUsers.filter((u) => u._id !== user._id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    const { Eventname,EventDescription,EventTime,EventDate } = formData;
    if ( !Eventname || !EventDescription || !EventTime || !EventDate || !eventLocation) {
      alert('Please fill out all fields.');
      return;
    }
    if(formData){
      // Date and Time validation
      if(EventDate){
        const today = new Date();
        const date = new Date(EventDate);
        if(date < today){
          alert('Please select a valid date.');
          return;
        }
      }
      if(EventTime){
        const time = EventTime.split(':');
        if(time[0] > 24 || time[1] > 60){
          alert('Please select a valid time.');
          return;
        }
      }
    }

    try {
      // Make API call to create event
      const response = await cleanWasteAPI.post("/event/createEvent", {
        ...formData,
        eventLocation ,
        setby: auth.user._id,
        eventUsers: selectedUsers.map(user => user._id),
      });

      console.log('Create Event Response:', response.data);

      if (response.data._id) {
        alert('Event created successfully!');
        navigate('/Community');
      } else {
        console.log(formData);
        alert('Failed to create event. Please try again.');
      }
    } catch (error) {
      console.error('Create Event failed', error);
      alert('Failed to create event. Please try again.');
    }

  };

  return (
    <div>
      <Navbar />
    <div className='flex items-center justify-center min-h-screen bg-[#175E5E] pt-5'>
      {auth ? (
        <div className='bg-white shadow-lg rounded-lg p-8 w-full max-w-md mx-4'>
          <h1 className="text-3xl font-bold text-center text-[#175E5E] mb-6">Event Creation</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              label="Event Name"
              value={formData.Eventname}
              onChange={handleChange}
              placeholder="Enter a name for Your Event"
              name="Eventname"
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

            {/* User Search Input */}
            <div className="my-4">
              <label className="block text-gray-700">Search Users to Invite:</label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for users..."
              />
              {users.length > 0 && (
                <div className="bg-white border border-gray-300 mt-2 p-2 rounded-md">
                  <ul>
                    {users.map(user => (
                      <li key={user._id} className="cursor-pointer hover:bg-gray-200 p-1" onClick={() => handleUserSelection(user)}>
                        {user.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Display Selected Users */}
            {selectedUsers.length > 0 && (
              <div className="my-4">
                <h3 className="text-lg font-semibold">Selected Users:</h3>
                <ul className="list-disc pl-5">
                  {selectedUsers.map(user => (
                    <li key={user._id} className="flex justify-between items-center">
                      {user.name}
                      <button type="button" onClick={() => handleRemoveSelectedUser(user)} className="text-red-500">Remove</button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Button
              text="Create Event"
              type="submit"
              className="bg-[#175E5E] text-white w-full py-2 rounded-md font-semibold hover:bg-[#134c4c] transition duration-200"
            />
            <Button
              text="Cancel"
              type="button"
              className="bg-[#175E5E] text-white w-full py-2 rounded-md font-semibold hover:bg-[#134c4c] transition duration-200"
              onClick={() => navigate('/')}
            />
          </form>
        </div>
      ) : (
        <div>Please relogin</div>
      )}
    </div>
    </div>
  )
}

