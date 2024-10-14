import React, { useEffect, useState } from 'react';
import Navbar from '../../../components/Navbar';  // Adjust the path as needed
import Footer from '../../../components/Footer';  // Adjust the path as needed
import Sidebar from './Sidebar';  // Import Sidebar component
import cleanWasteAPI from '../../../api/cleanWasteAPI';  // Import your Axios instance
import { useAuth } from '../../../context/AuthContext';  // Import auth context to get the logged-in user

const ProfilePage = () => {
  const [wasteRequests, setWasteRequests] = useState([]);
  const { auth } = useAuth();  // Get authenticated user info from the context

  useEffect(() => {
    const fetchWasteRequests = async () => {
      try {
        // Using the user ID from the auth context to fetch waste requests for that user
        const response = await cleanWasteAPI.get(`/waste-requests/user/${auth.user._id}`);
        setWasteRequests(response.data);  // Save the waste requests to state
      } catch (error) {
        console.error('Error fetching waste request history:', error);
      }
    };

    // Fetch waste requests when the component mounts
    if (auth?.user?._id) {
      fetchWasteRequests();
    }
  }, [auth]);

  // Inline style for light grey grid background
  const gridBackgroundStyle = {
    backgroundImage: `
      linear-gradient(90deg, rgba(0, 0, 0, 0.02) 1px, transparent 1px),
      linear-gradient(180deg, rgba(0, 0, 0, 0.02) 1px, transparent 1px)
    `,
    backgroundSize: '10px 10px', // Smaller grid size
    width: '100%',
    minHeight: '100vh', // Full-screen grid background
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100" style={gridBackgroundStyle}>
      {/* Navbar remains on top */}
      <Navbar />

      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Sidebar is hidden on smaller screens */}
        <Sidebar className="hidden lg:block" />

        {/* Main content */}
        <main className="flex-1 p-4 lg:ml-56">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center mb-4">Waste Request History</h1>
          <p className="text-gray-600 text-center mb-6">
            Here is the list of your waste requests.
          </p>

          {/* Waste Request History Table */}
          <div className="w-full">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow-md rounded-lg hidden md:table">
                <thead>
                  <tr className="bg-[#175E5E] text-white text-left text-xs sm:text-sm md:text-base">
                    <th className="py-3 px-2 sm:px-4">Waste Type</th>
                    <th className="py-3 px-2 sm:px-4">Location</th>
                    <th className="py-3 px-2 sm:px-4">Status</th>
                    <th className="py-3 px-2 sm:px-4">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {wasteRequests.length > 0 ? (
                    wasteRequests.map((request) => (
                      <tr key={request._id} className="border-t border-gray-200">
                        <td className="py-2 px-2 sm:px-4 text-sm">{request.wasteType}</td>
                        <td className="py-2 px-2 sm:px-4 text-sm">
                          {request.location.latitude}, {request.location.longitude}
                        </td>
                        <td className={`py-2 px-2 sm:px-4 text-sm ${request.status === 'pending' ? 'text-yellow-500' : 'text-green-500'}`}>
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </td>
                        <td className="py-2 px-2 sm:px-4 text-sm">{new Date(request.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-4 text-gray-600">No waste requests found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Responsive Mobile Layout */}
            <div className="block md:hidden">
              {wasteRequests.length > 0 ? (
                wasteRequests.map((request) => (
                  <div key={request._id} className="bg-white shadow-md rounded-lg mb-4 border border-gray-200 p-4">
                    <div className="flex justify-between mb-2">
                      <span className="font-bold text-gray-600">Waste Type:</span>
                      <span>{request.wasteType}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="font-bold text-gray-600">Location:</span>
                      <span>{request.location.latitude}, {request.location.longitude}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="font-bold text-gray-600">Status:</span>
                      <span className={request.status === 'pending' ? 'text-yellow-500' : 'text-green-500'}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold text-gray-600">Date:</span>
                      <span>{new Date(request.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-600">No waste requests found.</p>
              )}
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default ProfilePage;
