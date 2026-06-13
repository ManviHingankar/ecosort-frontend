import React from "react";
import "./RecyclingCenters.css";
import UserNavbar from "../../components/UserNavbar";

function RecyclingCenters() {

const centers = [

{
name:"Eco Recycling Center",
address:"MIDC Bhosari, Pune",
phone:"+91 9876543210",
items:"Mobile, Laptop, Battery, Printer",
map:"https://www.google.com/maps?q=bhosari+pune"
},

{
name:"Green Earth Recycling",
address:"Pimpri-Chinchwad, Pune",
phone:"+91 9876501234",
items:"Mobile, Laptop, CPU, Chargers",
map:"https://www.google.com/maps?q=pimpri+chinchwad+pune"
},

{
name:"Ecoreco Collection Center",
address:"Hinjewadi Phase 2, Pune",
phone:"+91 9123456789",
items:"Mobile, Laptop, Battery",
map:"https://www.google.com/maps?q=hinjewadi+pune"
}

];

return (

<div>

{/* USER NAVBAR */}
<UserNavbar />

<div className="recycling-page">

<h1>Recycling Centers</h1>

<div className="centers-container">

{centers.map((center,index)=>(

<div className="center-card" key={index}>

<h3>{center.name}</h3>

<p><b>Address:</b> {center.address}</p>

<p><b>Phone:</b> {center.phone}</p>

<p><b>Accepted Items:</b> {center.items}</p>

<a href={center.map} target="_blank" rel="noreferrer">
View on Map
</a>

</div>

))}

</div>

</div>

</div>

);

}

export default RecyclingCenters;