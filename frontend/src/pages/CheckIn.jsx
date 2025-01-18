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

//         setAllocation(data.allocation);
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
//       </div>
//     </div>
//   );
// };

// export default Checkin;

// import React, { useState } from "react";
// import "./Checkin.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Checkin = () => {
//   const [tzkid, setTzkid] = useState("");
//   const [allocation, setAllocation] = useState(null);

//   // State to manage the stats
//   const [stats, setStats] = useState({
//     boysHostel: {
//       totalArrivals: 0,
//       roomsOccupied: 0,
//       availableRooms: 100,
//       currentRoom: 1,
//       currentBed: 1,
//     },
//     girlsHostel: {
//       totalArrivals: 0,
//       roomsOccupied: 0,
//       availableRooms: 100,
//       currentRoom: 1,
//       currentBed: 1,
//     },
//   });

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

//           // Update the stats after successful allocation
//           if (data.allocation.hostel === "I3") {
//             // Update for Boys Hostel (I3)
//             const newStats = { ...stats };
//             newStats.boysHostel.totalArrivals += 1;

//             // Check if we need to increase the room number (after 6 beds)
//             newStats.boysHostel.currentBed += 1;
//             if (newStats.boysHostel.currentBed > 6) {
//               newStats.boysHostel.roomsOccupied += 1;
//               newStats.boysHostel.availableRooms =
//                 100 - newStats.boysHostel.roomsOccupied; // Recalculate available rooms
//               newStats.boysHostel.currentRoom += 1; // Move to the next room
//               newStats.boysHostel.currentBed = 1; // Reset bed to 1 for the next room
//             }

//             setStats(newStats);
//           } else if (data.allocation.hostel === "K4") {
//             // Update for Girls Hostel (K4)
//             const newStats = { ...stats };
//             newStats.girlsHostel.totalArrivals += 1;

//             // Check if we need to increase the room number (after 6 beds)
//             newStats.girlsHostel.currentBed += 1;
//             if (newStats.girlsHostel.currentBed > 6) {
//               newStats.girlsHostel.roomsOccupied += 1;
//               newStats.girlsHostel.availableRooms =
//                 100 - newStats.girlsHostel.roomsOccupied; // Recalculate available rooms
//               newStats.girlsHostel.currentRoom += 1; // Move to the next room
//               newStats.girlsHostel.currentBed = 1; // Reset bed to 1 for the next room
//             }

//             setStats(newStats);
//           }
//         }

//         setAllocation(data.allocation);
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

//         {/* Displaying Stats */}
//         <div className="hostel-stats">
//           <h3>Boys Hostel (I3)</h3>
//           <p>Total Arrivals: {stats.boysHostel.totalArrivals}</p>
//           <p>Rooms Occupied: {stats.boysHostel.roomsOccupied}</p>
//           <p>Available Rooms: {stats.boysHostel.availableRooms}</p>

//           <h3>Girls Hostel (K4)</h3>
//           <p>Total Arrivals: {stats.girlsHostel.totalArrivals}</p>
//           <p>Rooms Occupied: {stats.girlsHostel.roomsOccupied}</p>
//           <p>Available Rooms: {stats.girlsHostel.availableRooms}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkin;


import React, { useState } from "react";
import "./Checkin.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Checkin = ({ setDashboardStats }) => {
  const [tzkid, setTzkid] = useState("");
  const [allocation, setAllocation] = useState(null);

  // State to manage the stats
  const [stats, setStats] = useState({
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

          // Update the stats after successful allocation
          if (data.allocation.hostel === "I3") {
            // Update for Boys Hostel (I3)
            const newStats = { ...stats };
            newStats.boysHostel.totalArrivals += 1;

            // Check if we need to increase the room number (after 6 beds)
            newStats.boysHostel.currentBed += 1;
            if (newStats.boysHostel.currentBed > 6) {
              newStats.boysHostel.roomsOccupied += 1;
              newStats.boysHostel.availableRooms =
                100 - newStats.boysHostel.roomsOccupied; // Recalculate available rooms
              newStats.boysHostel.currentRoom += 1; // Move to the next room
              newStats.boysHostel.currentBed = 1; // Reset bed to 1 for the next room
            }

            setStats(newStats);
            setDashboardStats(newStats); // Pass stats to dashboard
          } else if (data.allocation.hostel === "K4") {
            // Update for Girls Hostel (K4)
            const newStats = { ...stats };
            newStats.girlsHostel.totalArrivals += 1;

            // Check if we need to increase the room number (after 6 beds)
            newStats.girlsHostel.currentBed += 1;
            if (newStats.girlsHostel.currentBed > 6) {
              newStats.girlsHostel.roomsOccupied += 1;
              newStats.girlsHostel.availableRooms =
                100 - newStats.girlsHostel.roomsOccupied; // Recalculate available rooms
              newStats.girlsHostel.currentRoom += 1; // Move to the next room
              newStats.girlsHostel.currentBed = 1; // Reset bed to 1 for the next room
            }

            setStats(newStats);
            setDashboardStats(newStats); // Pass stats to dashboard
          }
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
          <button type="submit">Check In</button>
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
