import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useDriverAuth } from "../context/driverAuthContext"; // Importing the useAuth context

const DNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { auth, logout } = useDriverAuth(); // Accessing auth (user and token) and logout from AuthContext
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout(); // Logout the user
    navigate("/driverHomePage"); // Redirect to driver home page after logout
  };

  return (
    <nav className="bg-[#0c343d] text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-white">
              ClearWaste
            </Link>
          </div>

          {/* Links (hidden on mobile, visible on large screens) */}
          <div className="hidden md:flex space-x-4">
            <Link
              to="/"
              className="px-3 py-2 rounded-md text-sm font-medium hover:text-yellow-400 hover:underline hover:underline-offset-4 transition-all duration-200"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="px-3 py-2 rounded-md text-sm font-medium hover:text-yellow-400 hover:underline hover:underline-offset-4 transition-all duration-200"
            >
              About
            </Link>
            <Link
              to="/services"
              className="px-3 py-2 rounded-md text-sm font-medium hover:text-yellow-400 hover:underline hover:underline-offset-4 transition-all duration-200"
            >
              Services
            </Link>
            <Link
              to="/contact"
              className="px-3 py-2 rounded-md text-sm font-medium hover:text-yellow-400 hover:underline hover:underline-offset-4 transition-all duration-200"
            >
              Contact
            </Link>

            {/* Conditionally show Login/Sign Up or Logout based on auth.user */}
            {auth?.user ? (
              <button
                onClick={handleLogout} // Call handleLogout when logout is clicked
                className="px-3 py-2 bg-red-500 rounded-md text-sm font-medium hover:bg-red-600 transition-all duration-200"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/driverLogin"
                  className="px-3 py-2 bg-yellow-400 rounded-md text-sm font-medium text-[#0c343d] hover:bg-yellow-300 transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/driverSignup"
                  className="px-3 py-2 bg-transparent border border-yellow-400 rounded-md text-sm font-medium hover:bg-yellow-400 hover:text-[#0c343d] transition-all duration-200"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Hamburger Icon for mobile */}
          <div className="md:hidden">
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
                to="/"
                onClick={toggleMenu}
                className="block hover:text-yellow-400 hover:bg-[#134c4c] px-3 py-2 rounded-md text-base font-medium"
              >
                Home
              </Link>
              <Link
                to="/about"
                onClick={toggleMenu}
                className="block hover:text-yellow-400 hover:bg-[#134c4c] px-3 py-2 rounded-md text-base font-medium"
              >
                About
              </Link>
              <Link
                to="/services"
                onClick={toggleMenu}
                className="block hover:text-yellow-400 hover:bg-[#134c4c] px-3 py-2 rounded-md text-base font-medium"
              >
                Services
              </Link>
              <Link
                to="/contact"
                onClick={toggleMenu}
                className="block hover:text-yellow-400 hover:bg-[#134c4c] px-3 py-2 rounded-md text-base font-medium"
              >
                Contact
              </Link>

              {/* Conditionally show Login/Sign Up or Logout */}
              {auth?.user ? (
                <button
                  onClick={() => {
                    toggleMenu();
                    handleLogout(); // Logout and navigate to driverHomePage
                  }}
                  className="px-3 py-2 bg-[#ffe599] rounded-md text-sm font-medium hover:bg-yellow-300 transition-all duration-200"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/driverLogin"
                    onClick={toggleMenu}
                    className="block hover:text-yellow-400 hover:bg-[#134c4c] px-3 py-2 rounded-md text-base font-medium"
                  >
                    Driver Login
                  </Link>
                  <Link
                    to="/driverSignup"
                    onClick={toggleMenu}
                    className="block hover:text-yellow-400 hover:bg-[#134c4c] px-3 py-2 rounded-md text-base font-medium"
                  >
                    Driver Sign Up
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

export default DNavbar;
