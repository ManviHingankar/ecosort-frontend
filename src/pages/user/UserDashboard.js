import React, { useEffect, useState } from "react";
import UserNavbar from "../../components/UserNavbar";
import "./UserDashboard.css";

function UserDashboard(){

  const [stats,setStats] = useState({
    totalRequests:0,
    pendingPickups:0,
    completedPickups:0,
    totalEarnings:0
  });

  const [recent,setRecent] = useState([]);

  // ✅ BASE URL (FIXED FOR MOBILE)
  const BASE_URL = "https://ecosort-backend-qf67.onrender.com";

  useEffect(()=>{

    const email = localStorage.getItem("userEmail") || "";

    console.log("EMAIL:", email);

    // ✅ DASHBOARD DATA
    fetch(`${BASE_URL}/api/pickup/dashboard/${email}`)
      .then(res => res.json())
      .then(data => {
        console.log("DASHBOARD DATA:", data);
        setStats(data || {});
      })
      .catch(err => {
        console.log("Dashboard error:", err);
        setStats({
          totalRequests:0,
          pendingPickups:0,
          completedPickups:0,
          totalEarnings:0
        });
      });

    // ✅ RECENT ACTIVITY
    fetch(`${BASE_URL}/api/pickup/my-requests/${email}`)
      .then(res => res.json())
      .then(data => {
        console.log("RECENT DATA:", data);
        setRecent(Array.isArray(data) ? data : []);
      })
      .catch(err => {
        console.log("Recent error:", err);
        setRecent([]);
      });

  }, []);

  // ✅ DERIVED
  const devices = stats.completedPickups || 0;
  const co2Saved = devices * 5;

  // ✅ LEVEL LOGIC
  let level = "Beginner 🌱";
  if(devices >= 6){
    level = "Green Champion 🌳";
  }
  else if(devices >= 3){
    level = "Eco Warrior ♻";
  }

  return(

    <div className="dashboard-page">

      <UserNavbar/>

      <h1 className="dashboard-title">
        Welcome back 👋
      </h1>

      <p className="dashboard-subtitle">
        Track your recycling progress and earnings ♻
      </p>

      {/* ✅ STATS */}
      <div className="stats-grid">

        <div className="stat-card">
          <h3>Total Requests</h3>
          <h2>{stats.totalRequests || 0}</h2>
        </div>

        <div className="stat-card">
          <h3>Pending Pickups</h3>
          <h2>{stats.pendingPickups || 0}</h2>
        </div>

        <div className="stat-card">
          <h3>Completed Pickups</h3>
          <h2>{stats.completedPickups || 0}</h2>
        </div>

        <div className="stat-card">
          <h3>Devices Recycled</h3>
          <h2>{devices}</h2>
        </div>

        <div className="stat-card">
          <h3>CO₂ Saved</h3>
          <h2>{co2Saved} kg</h2>
        </div>

        <div className="stat-card">
          <h3>Total Earnings</h3>
          <h2>₹ {stats.totalEarnings || 0}</h2>
        </div>

      </div>

      {/* ✅ RECENT ACTIVITY */}
      <h2 className="section-title">Recent Activity</h2>

      <div className="activity-container">
        {recent.length === 0 ? (
          <p>No recent activity</p>
        ) : (
          recent.map((item, index) => (
            <div key={index} className="activity-card">
              <p><strong>{item.wasteType}</strong></p>
              <span className={`status ${item.status?.toLowerCase()}`}>
                {item.status}
              </span>
            </div>
          ))
        )}
      </div>

      {/* ✅ LEVEL */}
      <div className="recycling-level-section">

        <h2 className="level-title">Your Recycling Level</h2>

        <div className="level-box">
          <h3>{level}</h3>
          <p>Keep recycling to grow your eco impact 🌍</p>
        </div>

      </div>

    </div>

  );

}

export default UserDashboard;