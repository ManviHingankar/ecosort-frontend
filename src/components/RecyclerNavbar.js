import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RecyclerNavbar.css";

function RecyclerNavbar(){

  const name = localStorage.getItem("userName") || "Recycler";

  const [open,setOpen] = useState(false);        // profile dropdown
  const [menuOpen,setMenuOpen] = useState(false); // hamburger
  const [showLogout,setShowLogout] = useState(false);

  const navigate = useNavigate();

  const confirmLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return(

    <>

      <div className="recycler-header">

        <div className="recycler-navbar">

          {/* LOGO */}
          <div
            className="recycler-logo"
            onClick={()=>navigate("/recycler/dashboard")}
          >
            EcoSort Recycler
          </div>

          {/* HAMBURGER */}
          <div
            className="hamburger"
            onClick={()=>setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

          {/* MENU */}
          <div className={`recycler-menu ${menuOpen ? "active" : ""}`}>

            <Link to="/recycler/dashboard" onClick={()=>setMenuOpen(false)}>
              Dashboard
            </Link>

            <Link to="/recycler/requests" onClick={()=>setMenuOpen(false)}>
              Pickup Requests
            </Link>

            <Link to="/recycler/mypickups" onClick={()=>setMenuOpen(false)}>
              My Pickups
            </Link>

            <Link to="/recycler/earnings" onClick={()=>setMenuOpen(false)}>
              My Earnings
            </Link>

            <Link to="/recycler/centers" onClick={()=>setMenuOpen(false)}>
              Recycling Centers
            </Link>

          </div>

          {/* PROFILE */}
          <div className="profile-wrapper">

            <div
              className="recycler-user"
              onClick={()=>setOpen(!open)}
            >
              👤 {name} ▼
            </div>

            {open && (

              <div className="profile-dropdown">

                <div onClick={()=>navigate("/recycler/profile")}>
                  👤 My Profile
                </div>

                <div onClick={()=>setShowLogout(true)}>
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
                onClick={()=>setShowLogout(false)}
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

export default RecyclerNavbar;