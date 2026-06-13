import React from "react";
import "./Services.css";

function Services(){

return(

<div className="services-page">

{/* HERO */}

<section className="services-hero">

<h1>EcoSort Services</h1>

<p>
EcoSort provides responsible electronic waste recycling services
to help individuals and businesses dispose e-waste safely.
</p>

</section>


{/* WHAT WE ACCEPT */}

<section className="accept-section">

<h2>What We Accept</h2>

<div className="accept-grid">

<div className="accept-card">
<h3>📱 Mobile Phones</h3>
<p>Old smartphones, feature phones and accessories.</p>
</div>

<div className="accept-card">
<h3>💻 Laptops</h3>
<p>Broken or unused laptops and computer devices.</p>
</div>

<div className="accept-card">
<h3>🔋 Batteries</h3>
<p>Laptop batteries, phone batteries and power banks.</p>
</div>

<div className="accept-card">
<h3>🖥 Monitors</h3>
<p>Computer monitors and display devices.</p>
</div>

<div className="accept-card">
<h3>🔌 Chargers</h3>
<p>Mobile chargers, cables and adapters.</p>
</div>

<div className="accept-card">
<h3>📟 Accessories</h3>
<p>Keyboards, mouse, headphones and other electronics.</p>
</div>

</div>

</section>


{/* PICKUP SERVICE */}

<section className="pickup-section">

<h2>Doorstep Pickup</h2>

<p>
EcoSort allows users to schedule convenient pickup of their
electronic waste directly from home. Simply upload the waste
image, choose a pickup slot and our recycler will collect it.
</p>

</section>


{/* RECYCLING PROCESS */}

<section className="process-section">

<h2>Our Recycling Process</h2>

<div className="process-grid">

<div className="process-card">
<h3>1️⃣ Upload Waste</h3>
<p>User uploads image and waste details.</p>
</div>

<div className="process-card">
<h3>2️⃣ Schedule Pickup</h3>
<p>Select preferred pickup date and time.</p>
</div>

<div className="process-card">
<h3>3️⃣ Recycler Collection</h3>
<p>Recycler verifies and collects the e-waste.</p>
</div>

<div className="process-card">
<h3>4️⃣ Safe Recycling</h3>
<p>Waste is processed safely in recycling centers.</p>
</div>

</div>

</section>

</div>

);

}

export default Services;