import React, { useState } from "react";
import "../stylesheets/SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!formData.agree) {
      toast.error("Please agree to Terms & Privacy Policy");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("https://refinder-backend.onrender.com/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Signup failed");
        return;
      }

      toast.success("Account created successfully 🎉");
      navigate("/login");

    } catch (error) {
      toast.error("Server error. Please try again.");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-header">
        <h1>Join ReFinder 🌿</h1>
        <p>Create your account and start exploring!</p>
      </div>

      <div className="signup-form-container">
        <form onSubmit={handleSignUp}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="example@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-checkbox">
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
            />
            <label>
              I agree to the <Link className="pop" to="/terms&conditions">Terms & Conditions</Link>{" "}
              and <Link to="/privacypolicy" className="pop">Privacy Policy</Link>
            </label>
          </div>

          <button type="submit" className="signup-btn">
            Sign Up
          </button>

          <div className="login-link">
            Already have an account?{" "}
            <Link to="/login" className="anchors">Login here</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
