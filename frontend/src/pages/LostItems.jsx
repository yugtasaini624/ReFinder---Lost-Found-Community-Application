import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../stylesheets/LostItems.css";

function LostItems() {
  const navigate = useNavigate();

  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [sortOrder, setSortOrder] = useState("latest");

  const [lostItems, setLostItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLostItems = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/api/public/lost");
      const data = await res.json();

      setLostItems(Array.isArray(data.lost_items) ? data.lost_items : []);
    } catch (err) {
      console.log(err);
      setLostItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLostItems();
  }, []);

  const filtered = lostItems
    .filter(i =>
      i.item_name?.toLowerCase().includes(searchTitle.toLowerCase())
    )
    .filter(i =>
      i.location?.toLowerCase().includes(searchLocation.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "latest"
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
    );

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div className="lost-container">
      <h1 className="lost-title">Lost Items</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="Search item..."
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Search location..."
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
        />

        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="latest">Latest first</option>
          <option value="oldest">Oldest first</option>
        </select>
      </div>

      <div className={`lost-grid ${filtered.length === 1 ? "single" : ""}`}>
        {filtered.length === 0 ? (
          <p className="no-results">No lost items found</p>
        ) : (
          filtered.map(item => (
            <div className="lost-card" key={item.id}>

              <img
                src={
                  item.image
                    ? `http://127.0.0.1:5000/uploads/${item.image}`
                    : "https://via.placeholder.com/150"
                }
                className="lost-img"
                alt={item.item_name}
              />

              <div className="lost-right">

                <div className="lost-card-header">
                  <h3 className="lost-item-title">{item.item_name}</h3>
                  <span className="tag badge-strong">LOST</span>
                </div>

                <div className="divider" />

                <div className="meta-row">
                  <span>📍 {item.location}</span>
                  <span>📅 {item.date}</span>
                </div>

                <p className="lost-desc">{item.identifiers}</p>

                <div className="card-footer" style={{ gap: "10px" }}>
                  <button className="details-btn" onClick={() => navigate(`/lost/${item.id}`)}>Details</button>
                  <button className="details-btn" onClick={() => navigate(`/lost/${item.id}`)}>Contact</button>
                </div>

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default LostItems;