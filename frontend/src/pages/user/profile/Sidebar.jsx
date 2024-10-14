// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-56 bg-gray-800 text-white p-4 hidden lg:block"> {/* Reduced width to w-56 */}
      <nav>
        <ul>
          <li className="mb-4">
            <Link to="/dashboard" className="text-lg hover:text-blue-400">Dashboard</Link>
          </li>
          <li className="mb-4">
            <Link to="/Profile" className="text-lg hover:text-blue-400">Waste History</Link>
          </li>
          <li className="mb-4">
            <Link to="/Recycling" className="text-lg hover:text-blue-400">Recycling</Link>
          </li>
          <li className="mb-4">
            <Link to="/Membership" className="text-lg hover:text-blue-400">Membership</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
