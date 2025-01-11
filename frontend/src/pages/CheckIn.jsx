import React, { useState } from "react";
import "./Checkin.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Checkin = () => {
  const [tzkid, setTzkid] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4001/user/checkTzkid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tzkid }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("ID Matched! Welcome!", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        toast.error(data.message || "ID not found", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="checkin-page">
      <ToastContainer />
      <div className="checkin-form-container">
        <form className="checkin-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Teczite ID"
            value={tzkid}
            onChange={(e) => setTzkid(e.target.value)}
            required
          />
          <button type="submit">Confirm</button>
        </form>
      </div>
    </div>
  );
};

export default Checkin;
