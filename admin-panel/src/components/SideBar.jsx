import React from "react";
import { Link } from "react-router-dom";
import "../stylesheets/SideBar.css";

const SideBar = ({ isOpen, toggleSidebar }) => {
  if (!isOpen) return null; 

  const handleLogout = () => {

  // clear everything
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("user");

  // redirect to frontend login
  window.location.href = "https://refinder-lost-found-community-appli.vercel.app";
};

  return (
    <div className="admin-sidebar open">
      {/* Sidebar Top */}
      <div className="sidebar-top">
        <span className="app-name">ReFinder</span>
        <span className="close-btn" onClick={toggleSidebar}>&times;</span>
      </div>

      {/* Sidebar Menu */}
      <ul className="menu">
        <li className="menu-item">
          <i className="fa fa-tachometer-alt icon"></i>
          <span className="label"><Link to="/" className="admin-links">Dashboard</Link></span>
        </li>
        <li className="menu-item">
          <i className="fa fa-users icon"></i>
          <span className="label"><Link to="/admin/manageusers" className="admin-links">Manage Users</Link></span>
        </li>
        <li className="menu-item">
          <i className="fa fa-search icon"></i>
          <span className="label"><Link to="/admin/lost-items" className="admin-links">Lost Items</Link></span>
        </li>
        <li className="menu-item">
          <i className="fa fa-gift icon"></i>
          <span className="label"><Link to="/admin/found-items" className="admin-links">Found Items</Link></span>
        </li>
        <li className="menu-item">
          <i class="fa-solid fa-chart-area"></i>
          <span className="label"><Link to="/admin/statistics"className="admin-links">Statistics</Link></span>
        </li>
        <li className="menu-item">
          <i class="fa-solid fa-trophy"></i>
          <span className="label"><Link to="/admin/story" className="admin-links">Success Story</Link></span>
        </li>
        <li className="menu-item">
          <i className="fa fa-sign-out-alt icon"></i>
          <span className="label"><Link className="admin-links" onClick={handleLogout}>Logout</Link></span>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
