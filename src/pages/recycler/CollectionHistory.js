import React, { useEffect, useState } from "react";
import RecyclerNavbar from "../../components/RecyclerNavbar";
import "./CollectionHistory.css";

function CollectionHistory(){

const [history,setHistory] = useState([]);

const recyclerEmail = localStorage.getItem("userEmail");

useEffect(()=>{

fetch(`http://localhost:8080/api/pickup/recycler/my?email=${recyclerEmail}`)
.then(res=>res.json())
.then(data=>{

/* FIX: ensure array */

const pickups = Array.isArray(data) ? data : [];

/* filter completed */

const completed = pickups.filter(p => p.status === "COMPLETED");

setHistory(completed);

});

},[]);


const totalDevices = history.reduce(
(sum,p)=> sum + (p.quantity || 0),
0
);


return(

<div>

<RecyclerNavbar/>

<div className="history-container">

<h1 className="history-title">Collection History</h1>

<div className="summary-card">

<h3>Total Devices Recycled</h3>
<h2>{totalDevices}</h2>

</div>


{history.length === 0 ?(

<div className="empty">

<h3>No completed pickups yet</h3>
<p>Recycle devices to see your collection history.</p>

</div>

):( 

<table className="history-table">

<thead>

<tr>
<th>Device</th>
<th>Quantity</th>
<th>Date</th>
<th>City</th>
<th>Address</th>
<th>Status</th>
</tr>

</thead>

<tbody>

{history.map(p=>(

<tr key={p.id}>

<td>{p.wasteType}</td>

<td>{p.quantity}</td>

<td>{p.pickupDate}</td>

<td>{p.city}</td>

<td>{p.address}</td>

<td>
<span className="status recycled">
{p.status}
</span>
</td>

</tr>

))}

</tbody>

</table>

)}

</div>

</div>

);

}

export default CollectionHistory;