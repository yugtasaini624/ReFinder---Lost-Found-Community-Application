import React from "react";
import { Link } from 'react-router-dom';
import "../stylesheets/Sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>

      <div className="sidebar-top">
        <span className="app-name">ReFinder</span>
        <span className="close-btn" onClick={toggleSidebar}>
          &times;
        </span>
      </div>

      <ul className="menu">
        <li className="menu-item">
          <i className="fa fa-home icon"></i>
          {isOpen && <span className="label"><Link className='menu-links' to='/'>Home</Link></span>}
        </li>
        <li className="menu-item">
          <i className="fa fa-info-circle icon"></i>
          {isOpen && <span className="label"><Link className='menu-links' to='/about'>About</Link></span>}
        </li>
        <li className="menu-item">
          <i className="fa fa-search icon"></i>
          {isOpen && <span className="label"><Link className='menu-links' to='/lostItems'>Lost Items</Link></span>}
        </li>
        <li className="menu-item">
          <i className="fa fa-gift icon"></i>
          {isOpen && <span className="label"><Link className='menu-links' to='/foundItems'>Found Items</Link></span>}
        </li>
        <li className="menu-item">
          <i className="fa fa-question-circle icon"></i>
          {isOpen && <span className="label"><Link className='menu-links' to='/work'>How It Works</Link></span>}
        </li>
        <li className="menu-item">
          <i className="fa fa-envelope"></i>
          {isOpen && <span className="label"><Link className='menu-links' to='/contact'>Contact</Link></span>}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
