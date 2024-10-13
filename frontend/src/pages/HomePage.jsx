import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content */}
      <main className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#175E5E]">Welcome to ClearWaste</h1>
          <p className="text-lg text-gray-700 mt-4">Your smart waste management solution for a cleaner environment.</p>
          <button className="mt-6 px-6 py-3 bg-[#175E5E] text-white font-semibold rounded-lg hover:bg-[#134c4c] transition duration-200">
            Get Started
          </button>
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
