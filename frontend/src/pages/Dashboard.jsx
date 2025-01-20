
import React, { useState } from "react";
import "./Dashboard.css";

const Dashboard = ({ stats }) => {
  const boysHostel = stats.boysHostel || {};
  const girlsHostel = stats.girlsHostel || {};
  const totalArrivals = (boysHostel.arrivals || 0) + (girlsHostel.arrivals || 0);

  // State for recent check-ins
  const [recentCheckIns, setRecentCheckIns] = useState([
    {
      teckId: "T12345",
      guestName: "John Doe",
      gender: "Male",
      checkInDate: "2025-01-19",
    },
    {
      teckId: "T67890",
      guestName: "Jane Smith",
      gender: "Female",
      checkInDate: "2025-01-18",
    },
  ]);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>

      <div className="main-dashboard">
        {/* Left Section: Stats */}
        <div className="stats-section">
          <div className="stat-box">
            <h2>Arrivals</h2>
            <h1>{totalArrivals}</h1>
          </div>
          <div className="stat-box">
            <h2>Departures</h2>
            <h1>{boysHostel.departures || 0}</h1>
          </div>
          <div className="stat-box">
            <h2>Rooms Occupied</h2>
            <h1>{boysHostel.roomsOccupied || 0}</h1>
          </div>
        </div>

        {/* Right Section: Activities */}
        <div className="activities-section">
          <h2 className="activities-title">Today's Activities</h2>
          <div className="activity-circle">
            <h3>I3</h3>
            <h1>{boysHostel.roomsOccupied || 0}</h1>
            <p>Rooms Occupied</p>
          </div>
          <div className="activity-circle">
            <h3>K4</h3>
            <h1>{girlsHostel.roomsOccupied || 0}</h1>
            <p>Rooms Occupied</p>
          </div>
        </div>
      </div>

      {/* Recent Check-Ins Section */}
      <div className="recent-checkins-section">
        <h2 className="table-title">All Check-Ins</h2>
        <table className="checkins-table">
          <thead>
            <tr>
              <th>TeckId</th>
              <th>Guest Name</th>
              <th>Gender</th>
              <th>Check-In Date</th>
            </tr>
          </thead>
          <tbody>
            {recentCheckIns.map((checkIn, index) => (
              <tr key={index}>
                <td>{checkIn.teckId}</td>
                <td>{checkIn.guestName}</td>
                <td>{checkIn.gender}</td>
                <td>{checkIn.checkInDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Dashboard;
