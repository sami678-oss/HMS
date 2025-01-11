import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const data = {
    arrivals: 54,
    departures: 12,
    roomsOccupied: 50,
    hostel1Available: 5,
    hostel2Available: 8,
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>

      <div className="main-dashboard">
        {/* Left Section: Stats */}
        <div className="stats-section">
          <div className="stat-box">
            <h2>Arrivals</h2>
            <h1>{data.arrivals}</h1>
          </div>
          <div className="stat-box">
            <h2>Departures</h2>
            <h1>{data.departures}</h1>
          </div>
          <div className="stat-box">
            <h2>Rooms Occupied</h2>
            <h1>{data.roomsOccupied}</h1>
          </div>
        </div>

        {/* Right Section: Today's Activities */}
        <div className="activities-section">
          <h2 className="activities-title">Today's Activities</h2>
          <div className="activity-circle">
            <h3>I3</h3>
            <h1>{data.hostel1Available}</h1>
            <p>Available Rooms</p>
          </div>
          <div className="activity-circle">
            <h3>K4</h3>
            <h1>{data.hostel2Available}</h1>
            <p>Available Rooms</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

