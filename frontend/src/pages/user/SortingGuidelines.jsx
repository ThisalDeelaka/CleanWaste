import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // For receiving state and navigation
import cleanWasteAPI from '../../api/cleanWasteAPI';
import Navbar from '../../components/Navbar'; 
import Footer from '../../components/Footer';
import Button from '../../components/Button'; 

const SortingGuidelines = () => {
  const location = useLocation();
  const { selectedWasteTypes } = location.state; // Get selected waste types from navigation state
  const [currentWasteIndex, setCurrentWasteIndex] = useState(0); // Track which waste type to display
  const [sortingGuidelines, setSortingGuidelines] = useState(null); // Current sorting guidelines
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch guidelines for the current waste type
  useEffect(() => {
    const fetchSortingGuidelines = async () => {
      setLoading(true);
      try {
        const response = await cleanWasteAPI.get(`/waste/guidelines/${selectedWasteTypes[currentWasteIndex]}`);
        setSortingGuidelines(response.data.guidelines || []);
      } catch (error) {
        console.error('Error fetching sorting guidelines:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSortingGuidelines();
  }, [currentWasteIndex, selectedWasteTypes]);

  // Handle "Next" button
  const handleNext = () => {
    if (currentWasteIndex < selectedWasteTypes.length - 1) {
      setCurrentWasteIndex(currentWasteIndex + 1);
    } else {
      alert('You have reviewed all the guidelines.');
      navigate('/'); // Redirect to the home page or another final page
    }
  };

  // Handle "Back" button
  const handleBack = () => {
    if (currentWasteIndex > 0) {
      setCurrentWasteIndex(currentWasteIndex - 1);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-6 sm:py-12">
        {/* Step Indicator */}
        <div className="w-full max-w-lg sm:max-w-xl mb-4">
          <div className="relative w-full h-2 bg-gray-300 rounded-full">
            <div className="absolute top-0 left-0 h-full bg-[#175E5E] transition-all duration-300" 
                 style={{ width: `${((currentWasteIndex + 1) / selectedWasteTypes.length) * 100}%` }}></div>
          </div>
          <p className="text-sm text-[#175E5E] text-center mt-2">Step 2 of 2: Sorting Guidelines</p>
        </div>

        <h1 className="text-4xl font-bold text-[#175E5E] mb-6 text-center leading-snug">
          Sorting Guidelines for {selectedWasteTypes[currentWasteIndex]}
        </h1>

        {/* Loader */}
        {loading && (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-green-500"></div>
            <span className="ml-3 text-gray-700 text-lg">Loading guidelines...</span>
          </div>
        )}

        {/* Display Sorting Guidelines */}
        {!loading && sortingGuidelines && (
          <div className="mt-8 bg-gray-200 p-6 rounded-lg shadow-lg w-full max-w-2xl">
            <ul className="list-disc pl-5 text-gray-700 space-y-3 text-lg">
              {sortingGuidelines.map((guideline, index) => (
                <li key={index}>{guideline}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-8 flex space-x-4">
          <Button
            text="Back"
            onClick={handleBack}
            className={`px-6 sm:px-8 py-3 sm:py-4 bg-gray-400 text-white font-semibold rounded-full shadow-lg hover:bg-gray-500 transition duration-300 ease-in-out ${
              currentWasteIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={currentWasteIndex === 0}
          />
          <Button
            text={currentWasteIndex < selectedWasteTypes.length - 1 ? "Next" : "Finish"}
            onClick={handleNext}
            className="px-6 sm:px-8 py-3 sm:py-4 bg-[#175E5E] text-white font-semibold rounded-full shadow-lg hover:bg-[#134c4c] hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105"
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SortingGuidelines;
