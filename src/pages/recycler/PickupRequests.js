import React, { useCallback, useEffect, useState } from "react";
import RecyclerNavbar from "../../components/RecyclerNavbar";
import "./PickupRequests.css";

const BASE_URL = "http://192.168.1.106:8080";

function PickupRequests(){

const [requests,setRequests] = useState([]);
const [loading,setLoading] = useState(true);

const recyclerEmail = localStorage.getItem("userEmail");
const recyclerName = localStorage.getItem("userName");

const fetchRequests = useCallback(()=>{

fetch(`${BASE_URL}/api/recycler/area-pickups?email=${recyclerEmail}`)
.then(res=>res.json())
.then(data=>{
setRequests(Array.isArray(data)?data:[]);
setLoading(false);
})
.catch(()=>{
setLoading(false);
});

},[recyclerEmail]);

useEffect(()=>{
fetchRequests();
},[fetchRequests]);

const acceptPickup = (id)=>{

fetch(`${BASE_URL}/api/pickup/recycler/accept/${id}`,{
method:"PUT",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
recyclerEmail:recyclerEmail,
recyclerName:recyclerName
})
})
.then(()=>fetchRequests());

};

return(

<div>

<RecyclerNavbar/>

<div className="pickup-page">

<h1>Pickup Requests</h1>
<p>View pickup requests from your assigned service area.</p>

{loading && <p className="loading">Loading...</p>}

{!loading && requests.length===0 && (

<div className="empty-state">
<h3>No pickup requests available</h3>
<p>No pending requests in your area.</p>
</div>

)}

{requests.length>0 && (

<>
{/* DESKTOP TABLE */}
<div className="pickup-table desktop-view">

<table>

<thead>
<tr>
<th>Waste Type</th>
<th>Address</th>
<th>Date</th>
<th>Time</th>
<th>Status</th>
<th>Action</th>
</tr>
</thead>

<tbody>

{requests.map((req)=>(
<tr key={req.id}>

<td>{req.wasteType}</td>
<td>{req.address}</td>
<td>{req.pickupDate ? new Date(req.pickupDate).toLocaleDateString() : "-"}</td>
<td>{req.timeSlot || "-"}</td>

<td>
<span className="status pending">{req.status}</span>
</td>

<td>
<button
className="accept-btn"
onClick={()=>acceptPickup(req.id)}
>
Accept
</button>
</td>

</tr>
))}

</tbody>

</table>

</div>


{/* MOBILE CARDS */}

<div className="pickup-cards mobile-view">

{requests.map((req)=>(
<div key={req.id} className="pickup-card">

<h3>{req.wasteType}</h3>

<p><b>Address:</b> {req.address}</p>
<p><b>Date:</b> {req.pickupDate ? new Date(req.pickupDate).toLocaleDateString() : "-"}</p>
<p><b>Time:</b> {req.timeSlot || "-"}</p>

<span className="status pending">{req.status}</span>

<button
className="accept-btn"
onClick={()=>acceptPickup(req.id)}
>
Accept Pickup
</button>

</div>
))}

</div>

</>

)}

</div>

</div>

);

}

export default PickupRequests;
