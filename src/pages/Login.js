import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import ewaste from "../assets/images/ewaste.png";

function Login() {

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    setLoading(true);

    try {

      const BASE_URL =
        window.location.hostname === "localhost"
          ? "http://localhost:8080"
          : "http://192.168.1.106:8080";

      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
      });

      let data = {};
      try {
        data = await response.json();
      } catch (err) {
        console.log("JSON parse error");
      }

      if (response.ok) {

        // SAVE USER DATA
        localStorage.setItem("userEmail", data.email || "");
        localStorage.setItem("userName", data.name || "");
        localStorage.setItem("userPhone", data.phone || "");
        localStorage.setItem("userAddress", data.address || "");
        localStorage.setItem("userRole", (data.role || "").toUpperCase());
        localStorage.setItem("greenPoints", data.greenPoints || 0);

        const role = (data.role || "").toUpperCase();

        if (role === "USER") navigate("/user/dashboard");
        else if (role === "RECYCLER") navigate("/recycler/dashboard");
        else if (role === "ADMIN") navigate("/admin/dashboard");
        else navigate("/");

      } else {

        const msg = data.message || "";

        if (msg === "NOT_APPROVED") {
          alert("⏳ Your account is not approved by admin yet. Please wait.");
        }
        else if (msg.toLowerCase().includes("password")) {
          alert("❌ Incorrect password");
        }
        else if (msg.toLowerCase().includes("not found")) {
          alert("❌ User not found");
        }
        else {
          alert("❌ Invalid email or password");
        }
      }

    } catch (error) {
      console.error("Login error:", error);
      alert("⚠️ Unable to connect to server");
    }

    setLoading(false);
  };

  return (

    <div className="login-page">

      <div className="login-content">

        {/* LEFT SIDE */}
        <div className="left-info">

          <h1>Welcome EcoSort</h1>

          <p>
            Join EcoSort and help create a cleaner planet by properly
            managing and recycling electronic waste.
          </p>

          <img
            src={ewaste}
            alt="ewaste"
            className="eco-image"
          />

        </div>

        {/* LOGIN CARD */}
        <div className="login-container">

          <h2>Login</h2>

          <form onSubmit={handleSubmit}>

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={loginData.email}
              onChange={handleChange}
              required
            />

            <div className="password-field">

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={loginData.password}
                onChange={handleChange}
                required
              />

              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                👁
              </span>

            </div>

            <button type="submit">
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="divider">
              <span>OR</span>
            </div>

            <div className="google-btn">

              <img
                src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
                alt="google"
              />

              Sign in with Google

            </div>

            <Link to="/forgot-password" className="forgot">
              Forgot Password?
            </Link>

            <div className="signup-switch">
              Don't have an account?
              <Link to="/register"> Sign up</Link>
            </div>

          </form>

        </div>

      </div>

    </div>

  );
}

export default Login;