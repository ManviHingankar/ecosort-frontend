import React, { useState } from "react";
import "./Rewards.css";

function Estimator() {

const [device,setDevice] = useState("Phone");
const [condition,setCondition] = useState("Working");
const [points,setPoints] = useState(null);

const calculatePoints = () => {

let basePoints = {
Phone:80,
Laptop:150,
Battery:40,
Monitor:100,
Accessories:30
};

let multiplier = condition === "Working" ? 1.2 : 1;

let result = Math.round(basePoints[device] * multiplier);

setPoints(result);

};

return (

<div className="estimator-page">

<h1>E-Waste Value Estimator</h1>

<p>
Check how many EcoPoints you can earn by recycling your device.
</p>

<div className="estimator-box">

<label>Device Type</label>

<select value={device} onChange={(e)=>setDevice(e.target.value)}>

<option>Phone</option>
<option>Laptop</option>
<option>Battery</option>
<option>Monitor</option>
<option>Accessories</option>

</select>

<label>Condition</label>

<select value={condition} onChange={(e)=>setCondition(e.target.value)}>

<option>Working</option>
<option>Not Working</option>

</select>

<button onClick={calculatePoints}>
Estimate Value
</button>

{points && (

<div className="result">

<h2>Estimated Eco Points</h2>

<span>{points}</span>

</div>

)}

</div>

</div>

);

}

export default Estimator;
