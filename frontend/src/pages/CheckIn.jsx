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
      const response = await fetch("http://localhost:4001/api/users/allocate", {
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



// import React, { useState } from "react";
// import "./Checkin.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Checkin = () => {
//   const [tzkid, setTzkid] = useState("");
//   const [allocation, setAllocation] = useState(null);
//   const [userDetails, setUserDetails] = useState(null); // New state for storing user details

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:4001/api/users/allocate", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ tzkid }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         if (data.alreadyAllocated) {
//           toast.info("User already allocated. Showing allocation details.", {
//             position: "top-right",
//             autoClose: 3000,
//           });
//         } else {
//           toast.success("Room allocated successfully!", {
//             position: "top-right",
//             autoClose: 3000,
//           });
//         }

//         // Store allocation data and user details
//         setAllocation(data.allocation);
//         setUserDetails(data.user); // Assuming 'user' contains user details (id, firstname, gender, date)
//       } else {
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

//         {userDetails && (
//           <div className="user-details">
//             <h3>User Details</h3>
//             <p>
//               <strong>ID:</strong> {userDetails.id}
//             </p>
//             <p>
//               <strong>First Name:</strong> {userDetails.firstname}
//             </p>
//             <p>
//               <strong>Gender:</strong> {userDetails.gender}
//             </p>
//             <p>
//               <strong>Date of Check-in:</strong> {userDetails.date}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Checkin;
