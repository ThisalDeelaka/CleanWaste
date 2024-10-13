import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';  // Icons for mobile menu

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#175E5E] text-white">
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
            <Link to="/" className="hover:bg-[#134c4c] px-3 py-2 rounded-md text-sm font-medium">Home</Link>
            <Link to="/about" className="hover:bg-[#134c4c] px-3 py-2 rounded-md text-sm font-medium">About</Link>
            <Link to="/services" className="hover:bg-[#134c4c] px-3 py-2 rounded-md text-sm font-medium">Services</Link>
            <Link to="/contact" className="hover:bg-[#134c4c] px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
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
              <Link to="/" onClick={toggleMenu} className="block hover:bg-[#134c4c] px-3 py-2 rounded-md text-base font-medium">Home</Link>
              <Link to="/about" onClick={toggleMenu} className="block hover:bg-[#134c4c] px-3 py-2 rounded-md text-base font-medium">About</Link>
              <Link to="/services" onClick={toggleMenu} className="block hover:bg-[#134c4c] px-3 py-2 rounded-md text-base font-medium">Services</Link>
              <Link to="/contact" onClick={toggleMenu} className="block hover:bg-[#134c4c] px-3 py-2 rounded-md text-base font-medium">Contact</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
