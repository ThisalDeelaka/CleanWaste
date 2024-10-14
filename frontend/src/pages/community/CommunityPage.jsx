import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';

const CommunityPage = () => {

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#175E5E] to-[#134c4c] text-white">
        <div className="text-center p-6 max-w-4xl">
          <h1 className="text-6xl font-extrabold tracking-tight">
            <span className="text-yellow-400">ClearWaste</span> Community
          </h1>
          <p className="text-2xl mt-4 leading-relaxed">
            An initiative for a cleaner Community
          </p>
          
          {/* Call to Action Buttons */}
          <div className="mt-8 flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-6 justify-center">
            <Link to="/CreateEvent">
            <button className="px-8 py-4 bg-yellow-400 text-[#175E5E] font-semibold rounded-lg shadow-lg hover:bg-yellow-300 hover:shadow-xl transition-all duration-300">
              Create a Event
            </button>
            </Link>
            <button className="px-8 py-4 bg-transparent text-white border border-white font-semibold rounded-lg hover:bg-white hover:text-[#175E5E] transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CommunityPage;
