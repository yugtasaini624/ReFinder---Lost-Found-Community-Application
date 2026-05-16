import { useEffect } from "react";

const AdminAuth = () => {

  useEffect(() => {

    const params = new URLSearchParams(window.location.search);

    const token = params.get("token");

    if (token) {

      localStorage.setItem("token", token);

      window.location.href = "/";
    }

  }, []);

  return <div>Authenticating Admin...</div>;
};

export default AdminAuth;