import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";

const NavLinks = ({ onLinkClick }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Authentication state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown state
  const navigate = useNavigate(); // For navigation

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated"); // Remove authentication status from localStorage
    navigate("/", { replace: true });
  };

  const baseClasses =
    "text-white block md:inline-block hover:text-gray-200 transition duration-300";

  return (
    <>
    <Link to="home" onClick={onLinkClick} className={baseClasses}>
        Home
      </Link>
      <Link to="Playbox" onClick={onLinkClick} className={baseClasses}>
        Playbox
      </Link>
      <Link to="mypicks" onClick={onLinkClick} className={baseClasses}>
        Mypicks
      </Link>
      <Link to="whishlist" onClick={onLinkClick} className={baseClasses}>
       Whishlist
      </Link>
      <Link to="buysell" onClick={onLinkClick} className={baseClasses}>
        Buysell
      </Link>
      {/* <Link to="booknow" onClick={onLinkClick} className={baseClasses}>
        Booknow
      </Link> */}
      <Link to="dashboard" onClick={onLinkClick} className={baseClasses}>
        Dashboard
      </Link>




      {/* "More" Dropdown */}
      <div className="relative inline-block">
        <button
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          className={`${baseClasses} focus:outline-none`}
        >
          More
        </button>
        {isDropdownOpen && (
          <div className="absolute bg-gray-800 text-white shadow-lg rounded-md mt-2">
            <Link
              to="chathub"
              onClick={onLinkClick}
              className="block px-4 py-2 hover:bg-gray-700"
            >
              Chathub
            </Link>
            <Link
              to="badges"
              onClick={onLinkClick}
              className="block px-4 py-2 hover:bg-gray-700"
            >
              Badges
            </Link>
            <Link
              to="guidhub"
              onClick={onLinkClick}
              className="block px-4 py-2 hover:bg-gray-700"
            >
              Guidhub
            </Link>
            <Link
              to="mapintegration"
              onClick={onLinkClick}
              className="block px-4 py-2 hover:bg-gray-700"
            >
              Mapintegration
            </Link>
            <Link
              to="notification"
              onClick={onLinkClick}
              className="block px-4 py-2 hover:bg-gray-700"
            >
              Notification
            </Link>
            <Link
              to="buysell"
              onClick={onLinkClick}
              className="block px-4 py-2 hover:bg-gray-700"
            >
              Buysell
            </Link>
          </div>
        )}
      </div>

      {isAuthenticated && (
        <Link
          to="/"
          onClick={(e) => {
            e.preventDefault();
            onLinkClick();
            handleLogout();
          }}
          className={baseClasses}
        >
          Logout
        </Link>
      )}
    </>
  );
};

// PropTypes validation
NavLinks.propTypes = {
  onLinkClick: PropTypes.func,
};

// Default props
NavLinks.defaultProps = {
  onLinkClick: () => {},
};

export default NavLinks;
