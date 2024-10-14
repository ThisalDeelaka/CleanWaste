import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHistory, FaRecycle, FaUserAlt } from 'react-icons/fa';  // Import icons from react-icons

const Sidebar = () => {
  const location = useLocation();  // Get current location to highlight active link

  const navItems = [
    { name: "Waste History", path: "/Profile", icon: <FaHistory /> },
    { name: "Recycling", path: "/Recycling", icon: <FaRecycle /> },
    { name: "Membership", path: "/Membership", icon: <FaUserAlt /> },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white p-6 hidden lg:block shadow-lg">
      <nav>
        <ul className="space-y-6">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center text-lg font-semibold transition-all duration-300 ease-in-out hover:text-yellow-400
                  ${location.pathname === item.path ? "text-yellow-400" : "text-gray-300"}
                `}
              >
                <span className="mr-3 text-xl">{item.icon}</span>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
