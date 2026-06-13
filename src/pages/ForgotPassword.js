import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ForgotPassword.css";
import ewaste from "../assets/images/ewaste.png";

function ForgotPassword(){

const [email,setEmail] = useState("");
const [submitted,setSubmitted] = useState(false);

const handleSubmit = async (e)=>{
e.preventDefault();

if(!email){
alert("Please enter your email");
return;
}

try{

const response = await fetch(
`http://localhost:8080/api/auth/forgot-password?email=${email}`,
{
method:"POST"
}
);

const data = await response.text();

alert(data);

setSubmitted(true);

}catch(error){

console.error(error);
alert("Failed to send reset email");

}

};

return(

<div className="forgot-page">

<div className="forgot-content">

<div className="left-info">

<h1>Recover Account</h1>

<p>
Forgot your password? Don't worry. Enter your registered
email address and we will send you instructions to reset
your password securely.
</p>

<img
src={ewaste}
alt="ewaste"
className="eco-image"
/>

</div>

<div className="forgot-container">

<h2>Forgot Password</h2>

{!submitted ? (

<form onSubmit={handleSubmit}>

<input
type="email"
placeholder="Enter your email address"
value={email}
onChange={(e)=>setEmail(e.target.value)}
required
/>

<button type="submit">
Send Reset Link
</button>

<div className="back-login">

Remember your password?

<Link to="/login"> Login</Link>

</div>

</form>

) : (

<div className="success-message">

<h3>Reset Link Sent</h3>

<p>
If an account exists with this email, a password reset
link has been sent. Please check your inbox.
</p>

<Link to="/login" className="login-btn">
Back to Login
</Link>

</div>

)}

</div>

</div>

</div>

);

}

export default ForgotPassword;