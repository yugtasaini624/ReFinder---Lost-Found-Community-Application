import { useEffect, useState } from "react";
import "../stylesheets/AdminSuccessStories.css";

const AdminSuccessStories = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetch("https://refinder-backend.onrender.com/api/admin/success-stories")
      .then(res => res.json())
      .then(data => setStories(data));
  }, []);

  const approveStory = async (id) => {
    await fetch(`https://refinder-backend.onrender.com/api/admin/success-stories/approve/${id}`, {
      method: "PUT",
    });

    setStories(stories.filter(s => s.id !== id));
  };

  const rejectStory = async (id) => {
    await fetch(`https://refinder-backend.onrender.com/api/admin/success-stories/reject/${id}`, {
      method: "PUT",
    });

    setStories(stories.filter(s => s.id !== id));
  };

  return (
    <div className="admin-page">

      <h2 className="admin-title">Pending Success Stories</h2>

      <div className="admin-grid">

        {stories.length === 0 && (
          <p className="empty">No pending stories 🎉</p>
        )}

        {stories.map((story) => (
          <div key={story.id} className="admin-card">

            <img
              src={`https://refinder-backend.onrender.com/uploads/${story.image}`}
              alt={story.title}
              className="admin-img"
            />

            <h3>{story.title}</h3>
            <p>{story.description}</p>

            <div className="admin-actions">
              <button
                className="approve-btn"
                onClick={() => approveStory(story.id)}
              >
                Approve
              </button>

              <button
                className="reject-btn"
                onClick={() => rejectStory(story.id)}
              >
                Reject
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSuccessStories;
