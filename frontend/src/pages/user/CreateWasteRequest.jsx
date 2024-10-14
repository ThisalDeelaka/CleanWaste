import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import cleanWasteAPI from "../../api/cleanWasteAPI";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Button from "../../components/Button";
import Map from "../../components/Map";
import { useAuth } from "../../context/AuthContext";

const CreateWasteRequest = () => {
  const location = useLocation();
  const { selectedWasteTypes } = location.state || {}; // Safely destructure selectedWasteTypes
  const [pickupLocation, setPickupLocation] = useState(null); // Pickup location (latitude, longitude)
  const { auth } = useAuth(); // Get the authenticated user
  const navigate = useNavigate();

  // Handle creating the waste request
  const handleCreateRequest = async () => {
    if (!pickupLocation) {
      alert("Please select a location for waste pickup.");
      return;
    }
  
    try {
      const response = await cleanWasteAPI.post("/waste-requests/create", {
        wasteType: selectedWasteTypes,
        location: pickupLocation,
        userId: auth.user._id, // User ID from the authenticated user
      });
  
      console.log("Waste request created:", response.data);
      alert("Waste request created successfully!");
  
      // If the response contains a QR code (base64), you can display it
      const qrCode = response.data.qrCode;
      if (qrCode) {
        const qrCodeWindow = window.open();
        qrCodeWindow.document.write(`<img src="${qrCode}" alt="QR Code"/>`);
      }
  
      navigate("/"); // Redirect user to home after successful request
    } catch (error) {
      console.error("Error creating waste request:", error);
      alert("Failed to create waste request. Please try again.");
    }
  };

  // Fallback if no selectedWasteTypes are passed
  if (!selectedWasteTypes) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center px-4">
        <h1 className="text-2xl font-semibold text-red-500">
          Error: No waste types selected.
        </h1>
        <Button
          text="Go Back"
          onClick={() => navigate("/")}
          className="mt-4 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg shadow-lg transition duration-200"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-6 sm:py-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#175E5E] mb-8 text-center">
          Confirm Your Waste Request
        </h1>

        {/* Instruction for selecting location */}
        <p className="text-lg text-gray-700 mb-4 text-center">
          Please click on the map to select the location where you disposed of
          the waste.
        </p>

        {/* Map Component for Selecting Pickup Location */}
        <div className="w-full max-w-4xl mx-auto mb-4">
          {" "}
          {/* Reduced margin here */}
          <Map onLocationSelect={setPickupLocation} />
        </div>

        {/* Buttons Container */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-4">
          {/* Back Button */}
          <Button
            text="Back"
            onClick={() => navigate(-1)} // Navigates back to the previous page
            className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg shadow-lg transition duration-300"
          />

          {/* Confirm Waste Request Button */}
          <Button
            text="Confirm Waste Request"
            onClick={handleCreateRequest}
            className="px-8 py-3 bg-[#175E5E] text-white font-semibold rounded-lg shadow-lg hover:bg-[#134c4c] transform hover:scale-105 transition duration-300"
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CreateWasteRequest;
