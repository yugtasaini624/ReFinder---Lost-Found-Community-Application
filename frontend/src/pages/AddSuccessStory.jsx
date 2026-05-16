import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../stylesheets/AddSuccessStory.css";

const AddSuccessStory = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    try {
      const res = await fetch(
        "http://127.0.0.1:5000/api/user/success-story",
        {
          method: "POST",
          body: formData,
        }
      );

      if (res.ok) {
        toast.success("🎉 Story submitted successfully!");
        setTitle("");
        setDescription("");
        setImage(null);
      } else {
        toast.error("❌ Failed to submit story");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  return (
    <div className="story-page">
      <div className="story-card">

        <h2 className="story-title">Share Success Story</h2>

        <form onSubmit={handleSubmit} className="story-form">

          <input
            type="text"
            placeholder="Story Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <button type="submit">Submit Story</button>
        </form>

      </div>
    </div>
  );
};

export default AddSuccessStory;