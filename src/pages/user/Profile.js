import React, { useEffect, useState } from "react";
import UserNavbar from "../../components/UserNavbar";
import "./Profile.css";

function Profile() {

const userEmail = localStorage.getItem("userEmail");

// ✅ BASE URL FIX
const BASE_URL = "https://ecosort-backend-qf67.onrender.com";

const [editMode,setEditMode] = useState(false);
const [loading,setLoading] = useState(true);

const [profile,setProfile] = useState({
name: "",
email: "",
phone: "",
address: ""
});

const [avatar,setAvatar] = useState(
localStorage.getItem("userAvatar") ||
"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
);

const [stats,setStats] = useState({
devices: 0,
co2Saved: 0,
earnings: 0
});

useEffect(()=>{

if(!userEmail) return;

// ✅ PROFILE FETCH
fetch(`${BASE_URL}/api/auth/profile/${userEmail}`)
.then(res=>res.json())
.then(data=>{
setProfile({
name: data.name || "",
email: data.email || "",
phone: data.phone || "",
address: data.address || ""
});
localStorage.setItem("userName", data.name || "");
localStorage.setItem("userPhone", data.phone || "");
localStorage.setItem("userAddress", data.address || "");
setLoading(false);
})
.catch(()=>{
setLoading(false);
});

// ✅ ECO POINTS
fetch(`${BASE_URL}/api/pickup/ecopoints/${userEmail}`)
.then(res=>res.json())
.then(data=>{
setStats({
devices: data.devices || 0,
co2Saved: data.co2Saved || 0,
earnings: 0
});
})
.catch(()=>{});

},[userEmail]);

const handleChange=(e)=>{
setProfile({
...profile,
[e.target.name]:e.target.value
});
};

const saveProfile=async()=>{

try{

const response = await fetch(`${BASE_URL}/api/auth/profile/${userEmail}`,{
method:"PUT",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
name: profile.name,
phone: profile.phone,
address: profile.address
})
});

const result = await response.text();

if(response.ok){
localStorage.setItem("userName",profile.name);
localStorage.setItem("userPhone",profile.phone);
localStorage.setItem("userAddress",profile.address);
alert(result);
setEditMode(false);
}else{
alert(result);
}

}catch(error){
alert("Failed to update profile");
}

};

const changePhoto=(e)=>{

const file = e.target.files[0];

if(file){

const reader = new FileReader();

reader.onload=()=>{
setAvatar(reader.result);
localStorage.setItem("userAvatar",reader.result);
};

reader.readAsDataURL(file);

}

};

if(loading){
return(
<div>
<UserNavbar/>
<div className="profile-page">
<div className="profile-card">
<h2>Loading profile...</h2>
</div>
</div>
</div>
);
}

return(

<div>

<UserNavbar/>

<div className="profile-page">

<div className="profile-card">

<div className="avatar-wrapper">

<img
src={avatar}
alt="profile"
className="profile-avatar"
/>

<label className="upload-icon">
📷
<input
type="file"
accept="image/*"
onChange={changePhoto}
/>
</label>

</div>

{editMode ? (
<input
name="name"
value={profile.name}
onChange={handleChange}
className="name-input"
/>
) : (
<h2 className="profile-name">{profile.name}</h2>
)}

<p className="profile-email">{profile.email}</p>

<button
className="edit-btn"
onClick={()=> editMode ? saveProfile() : setEditMode(true)}
>
{editMode ? "Save Profile" : "Edit Profile"}
</button>

<div className="contact-section">

<h3>Contact Information</h3>

{editMode ? (
<>
<input
name="phone"
value={profile.phone}
onChange={handleChange}
placeholder="Enter phone number"
/>

<input
name="address"
value={profile.address}
onChange={handleChange}
placeholder="Enter address"
/>
</>
) : (
<>
<p><b>Phone:</b> {profile.phone || "-"}</p>
<p><b>Address:</b> {profile.address || "-"}</p>
</>
)}

</div>

</div>

<div className="profile-stats">

<div className="stat-card">
<h3>Devices Recycled</h3>
<p>{stats.devices}</p>
</div>

<div className="stat-card">
<h3>CO₂ Saved</h3>
<p>{stats.co2Saved}</p>
</div>

<div className="stat-card">
<h3>Total Earnings</h3>
<p>₹ {stats.earnings}</p>
</div>

</div>

</div>

</div>

);

}

export default Profile;