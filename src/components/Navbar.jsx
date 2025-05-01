
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-aadhaar-primary text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link to="/" className="text-xl font-roboto font-bold mb-4 md:mb-0">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
              <line x1="4" y1="22" x2="4" y2="15"></line>
            </svg>
            <span>Aadhaar Portal</span>
          </div>
        </Link>
        
        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
          <Link to="/register" className="px-3 py-2 rounded hover:bg-blue-700 transition-colors">
            Register
          </Link>
          <Link to="/family-tree" className="px-3 py-2 rounded hover:bg-blue-700 transition-colors">
            Family Tree
          </Link>
          <Link to="/admin" className="px-3 py-2 rounded hover:bg-blue-700 transition-colors">
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
