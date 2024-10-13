import React, { useState, useEffect } from 'react';
import cleanWasteAPI from '../../api/cleanWasteAPI'; 
import Navbar from '../../components/Navbar'; 
import Footer from '../../components/Footer';
import Button from '../../components/Button'; 
import { useNavigate } from 'react-router-dom';

const WasteTypeSelection = () => {
  const [wasteTypes, setWasteTypes] = useState([]); // List of available waste types
  const [selectedWasteTypes, setSelectedWasteTypes] = useState([]); // Array of selected waste types
  const navigate = useNavigate();

  // Fetch waste types from the backend when the page loads
  useEffect(() => {
    const fetchWasteTypes = async () => {
      try {
        const response = await cleanWasteAPI.get('/waste/waste-types');
        setWasteTypes(response.data);
      } catch (error) {
        console.error('Error fetching waste types:', error);
      }
    };
    fetchWasteTypes();
  }, []);

  // Toggle waste type selection
  const handleWasteTypeSelection = (wasteType) => {
    setSelectedWasteTypes((prevSelected) => 
      prevSelected.includes(wasteType)
        ? prevSelected.filter(type => type !== wasteType) // Remove if already selected
        : [...prevSelected, wasteType] // Add to selected list
    );
  };

  // Navigate to the SortingGuidelines page
  const handleNext = () => {
    if (selectedWasteTypes.length > 0) {
      navigate('/sorting-guidelines', { state: { selectedWasteTypes } });
    } else {
      alert('Please select at least one waste type.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-6 sm:py-12">
        {/* Step Indicator */}
        <div className="w-full max-w-lg sm:max-w-xl mb-4">
          <div className="h-2 bg-gray-300 rounded-full">
            <div className="h-full bg-[#175E5E]" style={{ width: '33%' }}></div>
          </div>
          <p className="text-sm text-[#175E5E] text-center mt-2">Step 1 of 2: Select Waste Types</p>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-[#175E5E] mb-6 text-center">
          What are you disposing of today?
        </h1>

        {/* Selected Waste Types Counter */}
        <p className="text-lg text-[#175E5E] mb-4">
          {selectedWasteTypes.length} waste type{selectedWasteTypes.length !== 1 ? 's' : ''} selected
        </p>

        {/* Waste Type Selection Buttons */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 w-full max-w-lg sm:max-w-xl">
          {wasteTypes.map((wasteType) => (
            <button
              key={wasteType}
              onClick={() => handleWasteTypeSelection(wasteType)}
              className={`w-full px-4 py-2 rounded-lg border font-semibold text-sm sm:text-base mb-2 transition duration-200 hover:bg-[#134c4c] hover:text-white ${
                selectedWasteTypes.includes(wasteType)
                  ? 'bg-[#175E5E] text-white'
                  : 'bg-white text-[#175E5E] border-[#175E5E]'
              }`}
            >
              {wasteType}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <Button
          text="Next"
          onClick={handleNext}
          className="mt-8 px-6 sm:px-8 py-3 sm:py-4 bg-[#175E5E] text-white font-semibold rounded-lg shadow-lg hover:bg-[#134c4c] transition duration-200"
        />
      </main>

      <Footer />
    </div>
  );
};

export default WasteTypeSelection;
