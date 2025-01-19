


import React, { useEffect, useState } from "react";

const Dashboard = ({ stats, userId }) => {

  // Fetch user details by tzkid
  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await fetch("http://localhost:4001/api/stats");
        const data = await response.json();
  
        if (response.ok) {
          setDashboardStats(data.stats);
        } else {
          console.error("Error fetching stats:", data.message);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
  
    fetchDashboardStats();
  }, []);
  



  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Boys Hostel (I3)</h2>
      <p>Total Arrivals: {stats.boysHostel.totalArrivals}</p>
      <p>Rooms Occupied: {stats.boysHostel.roomsOccupied}</p>
      <p>Available Rooms: {stats.boysHostel.availableRooms}</p>

      <h2>Girls Hostel (K4)</h2>
      <p>Total Arrivals: {stats.girlsHostel.totalArrivals}</p>
      <p>Rooms Occupied: {stats.girlsHostel.roomsOccupied}</p>
      <p>Available Rooms: {stats.girlsHostel.availableRooms}</p>

     
    </div>
  );
};

export default Dashboard;
