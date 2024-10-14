import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

// Map container style
const containerStyle = {
  width: '100%',
  height: '400px',
};

// Fallback map center (Sri Lanka's center)
const defaultCenter = {
  lat: 7.8731,
  lng: 80.7718,
};

const Map = ({ wasteRequests, onRequestSelect }) => {
  const [center, setCenter] = useState(defaultCenter); // Map center position

  // Load Google Maps API
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, // Your Google Maps API Key
  });

  // Get user's current location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting location: ", error);
        }
      );
    }
  }, []);

  if (!isLoaded) {
    return <div>Loading Map...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12} // Zoom level when showing user's location
    >
      {/* Display markers for all waste requests */}
      {wasteRequests.map((request, index) => (
        <Marker
          key={index}
          position={{ lat: request.location.latitude, lng: request.location.longitude }}
          onClick={() => onRequestSelect(request)} // Select request on marker click
        />
      ))}
    </GoogleMap>
  );
};

export default Map;
