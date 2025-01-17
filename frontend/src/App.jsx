// import React from "react";
// import "./App.css";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Sidebar from "./components/Sidebar.jsx";
// import Dashboard from "./pages/Dashboard.jsx";
// import Checkin from "./pages/CheckIn.jsx";
// import Userdetails from "./pages/Userdetails.jsx";
// import Checkout from "./pages/Checkout.jsx";

// const App = () => {
//   return (
//     <BrowserRouter>
//       <Sidebar>
//         <Routes>
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/Userdetails" element={<Userdetails />} />
//           <Route path="/checkin" element={<Checkin />} />
//           <Route path="/checkout" element={<Checkout />} />
//         </Routes>
//       </Sidebar>
//     </BrowserRouter>
//   );
// };

// export default App;



import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Checkin from "./pages/CheckIn.jsx";
import Userdetails from "./pages/Userdetails.jsx";
import Checkout from "./pages/Checkout.jsx";

const App = () => {
  // State to manage the dashboard stats
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
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route
            path="/"
            element={<Dashboard stats={dashboardStats} />}
          />
          <Route
            path="/dashboard"
            element={<Dashboard stats={dashboardStats} />}
          />
          <Route
            path="/checkin"
            element={<Checkin setDashboardStats={setDashboardStats} />}
          />
          <Route path="/Userdetails" element={<Userdetails />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;
