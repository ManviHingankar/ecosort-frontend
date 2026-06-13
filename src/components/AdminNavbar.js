import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./AdminNavbar.css";

function AdminNavbar(){

const navigate = useNavigate();

const [open,setOpen] = useState(false);
const [menuOpen,setMenuOpen] = useState(false); // ✅ NEW
const [showLogout,setShowLogout] = useState(false);

const name = localStorage.getItem("userName") || "Admin";

const confirmLogout = () => {
localStorage.clear();
navigate("/login");
};

return(

<>

<div className="admin-header">

<div className="admin-navbar">

{/* LOGO */}
<div
className="admin-logo"
onClick={()=>navigate("/admin/dashboard")}
>
EcoSort Admin
</div>

{/* ✅ HAMBURGER */}
<div className="hamburger" onClick={()=>setMenuOpen(!menuOpen)}>
<span></span>
<span></span>
<span></span>
</div>

{/* LINKS */}
<div className={`admin-links ${menuOpen ? "active" : ""}`}>

<NavLink to="/admin/dashboard">Dashboard</NavLink>
<NavLink to="/admin/recyclers">Recyclers</NavLink>
<NavLink to="/admin/pickups">Pickups</NavLink>
<NavLink to="/admin/users">Users</NavLink>
<NavLink to="/admin/analytics">Analytics</NavLink>

</div>

{/* PROFILE */}
<div className="admin-profile">

<div
className="admin-btn"
onClick={()=>setOpen(!open)}
>
👤 {name} ▼
</div>

{open && (

<div className="admin-dropdown">

<div onClick={()=>navigate("/admin/profile")}>
👤 Profile
</div>

<div onClick={()=>setShowLogout(true)}>
🚪 Logout
</div>

</div>

)}

</div>

</div>

</div>

{/* LOGOUT MODAL */}

{showLogout && (

<div className="logout-overlay">

<div className="logout-modal">

<h2>Logout</h2>

<p>Are you sure you want to logout?</p>

<div className="logout-actions">

<button
className="cancel-btn"
onClick={()=>setShowLogout(false)}
>
Cancel
</button>

<button
className="logout-btn"
onClick={confirmLogout}
>
Logout
</button>

</div>

</div>

</div>

)}

</>

);

}

export default AdminNavbar;