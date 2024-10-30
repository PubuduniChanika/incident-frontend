import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserService from "../service/UserService";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // State to manage hamburger menu
  const isAuthenticated = UserService.isAuthenticated();
  const isAdmin = UserService.isAdmin();

  const handleLogout = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to logout this user?"
    );
    if (confirmDelete) {
      UserService.logout();
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle the menu open state
  };

  return (
    <nav className="bg-gray-800 py-2">
      <div className="container mx-auto flex justify-between items-center max-w-7xl">
        <div className="text-white text-lg font-bold flex items-center">
          <Link to="/" className="hover:text-gray-400">
            <img
              src={require("../img/logo.png")}
              alt="Government Logo"
              className="mr-2 w-8 h-8"
            />
          </Link>
          <span>Prime Minister's Office</span>
        </div>

        {/* Hamburger icon */}
        <button 
          className="text-white md:hidden focus:outline-none"
          onClick={toggleMenu}
        >
          <svg 
            className="w-6 h-6"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        {/* Navigation links */}
        <ul 
          className={`flex-col md:flex md:flex-row md:space-x-4 md:items-center ${isOpen ? "flex" : "hidden"} md:flex`} 
          onClick={() => setIsOpen(false)} // Close the menu when clicking on a link
        >
          {/* {!isAuthenticated && (
            <li>
              <Link to="/" className="text-white hover:text-gray-400">
                Incident Reporting Form
              </Link>
            </li>
          )} */}

          {isAdmin && (
            <>
              <li>
                <Link to="/admin/get-incidents" className="text-white hover:text-gray-400">
                  Incidents
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/user-management"
                  className="text-white hover:text-gray-400"
                >
                  User Management
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-white hover:text-gray-400">
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-red-400 focus:outline-none"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
