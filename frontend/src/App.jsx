import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Checkin from "./pages/CheckIn.jsx";
import Userdetails from "./pages/Userdetails.jsx";
import Checkout from "./pages/Checkout.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Userdetails" element={<Userdetails />} />
          <Route path="/checkin" element={<Checkin />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;
