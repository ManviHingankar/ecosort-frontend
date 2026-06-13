import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "./ResetPassword.css";

function ResetPassword(){

const query = new URLSearchParams(useLocation().search);
const email = query.get("email");

const [password,setPassword] = useState("");

const handleSubmit = async(e)=>{
e.preventDefault();

try{

await fetch(
`http://localhost:8080/api/auth/reset-password?email=${email}&newPassword=${password}`,
{
method:"POST"
}
);

alert("Password updated successfully");

}catch(error){

alert("Error updating password");

}

};

return(

<div className="reset-page">

<div className="reset-container">

<h2>Reset Password</h2>

<p>Enter your new password below</p>

<form onSubmit={handleSubmit}>

<input
type="password"
placeholder="Enter new password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
required
/>

<button type="submit">
Update Password
</button>

</form>

<div className="back-login">

<Link to="/login">
Back to Login
</Link>

</div>

</div>

</div>

);

}

export default ResetPassword;