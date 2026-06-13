import React,{useState} from "react";
import UserNavbar from "../../components/UserNavbar";
import "./Estimator.css";

function Estimator(){

const [device,setDevice] = useState("");
const [condition,setCondition] = useState("");
const [quantity,setQuantity] = useState(1);

const [price,setPrice] = useState(null);
const [co2,setCo2] = useState(null);
const [error,setError] = useState("");

// ✅ BASE URL FIX (IMPORTANT)
const BASE_URL = "http://192.168.1.106:8080";

const handleEstimate = async (e) => {

e.preventDefault();

setError("");

try{

const res = await fetch(`${BASE_URL}/api/price/estimate`,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
wasteType:device,
condition:condition
})
});

const data = await res.text();

const total = Number(data) * quantity;

setPrice(total);
setCo2(quantity * 2);

}
catch(err){

console.error("API ERROR:",err);

/* fallback so page never crashes */

const estimated = 300 * quantity;

setPrice(estimated);
setCo2(quantity * 2);

setError("Backend not reachable. Showing estimated value.");

}

};

return(

<div className="estimator-page">

<UserNavbar/>

<h1 className="estimator-title">E-Waste Value Estimator</h1>

<div className="estimator-container">

<div className="estimator-card">

<form onSubmit={handleEstimate}>

<label>Device Type</label>

<select
value={device}
onChange={(e)=>setDevice(e.target.value)}
required
>
<option value="">Select Device</option>
<option>Mobile</option>
<option>Laptop</option>
<option>Computer</option>
<option>Battery</option>
<option>Printer</option>
<option>Monitor</option>
</select>

<label>Condition</label>

<select
value={condition}
onChange={(e)=>setCondition(e.target.value)}
required
>
<option value="">Select Condition</option>
<option>WORKING</option>
<option>NON_WORKING</option>
</select>

<label>Quantity</label>

<input
type="number"
min="1"
value={quantity}
onChange={(e)=>setQuantity(e.target.value)}
/>

<button type="submit">
Estimate Value
</button>

</form>

{error && (
<p style={{color:"red",marginTop:"10px"}}>{error}</p>
)}

{/* RESULT BELOW BUTTON */}

{price !== null && (

<div className="result-card">

<h2>Estimated Result</h2>

<div className="result-box">

<div className="result-item">
<h4>Estimated Value</h4>
<p>₹ {price}</p>
</div>

<div className="result-item">
<h4>CO₂ Saved</h4>
<p>{co2} kg</p>
</div>

<div className="result-item">
<h4>Environmental Impact</h4>
<p>🌱 Sustainable Recycling</p>
</div>

</div>

</div>

)}

</div>

</div>

</div>

);

}

export default Estimator;