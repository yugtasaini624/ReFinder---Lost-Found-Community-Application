import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../stylesheets/Details.css";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    fetch(`https://refinder-backend.onrender.com/api/public/lost/${id}`)
      .then(res => res.json())
      .then(data => setItem(data));
  }, [id]);

  if (!item) return <p className="fd-loading">Loading...</p>;

  return (
    <div className="fd-page">

      <button className="fd-back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="fd-card">

        <img
          src={`https://refinder-backend.onrender.com/uploads/${item.image}`}
          alt={item.item_name}
          className="fd-img"
        />

        <div className="fd-content">

          <h1 className="fd-title">{item.item_name}</h1>

          <div className="fd-sub">
            📍 {item.location} • 📅 {item.date}
          </div>

          <span className="fd-badge">LOST</span>

          <div className="fd-divider"></div>

          <div className="fd-grid">
            <p><strong>Category:</strong> {item.category}</p>
            <p><strong>Color:</strong> {item.color}</p>
            <p><strong>Brand:</strong> {item.brand}</p>
            <p><strong>Time:</strong> {item.time}</p>
          </div>

          <p className="fd-desc">{item.description}</p>

          <div className="fd-identifiers">
            🔍 {item.identifiers}
          </div>

          <div className="fd-actions">
            <button
              className="fd-btn"
              onClick={() => setShowContact(!showContact)}
            >
              {showContact ? "Hide Contact" : "Show Contact"}
            </button>
          </div>

          {showContact && (
            <div className="fd-contact">
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

export default Details;
