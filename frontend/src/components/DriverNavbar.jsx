import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUser, FaBell } from "react-icons/fa"; // Importing notification icon (FaBell)
import { useAuth } from "../context/AuthContext";
import cleanWasteAPI from "../api/cleanWasteAPI"; // Assuming this is where your API is set up

const DriverNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch driver notifications from the backend
    const fetchNotifications = async () => {
      try {
        const response = await cleanWasteAPI.get("/users/profile");
        setNotifications(response.data.notifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-[#0c343d] text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-white">
              ClearWaste Driver
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-4 items-center">
            <Link
              to="/driverHomePage"
              className="px-3 py-2 rounded-md text-sm font-medium hover:text-yellow-400 hover:underline hover:underline-offset-4 transition-all duration-200"
            >
              Home
            </Link>
            <Link
              to="/driver/pickup-requests"
              className="px-3 py-2 rounded-md text-sm font-medium hover:text-yellow-400 hover:underline hover:underline-offset-4 transition-all duration-200"
            >
              Pickup Requests
            </Link>
            <Link
              to="/driver/waste-code-entries"
              className="px-3 py-2 rounded-md text-sm font-medium hover:text-yellow-400 hover:underline hover:underline-offset-4 transition-all duration-200"
            >
              Waste Code Entries
            </Link>
            <Link
              to="/driver/route-completions"
              className="px-3 py-2 rounded-md text-sm font-medium hover:text-yellow-400 hover:underline hover:underline-offset-4 transition-all duration-200"
            >
              Route Completions
            </Link>
            <Link
              to="/driver/recycling-center"
              className="px-3 py-2 rounded-md text-sm font-medium hover:text-yellow-400 hover:underline hover:underline-offset-4 transition-all duration-200"
            >
              Recycling Center
            </Link>
            <Link
              to="/driver/recycling-center"
              className="px-3 py-2 rounded-md text-sm font-medium hover:text-yellow-400 hover:underline hover:underline-offset-4 transition-all duration-200"
            >
              Notifications
            </Link>

            {/* Notification Bell Icon */}
            <div className="relative">
              <button
                onClick={toggleNotifications}
                className="relative text-white hover:text-yellow-400"
              >
                <FaBell size={24} />
                {notifications.length > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                    {notifications.length}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg overflow-hidden z-10">
                  <div className="p-4">
                    <h2 className="font-bold text-lg mb-2">Notifications</h2>
                    <ul className="list-none">
                      {notifications.length > 0 ? (
                        notifications.map((notification, index) => (
                          <li key={index} className="mb-2 text-gray-700">
                            <span>{notification.message}</span>
                            <br />
                            <span className="text-sm text-gray-500">
                              {new Date(notification.date).toLocaleDateString()}
                            </span>
                          </li>
                        ))
                      ) : (
                        <li>No notifications available.</li>
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Profile and Logout */}
            {auth?.user ? (
              <>
                <Link to="#" className="text-white hover:text-yellow-400">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-yellow-400 p-1 hover:border-yellow-300 transition-all duration-200">
                    <FaUser size={24} />
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 bg-red-500 rounded-md text-sm font-medium hover:bg-red-600 transition-all duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3 py-2 bg-yellow-400 rounded-md text-sm font-medium text-[#0c343d] hover:bg-yellow-300 transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-2 bg-transparent border border-yellow-400 rounded-md text-sm font-medium hover:bg-yellow-400 hover:text-[#0c343d] transition-all duration-200"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Hamburger and Notification Icon for Mobile */}
          <div className="md:hidden flex items-center">
            {/* Notification Bell Icon for Mobile */}
            <div className="relative mr-4">
              <button
                onClick={toggleNotifications}
                className="relative text-white hover:text-yellow-400"
              >
                <FaBell size={24} />
                {notifications.length > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                    {notifications.length}
                  </span>
                )}
              </button>
            </div>

            <button onClick={toggleMenu} className="text-white">
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu (Visible only when the menu is open) */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/driver/home"
                onClick={toggleMenu}
                className="block hover:text-yellow-400 hover:bg-[#134c4c] px-3 py-2 rounded-md text-base font-medium"
              >
                Home
              </Link>
              <Link
                to="/driver/pickup-requests"
                onClick={toggleMenu}
                className="block hover:text-yellow-400 hover:bg-[#134c4c] px-3 py-2 rounded-md text-base font-medium"
              >
                Pickup Requests
              </Link>
              <Link
                to="/driver/waste-code-entries"
                onClick={toggleMenu}
                className="block hover:text-yellow-400 hover:bg-[#134c4c] px-3 py-2 rounded-md text-base font-medium"
              >
                Waste Code Entries
              </Link>
              <Link
                to="/driver/route-completions"
                onClick={toggleMenu}
                className="block hover:text-yellow-400 hover:bg-[#134c4c] px-3 py-2 rounded-md text-base font-medium"
              >
                Route Completions
              </Link>
              <Link
                to="/driver/recycling-center"
                onClick={toggleMenu}
                className="block hover:text-yellow-400 hover:bg-[#134c4c] px-3 py-2 rounded-md text-base font-medium"
              >
                Recycling Center
              </Link>

              {/* Profile and Logout */}
              {auth?.user ? (
                <>
                  <Link
                    to="/driver/profile"
                    onClick={toggleMenu}
                    className="block hover:text-yellow-400 hover:bg-[#134c4c] px-3 py-2 rounded-md text-base font-medium"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      toggleMenu();
                      handleLogout();
                    }}
                    className="px-3 py-2 bg-[#ffe599] rounded-md text-sm font-medium hover:bg-yellow-300 transition-all duration-200"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={toggleMenu}
                    className="block hover:text-yellow-400 hover:bg-[#134c4c] px-3 py-2 rounded-md text-base font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={toggleMenu}
                    className="block hover:text-yellow-400 hover:bg-[#134c4c] px-3 py-2 rounded-md text-base font-medium"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default DriverNavbar;
