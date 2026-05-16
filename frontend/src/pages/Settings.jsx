import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "../stylesheets/Settings.css";

const Settings = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    notifications: true,
    emailUpdates: true,
    darkMode: false,
    privacy: "public"
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated settings:", formData);
    alert("Settings updated (visual only)!");
  };

  return (
    <div className="settings-page">
      <h1 className="title">Settings</h1>

      {/* Password Section */}
      <div className="card">
        <h2>Change Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Current Password</label>
            <input
              type="password"
              name="currentPassword"
              placeholder="Enter current password"
              value={formData.currentPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              placeholder="Enter new password"
              value={formData.newPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm new password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="save-btn">Update Password</button>
        </form>
      </div>

      {/* Preferences Section */}
      <div className="card preferences-card">
        <h2>Preferences</h2>
        <div className="preferences-grid">
          <div className="checkbox-group">
            <input
              type="checkbox"
              name="notifications"
              checked={formData.notifications}
              onChange={handleChange}
            />
            <label>Enable Notifications</label>
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              name="emailUpdates"
              checked={formData.emailUpdates}
              onChange={handleChange}
            />
            <label>Email Updates</label>
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              name="darkMode"
              checked={formData.darkMode}
              onChange={handleChange}
            />
            <label>Enable Dark Mode</label>
          </div>
        </div>
        <button className="save-btn" onClick={handleSubmit}>Save Preferences</button>
      </div>

      {/* Privacy Section */}
      <div className="card">
        <h2>Privacy Settings</h2>
        <div className="form-group">
          <label>Who can see my items?</label>
          <select name="privacy" value={formData.privacy} onChange={handleChange}>
            <option value="public">Public</option>
            <option value="friends">Friends Only</option>
            <option value="private">Only Me</option>
          </select>
        </div>
        <button className="save-btn" onClick={handleSubmit}>Save Privacy</button>
      </div>

      {/* Danger Zone */}
      <div className="card danger-card">
        <h2>Danger Zone</h2>
        <p>Deleting your account is irreversible. Please be careful!</p>
        <div className="danger-buttons">
          <button className="delete-btn">Delete Account</button>
          <button className="logout-btn"><Link className="menu-links" to="/login">Logout</Link></button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
