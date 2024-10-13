import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';  // Social media icons

const Footer = () => {
  return (
    <footer className="bg-[#175E5E] text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center flex-col md:flex-row">
          
          {/* Navigation Links */}
          <div className="flex space-x-6 mb-4 md:mb-0">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/about" className="hover:underline">About</Link>
            <Link to="/services" className="hover:underline">Services</Link>
            <Link to="/contact" className="hover:underline">Contact</Link>
          </div>
          
          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <a href="https://facebook.com" className="hover:text-gray-400" target="_blank" rel="noopener noreferrer"><FaFacebook size={24} /></a>
            <a href="https://twitter.com" className="hover:text-gray-400" target="_blank" rel="noopener noreferrer"><FaTwitter size={24} /></a>
            <a href="https://instagram.com" className="hover:text-gray-400" target="_blank" rel="noopener noreferrer"><FaInstagram size={24} /></a>
          </div>
        </div>
        <div className="mt-4 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} ClearWaste. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
