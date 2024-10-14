import React, { useState, useEffect } from 'react';
import cleanWasteAPI from '../../api/cleanWasteAPI'; // Ensure your API setup is correct
import AdminNav from '../../components/AdminNav';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DriverAssignPage = () => {
  const [drivers, setDrivers] = useState([]); // List of drivers
  const [selectedStreet, setSelectedStreet] = useState(''); // Selected street name
  const [selectedDriver, setSelectedDriver] = useState(''); // Selected driver
  const [pickupDate, setPickupDate] = useState(new Date()); // Selected pickup date

  // Hardcoded list of street names
  const streetNames = [
    'Vihara Road',
    'Waliwita Road',
    'E.A. Jayasinghe Road',
    'Gamunu Pura',
    'Samanala Pedesa'
  ];

  // Fetch drivers from the backend
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await cleanWasteAPI.get('/users/drivers'); // Fetch users and drivers
        const driverList = response.data.filter(user => user.role === 'driver'); // Filter only drivers
        setDrivers(driverList);
      } catch (error) {
        console.error('Error fetching drivers:', error);
      }
    };

    fetchDrivers();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedStreet || !selectedDriver || !pickupDate) {
      alert('Please select a street, driver, and pickup date.');
      return;
    }
  
    try {
      // API call to assign the driver
      const response = await cleanWasteAPI.post('/drivers/assign-pickup', {
        driverId: selectedDriver,
        street: selectedStreet,
        pickupDate: pickupDate
      });
      
      if (response.status === 201) {
        alert('Driver assigned successfully!');
      }
    } catch (error) {
      console.error('Error assigning driver:', error);
      alert(error.response?.data?.message || 'Failed to assign driver. Please try again.'); // Show specific error message
    }
  };
  
  

  return (
    <div>
      <AdminNav />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-8">Driver Assign Page</h1>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          {/* Street Dropdown */}
          <div className="mb-4">
            <label htmlFor="street" className="block text-gray-700 font-semibold mb-2">
              Select Street:
            </label>
            <select
              id="street"
              value={selectedStreet}
              onChange={(e) => setSelectedStreet(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">Select a street</option>
              {streetNames.map((street, index) => (
                <option key={index} value={street}>
                  {street}
                </option>
              ))}
            </select>
          </div>

          {/* Driver Dropdown */}
          <div className="mb-4">
            <label htmlFor="driver" className="block text-gray-700 font-semibold mb-2">
              Select Driver:
            </label>
            <select
              id="driver"
              value={selectedDriver}
              onChange={(e) => setSelectedDriver(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">Select a driver</option>
              {drivers.map((driver) => (
                <option key={driver._id} value={driver._id}>
                  {driver.name}
                </option>
              ))}
            </select>
          </div>

          {/* Pickup Date */}
          <div className="mb-4">
            <label htmlFor="pickupDate" className="block text-gray-700 font-semibold mb-2">
              Select Pickup Date:
            </label>
            <DatePicker
              id="pickupDate"
              selected={pickupDate}
              onChange={(date) => setPickupDate(date)}
              className="w-full px-3 py-2 border rounded-md"
              dateFormat="yyyy/MM/dd" // Optional: format date as YYYY/MM/DD
              minDate={new Date()} // Prevent selecting past dates
              placeholderText="Select a pickup date"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            Assign Driver
          </button>
        </form>
      </div>
    </div>
  );
};

export default DriverAssignPage;
