

import React from "react";

const Dashboard = ({ stats }) => {
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
