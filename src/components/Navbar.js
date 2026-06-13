import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/images/logo.png";

function Navbar() {

  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = React.useState(false);

  /* Scroll to FAQ section */
  const handleFaqClick = () => {

    navigate("/");

    setTimeout(() => {
      const faqSection = document.getElementById("faqs");
      if (faqSection) {
        faqSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 200);
  };

  return (

    <header className="header">

      <div className="navbar">

        {/* Logo */}
        <div className="logo-container">
          <img
            src={logo}
            alt="EcoSort Logo"
            className="brand-logo"
          />
        </div>

        {/* Hamburger */}
        <div
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>

        {/* Navigation */}
        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>

          <NavLink to="/" end onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/about" onClick={() => setMenuOpen(false)}>About Us</NavLink>
          <NavLink to="/accept" onClick={() => setMenuOpen(false)}>Services</NavLink>

          <button className="faq-link" onClick={() => {
            handleFaqClick();
            setMenuOpen(false);
          }}>
            FAQs
          </button>

          <NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contacts</NavLink>

          {/* MOBILE AUTH */}
          <div className="mobile-auth">
            <NavLink to="/register" className="register" onClick={() => setMenuOpen(false)}>
              Register
            </NavLink>

            <NavLink to="/login" className="login" onClick={() => setMenuOpen(false)}>
              Login
            </NavLink>
          </div>

        </nav>

        {/* DESKTOP AUTH */}
        <div className="auth">

          <NavLink to="/register" className="register">
            Register
          </NavLink>

          <NavLink to="/login" className="login">
            Login
          </NavLink>

        </div>

      </div>

    </header>
  );
}

export default Navbar;