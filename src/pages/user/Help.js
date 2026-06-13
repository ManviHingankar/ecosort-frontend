import React from "react";
import UserNavbar from "../../components/UserNavbar";
import "./Help.css";

function Help(){

return(

<>

<UserNavbar/>

<div className="help-page">

<h1 className="help-title">Help Center</h1>
<p className="help-subtitle">
Find answers about using EcoSort and recycling e-waste
</p>

<div className="help-container">

<div className="help-card">
<h2>♻ How EcoSort Works</h2>
<ol>
<li>Register or login to EcoSort</li>
<li>Schedule a pickup for your e-waste</li>
<li>Recycler collects the device</li>
<li>Device is safely recycled</li>
<li>Recycler evaluates the device and calculates its value</li>
</ol>
</div>

<div className="help-card">
<h2>📦 What Items We Accept</h2>
<ul>
<li>Mobile Phones</li>
<li>Laptops</li>
<li>CPUs</li>
<li>Chargers</li>
<li>Batteries</li>
<li>Printers</li>
<li>Tablets</li>
<li>Small Electronic Appliances</li>
</ul>
</div>

<div className="help-card">
<h2>🚚 How to Schedule Pickup</h2>
<p>
Go to <b>Dashboard → Schedule Pickup</b> and fill device details.
Choose pickup date and submit request.
A recycler will collect your device from your location.
</p>
</div>

<div className="help-card">
<h2>📊 Pickup Status Meaning</h2>
<ul>
<li><b>PENDING</b> – Pickup requested</li>
<li><b>ACCEPTED</b> – Recycler accepted the pickup</li>
<li><b>COMPLETED</b> – Device collected and recycled</li>
<li><b>CANCELLED</b> – Pickup request cancelled</li>
</ul>
</div>

<div className="help-card">
<h2>📞 Contact Support</h2>
<p>Email: support@ecosort.com</p>
<p>Phone: +91 9876543210</p>
<p>Location: Pune, Maharashtra</p>
</div>

</div>

</div>

</>
)

}

export default Help;