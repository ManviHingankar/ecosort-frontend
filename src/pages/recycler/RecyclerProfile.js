import React, { useState } from "react";
import RecyclerNavbar from "../../components/RecyclerNavbar";
import "./RecyclerProfile.css";

function RecyclerProfile(){

const [editing,setEditing] = useState(false);

const [name,setName] = useState(localStorage.getItem("userName") || "");
const [email] = useState(localStorage.getItem("userEmail") || "");
const [phone,setPhone] = useState(localStorage.getItem("phone") || "");
const [address,setAddress] = useState(localStorage.getItem("address") || "");
const [photo,setPhoto] = useState(localStorage.getItem("profilePhoto") || "");


const handlePhotoUpload = (e) => {

const file = e.target.files[0];

if(file){

const reader = new FileReader();

reader.onload = () => {

setPhoto(reader.result);
localStorage.setItem("profilePhoto",reader.result);

};

reader.readAsDataURL(file);

}

};


const saveProfile = () => {

localStorage.setItem("userName",name);
localStorage.setItem("phone",phone);
localStorage.setItem("address",address);

setEditing(false);

};


return(

<>

{/* Navbar */}
<RecyclerNavbar/>

<div className="profile-page">

<h1 className="profile-title">Recycler Profile</h1>

<div className="profile-card">

<div className="profile-header">

<div className="profile-avatar">

<img
src={photo || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
alt="profile"
/>

<label className="camera-btn">
📷
<input
type="file"
accept="image/*"
onChange={handlePhotoUpload}
hidden
/>
</label>

</div>


{editing ? (

<input
className="name-input"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

):( 

<h2>{name}</h2>

)}

<p className="profile-email">{email}</p>


{editing ? (

<button
className="save-btn"
onClick={saveProfile}
>
Save Profile
</button>

):( 

<button
className="edit-btn"
onClick={()=>setEditing(true)}
>
Edit Profile
</button>

)}

</div>


<div className="profile-info">

<h3>Contact Information</h3>

<div className="info-row">

<span>📞 Phone</span>

{editing ? (

<input
value={phone}
onChange={(e)=>setPhone(e.target.value)}
/>

):( 

<p>{phone || "Not Added"}</p>

)}

</div>


<div className="info-row">

<span>📍 Address</span>

{editing ? (

<input
value={address}
onChange={(e)=>setAddress(e.target.value)}
/>

):( 

<p>{address || "Not Added"}</p>

)}

</div>

</div>

</div>

</div>

</>

);

}

export default RecyclerProfile;