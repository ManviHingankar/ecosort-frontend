import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import logo from "../assets/images/logo.png";

function Home() {

const [open,setOpen] = useState(null);
const [showMore,setShowMore] = useState(false);
const navigate = useNavigate();

const toggle = (index)=>{
setOpen(open === index ? null : index);
};

const faqs = [

{
question:"What is E-Waste?",
answer:"E-waste refers to discarded electronic devices such as phones, laptops, batteries, monitors and other accessories."
},

{
question:"Why should I recycle E-Waste?",
answer:"E-waste contains toxic materials like lead and mercury which can harm the environment. Recycling helps recover valuable materials."
},

{
question:"How does EcoSort pickup work?",
answer:"Users upload their e-waste details, choose a pickup slot and recyclers collect the devices for safe recycling."
},

{
question:"What devices can I recycle?",
answer:"You can recycle phones, laptops, batteries, monitors, chargers and other electronic accessories."
},

{
question:"Is the pickup service free?",
answer:"In most cases pickup is free. For some large appliances a small service fee may apply depending on location."
},

{
question:"What happens after my device is collected?",
answer:"Devices are sent to authorized recycling centers where materials are safely recovered and reused."
},

{
question:"How long does pickup take?",
answer:"Pickup usually happens within the selected time slot chosen during booking."
},

{
question:"Can businesses recycle through EcoSort?",
answer:"Yes, EcoSort also supports offices, institutions and businesses for responsible e-waste recycling."
}

];

const visibleFaqs = showMore ? faqs : faqs.slice(0,4);

return (
<div className="home">

{/* HERO */}

<div className="hero">

<img
src="/hp.png"
alt="EcoSort Banner"
className="hero-image"
/>

<div className="hero-content">

<h1>
Turn Your E-Waste <br/> Into Positive Impact
</h1>

<p>
Dispose your electronic waste responsibly with EcoSort.
Leading the way in environmental protection by giving old technology a second life.
</p>

<button 
  className="start-btn"
  onClick={() => navigate("/login")}
>
  Start Sorting
</button>

</div>

</div>


{/* HOW ECOSORT WORKS */}

<section className="how-works">

<h2>How EcoSort Works</h2>

<div className="cards">

<div className="card">
<div className="card-icon">👤</div>
<h3>Register / Login</h3>
<p>Create your EcoSort account to begin recycling.</p>
</div>

<div className="card">
<div className="card-icon">📷</div>
<h3>Upload E-Waste</h3>
<p>Upload image and tell us your waste type.</p>
</div>

<div className="card">
<div className="card-icon">🚚</div>
<h3>Schedule Pickup</h3>
<p>Select a convenient pickup slot.</p>
</div>

<div className="card">
<div className="card-icon">🏆</div>
<h3>Earn Rewards</h3>
<p>Get eco points after safe recycling.</p>
</div>

</div>

</section>


{/* PROBLEM VS SOLUTION */}

<section className="impact-story">

<h2>E-Waste Today vs A Greener Tomorrow</h2>

<div className="story-container">

<div className="story-side problem">

<h3>The Problem</h3>

<ul>
<li>Electronic waste dumped in landfills</li>
<li>Toxic metals harming soil and water</li>
<li>Valuable materials going to waste</li>
</ul>

</div>

<div className="arrow">➡</div>

<div className="story-side solution">

<h3>The EcoSort Solution</h3>

<ul>
<li>Responsible recycling process</li>
<li>Safe recovery of valuable materials</li>
<li>Cleaner and greener environment</li>
</ul>

</div>

</div>

</section>


{/* ENVIRONMENTAL IMPACT */}

<section className="impact-section">

<h2>Environmental Impact</h2>

<div className="impact-cards">

<div className="impact-card">
<div className="impact-icon">🌍</div>
<h3>Protect the Planet</h3>
<p>Recycling e-waste helps reduce environmental pollution.</p>
</div>

<div className="impact-card">
<div className="impact-icon">♻</div>
<h3>Reduce Toxic Waste</h3>
<p>Prevents harmful chemicals from entering soil and water.</p>
</div>

<div className="impact-card">
<div className="impact-icon">🔋</div>
<h3>Recover Materials</h3>
<p>Electronic waste contains reusable metals like copper and gold.</p>
</div>

<div className="impact-card">
<div className="impact-icon">💚</div>
<h3>Sustainable Future</h3>
<p>Responsible recycling helps create a greener world.</p>
</div>

</div>

</section>


{/* CALL TO ACTION */}

<section className="cta-section">

<div className="cta-container">

<div className="cta-text">

<h2>Ready to Recycle Your E-Waste?</h2>

<p>
Join EcoSort today and help create a cleaner and greener planet.
Start disposing your electronics responsibly.
</p>

</div>

<div className="cta-action">

<button 
  className="cta-btn"
  onClick={() => navigate("/login")}
>
  Start Sorting Now
</button>

</div>

</div>

</section>


{/* FAQ */}

<section id="faqs" className="faq-section">

<h2>Frequently Asked Questions</h2>

<div className="faq-container">

{visibleFaqs.map((faq,index)=>(
<div key={index} className="faq-item">

<div
className="faq-question"
onClick={()=>toggle(index)}
>

{faq.question}

<span>{open === index ? "-" : "+"}</span>

</div>

{open === index && (
<div className="faq-answer">
{faq.answer}
</div>
)}

</div>
))}

</div>

<div className="faq-more">

<button
className="faq-btn"
onClick={()=>setShowMore(!showMore)}
>

{showMore ? "Show Less" : "View More FAQs"}

</button>

</div>

</section>


{/* FOOTER */}

<footer className="footer">

<div className="footer-container">

<div className="footer-about">

<div className="footer-logo">
<img src={logo} alt="EcoSort Logo"/>
<h3>EcoSort</h3>
</div>

<p>
Smart e-waste recycling platform helping people dispose electronics safely and responsibly.
</p>

<div className="social-icons">
<i className="fab fa-facebook"></i>
<i className="fab fa-instagram"></i>
<i className="fab fa-twitter"></i>
<i className="fab fa-linkedin"></i>
</div>

</div>


<div className="footer-links">
<h4>Quick Links</h4>
<ul>
<li>Home</li>
<li>About Us</li>
<li>Services</li>
<li>FAQs</li>
<li>Contact</li>
</ul>
</div>


<div className="footer-links">
<h4>Services</h4>
<ul>
<li>E-Waste Pickup</li>
<li>Device Recycling</li>
<li>Safe Disposal</li>
</ul>
</div>


<div className="footer-links">
<h4>Contact</h4>
<ul>
<li>Email: support@ecosort.com</li>
<li>Phone: +91 9876543210</li>
<li>Pune, Maharashtra</li>
</ul>
</div>

</div>

<div className="footer-bottom">
© 2026 EcoSort. All Rights Reserved.
</div>

</footer>

</div>
);
}

export default Home;