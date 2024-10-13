import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../context/AuthContext"; // Assuming you have an AuthContext

const GcNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { auth, logout } = useAuth(); // Accessing auth and logout from AuthContext
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to the home page after logout
  };

  return (
    <nav className="bg-[#0c343d] text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/driver-home" className="text-2xl font-bold text-white">
              GC ClearWaste
            </Link>
          </div>

          {/* Links for larger screens */}
          <div className="hidden md:flex space-x-4">
            <Link
              to="/GcHome"
              className="px-3 py-2 rounded-md text-sm font-medium hover:text-yellow-400 hover:underline hover:underline-offset-4 transition-all duration-200"
            >
              Home
            </Link>
            <Link
              to="/pickup-requests"
              className="px-3 py-2 rounded-md text-sm font-medium hover:text-yellow-400 hover:underline hover:underline-offset-4 transition-all duration-200"
            >
              Pickup Requests
            </Link>
            <Link
              to="/qr-waste-code-entry"
              className="px-3 py-2 rounded-md text-sm font-medium hover:text-yellow-400 hover:underline hover:underline-offset-4 transition-all duration-200"
            >
              QR/Waste Code Entry
            </Link>
            <Link
              to="/route-completion"
              className="px-3 py-2 rounded-md text-sm font-medium hover:text-yellow-400 hover:underline hover:underline-offset-4 transition-all duration-200"
            >
              Route Completion
            </Link>
            <Link
              to="/recycling-center"
              className="px-3 py-2 rounded-md text-sm font-medium hover:text-yellow-400 hover:underline hover:underline-offset-4 transition-all duration-200"
            >
              Recycling Center
            </Link>

            {/* Logout Button */}
            {auth?.user ? (
              <button
                onClick={handleLogout}
                className="px-3 py-2 bg-red-500 rounded-md text-sm font-medium hover:bg-red-600 transition-all duration-200"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="px-3 py-2 bg-yellow-400 rounded-md text-sm font-medium text-[#0c343d] hover:bg-yellow-300 transition-all duration-200"
              >
                Login
              </Link>
            )}
          </div>

          {/* Hamburger menu for mobile view */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white">
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/GcHome"
                onClick={toggleMenu}
                className="block hover:text-yellow-400 hover:bg-[#134c4c] px-3 py-2 rounded-md text-base font-medium"
              >
                Home
              </Link>
              <Link
                to="/pickup-requests"
                onClick={toggleMenu}
                className="block hover:text-yellow-400 hover:bg-[#134c4c] px-3 py-2 rounded-md text-base font-medium"
              >
                Pickup Requests
              </Link>
              <Link
                to="/qr-waste-code-entry"
                onClick={toggleMenu}
                className="block hover:text-yellow-400 hover:bg-[#134c4c] px-3 py-2 rounded-md text-base font-medium"
              >
                QR/Waste Code Entry
              </Link>
              <Link
                to="/route-completion"
                onClick={toggleMenu}
                className="block hover:text-yellow-400 hover:bg-[#134c4c] px-3 py-2 rounded-md text-base font-medium"
              >
                Route Completion
              </Link>
              <Link
                to="/recycling-center"
                onClick={toggleMenu}
                className="block hover:text-yellow-400 hover:bg-[#134c4c] px-3 py-2 rounded-md text-base font-medium"
              >
                Recycling Center
              </Link>

              {/* Logout for mobile */}
              {auth?.user ? (
                <button
                  onClick={() => {
                    toggleMenu();
                    handleLogout();
                  }}
                  className="px-3 py-2 bg-red-500 rounded-md text-sm font-medium hover:bg-red-600 transition-all duration-200"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={toggleMenu}
                  className="block hover:text-yellow-400 hover:bg-[#134c4c] px-3 py-2 rounded-md text-base font-medium"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default GcNavbar;
