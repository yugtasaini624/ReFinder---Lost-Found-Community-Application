import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const RequireAuth = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    toast.info("Please login first");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RequireAuth;