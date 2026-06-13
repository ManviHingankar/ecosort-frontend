import React from "react";
import "./Contact.css";

function Contact() {
  return (
    <div className="contact-page">

      <h1>Contact EcoSort</h1>

      <p>
        If you have any questions about e-waste recycling or pickup
        services, feel free to contact us.
      </p>

      <div className="contact-info">

        <div className="contact-card">
          <h3>Email</h3>
          <p>ecosort.project1@gmail.com</p>
        </div>

        <div className="contact-card">
          <h3>Phone</h3>
          <p>+91 98765 43210</p>
        </div>

        <div className="contact-card">
          <h3>Location</h3>
          <p>Pune, Maharashtra</p>
        </div>

      </div>

    </div>
  );
}

export default Contact;