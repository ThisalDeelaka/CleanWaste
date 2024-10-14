import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cleanWasteAPI from '../../api/cleanWasteAPI';
import Navbar from '../../components/Navbar'; 
import Footer from '../../components/Footer';
import Map from '../../components/Map'; 
import Button from '../../components/Button';

const AdminHomePage = () => {
  const [wasteRequests, setWasteRequests] = useState([]); // All waste requests
  const [selectedRequest, setSelectedRequest] = useState(null); // The selected waste request to assign a driver
  const [drivers, setDrivers] = useState([]); // All available drivers
  const [selectedDriver, setSelectedDriver] = useState(''); // Driver selected for a request
  const [streetName, setStreetName] = useState(''); // Street name input
  const navigate = useNavigate();

  // Fetch waste requests for the map and drivers
  useEffect(() => {
    const fetchWasteRequests = async () => {
      try {
        const response = await cleanWasteAPI.get('/api/waste-requests/all-waste-requests'); // Fetch all waste requests
        setWasteRequests(response.data);
      } catch (error) {
        console.error('Error fetching waste requests:', error);
      }
    };
    
    const fetchDrivers = async () => {
      try {
        const response = await cleanWasteAPI.get('/api/drivers'); // Fetch drivers list
        setDrivers(response.data);
      } catch (error) {
        console.error('Error fetching drivers:', error);
      }
    };

    fetchWasteRequests();
    fetchDrivers();
  }, []);

  // Handle driver assignment
  const handleAssignDriver = async () => {
    if (!selectedRequest || !selectedDriver || !streetName) {
      alert('Please select a waste request, driver, and enter the street name.');
      return;
    }

    try {
      const response = await cleanWasteAPI.post('/api/waste-requests/assign-driver', {
        requestId: selectedRequest._id,
        driverId: selectedDriver,
        streetName,
      });

      alert('Driver assigned successfully!');
      setSelectedRequest(null); // Clear selected request
      setStreetName(''); // Clear street name
      setSelectedDriver(''); // Clear selected driver
    } catch (error) {
      console.error('Error assigning driver:', error);
      alert('Failed to assign driver.');
    }
  };

  // Handle selecting a waste request on the map
  const handleWasteRequestSelect = (request) => {
    setSelectedRequest(request); // Set the selected request for assignment
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-6 sm:py-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#175E5E] mb-8 text-center">
          Admin Dashboard
        </h1>

        {/* Display Waste Requests on the Map */}
        <Map
          wasteRequests={wasteRequests} // Pass waste requests to map
          onRequestSelect={handleWasteRequestSelect} // Function to set the selected request
        />

        {/* Waste request details */}
        {selectedRequest && (
          <div className="mt-8 w-full max-w-md bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Assign Driver</h2>
            <p className="mb-4">Waste Code: {selectedRequest.wasteCode}</p>
            <p className="mb-4">Street: {selectedRequest.location.address || 'N/A'}</p>

            <div className="mb-4">
              <label htmlFor="street" className="block mb-1 font-semibold text-gray-700">Street Name:</label>
              <input
                id="street"
                type="text"
                value={streetName}
                onChange={(e) => setStreetName(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter street name"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="driver" className="block mb-1 font-semibold text-gray-700">Select Driver:</label>
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

            <Button
              text="Assign Driver"
              onClick={handleAssignDriver}
              className="px-4 py-2 bg-[#175E5E] text-white rounded-lg shadow-lg hover:bg-[#134c4c] transition duration-300"
            />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default AdminHomePage;
