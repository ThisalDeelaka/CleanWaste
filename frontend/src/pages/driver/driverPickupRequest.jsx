import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import cleanWasteAPI from "../../api/cleanWasteAPI";
import MapComponent from "../../components/MapComponent"; // Import the new MapComponent

const PickupRequests = () => {
  const [searchParams] = useSearchParams();
  const [wasteRequests, setWasteRequests] = useState([]);
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

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-center text-[#175E5E] mb-8">
        Waste Requests for {street}
      </h1>
      <div className="w-full max-w-4xl mx-auto">
        {wasteRequests.length > 0 ? (
          <ul className="space-y-4">
            {wasteRequests.map((request, index) => (
              <li
                key={index}
                className="bg-white shadow-md rounded-lg p-6 border-l-4 border-blue-400"
              >
                <p className="text-lg font-semibold text-gray-700">
                  Waste Type: {request.wasteType.join(", ")}, Pickup Date:{" "}
                  {new Date(request.pickupDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500">
                  Location: {request.location.address}
                </p>
                <p
                  className={`text-sm ${
                    request.status === "picked-up"
                      ? "text-green-500"
                      : "text-yellow-500"
                  }`}
                >
                  Status: {request.status}
                </p>

                {/* Include the MapComponent for each waste request */}
                <MapComponent
                  latitude={request.location.latitude}
                  longitude={request.location.longitude}
                />
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
  );
};

export default PickupRequests;
