"use client";

import { useState } from "react";
import Link from "next/link";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow relative z-50">
      <div className="">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            {/* Direct reference to public folder image */}
            <Link href="/" className="flex items-center">
              <img src="/logo.png" alt="Logo" className="h-32 w-32" />
            </Link>

            <div className="hidden md:flex md:items-center md:space-x-6">
              <Link href="/" className="text-black">Home</Link>
              <Link href="/destinations" className="text-gray-500 hover:text-black">Destinations</Link>
              <Link href="/packages" className="text-gray-500 hover:text-black">Packages</Link>
              <Link href="/services" className="text-gray-500 hover:text-black">Services</Link>
              <Link href="/about" className="text-gray-500 hover:text-black">About Us</Link>
              <Link href="/contact" className="text-gray-500 hover:text-black">Contact Us</Link>
            </div>
          </div>

          <div className="flex items-center space-x-4 mr-7">
            <button
              className="md:hidden text-gray-700"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Direct reference to public folder image */}
            <img
              src="/user.jpg"
              alt="User"
              className="hidden md:block w-10 h-10 rounded-full"
            />
          </div>
        </div>

        {menuOpen && (
          <div className="mt-4 flex flex-col space-y-2 md:hidden px-4 pb-4">
            <Link href="/" className="text-blue-700" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link href="/about" className="text-gray-800 hover:text-blue-700" onClick={() => setMenuOpen(false)}>About</Link>
            <Link href="/services" className="text-gray-800 hover:text-blue-700" onClick={() => setMenuOpen(false)}>Services</Link>
            <Link href="/packages" className="text-gray-800 hover:text-blue-700" onClick={() => setMenuOpen(false)}>Packages</Link>
            <Link href="/destinations" className="text-gray-800 hover:text-blue-700" onClick={() => setMenuOpen(false)}>Destinations</Link>
            <Link href="/contact" className="text-gray-800 hover:text-blue-700" onClick={() => setMenuOpen(false)}>Contact</Link>
            <img src="/user.jpg" alt="User" className="w-8 h-8 rounded-full"/>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;