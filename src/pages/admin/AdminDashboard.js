import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import "./AdminDashboard.css";

function AdminDashboard(){

const [stats,setStats] = useState({});
const [pendingRecyclers,setPendingRecyclers] = useState([]);
const [recentPickups,setRecentPickups] = useState([]);

const BASE_URL = "https://ecosort-backend-qf67.onrender.com"; // ✅ CHANGE THIS

useEffect(()=>{

/* DASHBOARD STATS */
fetch(`${BASE_URL}/api/admin/stats`)
.then(res => res.json())
.then(data => setStats(data || {}))
.catch(err => {
  console.log("Stats error:", err);
  setStats({});
});

/* PENDING RECYCLERS */
fetch(`${BASE_URL}/api/admin/pending-recyclers`)
.then(res => res.json())
.then(data => setPendingRecyclers(Array.isArray(data) ? data : []))
.catch(err => {
  console.log("Recycler error:", err);
  setPendingRecyclers([]);
});

/* RECENT PICKUPS */
fetch(`${BASE_URL}/api/admin/recent-pickups`)
.then(res => res.json())
.then(data => setRecentPickups(Array.isArray(data) ? data : []))
.catch(err => {
  console.log("Pickup error:", err);
  setRecentPickups([]);
});

},[]);


/* APPROVE */
const approveRecycler = async (id) => {

try{
await fetch(`${BASE_URL}/api/admin/approve/${id}`,{
method:"PUT"
});

setPendingRecyclers(prev => prev.filter(r => r.id !== id));

}catch(err){
console.log("Approve error:", err);
}

};


return(

<div>

<AdminNavbar/>

<div className="admin-dashboard">

<h1 className="admin-title">Admin Dashboard</h1>

{/* STATS */}
<div className="admin-stats">

<div className="admin-card">
<h3>Total Users</h3>
<p>{stats.users ?? 0}</p>
</div>

<div className="admin-card">
<h3>Total Recyclers</h3>
<p>{stats.recyclers ?? 0}</p>
</div>

<div className="admin-card">
<h3>Pending Approvals</h3>
<p>{stats.pending ?? 0}</p>
</div>

<div className="admin-card">
<h3>Total Pickups</h3>
<p>{stats.pickups ?? 0}</p>
</div>

<div className="admin-card">
<h3>Completed Pickups</h3>
<p>{stats.completed ?? 0}</p>
</div>

</div>


{/* GRID */}
<div className="admin-grid">

{/* PENDING RECYCLERS */}
<div className="admin-section">

<h2>Pending Recycler Approvals</h2>

<div className="table-wrapper">

<table>

<thead>
<tr>
<th>Name</th>
<th>City</th>
<th>Action</th>
</tr>
</thead>

<tbody>

{pendingRecyclers.length === 0 ? (
<tr>
<td colSpan="3">No pending recyclers</td>
</tr>
) : (
pendingRecyclers.map(r => (
<tr key={r.id}>
<td>{r.name}</td>
<td>{r.serviceCity}</td>
<td>
<button
className="approve-btn"
onClick={()=>approveRecycler(r.id)}
>
Approve
</button>
</td>
</tr>
))
)}

</tbody>

</table>

</div>

</div>


{/* RECENT PICKUPS */}
<div className="admin-section">

<h2>Recent Pickup Requests</h2>

<div className="table-wrapper">

<table>

<thead>
<tr>
<th>User</th>
<th>Device</th>
<th>Status</th>
</tr>
</thead>

<tbody>

{recentPickups.length === 0 ? (
<tr>
<td colSpan="3">No pickups yet</td>
</tr>
) : (
recentPickups.map(p => (
<tr key={p.id}>
<td>{p.email}</td>
<td>{p.wasteType}</td>
<td>{p.status}</td>
</tr>
))
)}

</tbody>

</table>

</div>

</div>

</div>

</div>

</div>

);

}

export default AdminDashboard;