import React, { useState } from 'react';
import Navbar from '../../components/Navbar'; // Import Navbar
import Footer from '../../components/Footer'; // Import Footer
import Button from '../../components/Button'; // Import Button for consistency

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
  const [selectedWasteType, setSelectedWasteType] = useState('');
  const [wasteQuantity, setWasteQuantity] = useState(0);
  const [selectedPickupOption, setSelectedPickupOption] = useState('');

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedWasteType || wasteQuantity <= 0 || !selectedPickupOption) {
      alert('Please complete all steps!');
      return;
    }

    // Submit form data (you can replace this with actual submission logic)
    console.log('Waste Type:', selectedWasteType);
    console.log('Waste Quantity:', wasteQuantity);
    console.log('Pickup Option:', selectedPickupOption);

    alert('Your bulk waste request has been submitted!');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar /> {/* Add Navbar */}

      <main className="flex-grow flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-[#175E5E] mb-8 text-center">
          Bulk Waste Pickup Request
        </h1>

        {/* Step 1: Select Waste Type */}
        <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Step 1: Select Waste Type</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {wasteTypes.map((waste, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg shadow-md text-center cursor-pointer transition transform hover:scale-105 ${
                  selectedWasteType === waste.type ? 'bg-[#175E5E] text-white' : 'bg-white text-gray-700'
                }`}
                onClick={() => setSelectedWasteType(waste.type)}
              >
                <div className="text-4xl mb-2">{waste.icon}</div>
                <p className="font-semibold">{waste.type}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Step 2: Enter Waste Quantity */}
        <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Step 2: Enter Waste Quantity</h2>
          <div className="flex items-center justify-between">
            <input
              type="range"
              min="0"
              max="500"
              value={wasteQuantity}
              onChange={(e) => setWasteQuantity(e.target.value)}
              className="w-full mr-4"
            />
            <span className="text-lg font-semibold text-gray-700">{wasteQuantity} kg</span>
          </div>
        </div>

        {/* Step 3: Choose Pickup Option */}
        <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Step 3: Choose Pickup Option</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {pickupOptions.map((pickup, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg shadow-md text-center cursor-pointer transition transform hover:scale-105 ${
                  selectedPickupOption === pickup.option ? 'bg-[#175E5E] text-white' : 'bg-white text-gray-700'
                }`}
                onClick={() => setSelectedPickupOption(pickup.option)}
              >
                <div className="text-4xl mb-2">{pickup.icon}</div>
                <p className="font-semibold">{pickup.option}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <Button
          text="Submit Request"
          className="w-full max-w-3xl px-6 py-3 bg-[#175E5E] text-white font-semibold rounded-lg shadow-lg hover:bg-[#134c4c] transition duration-300"
          onClick={handleSubmit}
        />
      </main>

      <Footer /> {/* Add Footer */}
    </div>
  );
};

export default BulkWaste;
