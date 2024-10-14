import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import cleanWasteAPI from "../../api/cleanWasteAPI";
import MapComponent from "../../components/MapComponent"; // Import the new MapComponent
import Navbar from "../../components/Navbar"; // Import Navbar
import Footer from "../../components/Footer"; // Import Footer

const PickupRequests = () => {
  const [searchParams] = useSearchParams();
  const [wasteRequests, setWasteRequests] = useState([]);
  const [pickedUpRequestId, setPickedUpRequestId] = useState(null); // Store the ID of the picked-up request
  const [wasteIdInput, setWasteIdInput] = useState(""); // Store the Waste ID entered by the driver
  const [expandedRequestId, setExpandedRequestId] = useState(null); // Store the ID of the request whose location map is expanded
  const street = searchParams.get("street"); // Get street query parameter

  useEffect(() => {
    const fetchWasteRequests = async () => {
      try {
        const response = await cleanWasteAPI.get(
          `/drivers/pickup-requests?street=${street}`
        );
        setWasteRequests(response.data || []);
      } catch (error) {
        console.error("Error fetching waste requests:", error);
      }
    };

    if (street) {
      fetchWasteRequests();
    }
  }, [street]);

  // Handle "Picked Up" button click
  const handlePickedUpClick = (requestId) => {
    setPickedUpRequestId(requestId); // Set the current request to show the Waste ID input and buttons
  };

  // Handle "Confirm" button click
  const handleConfirmPickup = async (requestId) => {
    if (!wasteIdInput) {
      alert("Please enter a valid Waste ID.");
      return;
    }

    try {
      // Call the API to confirm pickup
      const response = await cleanWasteAPI.post(`/drivers/confirm-pickup`, {
        requestId,
        wasteId: wasteIdInput,
      });

      if (response.status === 200) {
        alert("Pickup confirmed successfully!");
        setPickedUpRequestId(null); // Clear the input and close the form
        setWasteIdInput("");
        // Optionally, refetch the waste requests to update the status
      }
    } catch (error) {
      console.error("Error confirming pickup:", error);
      alert("Failed to confirm pickup.");
    }
  };

  // Handle "Dismiss" button click
  const handleDismissPickup = () => {
    alert("Pickup dismissed!");
    setPickedUpRequestId(null); // Clear the picked-up state and dismiss the request
  };

  // Handle "Report" button click
  const handleReportIssue = () => {
    alert("Issue reported successfully!");
  };

  // Handle "View Location" button click
  const toggleMap = (requestId) => {
    setExpandedRequestId(expandedRequestId === requestId ? null : requestId); // Toggle map display
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-grow bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-center text-[#175E5E] mb-8">
          Waste Requests for {street}
        </h1>
        <div className="w-full max-w-4xl mx-auto">
          {wasteRequests.length > 0 ? (
            <ul className="space-y-4">
              {wasteRequests.map((request) => (
                <li
                  key={request._id}
                  className="bg-white shadow-md rounded-lg p-4 md:p-6 border-l-4 border-blue-400"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="w-full md:w-[65%] mb-4 md:mb-0">
                      <p className="text-lg font-semibold text-gray-800 truncate">
                        Waste Type: {request.wasteType.join(", ")}
                      </p>
                      <p className="text-sm text-gray-600">
                        Pickup Date:{" "}
                        {new Date(request.pickupDate).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        Location: {request.location.address}
                      </p>
                      <p
                        className={`text-sm font-semibold ${
                          request.status === "picked-up"
                            ? "text-green-600"
                            : "text-yellow-600"
                        }`}
                      >
                        Status: {request.status}
                      </p>
                    </div>

                    <div className="flex space-x-2 w-full md:w-auto justify-end">
                      {/* View Location Button */}
                      <button
                        className="w-full md:w-auto px-4 py-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 transition duration-200"
                        onClick={() => toggleMap(request._id)}
                      >
                        {expandedRequestId === request._id
                          ? "Hide Location"
                          : "View Location"}
                      </button>

                      {/* Picked Up Button */}
                      {request.status !== "picked-up" && (
                        <button
                          className="w-full md:w-auto px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-200"
                          onClick={() => handlePickedUpClick(request._id)}
                        >
                          Picked Up
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Conditionally Render the Map */}
                  {expandedRequestId === request._id && (
                    <div className="mt-4">
                      <MapComponent
                        latitude={request.location.latitude}
                        longitude={request.location.longitude}
                      />
                    </div>
                  )}

                  {/* Show Waste ID input and additional buttons if Picked Up is clicked */}
                  {pickedUpRequestId === request._id && (
                    <div className="mt-4 space-y-2">
                      <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-md"
                        placeholder="Enter Waste ID"
                        value={wasteIdInput}
                        onChange={(e) => setWasteIdInput(e.target.value)}
                      />
                      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                        <button
                          className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
                          onClick={() => handleConfirmPickup(request._id)}
                        >
                          Confirm Pickup
                        </button>
                        <button
                          className="w-full md:w-auto px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition duration-200"
                          onClick={handleDismissPickup}
                        >
                          Dismiss
                        </button>
                        <button
                          className="w-full md:w-auto px-4 py-2 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition duration-200"
                          onClick={handleReportIssue}
                        >
                          Report
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <p className="text-lg font-semibold text-gray-700">
                No waste requests found for this street.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PickupRequests;
