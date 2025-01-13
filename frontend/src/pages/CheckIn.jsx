// import React, { useState } from "react";
// import "./Checkin.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Checkin = () => {
//   const [tzkid, setTzkid] = useState("");
//   const [allocation, setAllocation] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:4001/user/allocate", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ tzkid }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // Differentiate based on backend response
//         if (data.alreadyAllocated) {
//           // Toast for users who are already allocated
//           toast.info("User already allocated. Showing allocation details.", {
//             position: "top-right",
//             autoClose: 3000,
//           });
//         } else {
//           // Toast for newly allocated users
//           toast.success("Room allocated successfully!", {
//             position: "top-right",
//             autoClose: 3000,
//           });
//         }

//         setAllocation(data.allocation); // Set allocation details in state
//       } else {
//         // Handle errors or invalid responses
//         toast.error(data.message || "Allocation failed.", {
//           position: "top-right",
//           autoClose: 3000,
//         });
//       }
//     } catch (error) {
//       console.error("Error during check-in process: ", error);
//       toast.error("Something went wrong. Please try again.", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//     }
//   };

//   return (
//     <div className="checkin-page">
//       <ToastContainer />
//       <div className="checkin-form-container">
//         <form className="checkin-form" onSubmit={handleSubmit}>
//           <h2>Check-In</h2>
//           <input
//             type="text"
//             placeholder="Enter TZKID"
//             value={tzkid}
//             onChange={(e) => setTzkid(e.target.value)}
//             required
//           />
//           <button type="submit">Submit</button>
//         </form>

//         {/* Allocation Details */}
//         {allocation && (
//           <div className="allocation-details">
//             <h3>Allocation Details</h3>
//             <p>
//               <strong>Hostel:</strong> {allocation.hostel}
//             </p>
//             <p>
//               <strong>Room No:</strong> {allocation.roomNo}
//             </p>
//             <p>
//               <strong>Bed No:</strong> {allocation.bedNo}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Checkin;
import React, { useState } from "react";
import "./Checkin.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Checkin = () => {
  const [tzkid, setTzkid] = useState("");
  const [allocation, setAllocation] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4001/user/allocate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tzkid }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.alreadyAllocated) {
          toast.info("User already allocated. Showing allocation details.", {
            position: "top-right",
            autoClose: 3000,
          });
        } else {
          toast.success("Room allocated successfully!", {
            position: "top-right",
            autoClose: 3000,
          });
        }

        setAllocation(data.allocation);
      } else {
        toast.error(data.message || "Allocation failed.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error during check-in process: ", error);
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
          <h2>Check-In</h2>
          <input
            type="text"
            placeholder="Enter TZKID"
            value={tzkid}
            onChange={(e) => setTzkid(e.target.value)}
            required
          />
          <button type="submit">Submit</button>
        </form>

        {allocation && (
          <div className="allocation-details">
            <h3>Allocation Details</h3>
            <p>
              <strong>Hostel:</strong> {allocation.hostel}
            </p>
            <p>
              <strong>Room No:</strong> {allocation.roomNo}
            </p>
            <p>
              <strong>Bed No:</strong> {allocation.bedNo}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkin;
