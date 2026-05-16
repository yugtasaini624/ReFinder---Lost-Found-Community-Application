import React from "react";
import "../stylesheets/HowToPost.css";

const HowToPost = () => {
  return (
    <div className="howtopost-container">
      <h2 className="howtopost-title">How to Post Items</h2>

      <div className="howtopost-section">
        <h3>🧭 How to Post a Lost Item</h3>
        <ol>
          <li>Go to the <strong>Post Lost Item</strong> page.</li>
          <li>Enter item name and a brief description.</li>
          <li>Add location where you lost it.</li>
          <li>Upload an image (optional but recommended).</li>
          <li>Provide your contact preferences.</li>
          <li>Click on <strong>Submit</strong>.</li>
          <li>Your post will now be visible to nearby users.</li>
        </ol>
      </div>

      <div className="howtopost-section">
        <h3>🧾 How to Post a Found Item</h3>
        <ol>
          <li>Go to the <strong>Post Found Item</strong> page.</li>
          <li>Enter details of the item you found.</li>
          <li>Mention the place where you found it.</li>
          <li>Upload an image if possible.</li>
          <li>Avoid revealing sensitive info in the post.</li>
          <li>Click <strong>Submit</strong>.</li>
          <li>Owner can contact you through the platform.</li>
        </ol>
      </div>

      <div className="howtopost-tips">
        <h3>💡 Tips for Better Posts</h3>
        <ul>
          <li>Use clear photos of the item.</li>
          <li>Add exact place & time if you remember.</li>
          <li>Avoid sharing phone numbers publicly.</li>
          <li>Be honest about item condition.</li>
          <li>Update status when item is returned.</li>
        </ul>
      </div>
    </div>
  );
};

export default HowToPost;
