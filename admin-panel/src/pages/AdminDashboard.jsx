import React, { useEffect, useState } from "react";
import { Link} from "react-router-dom"

import "../stylesheets/AdminDashboard.css";

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://refinder-backend.onrender.com/api/admin/dashboard")
      .then(res => res.json())
      .then(res => {
        setData(res);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="state">Loading dashboard...</div>;
  if (error) return <div className="state error">{error}</div>;

  const summary = data.summary;

  return (
    <div className="dashboard">

      {/* HEADER */}
      <header className="dashboard-header">
        <h1 className="main-head">Admin Control Center</h1>
        <p>Real-time system monitoring & insights</p>
      </header>

      {/* KPI SECTION */}
      <section className="kpi-grid">

        <div className="kpi-card green">
          <h2>{summary.users}</h2>
          <p>Total Users</p>
        </div>

        <div className="kpi-card red">
          <h2>{summary.lost}</h2>
          <p>Lost Items</p>
        </div>

        <div className="kpi-card blue">
          <h2>{summary.found}</h2>
          <p>Found Items</p>
        </div>

        <div className="kpi-card yellow">
          <h2>{summary.pending}</h2>
          <p>Pending Approvals</p>
        </div>

      </section>

      {/* QUICK ACTIONS */}
      <h4 className="sub-head">Quick Actions</h4>
      <section className="actions">
        <Link to="/admin/lost-items" className="action green">
          Lost Items
        </Link>

        <Link to="/admin/found-items" className="action blue">
          Found Items
        </Link>

        <Link to="/admin/manageusers" className="action dark">
          Manage Users
        </Link>

        <Link to="/admin/story" className="action red">
          Success Story
        </Link>
      </section>

      {/* ACTIVITY TABLE */}
      <section className="activity-card">

        <h3>Recent Activity</h3>

        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Action</th>
              <th>Item</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {data.activity.map((a, i) => (
              <tr key={i}>
                <td>{a.user}</td>
                <td>{a.action}</td>
                <td>{a.item}</td>
                <td>
                  <span className={`status ${a.status.toLowerCase()}`}>
                    {a.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </section>

    </div>
  );
};

export default AdminDashboard;
