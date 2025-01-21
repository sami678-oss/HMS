

import React, { useState, useEffect } from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState({
   
  });
  const [recentCheckIns, setRecentCheckIns] = useState([]);

  useEffect(() => {
    const fetchHostelStats = async () => {
      try {
        const response = await fetch(
          "http://localhost:4001/api/rooms/hostel-stats"
        );
        const data = await response.json();
        console.log({data}); 

        setStats(data);
        console.log({stats}); 


        setRecentCheckIns([
          {
            teckId: "TZ2K25V001",
            guestName: "John Doe",
            gender: "Male",
            checkInDate: "2025-01-21",
          },
          {
            teckId: "TZ2K25V002",
            guestName: "Jane Smith",
            gender: "Female",
            checkInDate: "2025-01-20",
          },
        ]);
      } catch (error) {
        console.error("Error fetching hostel stats:", error);
      }
    };

    fetchHostelStats();
  }, []);

  const boysHostel = stats?.boysHostel || {};
  const girlsHostel = stats?.girlsHostel || {};
  const totalArrivals =
    (boysHostel.totalStudents || 0) + (girlsHostel.totalStudents || 0);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>

      <div className="main-dashboard">

        <div className="stats-section">
          <div className="stat-box">
            <h2>Total Students</h2>
            <h1>{totalArrivals}</h1>
          </div>
          <div className="stat-box">
            <h2>Boys Rooms</h2>
            <h1>{boysHostel.totalRooms || 0}</h1>
          </div>
          <div className="stat-box">
            <h2>Girls Rooms</h2>
            <h1>{girlsHostel.totalRooms || 0}</h1>
          </div>
        </div>

        {/* Right Section: Activities */}
        <div className="activities-section">
          <h2 className="activities-title">Hostel Occupancy</h2>
          <div className="activity-circle">
            <h3>I3</h3>
            <h1>{boysHostel.totalStudents || 0}</h1>
            <p>Total Students</p>
          </div>
          <div className="activity-circle">
            <h3>K4</h3>
            <h1>{girlsHostel.totalStudents || 0}</h1>
            <p>Total Students</p>
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
