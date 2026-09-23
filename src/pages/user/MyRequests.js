import React, { useEffect, useState } from "react";
import UserNavbar from "../../components/UserNavbar";   // ✅ FIX NAVBAR
import "./MyRequests.css";

function MyRequests() {
  const [requests, setRequests] = useState([]);
  const [selected, setSelected] = useState(null);

  const email = localStorage.getItem("userEmail");

  const BASE_URL = "https://ecosort-backend-qf67.onrender.com";
  useEffect(() => {
    fetch(`${BASE_URL}/api/pickup/my-requests/${email}`)
      .then((res) => res.json())
      .then((data) => {
        setRequests(Array.isArray(data) ? data : []);
      })
      .catch(() => setRequests([]));
  }, [email]);

  const getDisplayId = (index) => 101 + index;

  const handleDelete = (id) => {

    const confirmDelete = window.confirm("Are you sure you want to delete this request?");

    if (!confirmDelete) return;

    fetch(`${BASE_URL}/api/pickup/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.text())
      .then(() => {
        setRequests((prev) => prev.filter((r) => r.id !== id));
      });
  };

  return (
    <div className="myrequests-page">

      <UserNavbar />   {/* ✅ NAVBAR */}

      <h2 className="title">My Pickup Requests</h2>

      {requests.length === 0 ? (
        <p className="empty">No pickup requests found</p>
      ) : (
        <table className="requests-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Devices</th>
              <th>Date</th>
              <th>Time Slot</th>
              <th>Area</th>
              <th>Address</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((req, index) => (
              <tr key={req.id}>
                <td className="id-cell">{getDisplayId(index)}</td>

                {/* ✅ FIXED DEVICES */}
                <td className="device-cell">
                  {req.wasteType}
                  {req.deviceCondition !== "Mixed" &&
                    ` (${req.deviceCondition})`}
                </td>

                <td>{req.pickupDate}</td>
                <td>{req.timeSlot}</td>
                <td>{req.serviceArea}</td>

                <td className="address-cell">{req.address}</td>

                <td>
                  <span
                    className={`status ${req.status === "PENDING"
                      ? "pending"
                      : req.status === "ACCEPTED"
                        ? "accepted"
                        : req.status === "CANCELLED"
                          ? "cancelled"
                          : "completed"
                      }`}
                  >
                    {req.status}
                  </span>
                </td>

                <td className="actions">
                  <button
                    className="view-btn"
                    onClick={() => setSelected(req)}
                  >
                    View
                  </button>

                  {req.status === "PENDING" && (
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(req.id)}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selected && (
        <div className="modal" onClick={() => setSelected(null)}>
          <div
            className="modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Pickup Request Details</h2>

            <div className="details-grid">
              <div className="detail">
                <span>Request ID</span>
                <p>
                  {101 +
                    requests.findIndex((r) => r.id === selected.id)}
                </p>
              </div>

              <div className="detail">
                <span>Status</span>
                <p
                  className={`status ${selected.status === "PENDING"
                    ? "pending"
                    : selected.status === "ACCEPTED"
                      ? "accepted"
                      : selected.status === "CANCELLED"
                        ? "cancelled"
                        : "completed"
                    }`}
                >
                  {selected.status}
                </p>
              </div>

              {/* ✅ FIXED MODAL DEVICES */}
              <div className="detail">
                <span>Devices</span>
                <p>
                  {selected.wasteType}
                  {selected.deviceCondition !== "Mixed" &&
                    ` (${selected.deviceCondition})`}
                </p>
              </div>

              <div className="detail">
                <span>Pickup Date</span>
                <p>{selected.pickupDate}</p>
              </div>

              <div className="detail">
                <span>Time Slot</span>
                <p>{selected.timeSlot}</p>
              </div>

              <div className="detail">
                <span>City</span>
                <p>{selected.serviceCity}</p>
              </div>

              <div className="detail">
                <span>Area</span>
                <p>{selected.serviceArea}</p>
              </div>

              <div className="detail full">
                <span>Pickup Address</span>
                <p>{selected.address}</p>
              </div>
            </div>

            <div className="modal-actions">
              <button
                className="close-btn"
                onClick={() => setSelected(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyRequests;