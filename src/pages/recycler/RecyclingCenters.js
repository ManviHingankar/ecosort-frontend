import React from "react";
import "./RecyclingCenters.css";
import RecyclerNavbar from "../../components/RecyclerNavbar";

function RecyclingCenters() {

const centers = [

{
name:"Eco Recycling Center",
area:"Bhosari",
address:"MIDC Bhosari, Pune",
phone:"+91 9876543210",
items:"Mobile, Laptop, Battery, Printer",
map:"https://www.google.com/maps?q=bhosari+pune"
},

{
name:"Green Earth Recycling",
area:"Chikhali",
address:"Spine Road Chikhali, Pune",
phone:"+91 9876501234",
items:"Mobile, Laptop, CPU, Chargers",
map:"https://www.google.com/maps?q=chikhali+pune"
},

{
name:"EcoGreen Waste Center",
area:"Chinchwad",
address:"Chinchwad MIDC Pune",
phone:"+91 9000012345",
items:"Mobile, Laptop, Battery",
map:"https://www.google.com/maps?q=chinchwad+pune"
},

{
name:"Ecoreco Collection Center",
area:"Hinjewadi",
address:"Hinjewadi Phase 2, Pune",
phone:"+91 9123456789",
items:"Mobile, Laptop, Battery",
map:"https://www.google.com/maps?q=hinjewadi+pune"
},

{
name:"Pune E-Waste Recycling Hub",
area:"Wakad",
address:"Wakad Pune",
phone:"+91 9345678901",
items:"Laptop, Mobile, Monitor, Printer",
map:"https://www.google.com/maps?q=wakad+pune"
},

{
name:"Sai Recycling Facility",
area:"Nigdi",
address:"Nigdi Pradhikaran Pune",
phone:"+91 9212345678",
items:"Laptop, Mobile, TV, CPU",
map:"https://www.google.com/maps?q=nigdi+pune"
},

{
name:"Green Planet Recycling",
area:"Akurdi",
address:"Akurdi MIDC Pune",
phone:"+91 9765432100",
items:"Mobile, Laptop, Chargers",
map:"https://www.google.com/maps?q=akurdi+pune"
},

{
name:"EcoTech Waste Center",
area:"Pimpri",
address:"Pimpri Pune",
phone:"+91 9988776655",
items:"Laptop, Printer, Battery",
map:"https://www.google.com/maps?q=pimpri+pune"
}

];

return (

<div>

<RecyclerNavbar/>

<div className="recycling-page">

<h1>Recycling Centers</h1>
<p>Authorized e-waste recycling centers in Pune</p>

<div className="centers-container">

{centers.map((center,index)=>(

<div className="center-card" key={index}>

<h3>{center.name}</h3>

<p><b>Area:</b> {center.area}</p>

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