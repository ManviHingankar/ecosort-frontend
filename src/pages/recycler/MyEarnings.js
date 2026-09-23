import React, { useEffect, useState } from "react";
import "./MyEarnings.css";
import RecyclerNavbar from "../../components/RecyclerNavbar";

function MyEarnings(){

const [earnings,setEarnings] = useState([]);
const BASE_URL = "https://ecosort-backend-qf67.onrender.com";

useEffect(()=>{

const email = localStorage.getItem("userEmail");

fetch(`${BASE_URL}/api/pickup/recycler/my?email=${email}`)
.then(res=>res.json())
.then(data=>{

const list = Array.isArray(data) ? data : [];

const completed = list.filter(p=>p.status === "COMPLETED");

const formatted = completed.map(p=>({

device:p.wasteType,
email:p.userEmail,
date:new Date(p.completedAt || p.pickupDate).toLocaleDateString(),
amount:p.recyclerEarning || 0

}));

setEarnings(formatted);

})
.catch(err=>{
console.log("API ERROR:",err);
setEarnings([]);
});

},[]);

/* calculations */

const total = earnings.reduce((sum,e)=>sum+e.amount,0);
const adminCommission = total * 0.10;
const net = total - adminCommission;

return(

<div>

<RecyclerNavbar/>

<div className="earnings-page">

<h1>My Earnings</h1>

{/* CARDS */}
<div className="earnings-cards">

<div className="earn-card">
<h3>₹{total}</h3>
<p>Total Earnings</p>
</div>

<div className="earn-card">
<h3>{earnings.length}</h3>
<p>Pickups Completed</p>
</div>

<div className="earn-card">
<h3>{earnings.length}</h3>
<p>Devices Recycled</p>
</div>

</div>

{/* DESKTOP TABLE */}
<div className="desktop-view">

<table className="earnings-table">

<thead>
<tr>
<th>Device</th>
<th>User Email</th>
<th>Date</th>
<th>Earnings</th>
</tr>
</thead>

<tbody>

{earnings.length===0 ? (
<tr>
<td colSpan="4">No earnings yet</td>
</tr>
) : (

earnings.map((e,index)=>(
<tr key={index}>
<td>{e.device}</td>
<td>{e.email}</td>
<td>{e.date}</td>
<td>₹{e.amount}</td>
</tr>
))

)}

</tbody>

</table>

</div>

{/* MOBILE CARDS */}
<div className="mobile-view earnings-list">

{earnings.length===0 ? (
<p>No earnings yet</p>
) : (

earnings.map((e,index)=>(
<div key={index} className="earn-item">

<h3>{e.device}</h3>
<p><b>User:</b> {e.email}</p>
<p><b>Date:</b> {e.date}</p>
<p><b>Earning:</b> ₹{e.amount}</p>

</div>
))

)}

</div>

{/* SUMMARY */}
<div className="earnings-summary">

<p>Total Earned: ₹{total}</p>
<p>Admin Commission (10%): ₹{adminCommission}</p>
<p className="net">Your Earnings: ₹{net}</p>

</div>

</div>

</div>

);

}

export default MyEarnings;