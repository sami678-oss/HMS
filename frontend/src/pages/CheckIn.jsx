import React, { useState } from "react";
import "./Checkin.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Checkin = ({ setDashboardStats }) => {
  const [tzkid, setTzkid] = useState("");
  const [gender, setGender] = useState("");
  const [allocation, setAllocation] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^TZ2K25/.test(tzkid)) {
      toast.error("Invalid tzkid. It must start with 'TZ2K25'.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (!gender) {
      toast.error("Please select a gender.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:4001/api/students/allocate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tzkid, gender, action: "checkin" }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Room allocated successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        setAllocation(data.allocation);
      } else {
        toast.error(data.message || "Error during allocation process.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error during check-in process:", error);
      toast.error("Something went wrong. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="checkin-page">
      <ToastContainer />
      <div className="checkin-form-container">
        <form className="checkin-form" onSubmit={handleSubmit}>
          <h2>Check-In</h2>
          <input
            type="text"
            placeholder="Enter TZKID"
            value={tzkid}
            onChange={(e) => setTzkid(e.target.value)}
            required
          />
          <div className="gender-selection">
            <ul>
              <li
                className={`gender-option ${gender === "male" ? "selected" : ""}`}
                onClick={() => setGender("male")}
              >
                Male
              </li>
              <li
                className={`gender-option ${gender === "female" ? "selected" : ""}`}
                onClick={() => setGender("female")}
              >
                Female
              </li>
            </ul>
          </div>
          <button type="submit">Check In</button>
        </form>

        {allocation && (
          <div className="allocation-details">
            <h3>Allocation Details</h3>
            <p>
              <strong>Hostel:</strong> {allocation.hostel}
            </p>
            <p>
              <strong>Room No:</strong> {allocation.roomNo}
            </p>
            <p>
              <strong>Bed No:</strong> {allocation.bedNo}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkin;
