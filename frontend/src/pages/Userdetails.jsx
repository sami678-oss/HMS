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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate ID format: Starts with TZ2K25 and length <= 10 characters
     const idPattern = /^TZ2K25[A-Z0-9]{4}$/;

    if (!idPattern.test(id)) {
      // Invalid ID toast
      toast.error("Invalid ID! The ID should start with 'TZ2K25' and be 10 characters long.", {
        position: "top-right",
        autoClose: 3000,
      });
      setRetrievedData(null); // Clear any previously retrieved data
      return;
    }

    // Check if the entered ID matches the mock data ID
    if (id === mockData.id) {
      // Valid data toast
      toast.success("Valid data retrieved successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      setRetrievedData(mockData); // Set retrieved data
    } else {
      // Data not found toast
      toast.error("No data found for the entered ID.", {
        position: "top-right",
        autoClose: 3000,
      });
      setRetrievedData(null); // Clear any previously retrieved data
    }
   

    // Simulate fetching data based on ID
    const fetchedData = {
      id: userData.id,
      name: "John Doe",
      hostel:"I3",
      gender:"male",
      roomNo: "101",
      checkIn: "2025-01-10",
      checkOut: "2025-01-15",
    };
    setRetrievedData(fetchedData);
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
              <p><strong>Name:</strong> {retrievedData.name}</p>
              <p><strong>Room No:</strong> {retrievedData.roomNo}</p>
              <p><strong>CheckIn:</strong> {retrievedData.checkIn}</p>
              <p><strong>CheckOut:</strong> {retrievedData.checkOut}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default UserDetails;
