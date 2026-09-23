import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import "./AdminUsers.css";

function AdminUsers() {

const [users,setUsers] = useState([]);

const BASE_URL = "https://ecosort-backend-qf67.onrender.com"; // ✅ FIX

useEffect(()=>{

fetch(`${BASE_URL}/api/admin/users`)
.then(res=>{
  if(!res.ok) throw new Error("API failed");
  return res.json();
})
.then(data=>{
  setUsers(Array.isArray(data)?data:[]);
})
.catch(err=>{
  console.log("ERROR:",err);
  setUsers([]);
});

},[]);


const deleteUser=(id)=>{

if(!window.confirm("Delete this user?")) return;

fetch(`${BASE_URL}/api/admin/delete-user/${id}`,{
method:"DELETE"
})
.then(()=>{
setUsers(prev=>prev.filter(u=>u.id!==id));
})
.catch(()=>alert("Delete failed"));

};


return(

<div>

<AdminNavbar/>

<div className="admin-users">

<h1>User Management</h1>

<div className="table-wrapper"> {/* ✅ IMPORTANT */}

<table className="users-table">

<thead>
<tr>
<th>User ID</th>
<th>Name</th>
<th>Email</th>
<th>Completed</th>
<th>Status</th>
<th>Action</th>
</tr>
</thead>

<tbody>

{users.length===0 ? (

<tr>
<td colSpan="6" className="no-data">
No users found
</td>
</tr>

):(users.map(u=>(

<tr key={u.id}>

<td>{u.id}</td>
<td>{u.name}</td>
<td>{u.email}</td>
<td>{u.completedPickups || 0}</td>

<td>
<span className="status-active">
Active
</span>
</td>

<td>
<button
className="delete-btn"
onClick={()=>deleteUser(u.id)}
>
Delete
</button>
</td>

</tr>

)))}

</tbody>

</table>

</div>

</div>

</div>

)

}

export default AdminUsers;