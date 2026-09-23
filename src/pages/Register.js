import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Register.css";
import ewaste from "../assets/images/ewaste.png";

function Register(){

const [formData,setFormData] = useState({
name:"",
email:"",
password:"",
confirmPassword:"",
role:"user",
terms:false
});

const [showPassword,setShowPassword] = useState(false);
const [showConfirm,setShowConfirm] = useState(false);
const [showRule,setShowRule] = useState(false);

const handleChange=(e)=>{
const {name,value,type,checked} = e.target;

setFormData({
...formData,
[name]: type === "checkbox" ? checked : value
});
};

const handleSubmit = async (e)=>{
e.preventDefault();

const passwordRegex =
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

if(!passwordRegex.test(formData.password)){
alert("Password must contain 8 characters, uppercase, lowercase, number and special character.");
return;
}

if(formData.password !== formData.confirmPassword){
alert("Passwords do not match");
return;
}

if(!formData.terms){
alert("Please agree with Terms & Conditions");
return;
}

try{

const response = await axios.post(
"https://ecosort-backend-qf67.onrender.com/api/auth/register",
{
name: formData.name,
email: formData.email,
password: formData.password,
role: formData.role
}
);

alert(response.data?.message || response.data || "User Registered Successfully");

}catch(error){

console.error(error);

if(error.response){
alert(error.response.data?.message || error.response.data || "Registration failed. Please try again.");
}else{
alert("Registration failed. Please try again.");
}

}

};

return(

<div className="register-page">

<div className="register-content">

<div className="left-info">

<h1>Welcome EcoSort</h1>

<p>
Join EcoSort and help create a cleaner planet by properly
managing and recycling electronic waste. Upload e-waste
images, identify recyclable items, and contribute to
sustainable disposal.
</p>

<img
src={ewaste}
alt="ewaste"
className="eco-image"
/>

</div>

<div className="register-container">

<h2>Create Account</h2>

<form onSubmit={handleSubmit}>

<input
type="text"
name="name"
placeholder="Full Name"
value={formData.name}
onChange={handleChange}
required
/>

<input
type="email"
name="email"
placeholder="Email Address"
value={formData.email}
onChange={handleChange}
required
/>

<div className="password-field">

<input
type={showPassword ? "text" : "password"}
name="password"
placeholder="Password"
value={formData.password}
onChange={handleChange}
onFocus={()=>setShowRule(true)}
onBlur={()=>setShowRule(false)}
required
/>

<span
className="eye-icon"
onClick={()=>setShowPassword(!showPassword)}
>

👁

</span>

</div>

{showRule && (

<p className="password-rule">
Must contain at least 8 characters, 1 uppercase,
1 lowercase, 1 number and 1 special character.
</p>
)}

<div className="password-field">

<input
type={showConfirm ? "text" : "password"}
name="confirmPassword"
placeholder="Confirm Password"
value={formData.confirmPassword}
onChange={handleChange}
required
/>

<span
className="eye-icon"
onClick={()=>setShowConfirm(!showConfirm)}
>

👁

</span>

</div>

<select
name="role"
className="role-select"
value={formData.role}
onChange={handleChange}
>

<option value="user">User</option>
<option value="recycler">Recycler</option>

</select>

<label className="terms">

<input
type="checkbox"
name="terms"
checked={formData.terms}
onChange={handleChange}
/>

<span>I agree with the Terms & Conditions</span>

</label>

<button type="submit">
Register
</button>

<div className="google-btn">
<img
src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
alt="google"
/>
Continue with Google
</div>

<div className="login-switch">
Already have an account?
<Link to="/login"> Login</Link>
</div>

</form>

</div>

</div>

</div>

);

}

export default Register;
