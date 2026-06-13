import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./UserNavbar.css";

function UserNavbar() {

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // ✅ NEW

  const fullName = localStorage.getItem("userName") || "User";

  const confirmLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <div className="user-header">
        <div className="user-navbar">

          {/* LOGO */}
          <div
            className="user-logo"
            onClick={() => navigate("/user/dashboard")}
          >
            EcoSort
          </div>

          {/* HAMBURGER */}
          <div
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

          {/* NAV LINKS */}
          <div className={`user-links ${menuOpen ? "active" : ""}`}>

            <NavLink to="/user/dashboard">Dashboard</NavLink>
            <NavLink to="/user/schedule">Schedule Pickup</NavLink>
            <NavLink to="/user/requests">My Requests</NavLink>
            <NavLink to="/user/track">Track Pickup</NavLink>
            <NavLink to="/user/estimator">Estimator</NavLink>
            <NavLink to="/user/my-earnings">My Earnings</NavLink>

          </div>

          {/* PROFILE */}
          <div className="profile-section">

            <div
              className="profile-btn"
              onClick={() => setOpen(!open)}
            >
              👤 {fullName} ▼
            </div>

            {open && (
              <div className="profile-dropdown">
                <div onClick={() => navigate("/user/profile")}>
                  👤 My Profile
                </div>
                <div onClick={() => navigate("/user/help")}>
                  ❓ Help Center
                </div>
                <div onClick={() => setShowLogout(true)}>
                  🚪 Logout
                </div>
              </div>
            )}

          </div>

        </div>
      </div>

      {/* LOGOUT MODAL */}
      {showLogout && (
        <div className="logout-overlay">
          <div className="logout-modal">
            <h2>Logout</h2>
            <p>Are you sure you want to logout?</p>

            <div className="logout-actions">
              <button
                className="cancel-btn"
                onClick={() => setShowLogout(false)}
              >
                Cancel
              </button>

              <button
                className="logout-btn"
                onClick={confirmLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UserNavbar;