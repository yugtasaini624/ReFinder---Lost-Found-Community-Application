import "../stylesheets/Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import userImg from "../images/happy.png";

function Header({ toggleSidebar, isLoggedIn , setIsLoggedIn}) {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();

  // ✅ Logout handler
const handleLogout = () => {
  localStorage.removeItem("token");
  setIsLoggedIn(false);
  navigate("/login");
};

  // ✅ Upload click guard
  const handleProtectedNavigation = (path) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  return (
    <header className="mainHeader">
      {/* Left */}
      <div className="navLogoHeading">
        <p className="nav" onClick={toggleSidebar}>
          <i className="fa-solid fa-bars"></i>
        </p>
        <Link to="/" className="link"><p className="logoText">ReFinder</p></Link>
      </div>

      {/* Right */}
      <div className="menuButtons">
        {/* Upload Lost */}
        <button
          className="lostBtn"
          onClick={() => handleProtectedNavigation("/upload/lostitem")}
        >
          <i className="fa-solid fa-circle-exclamation"></i>
          <span className="btn-text"> Upload Lost Item</span>
        </button>

        {/* Upload Found */}
        <button
          className="foundBtn"
          onClick={() => handleProtectedNavigation("/upload/founditem")}
        >
          <i className="fa-solid fa-box-open"></i>
          <span className="btn-text"> Upload Found Item</span>
        </button>

        {/* NOT LOGGED IN */}
        {!isLoggedIn && (
          <Link to="/login" className="link">
            <button className="loginBtn">
              <i className="fa-solid fa-right-to-bracket"></i>
              <span className="btn-text"> Login</span>
            </button>
          </Link>
        )}

        {/* LOGGED IN */}
        {isLoggedIn && (
          <>

            <div className="profileWrapper">
              <button
                className="profileToggle"
                onClick={() => setOpenMenu((prev) => !prev)}
              >
                <img src={userImg} alt="profile" />
                <span className="userName">User</span>
                <i className="fa-solid fa-chevron-down arrow"></i>
              </button>

              {openMenu && (
                <div className="profileDropdown">
                  <p className="l logout" onClick={handleLogout}>
                    Logout
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;