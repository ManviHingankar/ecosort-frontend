import React from "react";
import "./AboutUs.css";

function About(){

return(

<div className="about-page">

{/* HERO SECTION */}

<section className="about-hero">

<h1>About EcoSort</h1>

<p>
EcoSort is a smart e-waste management platform designed to help
individuals responsibly dispose electronic waste while promoting
sustainable recycling and environmental protection.
</p>

</section>


{/* MISSION & VISION */}

<section className="mission-section">

<div className="mission-card">

<h2>Our Mission</h2>

<p>
To simplify e-waste recycling by connecting users with responsible
recyclers and ensuring safe disposal of electronic waste.
</p>

</div>

<div className="mission-card">

<h2>Our Vision</h2>

<p>
To create a cleaner and greener future by reducing toxic electronic
waste and encouraging sustainable recycling practices.
</p>

</div>

</section>


{/* WHY ECOSORT */}

<section className="why-section">

<h2>Why EcoSort?</h2>

<div className="why-grid">

<div className="why-card">
<h3>♻ Responsible Recycling</h3>
<p>Ensure safe disposal of electronic waste.</p>
</div>

<div className="why-card">
<h3>🚚 Doorstep Pickup</h3>
<p>Schedule convenient e-waste pickup from home.</p>
</div>

<div className="why-card">
<h3>🌍 Environmental Protection</h3>
<p>Reduce toxic materials harming our planet.</p>
</div>

<div className="why-card">
<h3>📊 Smart Waste Tracking</h3>
<p>Monitor recycling activity and sustainability impact.</p>
</div>

</div>

</section>


{/* IMPACT */}

<section className="impact-section">

<h2>Our Environmental Impact</h2>

<div className="impact-grid">

<div className="impact-card">
<h3>500+</h3>
<p>Devices Recycled</p>
</div>

<div className="impact-card">
<h3>120+</h3>
<p>Pickup Requests</p>
</div>

<div className="impact-card">
<h3>200kg+</h3>
<p>E-Waste Collected</p>
</div>

<div className="impact-card">
<h3>50+</h3>
<p>Eco Volunteers</p>
</div>

</div>

</section>

</div>

);

}

export default About;