import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "../stylesheets/ManageFoundItems.css";

const ManageFoundItems = () => {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    try {
      setLoading(true);

      const res = await fetch("https://refinder-backend.onrender.com/api/admin/found");
      const data = await res.json();

      setItems(Array.isArray(data.found_items) ? data.found_items : []);
    } catch (error) {
      console.log(error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // ✅ Approve → remove from UI
  const handleApprove = async (id) => {
  try {
    const res = await fetch(`https://refinder-backend.onrender.com/api/admin/found/${id}/approve`, {
      method: "PUT",
    });

    if (!res.ok) {
      throw new Error("Approve failed");
    }

    setItems((prev) => prev.filter((item) => item.id !== id));
    toast.success("Item approved successfully ✅");

  } catch (err) {
    console.log(err);
    toast.error("Failed to approve ❌");
  }
};

  // ✅ Reject → remove from UI
  const handleDelete = async (id) => {
  try {
    const res = await fetch(`https://refinder-backend.onrender.com/api/admin/found/${id}/reject`, {
      method: "PUT",
    });

    if (!res.ok) {
      throw new Error("Reject failed");
    }

    setItems((prev) => prev.filter((item) => item.id !== id));
    toast.success("Item rejected successfully 🗑️");

  } catch (err) {
    console.log(err);
    toast.error("Failed to reject ❌");
  }
};;

  const filteredItems = items.filter((item) =>
    item.item_name?.toLowerCase().includes(search.toLowerCase()) ||
    item.category?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;

  return (
    <div className="admin-found-container">
      <div className="found-top-bar">
        <h2>Pending Found Items</h2>

        <input
          type="text"
          placeholder="Search by title or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="found-items-grid">
        {filteredItems.length === 0 ? (
          <p className="no-results">No pending items.</p>
        ) : (
          filteredItems.map((item) => (
            <div key={item.id} className="found-card">

              {item.image ? (
                <img
                  src={`https://refinder-backend.onrender.com/uploads/${item.image}`}
                  alt={item.item_name}
                  className="found-image"
                />
              ) : (
                <div className="found-image-placeholder">
                  No Image
                </div>
              )}

              <div className="found-card-header">
                <h3>{item.item_name}</h3>

                <div className="found-card-right-part">
                  <span className="badge pending">Pending</span>
                  <span className="category-tag">{item.category}</span>
                </div>
              </div>

              <p className="found-desc">{item.description}</p>

              <div className="found-meta">
                <p><strong>Posted by:</strong> {item.contact_name}</p>
                <p><strong>Phone:</strong> {item.contact_number}</p>
                <p><strong>Date:</strong> {item.date}</p>
              </div>

              <div className="found-actions">
                <button
                  onClick={() => handleApprove(item.id)}
                  className="approve-btn"
                >
                  Approve
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="delete-btn"
                >
                  Reject
                </button>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageFoundItems;
