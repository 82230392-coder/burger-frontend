import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./AdminSidebar.css";

const AdminSidebar = () => {
  const location = useLocation();

  const isActive = (path) => (location.pathname === path ? "active-link" : "");

  return (
    <div className="admin-sidebar">
      <h2 className="sidebar-title">
        <i className="bi bi-fire"></i> Admin Panel
      </h2>

      <nav className="sidebar-menu">
        <Link
          to="/admin"
          className={`sidebar-item ${isActive("/admin-dashboard")}`}
        >
          <i className="bi bi-speedometer2"></i>
          Dashboard
        </Link>

        <Link
          to="/menu-management"
          className={`sidebar-item ${isActive("/menu-management")}`}
        >
          <i className="bi bi-box-seam"></i>
          Products
        </Link>
      </nav>

      <button className="logout-btn">
        <i className="bi bi-box-arrow-right"></i> Logout
      </button>
    </div>
  );
};

export default AdminSidebar;
