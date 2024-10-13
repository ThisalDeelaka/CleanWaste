import React from "react";
import DriverNavbar from "../../components/GcNavbar";
import Footer from "../../components/Footer";

const CollectorHomePage = () => {
  return (
    <div>
      {/* Navbar */}
      <DriverNavbar />

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#175E5E] to-[#134c4c] text-white">
        <div className="text-center p-6 max-w-4xl">
          <h1 className="text-6xl font-extrabold tracking-tight">
            Welcome, <span className="text-yellow-400">Driver</span>
          </h1>
          <p className="text-2xl mt-4 leading-relaxed">
            Manage your routes, confirm pickups, and help keep the environment clean.
          </p>

          {/* Call to Action Buttons */}
          <div className="mt-8 flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-6 justify-center">
            <button className="px-8 py-4 bg-yellow-400 text-[#175E5E] font-semibold rounded-lg shadow-lg hover:bg-yellow-300 hover:shadow-xl transition-all duration-300">
              View Routes
            </button>
            <button className="px-8 py-4 bg-transparent text-white border border-white font-semibold rounded-lg hover:bg-white hover:text-[#175E5E] transition-all duration-300">
              Report Issue
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="flex flex-col items-center justify-center bg-white py-12 px-8 w-full sm:w-3/4 lg:w-1/2 shadow-xl rounded-lg mt-16 text-gray-800">
          <h2 className="text-4xl font-bold text-center text-[#175E5E] mb-8">
            Your Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-center">
            <div className="flex items-start">
              <span className="mr-3 text-[#175E5E]">✔</span>
              View optimized collection routes and schedules.
            </div>
            <div className="flex items-start">
              <span className="mr-3 text-[#175E5E]">✔</span>
              Confirm pickups using Collection IDs.
            </div>
            <div className="flex items-start">
              <span className="mr-3 text-[#175E5E]">✔</span>
              Report missed pickups or sorting issues.
            </div>
            <div className="flex items-start">
              <span className="mr-3 text-[#175E5E]">✔</span>
              Real-time tracking and issue reporting.
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CollectorHomePage;
