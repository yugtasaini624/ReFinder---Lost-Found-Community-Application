import React from "react";
import { Link, useNavigate }  from "react-router-dom";
import "../stylesheets/Sidebar.css";

const UserNavbar = ({ isOpen, toggleSidebar }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const navigate = useNavigate();
  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>

      <div className="sidebar-top">
        <span className="app-name">ReFinder</span>
        <span className="close-btn" onClick={toggleSidebar}>
          &times;
        </span>
      </div>

      <ul className="menu">

        <li className="menu-item">
          <i className="fa fa-home icon"></i>
          {isOpen && (
            <span className="label">
              <Link className="menu-links" to="/">Home</Link>
            </span>
          )}
        </li>

        <li className="menu-item">
          <i className="fa fa-box icon"></i>
          {isOpen && (
            <span className="label">
              <Link className="menu-links" to="/user/myitems">My Items</Link>
            </span>
          )}
        </li>

        <li className="menu-item">
          <i className="fa fa-circle-exclamation icon"></i>
          {isOpen && (
            <span className="label">
              <Link className="menu-links" to="/lostItems">Lost Items</Link>
            </span>
          )}
        </li>

        <li className="menu-item">
          <i className="fa fa-box-open icon"></i>
          {isOpen && (
            <span className="label">
              <Link className="menu-links" to="/foundItems">Found Items</Link>
            </span>
          )}
        </li>

        <li className="menu-item">
          <i class="fa-solid fa-trophy"></i>
          {isOpen && (
            <span className="label">
              <Link className="menu-links" to="/user/story">Success Story</Link>
            </span>
          )}
        </li>

        <li className="menu-item">
          <i className="fa fa-sign-out-alt icon"></i>
          {isOpen && (
            <span className="label">
              <Link className="menu-links" to="/login" onClick={handleLogout}>Logout</Link>
            </span>
          )}
        </li>

      </ul>
    </div>
  );
};

export default UserNavbar;
