import React, { useState } from "react";
import "./Checkout.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Checkout = () => {
  const [tzkid, setTzkid] = useState("");
  const [gender, setGender] = useState(""); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^TZ2K25/.test(tzkid)) {
      toast.error("Invalid tzkid. It must start with 'TZ2K25'.", {
        position: "top-right",
        autoClose: 3000,
      });
      return; 
    }

    if (!["male", "female"].includes(gender.toLowerCase())) {
      toast.error("Invalid gender. Please enter 'male' or 'female'.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:4001/api/students/allocate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tzkid, gender, action: "checkout" }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Checkout successful!", {
          position: "top-right",
          autoClose: 3000,
        });
        setTzkid("");
      } else {
        toast.error(data.message || "Checkout failed.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error during checkout process: ", error);
      toast.error("Something went wrong. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="checkout-page">
      <ToastContainer />
      <div className="checkout-form-container">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Check-Out</h2>
          <input
            type="text"
            placeholder="Enter TZKID"
            value={tzkid}
            onChange={(e) => setTzkid(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter Gender (male/female)"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          />
          <button type="submit">Check Out</button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
