import React, { useState } from "react";
import "../stylesheets/UploadFoundItems.css";
import { toast } from "react-toastify";
import axios from "axios";

export default function UploadFoundItems() {
  const handleBack = () => window.history.back();

  const [image, setImage] = useState(null);

  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    brand: "",
    color: "",
    date: "",
    time: "",
    location: "",
    description: "",
    identifiers: "",
    contactName: "",
    contactNumber: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const formDataToSend = new FormData();

      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      if (image) {
        formDataToSend.append("image", image);
      }

      await axios.post(
        "http://localhost:5000/api/found",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Found item uploaded successfully ✅");

      setFormData({
        itemName: "",
        category: "",
        brand: "",
        color: "",
        date: "",
        time: "",
        location: "",
        description: "",
        identifiers: "",
        contactName: "",
        contactNumber: "",
        email: "",
      });

      setImage(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to upload found item ❌");
    }
  };

  return (
    <div className="upload-pages found-page">
      <h1 className="found-title">Upload Found Item</h1>

      <form className="found-form" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col">
            <label>Item Name</label>
            <input
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col">
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option>Animal</option>
              <option>Jewellery</option>
              <option>Cash</option>
              <option>Electronics</option>
              <option>Vehicle</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <label>Brand Name</label>
            <input
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col">
            <label>Colour</label>
            <input
              name="color"
              value={formData.color}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <label>Date Found</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col">
            <label>Time</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
            />
          </div>
        </div>

        <label>Location</label>
        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <label>Description</label>
        <textarea
          rows="4"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <label>Unique Identifiers</label>
        <input
          name="identifiers"
          value={formData.identifiers}
          onChange={handleChange}
          required
        />

        {/* IMAGE */}
        <label>Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <div className="row">
          <div className="col">
            <label>Your Name</label>
            <input
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col">
            <label>Contact Number</label>
            <input
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <label>Email (optional)</label>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <button type="submit" className="found-btns">
          Submit Found Item
        </button>
      </form>

      <div className="backBtnDiv">
        <button className="back-btn" onClick={handleBack}>
          ← Back
        </button>
      </div>
    </div>
  );
}