import React, { useState } from 'react';
import Navbar from '../../components/Navbar'; // Import Navbar
import Footer from '../../components/Footer'; // Import Footer
import Button from '../../components/Button'; // Import Button
import { useNavigate } from 'react-router-dom';

const wasteTypes = [
  { type: 'Plastic Waste', icon: '♻️' },
  { type: 'Metal Waste', icon: '🛠️' },
  { type: 'Organic Waste', icon: '🍂' },
  { type: 'E-Waste', icon: '💻' },
  { type: 'Hazardous Waste', icon: '☠️' },
];

const pickupOptions = [
  { option: 'Immediate Pickup', icon: '🚛' },
  { option: 'Scheduled Pickup', icon: '🕒' },
  { option: 'Flexible Pickup', icon: '🔄' },
];

const BulkWaste = () => {
  const [selectedWasteTypes, setSelectedWasteTypes] = useState([]); // Array of selected waste types
  const [wasteQuantity, setWasteQuantity] = useState(0);
  const [selectedPickupOption, setSelectedPickupOption] = useState('');
  const navigate = useNavigate();

  // Toggle waste type selection
  const handleWasteTypeSelection = (wasteType) => {
    setSelectedWasteTypes((prevSelected) => 
      prevSelected.includes(wasteType)
        ? prevSelected.filter(type => type !== wasteType) // Remove if already selected
        : [...prevSelected, wasteType] // Add to selected list
    );
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedWasteTypes.length === 0 || wasteQuantity <= 0 || !selectedPickupOption) {
      alert('Please complete all steps!');
      return;
    }

    // Navigate to the WasteTypeSelection page with selected waste types
    navigate('/sorting-guidelines', { state: { selectedWasteTypes } });
  };

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
      <Navbar /> {/* Add Navbar */}

      <main className="flex-grow flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-teal-800 mb-8 text-center">Bulk Waste Pickup Request</h1>

        {/* Step 1: Select Waste Type */}
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 mb-8 border border-gray-300"> {/* Increased max width */}
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Step 1: Select Waste Type</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {wasteTypes.map((waste) => (
              <div
                key={waste.type}
                className={`p-4 border rounded-lg shadow-lg text-center cursor-pointer transition-transform duration-200 hover:scale-105 ${
                  selectedWasteTypes.includes(waste.type) ? 'bg-teal-600 text-white' : 'bg-white text-gray-700'
                }`}
                onClick={() => handleWasteTypeSelection(waste.type)}
              >
                <div className="text-5xl mb-2">{waste.icon}</div>
                <p className="font-semibold">{waste.type}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Step 2: Enter Waste Quantity */}
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 mb-8 border border-gray-300"> {/* Increased max width */}
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Step 2: Enter Waste Quantity</h2>
          <div className="flex items-center justify-between">
            <input
              type="range"
              min="0"
              max="500"
              value={wasteQuantity}
              onChange={(e) => setWasteQuantity(e.target.value)}
              className="w-full h-2 bg-teal-500 rounded-lg"
            />
            <span className="text-lg font-semibold text-gray-700 ml-4">{wasteQuantity} kg</span>
          </div>
        </div>

        {/* Step 3: Choose Pickup Option */}
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 mb-8 border border-gray-300"> {/* Increased max width */}
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Step 3: Choose Pickup Option</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {pickupOptions.map((pickup) => (
              <div
                key={pickup.option}
                className={`p-4 border rounded-lg shadow-lg text-center cursor-pointer transition-transform duration-200 hover:scale-105 ${
                  selectedPickupOption === pickup.option ? 'bg-teal-600 text-white' : 'bg-white text-gray-700'
                }`}
                onClick={() => setSelectedPickupOption(pickup.option)}
              >
                <div className="text-5xl mb-2">{pickup.icon}</div>
                <p className="font-semibold">{pickup.option}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <Button
          text="Submit Request"
          className="w-full max-w-4xl px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg shadow-lg hover:bg-teal-700 transition duration-300"
          onClick={handleSubmit}
        />
      </main>

      <Footer /> {/* Add Footer */}
    </div>
  );
};

export default BulkWaste;
