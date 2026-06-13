import React, { useState } from "react";
import UserNavbar from "../../components/UserNavbar";
import "./SchedulePickup.css";

function SchedulePickup() {

const [devices,setDevices] = useState([
{ wasteType:"", condition:"", quantity:1 }
]);

const [pickupData,setPickupData] = useState({
pickupDate:"",
timeSlot:"",
city:"Pune",
area:"",
address:"",
description:""
});

const [images,setImages] = useState([]);
const [loading,setLoading] = useState(false);   // ✅ NEW

const handleDeviceChange=(index,event)=>{
const values=[...devices];
values[index][event.target.name]=event.target.value;
setDevices(values);
};

const addDevice=()=>{
setDevices([...devices,{wasteType:"",condition:"",quantity:1}]);
};

const removeDevice=(index)=>{
const values=[...devices];
values.splice(index,1);
setDevices(values);
};

const handleChange=(e)=>{
setPickupData({
...pickupData,
[e.target.name]:e.target.value
});
};

const handleImageChange=(e)=>{
const files = Array.from(e.target.files);
setImages([...images,...files]);
};

const handleSubmit=async(e)=>{
e.preventDefault();

const email = localStorage.getItem("userEmail");

let deviceSummary = devices.map(d =>
`${d.wasteType} (${d.condition}) x${d.quantity}`
).join(", ");

setLoading(true);   // ✅ START LOADING

try{

const BASE_URL = "http://192.168.1.106:8080";

await fetch(`${BASE_URL}/api/pickup/request`,{
method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
email:email,
wasteType:deviceSummary,
deviceCondition:"Mixed",
quantity:1,
pickupDate: pickupData.pickupDate,
timeSlot: pickupData.timeSlot,
serviceCity: "Pune",
serviceArea: pickupData.area,
address:pickupData.address,
description:pickupData.description
})

});

// ✅ SUCCESS MESSAGE
alert("✅ Pickup Request Submitted Successfully!");

}catch(error){

alert("❌ Server error");

}

setLoading(false);   // ✅ STOP LOADING
};

return(

<>

<UserNavbar/>

<div className="pickup-page">

<div className="pickup-wrapper single">

<div className="pickup-card">

<h2>Pickup Request</h2>

<form onSubmit={handleSubmit}>

{devices.map((device,index)=>(

<div key={index} className="device-block">

<div className="device-row">

<div className="field">
<label>Waste Type</label>

<select
name="wasteType"
value={device.wasteType}
onChange={e=>handleDeviceChange(index,e)}
required
>
<option value="">Select Device</option>
<option>Air Conditioner</option>
<option>Battery</option>
<option>Camera</option>
<option>Computer</option>
<option>Desktop</option>
<option>Hard Disk</option>
<option>Laptop</option>
<option>Mobile</option>
<option>Monitor</option>
<option>Printer</option>
<option>Refrigerator</option>
<option>Router</option>
<option>Tablet</option>
<option>Television</option>
<option>Washing Machine</option>
</select>

</div>

<div className="field">
<label>Condition</label>

<select
name="condition"
value={device.condition}
onChange={e=>handleDeviceChange(index,e)}
required
>
<option value="">Select</option>
<option>WORKING</option>
<option>NON_WORKING</option>
</select>

</div>

<div className="field">
<label>Quantity</label>

<input
type="number"
name="quantity"
min="1"
value={device.quantity}
onChange={e=>handleDeviceChange(index,e)}
required
/>
</div>

{devices.length>1 && (
<button
type="button"
className="remove-btn"
onClick={()=>removeDevice(index)}
>
🗑
</button>
)}

</div>

</div>

))}

<button
type="button"
className="add-device-btn"
onClick={addDevice}
>
+ Add Another Device
</button>

<label>Pickup Date</label>

<input
type="date"
name="pickupDate"
value={pickupData.pickupDate}
onChange={handleChange}
required
/>

<label>Time Slot</label>

<select
name="timeSlot"
value={pickupData.timeSlot}
onChange={handleChange}
required
>
<option value="">Select Time Slot</option>
<option>9AM - 11AM</option>
<option>11AM - 1PM</option>
<option>2PM - 4PM</option>
<option>4PM - 6PM</option>
</select>

<label>City</label>

<input type="text" value="Pune" readOnly/>

<label>Area</label>

<select
name="area"
value={pickupData.area}
onChange={handleChange}
required
>
<option value="">Select Area</option>
<option>Alandi</option>
<option>Baner</option>
<option>Bhosari</option>
<option>Chikhali</option>
<option>Chinchwad</option>
<option>Dapodi</option>
<option>Hinjewadi</option>
<option>Katraj</option>
<option>Kothrud</option>
<option>Nigdi</option>
<option>Pimpri</option>
<option>Ravet</option>
<option>Sangvi</option>
<option>Thergaon</option>
<option>Wakad</option>
</select>

<label>Upload Images</label>

<input
type="file"
multiple
accept=".jpg,.jpeg,.png"
onChange={handleImageChange}
/>

<label>Pickup Address</label>

<textarea
name="address"
value={pickupData.address}
onChange={handleChange}
required
/>

<label>Description (Optional)</label>

<textarea
name="description"
value={pickupData.description}
onChange={handleChange}
/>

<button type="submit" disabled={loading}>
{loading ? "Submitting..." : "Submit Pickup Request"}
</button>

</form>

</div>

</div>

</div>

</>

);

}

export default SchedulePickup;