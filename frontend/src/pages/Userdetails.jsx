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

    // Validate ID format: Starts with TZ2K25 and length <= 10 characters
    const idPattern = /^TZ2K25[A-Z0-9]*$/;

    if (!idPattern.test(id)) {
      toast.error("Invalid ID! The ID should start with 'TZ2K25' ", {
        position: "top-right",
        autoClose: 3000,
      });
      setRetrievedData(null); // Clear any previously retrieved data
      return;
    }

    try {
      // Make a POST request to the backend to check if the ID exists
      const response = await fetch(`http://localhost:4001/api/users/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setRetrievedData(data.user);

        if (data.user.firstName === "Default") {
          toast.info("Default user details displayed.", {
            position: "top-right",
            autoClose: 3000,
          });
        } else {
          toast.success("User Found!", {
            position: "top-right",
            autoClose: 3000,
          });
        }
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
                <strong>First Name:</strong> {retrievedData.firstName}
              </p>
              <p>
                <strong>Last Name:</strong> {retrievedData.lastName}
              </p>
              <p>
                <strong>Email:</strong> {retrievedData.email}
              </p>
              <p>
                <strong>Gender:</strong> {retrievedData.gender}
              </p>
              <p>
                <strong>Check-In Time:</strong> {new Date(retrievedData.CheckInTime).toLocaleString()}
              </p>
              <p>
                <strong>Check-Out Time:</strong> {new Date(retrievedData.CheckOutTime).toLocaleString()}
              </p>
              {/* Add other fields as needed */}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default UserDetails;
