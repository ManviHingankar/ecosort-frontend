import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import "./AdminAnalytics.css";

function AdminAnalytics() {

const [stats, setStats] = useState({});
const [status, setStatus] = useState({});
const [devices, setDevices] = useState({});
const [topRecyclers, setTopRecyclers] = useState([]);

const BASE_URL = "http://192.168.1.106:8080"; // ✅ FIX

useEffect(() => {

fetch(`${BASE_URL}/api/admin/stats`)
.then(res => res.json())
.then(data => setStats(data || {}))
.catch(()=>setStats({}));

fetch(`${BASE_URL}/api/admin/status-analytics`)
.then(res => res.json())
.then(data => setStatus(data || {}))
.catch(()=>setStatus({}));

fetch(`${BASE_URL}/api/admin/device-analytics`)
.then(res => res.json())
.then(data => setDevices(data || {}))
.catch(()=>setDevices({}));

fetch(`${BASE_URL}/api/admin/top-recyclers`)
.then(res => res.json())
.then(data => setTopRecyclers(Array.isArray(data)?data:[]))
.catch(()=>setTopRecyclers([]));

}, []);

return (

<div>

<AdminNavbar/>

<div className="admin-analytics">

<h1>Analytics</h1>

{/* STAT CARDS */}

<div className="analytics-cards">

<div className="analytics-card">
<h2>{stats.users || 0}</h2>
<p>Total Users</p>
</div>

<div className="analytics-card">
<h2>{stats.recyclers || 0}</h2>
<p>Total Recyclers</p>
</div>

<div className="analytics-card">
<h2>{stats.pickups || 0}</h2>
<p>Total Pickups</p>
</div>

<div className="analytics-card">
<h2>{stats.completed || 0}</h2>
<p>Completed Pickups</p>
</div>

</div>

{/* STATUS */}

<div className="analytics-section">

<h2>Pickup Status Overview</h2>

<div className="status-grid">

<div className="status-card pending">
<h3>{status.pending || 0}</h3>
<p>Pending</p>
</div>

<div className="status-card accepted">
<h3>{status.accepted || 0}</h3>
<p>Accepted</p>
</div>

<div className="status-card completed">
<h3>{status.completed || 0}</h3>
<p>Completed</p>
</div>

</div>

</div>

{/* DEVICES */}

<div className="analytics-section">

<h2>E-Waste Device Collection</h2>

<div className="device-grid">

<div className="device-card">
<h3>{devices.mobile || 0}</h3>
<p>Mobile</p>
</div>

<div className="device-card">
<h3>{devices.laptop || 0}</h3>
<p>Laptop</p>
</div>

<div className="device-card">
<h3>{devices.battery || 0}</h3>
<p>Battery</p>
</div>

<div className="device-card">
<h3>{devices.charger || 0}</h3>
<p>Charger</p>
</div>

<div className="device-card">
<h3>{devices.monitor || 0}</h3>
<p>Monitor</p>
</div>

</div>

</div>

{/* TABLE */}

<div className="analytics-section">

<h2>Top Performing Recyclers</h2>

<div style={{overflowX:"auto"}}> {/* ✅ MOBILE FIX */}

<table className="analytics-table">

<thead>
<tr>
<th>Recycler</th>
<th>Completed Pickups</th>
</tr>
</thead>

<tbody>

{topRecyclers.length === 0 ? (
<tr>
<td colSpan="2">No data</td>
</tr>
) : (
topRecyclers.map((r,index)=>(
<tr key={index}>
<td>{r.name}</td>
<td>{r.completed}</td>
</tr>
))
)}

</tbody>

</table>

</div>

</div>

</div>

</div>

);

}

export default AdminAnalytics;