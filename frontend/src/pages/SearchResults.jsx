import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../stylesheets/SearchResult.css";

const SearchResults = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const initialQuery = queryParams.get("query") || "";
  const initialLocation = queryParams.get("location") || "";

  const [searchText, setSearchText] = useState(initialQuery);
  const [searchLocation, setSearchLocation] = useState(initialLocation);
  const [filterType, setFilterType] = useState("all");

  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // APPLY FILTERS
  // =========================
  const applyFilters = (sourceItems = [], query = "", locationValue = "", type = "all") => {
    let filtered = [...sourceItems];

    if (query.trim()) {
      filtered = filtered.filter((item) =>
        (item.name || item.item_name || "")
          .toLowerCase()
          .includes(query.toLowerCase())
      );
    }

    if (locationValue.trim()) {
      filtered = filtered.filter((item) =>
        (item.location || "")
          .toLowerCase()
          .includes(locationValue.toLowerCase())
      );
    }

    if (type !== "all") {
      filtered = filtered.filter(
        (item) => (item.type || "").toLowerCase() === type
      );
    }

    setFilteredItems(filtered);
  };

  // =========================
  // FETCH ITEMS (FIXED)
  // =========================
  const fetchItems = useCallback(async () => {
    try {
      const res = await fetch(
        "https://refinder-backend.onrender.com/api/all-items"
      );

      const data = await res.json();

      const sourceItems = Array.isArray(data.items) ? data.items : [];

      setItems(sourceItems);

      applyFilters(
        sourceItems,
        searchText,
        searchLocation,
        filterType
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [searchText, searchLocation, filterType]);

  // =========================
  // USE EFFECT (FIXED)
  // =========================
  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // =========================
  // SEARCH BUTTON
  // =========================
  const handleSearch = () => {
    applyFilters(items, searchText, searchLocation, filterType);
  };

  // =========================
  // LOADER
  // =========================
  if (loading) {
    return <div className="results-loader">Loading Results...</div>;
  }

  return (
    <div className="search-results-page">

      {/* TOP */}
      <div className="search-top-section">
        <h1>Search Lost & Found Items</h1>
        <p>Find your lost belongings quickly</p>

        <div className="modern-search-box">

          <input
            type="text"
            placeholder="Search item..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <input
            type="text"
            placeholder="Location..."
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
          />

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Items</option>
            <option value="lost">Lost</option>
            <option value="found">Found</option>
          </select>

          <button onClick={handleSearch}>Search</button>
        </div>
      </div>

      {/* RESULTS */}
      <div className="results-grid">

        {filteredItems.length === 0 ? (
          <div className="empty-results">
            <h2>No Items Found</h2>
            <p>Try searching with another keyword</p>
          </div>
        ) : (
          filteredItems.map((item, index) => {
            const itemType = (item?.type || "").trim().toLowerCase();

            return (
              <div
                className="result-card-horizontal"
                key={`${item.id}-${index}`}
              >

                {/* IMAGE */}
                <div className="result-image-box">
                  <img
                    src={
                      item.image
                        ? `https://refinder-backend.onrender.com/uploads/${item.image}`
                        : "https://via.placeholder.com/300"
                    }
                    alt={item.name || item.item_name}
                  />
                </div>

                {/* CONTENT */}
                <div className="result-card-content">

                  <div className="result-card-top">
                    <h2>{item.name || item.item_name}</h2>

                    <div className={`result-badge ${itemType}`}>
                      {item.type}
                    </div>
                  </div>

                  <div className="result-meta-row">
                    <span>📍 {item.location}</span>
                    <span>📅 {item.date}</span>
                  </div>

                  <p className="result-desc">
                    {item.description}
                  </p>

                  <div className="result-buttons">

                    <button
                      className="details-btn"
                      onClick={() =>
                        navigate(
                          item.type === "found"
                            ? `/found/${item.id}`
                            : `/lost/${item.id}`
                        )
                      }
                    >
                      Details
                    </button>

                    <button className="details-btn">
                      Contact
                    </button>

                  </div>

                </div>
              </div>
            );
          })
        )}

      </div>
    </div>
  );
};

export default SearchResults;
