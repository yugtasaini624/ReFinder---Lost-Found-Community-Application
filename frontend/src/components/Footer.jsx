import React from "react";
import "../stylesheets/Footer.css";
import { Link } from "react-router-dom";

const ContactFooter = () => {
  return (
    <footer className="footer-section">
      <div className="footer-container">

        <div className="footer-contact">
          <h3>Do you have questions?<br />Call or visit us.</h3>
          <p><i className="fa fa-phone"></i> +44-7526165003</p>
          <p>customersupport@refinder.com</p>
        </div>

        <div className="footer-address">
          <h3>Office Details</h3>
          <p>ReFinder Limited</p>
          <p>221B Baker Street</p>
          <p>London, United Kingdom</p>
          <p>Postal Code: NW1 6XE</p>
        </div>

        <div className="footer-social">
          <h3>Connect With Us</h3>
          <div className="social-icons">
            <a href="#" className="facebook"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#" className="twitter"><i className="fa-brands fa-twitter"></i></a>
            <a href="#" className="linkedin"><i className="fa-brands fa-linkedin-in"></i></a>
            <a href="#" className="instagram"><i className="fa-brands fa-instagram"></i></a>
          </div>
        </div>
      </div>

      <div className="footer-links">
        <Link to="/" className="a">Home</Link>
        <Link to="/about" className="a">About ReFinder</Link>
        <Link to="/work" className="a">How Does It Work</Link>
        <Link to="/howtopost" className="a">How To Post</Link>
        <Link to="/terms&conditions" className="a">Terms and Conditions</Link>
        <Link to="/privacypolicy" className="a">Privacy Policy</Link>
        <Link to="/faqs" className="a">FAQs</Link>
      </div>

      <div className="footer-bottom">
        2026 &copy; ReFinder Limited | Designed by <a href="#">Yugta</a>
      </div>
    </footer>
  );
};

export default ContactFooter;
