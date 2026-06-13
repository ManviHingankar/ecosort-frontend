import React, { useEffect, useState } from "react";
import RecyclerNavbar from "../../components/RecyclerNavbar";
import "./RecyclerDashboard.css";

function RecyclerDashboard(){

const [pendingCount,setPendingCount] = useState(0);
const [assignedCount,setAssignedCount] = useState(0);
const [completedCount,setCompletedCount] = useState(0);
const [earnings,setEarnings] = useState(0);

// ✅ IMPORTANT (USE IP NOT LOCALHOST)
const BASE_URL = "http://192.168.1.106:8080";

useEffect(() => {

const email = localStorage.getItem("userEmail");

if(!email){
  console.log("No email found");
  return;
}

fetch(`${BASE_URL}/api/recycler/dashboard?email=${email}`)
.then(res => {
  if(!res.ok){
    throw new Error("API failed");
  }
  return res.json();
})
.then(data => {

  console.log("Recycler API:", data); // debug

  setPendingCount(data.pendingPickups || 0);
  setAssignedCount(data.totalPickups || 0);
  setCompletedCount(data.completedPickups || 0);
  setEarnings(data.totalEarnings || 0);

})
.catch((err) => {

  console.log("Recycler Dashboard Error:", err);

  setPendingCount(0);
  setAssignedCount(0);
  setCompletedCount(0);
  setEarnings(0);
});

}, []);

const adminCommission = earnings * 0.10;
const netEarning = earnings - adminCommission;

return(

<div>

<RecyclerNavbar/>

<div className="recycler-dashboard">

<div className="dashboard-header">

<h1>Recycler Dashboard</h1>
<p>Track pickup requests, recycling activity and earnings.</p>

</div>

{/* STAT CARDS */}

<div className="recycler-stats">

<div className="stat-card pending">
<div className="stat-icon">📦</div>
<div>
<h3>Pending Requests</h3>
<h2>{pendingCount}</h2>
</div>
</div>

<div className="stat-card assigned">
<div className="stat-icon">🚚</div>
<div>
<h3>My Pickups</h3>
<h2>{assignedCount}</h2>
</div>
</div>

<div className="stat-card collected">
<div className="stat-icon">♻️</div>
<div>
<h3>Completed Pickups</h3>
<h2>{completedCount}</h2>
</div>
</div>

<div className="stat-card earnings">
<div className="stat-icon">💰</div>
<div>
<h3>Total Earnings</h3>
<h2>₹{earnings}</h2>
</div>
</div>

</div>

{/* CONTENT */}

<div className="dashboard-content">

<div className="eco-info">

<h3>EcoSort Impact</h3>

<p>
Recycling electronic waste prevents toxic materials from entering landfills and helps recover valuable resources such as copper, aluminium and precious metals.
</p>

<p>
By completing pickups and sending devices to authorized recycling centers, you help build a cleaner and more sustainable environment.
</p>

</div>

<div className="eco-info">

<h3>My Earnings Summary</h3>

<p><strong>Total Earned:</strong> ₹{earnings}</p>

<p><strong>Admin Commission (10%):</strong> ₹{adminCommission}</p>

<p><strong>Your Net Earnings:</strong> ₹{netEarning}</p>

<p style={{marginTop:"15px"}}>
Keep completing pickups to increase your earnings and recycling impact.
</p>

</div>

</div>

</div>

</div>

);

}

export default RecyclerDashboard;