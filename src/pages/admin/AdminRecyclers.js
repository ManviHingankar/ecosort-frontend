import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import "./AdminRecyclers.css";

function AdminRecyclers(){

const [recyclers,setRecyclers] = useState([]);
const [selectedArea,setSelectedArea] = useState({});

const BASE_URL = "https://ecosort-backend-qf67.onrender.com"; // ✅ FIX

const areas = [
"Alandi","Baner","Bhosari","Chikhali","Chinchwad",
"Dapodi","Hinjewadi","Katraj","Kothrud","Nigdi",
"Pimpri","Ravet","Sangvi","Thergaon","Wakad"
];

/* ================= FETCH ================= */

useEffect(()=>{

fetch(`${BASE_URL}/api/admin/recyclers`)
.then(res => {
  if(!res.ok) throw new Error("API failed");
  return res.json();
})
.then(data=>{
  setRecyclers(Array.isArray(data)?data:[]);
})
.catch(err=>{
  console.log("ERROR:",err);
  setRecyclers([]); // fallback
});

},[]);


/* ================= APPROVE ================= */

const approveRecycler=(id)=>{

fetch(`${BASE_URL}/api/admin/approve/${id}`,{
method:"PUT"
})
.then(()=>{
setRecyclers(prev =>
prev.map(r =>
r.id===id ? {...r,approvalStatus:"APPROVED"} : r
)
)
})
.catch(()=>alert("Failed to approve"));

};


/* ================= AREA ================= */

const handleAreaChange=(id,area)=>{
setSelectedArea(prev=>({...prev,[id]:area}));
};


const assignArea=(id)=>{

const area = selectedArea[id];

if(!area){
alert("Please select area");
return;
}

fetch(`${BASE_URL}/api/admin/assign-area/${id}?city=Pune&area=${area}`,{
method:"PUT"
})
.then(()=>{
setRecyclers(prev =>
prev.map(r =>
r.id===id
? {...r, serviceArea:area}
: r
)
);

alert("Area assigned successfully");
})
.catch(()=>alert("Failed to assign area"));

};


/* ================= UI ================= */

return(

<div>

<AdminNavbar/>

<div className="admin-recyclers">

<h1>Recycler Management</h1>

<div className="table-wrapper"> {/* ✅ ADD THIS */}

<table className="recycler-table">

<thead>
<tr>
<th>Name</th>
<th>Email</th>
<th>Status</th>
<th>Assign Area</th>
<th>Action</th>
</tr>
</thead>

<tbody>

{recyclers.length === 0 ? (
<tr>
<td colSpan="5" style={{textAlign:"center"}}>
No recyclers found
</td>
</tr>
) : (

recyclers.map(r=>(

<tr key={r.id}>

<td>{r.name}</td>
<td>{r.email}</td>

<td>
{r.serviceArea ? (
<span className="status-approved">Assigned</span>
) : r.approvalStatus==="APPROVED" ? (
<span className="status-approved">Approved</span>
) : (
<span className="status-pending">Pending</span>
)}
</td>

<td className="area-cell">

<select
className="area-select"
disabled={r.approvalStatus!=="APPROVED"}
onChange={(e)=>handleAreaChange(r.id,e.target.value)}
value={selectedArea[r.id] || r.serviceArea || ""}
>
<option value="" disabled>Select Area</option>

{areas.map(a=>(
<option key={a} value={a}>{a}</option>
))}

</select>

<button
className="assign-btn"
disabled={r.approvalStatus!=="APPROVED"}
onClick={()=>assignArea(r.id)}
>
{r.serviceArea ? "Update" : "Assign"}
</button>

</td>

<td>

{r.approvalStatus==="APPROVED" ? (
<span className="approved-text">Approved</span>
) : (
<button
className="approve-btn"
onClick={()=>approveRecycler(r.id)}
>
Approve
</button>
)}

</td>

</tr>

))

)}

</tbody>

</table>

</div>

</div>

</div>

);

}

export default AdminRecyclers;