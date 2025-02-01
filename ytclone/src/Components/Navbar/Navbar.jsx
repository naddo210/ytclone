

import React from 'react';
import PropTypes from 'prop-types';
import "./navbar.css";
import menu_icon from "../../assets/menu.png";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search.png";
import upload_icon from "../../assets/upload.png";
import more_icon from "../../assets/more.png";
import notification_icon from "../../assets/notification.png";
import profile_icon from "../../assets/jack.png";
import { Link } from 'react-router-dom';

const Navbar = ({ setSidebar }) => {
  return (
    <nav className="flex-div">
      <div className="nav-left flex-div">
       <img 
          onClick={() => setSidebar(prev => !prev)} 
          className="menu-icon" 
          src={menu_icon} 
          alt="menu icon" 
        />
   
      <Link to="/"> <img className="logo" src={logo} alt="logo" />
      </Link> 
      </div>
      <div className="nav-middle flex-div">
        <div className="searchbox flex-div">
          <input type="text" placeholder="Search" />
          <img src={search_icon} alt="search icon" />
        </div>
      </div>
      <div className="nav-right flex-div">
        <img src={upload_icon} alt="upload icon" />
        <img src={more_icon} alt="more options icon" />
        <img src={notification_icon} alt="notification icon" />
        <img className="user-icon" src={profile_icon} alt="profile icon" />
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  setSidebar: PropTypes.func.isRequired, // Validation for the 'setSidebar' function
};

export default Navbar;
