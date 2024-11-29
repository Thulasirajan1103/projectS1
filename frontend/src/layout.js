import React from "react";
import { NavLink } from "react-router-dom";

function Layout({ children }) {
  return (
    <div>
      <div className="sidenav">
        <NavLink to="/profile" activeClassName="active-link">
          Home
        </NavLink>
        <NavLink to="/form" activeClassName="active-link">
          Register
        </NavLink>
        <NavLink to="/list" activeClassName="active-link">
          Dashboard
        </NavLink>
        <NavLink to="/admin-login" activeClassName="active-link">
          AdminLogin
        </NavLink>
        <NavLink to="/admin-dashboard" activeClassName="active-link">
          AdminDashboard
        </NavLink>
      </div>

      <div className="content">{children}</div>
      <style>
        {`
.sidenav {
  height: 100%;
  width: 60px; /* Start with a narrow width */
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: white;
  overflow-x: hidden;
  transition: width 0.3s ease; /* Smooth transition for width change */
}

.sidenav a {
  color: black;
  padding: 16px;
  text-decoration: none;
  display: block;
  font-size: 0; /* Hide text initially */
  opacity: 0; /* Hide text initially */
  transition: opacity 0.3s ease, font-size 0.3s ease; /* Smooth transition for opacity and font-size */
}

.sidenav:hover {
  width: 200px; /* Expand width */
}

.sidenav:hover a {
  font-size: 16px; /* Show text */
  opacity: 1; /* Show text */
}

/* Active link styling */
.active-link {
  background-color: #f0f0f0; /* Highlight active link */
}

/* Styles for the content area */
.content {
  margin-left: 60px; /* Match the initial width of sidenav */
  padding: 20px;
  transition: margin-left 0.3s ease; /* Smooth transition for content margin */
}

.sidenav:hover ~ .content {
  margin-left: 200px; /* Match the expanded width of sidenav */
}

`}
      </style>
    </div>
  );
}

export default Layout;
