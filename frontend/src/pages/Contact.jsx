import React from "react";
import "../stylesheets/Contact.css";

const Contact = () => {
  return (
    <section className="contact-section">
      <div className="contact-container">
        {/* Left side: info */}
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>Have questions or need help? Reach out to us!</p>

          <div className="info-box">
            <i className="fa fa-phone"></i>
            <div>
              <h4>Phone</h4>
              <p>+44-7526165003</p>
            </div>
          </div>

          <div className="info-box">
            <i className="fa fa-envelope"></i>
            <div>
              <h4>Email</h4>
              <p>customersupport@refinder.com</p>
            </div>
          </div>

          <div className="info-box">
            <i className="fa fa-map-marker-alt"></i>
            <div>
              <h4>Address</h4>
              <p>221B Baker Street, London, UK</p>
            </div>
          </div>
        </div>

        {/* Right side: form */}
        <div className="contact-form">
          <h2>Send a Message</h2>
          <form>
            <div className="form-group">
              <input type="text" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Your Email" required />
            </div>
            <div className="form-group">
              <input type="text" placeholder="Subject" required />
            </div>
            <div className="form-group">
              <textarea placeholder="Message" rows="5" required></textarea>
            </div>
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
