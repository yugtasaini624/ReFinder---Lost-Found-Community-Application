import React, { useEffect, useState } from "react";
import "../stylesheets/MyItems.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyItems = () => {

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // MODAL STATES

  const [showEditModal, setShowEditModal] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);

  const [editForm, setEditForm] = useState({
    name: "",
    category: "",
    location: "",
    date: "",
    description: "",
  });

  // =========================
  // FETCH ITEMS
  // =========================

  const fetchItems = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://refinder-backend.onrender.com/api/my-items",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      console.log(data);

      setItems(data.items || []);

    } catch (err) {

      console.log(err);

      toast.error("Failed to load items");

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // =========================
  // DELETE ITEM
  // =========================

  const handleDelete = async (item) => {

    try {

      const confirmDelete = window.confirm(
        "Delete this item permanently?"
      );

      if (!confirmDelete) return;

      const token = localStorage.getItem("token");

      const itemType =
        (item?.type || "")
          .trim()
          .toLowerCase();

      const url =
        itemType === "lost"
          ? `https://refinder-backend.onrender.com/api/lost/${item.id}`
          : `https://refinder-backend.onrender.com/api/found/${item.id}`;

      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      console.log(data);

      if (res.ok) {

        setItems((prev) =>
          prev.filter((i) => i.id !== item.id)
        );

        toast.success("Item deleted successfully");

      } else {

        toast.error(data.msg || "Delete failed");
      }

    } catch (err) {

      console.log(err);

      toast.error("Delete failed");
    }
  };

  // =========================
  // OPEN MODAL
  // =========================

  const handleEdit = (item) => {

    setSelectedItem(item);

    setEditForm({
      name: item.name || "",
      category: item.category || "",
      location: item.location || "",
      date: item.date || "",
      description: item.description || "",
    });

    setShowEditModal(true);
  };

  // =========================
  // HANDLE INPUT CHANGE
  // =========================

  const handleChange = (e) => {

    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // UPDATE ITEM
  // =========================

  const handleUpdateSubmit = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      const itemType =
        (selectedItem?.type || "")
          .trim()
          .toLowerCase();

      const url =
        itemType === "lost"
          ? `https://refinder-backend.onrender.com/api/lost/${selectedItem.id}`
          : `https://refinder-backend.onrender.com/api/found/${selectedItem.id}`;

      const res = await fetch(url, {

        method: "PUT",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({

          item_name: editForm.name,

          category: editForm.category,

          location: editForm.location,

          date: editForm.date,

          description: editForm.description,
        }),
      });

      const data = await res.json();

      console.log(data);

      if (res.ok) {

        setItems((prev) =>
          prev.map((item) =>
            item.id === selectedItem.id
              ? {
                  ...item,
                  name: editForm.name,
                  category: editForm.category,
                  location: editForm.location,
                  date: editForm.date,
                  description: editForm.description,
                  status: "Pending",
                }
              : item
          )
        );

        toast.success(
          "Item updated and sent for approval"
        );

        setShowEditModal(false);

      } else {

        toast.error(data.msg || "Update failed");
      }

    } catch (err) {

      console.log(err);

      toast.error("Update failed");
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (
      <div className="myitems-loader">
        Loading your items...
      </div>
    );
  }

  return (

    <div className="myitems-container">

      {/* HEADER */}

      <div className="myitems-header">

        <h1>My Items</h1>

        <p>
          Manage your lost and found posts
        </p>

      </div>

      {/* EMPTY */}

      {items.length === 0 ? (

        <div className="empty-state">

          <h2>No Items Found</h2>

          <p>
            Your uploaded items will appear here.
          </p>

        </div>

      ) : (

        <div className="items-grid">

          {items.map((item, index) => {

            const itemType =
              (item?.type || "")
                .trim()
                .toLowerCase();

            const itemStatus =
              (item?.status || "")
                .trim()
                .toLowerCase();

            return (

              <div
                className="modern-card"
                key={`${item.type}-${item.id}-${index}`}
              >

                {/* IMAGE */}

                <div className="image-wrapper">

                  <img
                    src={
                      item.image
                        ? `https://refinder-backend.onrender.com/uploads/${item.image}`
                        : "https://via.placeholder.com/400x300"
                    }
                    alt={item.name || "item"}
                  />

                  {/* TYPE BADGE */}

                  <div
                    className={`type-badge ${itemType}`}
                  >
                    {item.type || "Item"}
                  </div>

                </div>

                {/* CARD CONTENT */}

                <div className="card-content">

                  <div className="card-top">

                    <h2>
                      {item.name || "Unknown Item"}
                    </h2>

                    <span
                      className={`status ${itemStatus}`}
                    >
                      {item.status || "Pending"}
                    </span>

                  </div>

                  <p className="description">
                    {item.description ||
                      "No description available"}
                  </p>

                  {/* META */}

                  <div className="meta-info">

                    <div>

                      <strong>Location</strong>

                      <span>
                        {item.location || "N/A"}
                      </span>

                    </div>

                    <div>

                      <strong>Date</strong>

                      <span>
                        {item.date || "N/A"}
                      </span>

                    </div>

                    <div>

                      <strong>Category</strong>

                      <span>
                        {item.category || "N/A"}
                      </span>

                    </div>

                  </div>

                  {/* BUTTONS */}

                  <div className="action-buttons">

                    <button
                      className="edit-button"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-button"
                      onClick={() => handleDelete(item)}
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>
            );
          })}

        </div>

      )}

      {/* ========================= */}
      {/* EDIT MODAL */}
      {/* ========================= */}

      {showEditModal && (

        <div className="modal-backdrop">

          <div className="modal-container">

            {/* TOP */}

            <div className="modal-top">

              <div>

                <p className="modal-label">

                  {selectedItem?.type || "Item"}

                </p>

                <h2>Edit Item</h2>

              </div>

              <button
                className="modal-close"
                onClick={() =>
                  setShowEditModal(false)
                }
              >
                ×
              </button>

            </div>

            {/* FORM */}

            <form onSubmit={handleUpdateSubmit}>

              <div className="modal-field">

                <label>Item Name</label>

                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="modal-field">

                <label>Category</label>

                <input
                  type="text"
                  name="category"
                  value={editForm.category}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="modal-field">

                <label>Location</label>

                <input
                  type="text"
                  name="location"
                  value={editForm.location}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="modal-field">

                <label>Date</label>

                <input
                  type="date"
                  name="date"
                  value={editForm.date}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="modal-field">

                <label>Description</label>

                <textarea
                  rows="5"
                  name="description"
                  value={editForm.description}
                  onChange={handleChange}
                  required
                />

              </div>

              <button
                type="submit"
                className="update-btn"
              >
                Save Changes
              </button>

            </form>

          </div>

        </div>

      )}

      {/* TOAST */}

      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />

    </div>
  );
};

export default MyItems;
