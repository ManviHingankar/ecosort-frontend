import React, { useEffect, useState } from "react";
import RecyclerNavbar from "../../components/RecyclerNavbar";
import "./MyPickups.css";

const BASE_URL = "https://ecosort-backend-qf67.onrender.com";

function MyPickups(){

const [pickups,setPickups] = useState([]);

const recyclerEmail = localStorage.getItem("userEmail");

useEffect(()=>{

fetch(`${BASE_URL}/api/recycler/mypickups?email=${recyclerEmail}`)
.then(res=>res.json())
.then(data=>{
setPickups(Array.isArray(data)?data:[]);
});

},[recyclerEmail]);

const updateStatus = async(id,newStatus)=>{

try{

const response = await fetch(
`${BASE_URL}/api/pickup/recycler/status/${id}`,
{
method:"PUT",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
status:newStatus
})
}
);

const result = await response.text();

if(response.ok){

alert(result);

setPickups(prev =>
prev.map(p =>
p.id === id ? {...p,status:newStatus} : p
)
);

}

}catch(error){

console.error(error);
alert("Error updating status");

}

};

const nextStatus=(status)=>{

switch(status){
case "ACCEPTED": return "OUT_FOR_PICKUP";
case "OUT_FOR_PICKUP": return "COMPLETED";
default: return null;
}

};

return(

<div className="mypickups-page">

<RecyclerNavbar/>

<div className="mypickups-container">

<h1 className="title">My Pickups</h1>

{pickups.length === 0 ?(

<div className="empty">
<h3>No pickups assigned</h3>
<p>Accept pickup requests to start collecting devices.</p>
</div>

):( 

<div className="pickup-grid">

{pickups.map(pickup=>{

const next = nextStatus(pickup.status);

return(

<div key={pickup.id} className="pickup-card">

<div className="pickup-header">

<h3>{pickup.wasteType}</h3>

<span className={`status ${pickup.status.toLowerCase()}`}>
{pickup.status}
</span>

</div>

<div className="pickup-body">

<p><b>Quantity:</b> {pickup.quantity}</p>
<p><b>Date:</b> {pickup.pickupDate}</p>
<p><b>Time:</b> {pickup.timeSlot}</p>
<p><b>City:</b> {pickup.serviceCity}</p>
<p><b>Address:</b> {pickup.address}</p>

</div>

<div className="pickup-footer">

{next && (

<button
className="update-btn"
onClick={()=>updateStatus(pickup.id,next)}
>
Mark {next.replace("_"," ")}
</button>

)}

</div>

</div>

);

})}

</div>

)}

</div>

</div>

);

}

export default MyPickups;
