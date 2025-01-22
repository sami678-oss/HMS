import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Checkin from "./pages/Checkin.jsx";
import Userdetails from "./pages/Userdetails.jsx";
import Checkout from "./pages/Checkout.jsx";
// import FinisherHeader from "./components/FinisherHeader"; // Import the animation component

const App = () => {
  const [dashboardStats, setDashboardStats] = useState({
    boysHostel: {
      totalArrivals: 0,
      roomsOccupied: 0,
      availableRooms: 100,
      currentRoom: 1,
      currentBed: 1,
    },
    girlsHostel: {
      totalArrivals: 0,
      roomsOccupied: 0,
      availableRooms: 100,
      currentRoom: 1,
      currentBed: 1,
    },
  });

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800">
      <BrowserRouter>
      {/* <FinisherHeader />  */}
      <Sidebar>
        <Routes>
          <Route path="/" element={<Dashboard stats={dashboardStats} />} />
          <Route path="/dashboard" element={<Dashboard stats={dashboardStats} />} />
          <Route path="/checkin" element={<Checkin setDashboardStats={setDashboardStats} />} />
          <Route path="/Userdetails" element={<Userdetails />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
    </div>
  );
};

export default App;
