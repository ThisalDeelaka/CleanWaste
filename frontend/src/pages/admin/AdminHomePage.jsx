import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import cleanWasteAPI from '../../api/cleanWasteAPI';
import Navbar from '../../components/Navbar'; 
import Footer from '../../components/Footer';
import Map from '../../components/Map'; 
import Button from '../../components/Button';
import AdminNav from '../../components/AdminNav';


const AdminHomePage = () => {
  const [wasteRequests, setWasteRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState('');
  const [streetName, setStreetName] = useState('');
  const [usersCount, setUsersCount] = useState(0);
  const [driversCount, setDriversCount] = useState(0);
  const [wasteRequestsCount, setWasteRequestsCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWasteRequests = async () => {
      try {
        const response = await cleanWasteAPI.get('/waste-requests/all-waste-requests');
        setWasteRequests(response.data);
        setWasteRequestsCount(response.data.length);
      } catch (error) {
        console.error('Error fetching waste requests:', error);
      }
    };
    
    const fetchDrivers = async () => {
      try {
        const response = await cleanWasteAPI.get('/api/drivers');
        setDrivers(response.data);
        setDriversCount(response.data.length);
      } catch (error) {
        console.error('Error fetching drivers:', error);
      }
    };

    const fetchUsersCount = async () => {
      try {
        const response = await cleanWasteAPI.get('/api/users/count');
        setUsersCount(response.data.count);
      } catch (error) {
        console.error('Error fetching users count:', error);
      }
    };

    fetchWasteRequests();
    fetchDrivers();
    fetchUsersCount();
  }, []);

  const handleAssignDriver = async () => {
    if (!selectedRequest || !selectedDriver || !streetName) {
      alert('Please select a waste request, driver, and enter the street name.');
      return;
    }

    try {
      await cleanWasteAPI.post('/api/waste-requests/assign-driver', {
        requestId: selectedRequest._id,
        driverId: selectedDriver,
        streetName,
      });

      alert('Driver assigned successfully!');
      setSelectedRequest(null);
      setStreetName('');
      setSelectedDriver('');
    } catch (error) {
      console.error('Error assigning driver:', error);
      alert('Failed to assign driver.');
    }
  };

  const handleWasteRequestSelect = (request) => {
    setSelectedRequest(request);
  };

  

  

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <AdminNav />

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-6 sm:py-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#175E5E] mb-8 text-center">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 w-full px-4">
          <div className="bg-white shadow-md rounded-lg p-6 border-l-4 border-[#175E5E]">
            <h2 className="text-xl font-semibold text-[#175E5E]">Total Users</h2>
            <p className="text-4xl font-bold text-[#175E5E] mt-4">{usersCount}</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 border-l-4 border-yellow-500">
            <h2 className="text-xl font-semibold text-[#175E5E]">Total Drivers</h2>
            <p className="text-4xl font-bold text-yellow-500 mt-4">{driversCount}</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 border-l-4 border-green-500">
            <h2 className="text-xl font-semibold text-[#175E5E]">Total Waste Requests</h2>
            <p className="text-4xl font-bold text-green-500 mt-4">{wasteRequestsCount}</p>
          </div>
        </div>

        <Map
          wasteRequests={wasteRequests}
          onRequestSelect={handleWasteRequestSelect}
        />

        {selectedRequest && (
          <div className="mt-8 w-full max-w-md bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-[#175E5E] mb-4">Assign Driver</h2>
            <p className="mb-4 text-gray-700">Waste Code: {selectedRequest.wasteCode}</p>
            <p className="mb-4 text-gray-700">Street: {selectedRequest.location.address || 'N/A'}</p>

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
