import React, { useState } from "react";
import "../stylesheets/Header.css";
import bellImg from "../images/notification-bell.png";
import adminImg from "../images/admin.png";
import { Link } from "react-router-dom";

const Header = ({ toggleSidebar }) => {

  const [openMenu, setOpenMenu] = useState(false);

  // =========================
  // LOGOUT FUNCTION
  // =========================
  const handleLogout = () => {

    // clear storage
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    // redirect
    window.location.href = "http://localhost:3000";
  };

  return (

    <header className="adminHeader">

      <div className="navLogoHeading">

        {/* Sidebar Toggle */}
        <p
          className="nav"
          onClick={toggleSidebar}
        >
          <i className="fa-solid fa-bars"></i>
        </p>

        {/* App Name */}
        <p className="logoText">
          ReFinder
        </p>

      </div>

      <div className="menuButtons">

        {/* Notification Bell */}
        <button className="iconBtn notify">

          <img
            src={bellImg}
            alt="notifications"
          />

        </button>

        {/* Admin Profile */}
        <div className="profileWrapper">

          <button
            className="profileToggle"
            onClick={() => setOpenMenu(prev => !prev)}
          >

            <img
              src={adminImg}
              alt="admin"
            />

            <span className="userName">
              Admin
            </span>

            <i className="fa-solid fa-chevron-down arrow"></i>

          </button>

          {/* DROPDOWN */}
          {openMenu && (

            <div className="profileDropdown">

              <Link
                className="l"
                onClick={handleLogout}
              >
                <p>Logout</p>
              </Link>

            </div>

          )}

        </div>

      </div>

    </header>
  );
};

export default Header;