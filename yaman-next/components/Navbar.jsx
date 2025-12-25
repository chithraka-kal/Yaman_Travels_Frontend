"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, LogOut, User, UserPlus } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "AI Planner", href: "/planner" },
    { name: "Packages", href: "/packages" },
    { name: "Destinations", href: "/destinations" },
    { name: "Services", href: "/services" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[110px]">
          
          {/* --- 1. LOGO --- */}
          <Link href="/" className="flex-shrink-0">
            <img 
              src="/logo.png" 
              alt="Yaman Travels" 
              width={80} 
              height={80} 
              className="rounded-full border border-gray-100 shadow-sm"
            />
          </Link>

          {/* --- 2. DESKTOP NAVIGATION --- */}
          <div className="hidden lg:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:text-orange-500 font-medium text-[15px] transition-colors uppercase tracking-wide"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* --- 3. LOGIN / REGISTER BUTTONS --- */}
          <div className="hidden lg:flex items-center gap-3">
            {session ? (
              // Logged In State
              // ... inside the {session ? (...)} block

<div className="flex items-center gap-3 bg-gray-50 px-1 py-1 pr-4 rounded-full border border-gray-100">
  {/* Make the user info clickable to go to Profile */}
  <Link href="/profile" className="flex items-center gap-3 hover:bg-gray-200 rounded-full px-3 py-1 transition-colors">
    <div className="text-right">
      <p className="text-xs font-bold text-gray-900 leading-none mb-1">
        {session.user.name}
      </p>
      <p className="text-[10px] text-gray-500 leading-none">
        {session.user.email}
      </p>
    </div>
    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold border border-orange-200">
      {session.user.name.charAt(0)}
    </div>
  </Link>

  {/* Sign Out Button stays separate */}
  <button 
    onClick={() => signOut({ callbackUrl: '/' })}
    className="ml-2 p-1.5 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
    title="Sign Out"
  >
    <LogOut className="w-4 h-4" />
  </button>
</div>
            ) : (
              // Logged Out State - Two Buttons
              <>
                <Link 
                  href="/login"
                  className="flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white rounded-lg transition-all duration-300 font-bold text-sm uppercase"
                >
                  <User className="w-4 h-4" />
                  Login
                </Link>
                <Link 
                  href="/register"
                  className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 border-2 border-orange-500 text-white hover:bg-orange-600 hover:border-orange-600 rounded-lg transition-all duration-300 font-bold text-sm uppercase shadow-md"
                >
                  <UserPlus className="w-4 h-4" />
                  Register
                </Link>
              </>
            )}
          </div>

          {/* --- MOBILE MENU BUTTON --- */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-orange-500 focus:outline-none"
            >
              {menuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* --- MOBILE MENU --- */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-orange-50"
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="border-t border-gray-100 pt-4 mt-2 space-y-3">
              {session ? (
                 <button 
                   onClick={() => signOut()}
                   className="w-full flex items-center gap-2 px-3 py-3 text-red-500 hover:bg-red-50 rounded-md font-bold"
                 >
                   <LogOut className="w-5 h-5" /> Sign Out ({session.user.name})
                 </button>
              ) : (
                // Mobile Buttons
                <div className="flex flex-col gap-3">
                    <Link 
                      href="/login"
                      className="block w-full text-center px-3 py-3 border-2 border-green-500 text-green-600 rounded-md font-bold hover:bg-green-50"
                      onClick={() => setMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link 
                      href="/register"
                      className="block w-full text-center px-3 py-3 bg-orange-500 text-white rounded-md font-bold hover:bg-orange-600"
                      onClick={() => setMenuOpen(false)}
                    >
                      Register
                    </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}