import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../stylesheets/CategoryPage.css";

function CategoryPage() {
  const { category } = useParams();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("latest");

  const fetchData = async () => {
    try {
      const [lostRes, foundRes] = await Promise.all([
        fetch("http://127.0.0.1:5000/api/public/lost"),
        fetch("http://127.0.0.1:5000/api/public/found")
      ]);

      const lostData = await lostRes.json();
      const foundData = await foundRes.json();

      const lostItems = (lostData.lost_items || []).map(i => ({ ...i, type: "lost" }));
      const foundItems = (foundData.found_items || []).map(i => ({ ...i, type: "found" }));

      setItems([...lostItems, ...foundItems]);

    } catch (err) {
      console.log(err);
      setItems([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filtered = items
    .filter(i => i.category?.toLowerCase() === category.toLowerCase())
    .filter(i => i.item_name?.toLowerCase().includes(search.toLowerCase()))
    .filter(i => typeFilter === "all" || i.type === typeFilter)
    .sort((a, b) =>
      sortOrder === "latest"
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
    );

  return (
    <div className="cat-page-container">

      {/* HEADER */}
      <div className="cat-page-header">
        <button className="cat-back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <h1 className="cat-page-title">{category} Items</h1>
      </div>

      {/* FILTERS */}
      <div className="cat-filters">

        <input
          type="text"
          placeholder="Search item..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>

        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="latest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>

      </div>

      {/* GRID */}
      <div className="cat-grid">
        {filtered.length === 0 ? (
          <p className="cat-empty">No items found</p>
        ) : (
          filtered.map(item => (
            <div className="cat-card" key={item.id}>

              <img
                src={`http://127.0.0.1:5000/uploads/${item.image}`}
                className="cat-img"
                alt={item.item_name}
              />

              <div className="cat-content">

                <div className="cat-header">
                  <h3>{item.item_name}</h3>

                  <span className={`cat-badge ${item.type}`}>
                    {item.type}
                  </span>
                </div>

                <div className="cat-meta">
                  <span>📍 {item.location}</span>
                  <span>📅 {item.date}</span>
                </div>

                <p className="cat-desc">{item.description}</p>

                <div className="cat-actions">
                  <button
                    onClick={() =>
                      navigate(
                        item.type === "lost"
                          ? `/lost/${item.id}`
                          : `/found/${item.id}`
                      )
                    }
                  >
                    Details
                  </button>
                </div>

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CategoryPage;