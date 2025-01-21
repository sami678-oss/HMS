import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./UserDetails.css";

const UserDetails = () => {
  const [userData, setUserData] = useState({
    id: "",
  });

  const [retrievedData, setRetrievedData] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id } = userData;

    const idPattern = /^TZ2K25[A-Z0-9]*$/;

    if (!idPattern.test(id)) {
      toast.error("Invalid ID! The ID should start with 'TZ2K25' ", {
        position: "top-right",
        autoClose: 3000,
      });
      setRetrievedData(null);
      return;
    }

    try {
      const response = await fetch(`http://localhost:4001/api/students/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setRetrievedData(data.user);
        toast.success("User Found!", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        setRetrievedData(null);
        toast.error(data.message || "User not found", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="userdetails-page">
      <ToastContainer />
      <div className="userdetails-form-container">
        <form className="userdetails-form" onSubmit={handleSubmit}>
          <h2>User Details</h2>
          <div className="form-group">
            <input
              type="text"
              id="id"
              name="id"
              placeholder="ENTER ID"
              value={userData.id}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <button type="submit" className="submit-button">
              Submit
            </button>
          </div>

          {retrievedData && (
            <div className="retrieved-data">
              <p>
                <strong>Name:</strong> {retrievedData.name || "STUDENT CHECKOUT"}
              </p>
              <p>
                <strong>Gender:</strong> {retrievedData.gender}
              </p>
              <p>
                <strong>Hostel:</strong> {retrievedData.hostel || "STUDENT CHECKOUT"}
              </p>
              <p>
                <strong>Room:</strong> {retrievedData.room || "STUDENT CHECKOUT"}
              </p>
              <p>
                <strong>Bed:</strong> {retrievedData.bed || "STUDENT CHECKOUT"}
              </p>
              <p>
                <strong>Check-In Time:</strong>{" "}
                {retrievedData.checkInTime
                  ? new Date(retrievedData.checkInTime).toLocaleString("en-IN", {
                      timeZone: "Asia/Kolkata",
                    })
                  : "N/A"}
              </p>
              <p>
                <strong>Check-Out Time:</strong>{" "}
                {retrievedData.checkOutTime
                  ? new Date(retrievedData.checkOutTime).toLocaleString(
                      "en-IN",
                      {
                        timeZone: "Asia/Kolkata",
                      }
                    )
                  : "N/A"}
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default UserDetails;
