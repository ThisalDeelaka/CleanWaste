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
      // All waste types have been shown, navigate to some final page or show completion message
      alert('You have reviewed all the guidelines.');
      navigate('/'); // Redirect to the home page or another final page
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-6 sm:py-12">
        {/* Step Indicator */}
        <div className="w-full max-w-lg sm:max-w-xl mb-4">
          <div className="h-2 bg-gray-300 rounded-full">
            <div className="h-full bg-[#175E5E]" style={{ width: `${((currentWasteIndex + 1) / selectedWasteTypes.length) * 100}%` }}></div>
          </div>
          <p className="text-sm text-[#175E5E] text-center mt-2">Step 2 of 2: Sorting Guidelines</p>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-[#175E5E] mb-6 text-center">
          Sorting Guidelines for {selectedWasteTypes[currentWasteIndex]}
        </h1>

        {/* Loader */}
        {loading && <div className="loader">Loading sorting guidelines...</div>}

        {/* Display Sorting Guidelines */}
        {!loading && sortingGuidelines && (
          <div className="mt-8 bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-lg sm:max-w-2xl">
            <ul className="list-disc pl-5 text-gray-700 space-y-2 text-sm sm:text-base">
              {sortingGuidelines.map((guideline, index) => (
                <li key={index}>{guideline}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Next Button */}
        <Button
          text={currentWasteIndex < selectedWasteTypes.length - 1 ? "Next" : "Finish"}
          onClick={handleNext}
          className="mt-8 px-6 sm:px-8 py-3 sm:py-4 bg-[#175E5E] text-white font-semibold rounded-lg shadow-lg hover:bg-[#134c4c] transition duration-200"
        />
      </main>

      <Footer />
    </div>
  );
};

export default SortingGuidelines;
