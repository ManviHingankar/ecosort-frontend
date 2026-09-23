import React,{useEffect,useState} from "react";
import UserNavbar from "../../components/UserNavbar";
import "./MyEarnings.css";

function MyEarnings(){

const [requests,setRequests] = useState([]);
const [total,setTotal] = useState(0);
const [co2,setCo2] = useState(0);
const [trees,setTrees] = useState(0);

// ✅ BASE URL FIX
const BASE_URL = "https://ecosort-backend-qf67.onrender.com";

useEffect(()=>{

const email = localStorage.getItem("userEmail") || "";

fetch(`${BASE_URL}/api/pickup/my-requests/${email}`)
.then(res=>res.json())
.then(data=>{

const completed = (Array.isArray(data) ? data : []).filter(r=>r.status === "COMPLETED");

setRequests(completed);

let sum = 0;
let deviceCount = 0;

completed.forEach(r=>{
sum += r.userEarning || 0;

if(r.wasteType){
deviceCount += r.wasteType.split(",").length;
}
});

setTotal(sum);

/* ENVIRONMENT IMPACT */

const co2Saved = deviceCount * 5;
const treesSaved = Math.floor(co2Saved / 20);

setCo2(co2Saved);
setTrees(treesSaved);

})
.catch(err=>{
console.log("Earnings fetch error:", err);
setRequests([]);
});

},[]);

return(

<>

<UserNavbar/>

<div className="earnings-page">

<h1 className="earn-title">My Earnings</h1>

<div className="earn-summary">

<div className="earn-card">
<h3>Total Earnings</h3>
<p>₹ {total}</p>
</div>

<div className="earn-card">
<h3>Completed Pickups</h3>
<p>{requests.length}</p>
</div>

<div className="earn-card">
<h3>CO₂ Saved</h3>
<p>{co2} kg</p>
</div>

<div className="earn-card">
<h3>Trees Saved</h3>
<p>{trees} 🌳</p>
</div>

</div>

</div>

</>

);

}

export default MyEarnings;