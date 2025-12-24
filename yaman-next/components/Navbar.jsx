// src/components/navbar.jsx
import { useState } from "react";
import Link from "next/link";
import logo from "../assets/logo.png";
import user from "../assets/user.jpg";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow">
      <div className="">
        {/* Top row */}
        <div className="flex items-center justify-between">
          {/* Left: Logo + Navigation (desktop) */}
          <div className="flex items-center space-x-6">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Logo" className="h-32 w-32" />
            </Link>

            {/* Navigation - desktop only */}
            <div className="hidden md:flex md:items-center md:space-x-6">
              <Link to="/" className="text-black">Home</Link>
              <Link to="/destinations" className="text-gray-500 hover:text-black">Destinations</Link>
              <Link to="/packages" className="text-gray-500 hover:text-black">Packages</Link>
              <Link to="/services" className="text-gray-500 hover:text-black">Services</Link>
              <Link to="/about" className="text-gray-500 hover:text-black">About Us</Link>
              <Link to="/contact" className="text-gray-500 hover:text-black">Contact Us</Link>
            </div>
          </div>

          {/* Right: Profile (desktop) and Hamburger (mobile) */}
          <div className="flex items-center space-x-4 mr-7">
            {/* Hamburger - mobile only */}
            <button
              className="md:hidden text-gray-700"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Profile - desktop only */}
            <img
              src={user}
              alt="User"
              className="hidden md:block w-10 h-10 rounded-full"
            />
          </div>
        </div>

        {/* Mobile navigation menu */}
        {menuOpen && (
          <div className="mt-4 flex flex-col space-y-2 md:hidden px-4">
            <Link to="/" className="text-blue-700">Home</Link>
            <Link to="/about" className="text-gray-800 hover:text-blue-700">About</Link>
            <Link to="/services" className="text-gray-800 hover:text-blue-700">Services</Link>
            <Link to="/packages" className="text-gray-800 hover:text-blue-700">Packages</Link>
            <Link to="/destinations" className="text-gray-800 hover:text-blue-700">Destinations</Link>
            <Link to="/contact" className="text-gray-800 hover:text-blue-700">Contact</Link>
            <img src={user} alt="User" className="w-8 h-8 rounded-full"/>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
