import React, { useEffect, useState } from "react";
import UserNavbar from "../../components/UserNavbar";
import "./EcoPoints.css";

function EcoPoints() {

const [points,setPoints] = useState(0);
const [requests,setRequests] = useState([]);

useEffect(()=>{

const email = localStorage.getItem("userEmail");

/* fetch user eco points */
fetch(`https://ecosort-backend-qf67.onrender.com/api/user/${email}`)
.then(res=>res.json())
.then(data=>{
setPoints(data.greenPoints || 0);
});

/* fetch pickup requests */
fetch(`https://ecosort-backend-qf67.onrender.com/api/pickup/my-requests/${email}`)
.then(res=>res.json())
.then(data=>{
setRequests(data);
});

},[]);


/* calculations */

const devices = requests.reduce((sum,r)=>sum + (r.quantity || 0),0);

const co2Saved = devices * 5;

const energySaved = devices * 4;

const materialsSaved = devices * 1.5;


/* eco level */

const getLevel=(points)=>{

if(points >= 400) return "Planet Protector 🌍";
if(points >= 150) return "Eco Champion ♻";
if(points >= 50) return "Eco Supporter 🌱";

return "Beginner Recycler";

};


/* progress calculation */

const nextLevelPoints = points < 50 ? 50 :
points < 150 ? 150 :
points < 400 ? 400 : 500;

const progress = Math.min((points/nextLevelPoints)*100,100);


/* achievements */

const achievements = [
{label:"First Pickup 🌱", unlocked:devices >= 1},
{label:"Device Recycler ♻", unlocked:devices >= 5},
{label:"Eco Supporter 🌍", unlocked:points >= 50},
{label:"Eco Champion 🏆", unlocked:points >= 150}
];


return(

<div className="eco-page">

<UserNavbar/>

<h1 className="eco-title">Eco Points</h1>


{/* SUMMARY CARDS */}

<div className="eco-cards">

<div className="eco-card">
<h3>Total Points</h3>
<h2>{points}</h2>
</div>

<div className="eco-card">
<h3>Your Level</h3>
<h2>{getLevel(points)}</h2>
</div>

<div className="eco-card">
<h3>Devices Recycled</h3>
<h2>{devices}</h2>
</div>

<div className="eco-card">
<h3>CO₂ Saved</h3>
<h2>{co2Saved} kg</h2>
</div>

</div>


{/* LEVEL PROGRESS */}

<div className="progress-section">

<h3>Progress to Next Level</h3>

<div className="progress-bar">

<div
className="progress-fill"
style={{width:`${progress}%`}}
></div>

</div>

<p>{points} / {nextLevelPoints} Points</p>

</div>


{/* ENVIRONMENT IMPACT */}

<div className="impact-section">

<h2>Environmental Impact</h2>

<div className="impact-cards">

<div className="impact-card">
<h3>⚡ Energy Saved</h3>
<p>{energySaved} kWh</p>
</div>

<div className="impact-card">
<h3>🔋 Materials Recovered</h3>
<p>{materialsSaved.toFixed(1)} kg</p>
</div>

</div>

</div>


{/* ACHIEVEMENTS */}

<div className="achievement-section">

<h2>Eco Achievements</h2>

<div className="badges">

{achievements.map((a,i)=>(

<div
key={i}
className={`badge ${a.unlocked ? "unlocked":"locked"}`}
>
{a.label}
</div>

))}

</div>

</div>


{/* POINT HISTORY */}

<h2 className="history-title">Points History</h2>

<table className="history-table">

<thead>
<tr>
<th>Date</th>
<th>Device</th>
<th>Quantity</th>
<th>Points</th>
<th>Status</th>
</tr>
</thead>

<tbody>

{requests.map(req=>{

let pts = 0;

switch(req.wasteType){

case "Laptop":
pts = 25 * req.quantity;
break;

case "Mobile":
pts = 10 * req.quantity;
break;

default:
pts = 5 * req.quantity;

}

return(

<tr key={req.id}>

<td>{req.pickupDate}</td>
<td>{req.wasteType}</td>
<td>{req.quantity}</td>
<td>+{pts}</td>
<td>{req.status}</td>

</tr>

);

})}

</tbody>

</table>

</div>

);

}

export default EcoPoints;