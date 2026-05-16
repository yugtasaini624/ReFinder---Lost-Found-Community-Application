import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import UserNavbar from "./UserNavbar";

const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // ✅ CHECK LOGIN STATUS ON LOAD
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div>
      <Header
        toggleSidebar={toggleSidebar}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />

      {!isLoggedIn && (
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      )}

      {isLoggedIn && (
        <UserNavbar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      )}

      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;