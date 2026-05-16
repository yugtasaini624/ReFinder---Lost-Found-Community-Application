import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../stylesheets/Login.css";
import { toast } from "react-toastify";

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {

    e.preventDefault();
    setLoading(true);

    try {

      const res = await fetch("https://refinder-backend.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        }),
      });

      const data = await res.json();

      // =========================
      // LOGIN FAILED
      // =========================
      if (!res.ok) {

        toast.error(data.msg || "Invalid credentials");

        setLoading(false);
        return;
      }

      // =========================
      // STORE DATA
      // =========================
      localStorage.setItem("token", data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      localStorage.setItem(
        "role",
        data.user.role
      );

      // =========================
      // ADMIN LOGIN
      // =========================
      if (data.user.role === "admin") {

        toast.success("Admin login successful 👑", {
          autoClose: 2000
        });

        setTimeout(() => {
          window.location.href = `https://refinder-backend.onrender.com/admin-auth?token=${data.token}`;
        }, 2000);

      }

      // =========================
      // NORMAL USER LOGIN
      // =========================
      else {

        toast.success("Logged in successfully!");

        navigate("/dashboard");

      }

    } catch (error) {

      toast.error("Server error. Please try again.");

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="login-page">

      <div className="login-header">
        <h1>Welcome Back 🌿</h1>
        <p>Login to your ReFinder account</p>
      </div>

      <div className="login-form-container">

        <form onSubmit={handleLogin}>

          <div className="form-group">
            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="forgot-container">
            <a href="/forgot">Forgot your password?</a>
          </div>

          <button
            type="submit"
            className="primary-btn"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="signup-text">
            Don't have an account?{" "}

            <Link to="/signup" className="anchor">
              Sign Up
            </Link>
          </p>

        </form>

      </div>

    </div>
  );
};

export default Login;
