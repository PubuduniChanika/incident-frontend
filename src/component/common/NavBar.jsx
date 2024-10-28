import React from "react";
import { Link } from "react-router-dom";
import UserService from "../service/UserService";

function Navbar() {
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

  return (
    <nav className="bg-gray-800 py-2"> {/* Adjusted padding for compactness */}
      <div className="container mx-auto flex justify-between items-center max-w-7xl"> {/* Limit width */}
        <div className="text-white text-lg font-bold flex items-center"> {/* Ensure the logo and title are aligned */}
          <Link to="/" className="hover:text-gray-400">
            <img
              src={require("../img/logo.png")}
              alt="Government Logo"
              className="mr-2 w-8 h-8" // Adjusts the size of the image
            />
          </Link>
          <span>Prime Minister's Office</span> {/* Optional site title */}
        </div>
        <ul className="flex space-x-4">
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
