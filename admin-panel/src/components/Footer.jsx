import React from "react";
import "../stylesheets/Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="admin-footer">
      <div className="admin-footer-container">

        <div className="admin-footer-contact">
          <h3>Admin Support</h3>
          <p><i className="fa fa-phone"></i> +44-7526165003</p>
          <p>adminsupport@refinder.com</p>
        </div>

        <div className="admin-footer-links">
          <h3>Quick Links</h3>
          <div className="links">
            <Link to="/admin">Dashboard</Link>
            <Link to="/admin/users">Manage Users</Link>
            <Link to="/admin/lost-items">Lost Items</Link>
            <Link to="/admin/found-items">Found Items</Link>
            <Link to="/admin/reports">Reports</Link>
            <Link to="/admin/settings">Settings</Link>
          </div>
        </div>

      </div>

      <div className="admin-footer-bottom">
        2026 &copy; ReFinder Admin Panel | Designed by <a href="#">Yugta</a>
      </div>
    </footer>
  );
};

export default Footer;
