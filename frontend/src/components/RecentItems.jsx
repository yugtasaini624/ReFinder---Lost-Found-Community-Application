import React, { useEffect, useState } from "react";
import "../stylesheets/RecentItems.css";
import { useNavigate } from "react-router-dom";

const RecentItems = () => {
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);

  const [lostIndex, setLostIndex] = useState(0);
  const [foundIndex, setFoundIndex] = useState(0);

  const navigate = useNavigate();

  // ✅ FETCH LOST ITEMS
  const fetchLost = async () => {
    try {
      const res = await fetch("https://refinder-backend.onrender.com/api/public/lost");
      const data = await res.json();

      console.log("LOST:", data);

      setLostItems(
        (data.lost_items || [])
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 7)
      );
    } catch (err) {
      console.log(err);
      setLostItems([]);
    }
  };

  // ✅ FETCH FOUND ITEMS
  const fetchFound = async () => {
    try {
      const res = await fetch("https://refinder-backend.onrender.com/api/public/found");
      const data = await res.json();

      console.log("FOUND:", data);

      setFoundItems(
        (data.found_items || [])
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 7)
      );
    } catch (err) {
      console.log(err);
      setFoundItems([]);
    }
  };

  useEffect(() => {
    fetchLost();
    fetchFound();
  }, []);

  // 🔁 SLIDER CONTROLS
  const prevLost = () => setLostIndex((p) => Math.max(p - 1, 0));
  const nextLost = () =>
    setLostIndex((p) => Math.min(p + 1, lostItems.length - 1));

  const prevFound = () => setFoundIndex((p) => Math.max(p - 1, 0));
  const nextFound = () =>
    setFoundIndex((p) => Math.min(p + 1, foundItems.length - 1));

  return (
    <section className="recent-section">

      {/* 🔴 LOST */}
      <div className="recent-block">

        <div className="title-row">
          <h2>Recently Lost Items</h2>

          <div className="nav-buttons">
            <button className="nav-btn" onClick={prevLost}>◀</button>
            <button className="nav-btn" onClick={nextLost}>▶</button>
          </div>
        </div>

        <div className="slider-window">
          <div
            className="slider-track"
            style={{ transform: `translateX(-${lostIndex * 420}px)` }}
          >
            {lostItems.map((item) => (
              <div
                className="lost-card"
                key={item.id}
                onClick={() => navigate(`/lost/${item.id}`)}
              >
                <img
                  src={`https://refinder-backend.onrender.com/uploads/${item.image}`}
                  alt={item.item_name}
                />

                <div className="lost-info">
                  <h3>{item.item_name}</h3>

                  <p className="lost-desc">{item.location}</p>

                  <div className="lost-meta">
                    <span>📅 {item.date}</span>
                  </div>

                  <button className="details-btn">
                    More Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🟢 FOUND */}
      <div className="recent-block">

        <div className="title-row">
          <h2>Recently Found Items</h2>

          <div className="nav-buttons">
            <button className="nav-btn" onClick={prevFound}>◀</button>
            <button className="nav-btn" onClick={nextFound}>▶</button>
          </div>
        </div>

        <div className="slider-window">
          <div
            className="slider-track"
            style={{ transform: `translateX(-${foundIndex * 420}px)` }}
          >
            {foundItems.map((item) => (
              <div
                className="lost-card"
                key={item.id}
                onClick={() => navigate(`/found/${item.id}`)}
              >
                <img
                  src={`https://refinder-backend.onrender.com/uploads/${item.image}`}
                  alt={item.item_name}
                />

                <div className="lost-info">
                  <h3>{item.item_name}</h3>

                  <div className="lost-meta">
                    <span>📍 {item.location}</span>
                    <span>📅 {item.date}</span>
                  </div>

                  <button className="details-btn">
                    More Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};

export default RecentItems;
