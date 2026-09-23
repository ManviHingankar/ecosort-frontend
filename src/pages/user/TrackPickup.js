import React, { useEffect, useState } from "react";
import UserNavbar from "../../components/UserNavbar";
import "./TrackPickup.css";

function TrackPickup(){

  const [requests,setRequests] = useState([]);
  const [selected,setSelected] = useState(null);

  // ✅ FIXED BASE URL (for mobile)
  const BASE_URL = "https://ecosort-backend-qf67.onrender.com";

  useEffect(()=>{

    const email = localStorage.getItem("userEmail") || "";

    console.log("TRACK EMAIL:", email);

    fetch(`${BASE_URL}/api/pickup/my-requests/${email}`)
      .then(res => res.json())
      .then(data => {
        console.log("TRACK DATA:", data);
        setRequests(Array.isArray(data) ? data.reverse() : []);
      })
      .catch(err => {
        console.log("Track fetch error:", err);
        setRequests([]);
      });

  },[]);


  /* STATUS STEP FIXED */

  const getStepIndex=(status)=>{

    switch(status){
      case "PENDING": return 1;
      case "ACCEPTED": return 2;
      case "OUT_FOR_PICKUP": return 3;
      case "COMPLETED": return 4;
      default: return 1;
    }

  };


  return(

    <div className="track-page">

      <UserNavbar/>

      <h1 className="track-title">Track Your Pickup</h1>

      <div className="track-container">

        {/* LEFT SIDE REQUEST LIST */}
        <div className="request-list">

          <h3>Your Requests</h3>

          {requests.length === 0 ? (
            <p>No requests found</p>
          ) : (
            requests.map(req => (

              <div
                key={req.id}
                className={`request-card ${selected?.id===req.id ? "active" : ""}`}
                onClick={()=>setSelected(req)}
              >

                <h4>{req.wasteType}</h4>

                <div className="mini-info">
                  <span>{req.pickupDate}</span>
                  <span>{req.timeSlot}</span>
                </div>

                <div className="status-badge">
                  {req.status}
                </div>

              </div>

            ))
          )}

        </div>


        {/* RIGHT SIDE TRACK DETAILS */}
        <div className="track-details">

          {selected ? (

            <div className="details-card">

              <h2>Pickup Details</h2>

              <div className="pickup-grid">

                <div>
                  <span>Devices</span>
                  <p>{selected.wasteType}</p>
                </div>

                <div>
                  <span>Status</span>
                  <p>{selected.status}</p>
                </div>

                <div>
                  <span>Pickup Date</span>
                  <p>{selected.pickupDate}</p>
                </div>

                <div>
                  <span>Time Slot</span>
                  <p>{selected.timeSlot}</p>
                </div>

                <div>
                  <span>City</span>
                  <p>{selected.serviceCity}</p>
                </div>

                <div>
                  <span>Area</span>
                  <p>{selected.serviceArea}</p>
                </div>

                <div className="full">
                  <span>Address</span>
                  <p>{selected.address}</p>
                </div>

                <div className="full">
                  <span>Description</span>
                  <p>{selected.description || "No description provided"}</p>
                </div>

              </div>


              {/* TIMELINE */}

              <h3 className="timeline-title">Pickup Progress</h3>

              <div className="timeline">

                {["Request Submitted","Recycler Assigned","Out For Pickup","Collected"].map((step,index)=>{

                  const current = getStepIndex(selected.status);

                  return(

                    <div
                      key={index}
                      className={`timeline-step ${index+1 <= current ? "active" : ""}`}
                    >

                      <div className="circle"></div>

                      <p>{step}</p>

                    </div>

                  );

                })}

              </div>

            </div>

          ) : (

            <div className="empty-track">
              <h2>Select a Pickup Request</h2>
              <p>Choose a request from the left panel to track progress.</p>
            </div>

          )}

        </div>

      </div>

    </div>

  );

}

export default TrackPickup;