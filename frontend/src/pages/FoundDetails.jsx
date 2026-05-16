import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../stylesheets/FoundDetails.css";

const FoundDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    fetch(`https://refinder-backend.onrender.com/api/public/found/${id}`)
      .then(res => res.json())
      .then(data => setItem(data));
  }, [id]);

  if (!item) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div className="details-container">

      {/* BACK BUTTON */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="details-card">

        {/* IMAGE */}
        <img
          src={`https://refinder-backend.onrender.com/uploads/${item.image}`}
          alt={item.item_name}
          className="details-img"
        />

        {/* CONTENT */}
        <div className="details-content">

          <h2>{item.item_name}</h2>

          <div className="details-sub">
            📍 {item.location} • 📅 {item.date}
          </div>

          <span className="tag found-badge">FOUND</span>

          {/* GRID */}
          <div className="details-grid">
            <p><strong>Category:</strong> {item.category}</p>
            <p><strong>Color:</strong> {item.color}</p>
            <p><strong>Brand:</strong> {item.brand}</p>
            <p><strong>Time:</strong> {item.time}</p>
          </div>

          {/* DESCRIPTION */}
          <div className="details-section">
            <h4>Description</h4>
            <p>{item.description}</p>
          </div>

          {/* IDENTIFIERS */}
          <div className="details-section">
            <h4>Identifiers</h4>
            <p>🔍 {item.identifiers}</p>
          </div>

          {/* CONTACT BUTTON */}
          <button
            className="contact-btn"
            onClick={() => setShowContact(!showContact)}
          >
            {showContact ? "Hide Contact" : "Show Contact"}
          </button>

          {/* CONTACT INFO */}
          {showContact && (
            <div className="details-section">
              <h4>Contact Info</h4>
              <p><strong>Name:</strong> {item.contact_name}</p>
              <p><strong>Phone:</strong> {item.contact_number}</p>
              <p><strong>Email:</strong> {item.email}</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default FoundDetails;
