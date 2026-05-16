import React, { useEffect, useState } from "react";

const ProtectedAdminRoute = ({ children }) => {

  const [allowed, setAllowed] = useState(null);

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      setAllowed(false);
      return;
    }

    fetch("https://refinder-backend.onrender.com/api/verify-admin", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (res.ok) {
          setAllowed(true);
        } else {
          setAllowed(false);
        }
      })
      .catch(() => setAllowed(false));

  }, []);

  if (allowed === null) return <div>Checking access...</div>;

  if (!allowed) {
    return window.location.href = "http://localhost:3000";
  }

  return children;
};

export default ProtectedAdminRoute;
