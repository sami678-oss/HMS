// import React, { useState, useEffect } from "react";
// import DataTable from "react-data-table-component";
// import "./Dashboard.css";

// const Dashboard = () => {
//   const [data, setData] = useState({
//     arrivals: 0,
//     departures: 0,
//     roomsOccupied: 0,
//     hostel1Available: 0,
//     hostel2Available: 0,
//     hostel1Allocated: 0,
//     hostel2Allocated: 0,
//   });
//   const [loading, setLoading] = useState(true); // For initial loading
//   const [isUpdating, setIsUpdating] = useState(false); // For recent check-ins updates
//   const [recentCheckIns, setRecentCheckIns] = useState([]); // Data for the React Data Table

//   // Fetch stats
//   const fetchStats = async () => {
//     try {
//       const response = await fetch("http://localhost:4001/api/users/stats");
//       if (response.ok) {
//         const stats = await response.json();
//         setData({
//           arrivals: stats.arrivals || 0,
//           departures: stats.departures || 0,
//           roomsOccupied: stats.roomsOccupied || 0,
//           hostel1Available: stats.hostel1Available || 0,
//           hostel2Available: stats.hostel2Available || 0,
//           hostel1Allocated: stats.hostel1Allocated || 0,
//           hostel2Allocated: stats.hostel2Allocated || 0,
//         });
//       } else {
//         console.error("Failed to fetch stats: ", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error fetching stats: ", error);
//     }
//   };

//   // Fetch recent check-ins
//   const fetchRecentCheckIns = async () => {
//     setIsUpdating(true); // Show spinner for the table update
//     try {
//       const response = await fetch("http://localhost:4001/api/users/");
//       if (response.ok) {
//         const checkIns = await response.json();
//         setRecentCheckIns(checkIns);
//       } else {
//         console.error("Failed to fetch check-ins: ", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error fetching check-ins: ", error);
//     } finally {
//       setIsUpdating(false); // Hide spinner after update
//     }
//   };

//   useEffect(() => {
//     // Initial fetch
//     const fetchData = async () => {
//       await fetchStats();
//       await fetchRecentCheckIns();
//       setLoading(false); // Set loading to false after initial data load
//     };
//     fetchData();

//     // Poll the server every 5 seconds for recent check-ins
//     const interval = setInterval(() => {
//       fetchRecentCheckIns();
//     }, 5000);

//     // Cleanup on component unmount
//     return () => clearInterval(interval);
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>; // Show this only for initial loading
//   }

//   // Define columns for React Data Table
//   const columns = [
//     {
//       name: "TZK ID",
//       selector: (row) => row.tzkid,
//       sortable: true,
//     },
//     {
//       name: "First Name",
//       selector: (row) => row.firstname,
//       sortable: true,
//     },
//     {
//       name: "Gender",
//       selector: (row) => row.gender,
//       sortable: true,
//     },
//     {
//       name: "Date of Arrival",
//       selector: (row) => row.date,
//       sortable: true,
//     },
//   ];

//   return (
//     <div className="dashboard-container">
//       <h1 className="dashboard-title">Dashboard</h1>

//       <div className="main-dashboard">
//         {/* Left Section: Stats */}
//         <div className="stats-section">
//           <div className="stat-box">
//             <h2>Arrivals</h2>
//             <h1>{data.arrivals}</h1>
//           </div>
//           <div className="stat-box">
//             <h2>Departures</h2>
//             <h1>{data.departures}</h1>
//           </div>
//           <div className="stat-box">
//             <h2>Rooms Occupied</h2>
//             <h1>{data.roomsOccupied}</h1>
//           </div>
//         </div>

//         {/* Right Section: Today's Activities */}
//         <div className="activities-section">
//           <h2 className="activities-title">Today's Activities</h2>
//           <div className="activity-circle">
//             <h3>I3</h3>
//             <h1>{data.hostel1Available}</h1>
//             <p>Available Rooms</p>
//           </div>
//           <div className="activity-circle">
//             <h3>K4</h3>
//             <h1>{data.hostel2Available}</h1>
//             <p>Available Rooms</p>
//           </div>
//         </div>
//       </div>

//       {/* New Section: React Data Table */}
//       <div className="recent-checkins-section">
//         <h2 className="table-title">Recent Check-Ins</h2>
//         {isUpdating && <p>Updating recent check-ins...</p>}{" "}
//         {/* Show a message while updating */}
//         <DataTable
//           columns={columns}
//           data={recentCheckIns}
//           pagination
//           highlightOnHover
//           striped
//         />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;




import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4001/api/users/stats"
        );
        console.log(response.data);

        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {stats ? (
        <div>
          <p>Total Rooms: {stats.totalRooms}</p>
          <p>Total Beds: {stats.totalBeds}</p>
          <p>Occupied Beds: {stats.occupiedBeds}</p>
          <p>Available Beds: {stats.availableBeds}</p>
          <p>Total Arrivals: {stats.totalArrivals}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;



