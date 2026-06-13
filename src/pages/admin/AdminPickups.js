import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import "./AdminPickups.css";

function AdminPickups(){

const [pickups,setPickups] = useState([]);

const BASE_URL = "http://192.168.1.106:8080"; // ✅ FIX

useEffect(()=>{

fetch(`${BASE_URL}/api/admin/pickups`)
.then(res=>{
  if(!res.ok) throw new Error("API failed");
  return res.json();
})
.then(data=>{
  setPickups(Array.isArray(data)?data:[]);
})
.catch(err=>{
  console.log("ERROR:",err);
  setPickups([]); // fallback
});

},[]);

return(

<div>

<AdminNavbar/>

<div className="admin-pickups">

<h1>Pickup Management</h1>

<div className="table-wrapper"> {/* ✅ ADD */}

<table className="pickup-table">

<thead>
<tr>
<th>User</th>
<th>Device</th>
<th>Recycler</th>
<th>Date</th>
<th>Area</th>
<th>Status</th>
</tr>
</thead>

<tbody>

{pickups.length===0 ? (

<tr>
<td colSpan="6" className="no-data">
No pickup requests found
</td>
</tr>

):(pickups.map(p=>(

<tr key={p.id}>

<td>{p.userEmail}</td>
<td>{p.wasteType}</td>
<td>{p.recyclerEmail || "Not Assigned"}</td>
<td>{p.pickupDate}</td>
<td>{p.area}</td>

<td>
{p.status==="COMPLETED" ? (
<span className="status-completed">Completed</span>
):p.status==="ASSIGNED" ? (
<span className="status-assigned">Assigned</span>
):(
<span className="status-pending">Pending</span>
)}
</td>

</tr>

)))}

</tbody>

</table>

</div>

</div>

</div>

);

}

export default AdminPickups;