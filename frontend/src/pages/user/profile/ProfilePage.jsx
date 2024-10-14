// ProfilePage.js
import React from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Sidebar from './Sidebar';
import WasteHistory from './WasteHistory'; // Component to display waste request history

const ProfilePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar remains on top */}
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar for larger screens */}
        <Sidebar />

        {/* Main content */}
        <main className="flex-1 p-4 lg:ml-56"> {/* Reduced margin to lg:ml-56 */}
          <h1 className="text-2xl sm:text-3xl font-semibold mb-4 text-center">Waste Request History</h1>
          <WasteHistory />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default ProfilePage;
