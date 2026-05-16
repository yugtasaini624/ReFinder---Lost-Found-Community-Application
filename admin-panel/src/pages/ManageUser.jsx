import React, { useEffect, useState } from "react";
import "../stylesheets/ManageUser.css";

const ManageUser = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [selectedUser, setSelectedUser] = useState(null);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await fetch("https://refinder-backend.onrender.com/api/admin/users");
      const data = await res.json();

      setUsers(data);
    } catch (err) {
      console.log(err);
      alert("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  // 🗑️ Delete user (REAL)
  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user permanently?")) return;

    try {
      await fetch(`https://refinder-backend.onrender.com/api/admin/users/${id}`, {
        method: "DELETE",
      });

      setUsers(prev => prev.filter(u => u.id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  };

  // 🔎 Filters
  const filteredUsers = users.filter(user => {
    return (
      user.name.toLowerCase().includes(search.toLowerCase()) &&
      (roleFilter === "All" || user.role === roleFilter)
    );
  });

  return (
    <div className="manage-users-page">

      <h1 className="title">Manage Users</h1>

      {/* Filters */}
      <div className="filters">

        <input
          type="text"
          placeholder="Search user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
          <option value="All">All Roles</option>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>

        <button onClick={fetchUsers} className="refresh-btn">
          🔄 Refresh
        </button>

      </div>

      {/* Table */}
      <div className="user-table-container">

        {loading ? (
          <p className="loading">Loading users...</p>
        ) : (
          <table className="user-table">

            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="empty">
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, index) => (
                  <tr key={user.id}>

                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>

                    <td>
                      <span className={`role-badge ${user.role}`}>
                        {user.role}
                      </span>
                    </td>

                    <td className="action-buttons">

                      <button
                        className="view"
                        onClick={() => setSelectedUser(user)}
                      >
                        👁 View
                      </button>

                      <button
                        className="delete"
                        onClick={() => deleteUser(user.id)}
                      >
                        🗑 Delete
                      </button>

                    </td>

                  </tr>
                ))
              )}
            </tbody>

          </table>
        )}

      </div>

      {/* Modal */}
      {selectedUser && (
        <div className="modal">
          <div className="modal-content">

            <h2>User Details</h2>

            <p><b>Name:</b> {selectedUser.name}</p>
            <p><b>Email:</b> {selectedUser.email}</p>
            <p><b>Role:</b> {selectedUser.role}</p>

            <button
              className="close-btn-s"
              onClick={() => setSelectedUser(null)}
            >
              Close
            </button>

          </div>
        </div>
      )}

    </div>
  );
};

export default ManageUser;
