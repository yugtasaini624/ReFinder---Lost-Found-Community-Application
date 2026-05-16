import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";

import "../stylesheets/AdminStatistics.css";

const COLORS = ["#2e7d32", "#ed2f42", "#f9a825", "#0288d1"];

const AdminStatistics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch stats from backend
  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://127.0.0.1:5000/api/admin/stats");
      const data = await res.json();

      setStats(data);
    } catch (err) {
      console.log("Stats error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2 className="loading">Loading statistics...</h2>;
  }

  if (!stats) {
    return <h2 className="loading">No data available</h2>;
  }

  return (
    <div className="statistics-container">

      <h1 className="stats-title">Platform Statistics</h1>

      {/* 🔥 Summary Cards */}
      <div className="summary-cards">

        <div className="card">
          <h3>{stats.summary.users}</h3>
          <p>Total Users</p>
        </div>

        <div className="card">
          <h3>{stats.summary.lost}</h3>
          <p>Lost Items</p>
        </div>

        <div className="card">
          <h3>{stats.summary.found}</h3>
          <p>Found Items</p>
        </div>

      </div>

      {/* 📊 Charts Row 1 */}
      <div className="chart-section">

        <div className="chart-card">
          <h3>Lost vs Found Items</h3>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={stats.lost_found}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                label
              >
                {stats.lost_found.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Monthly Users</h3>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={stats.monthly_users}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Users" stroke="#ed2f42" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* 📊 Charts Row 2 */}
      <div className="chart-section">

        <div className="chart-card">
          <h3>Top Categories</h3>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={stats.categories}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                label
              >
                {stats.categories.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Items Trend (Lost vs Found)</h3>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={stats.lost_found}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#2e7d32" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

    </div>
  );
};

export default AdminStatistics;