import { useState } from "react"
import { motion } from "framer-motion"

const Checkin = ({ setDashboardStats }) => {
  const [tzkid, setTzkid] = useState("")
  const [gender, setGender] = useState("")
  const [allocation, setAllocation] = useState(null)
  const [toast, setToast] = useState(null)

  const showToast = (message, type) => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!/^TZ2K25/i.test(tzkid)) {
      showToast("Invalid tzkid. It must start with 'TZ2K25'.", "error")
      return
    }

    if (!gender) {
      showToast("Please select a gender.", "error")
      return
    }

    try {
      const response = await fetch("http://localhost:4001/api/students/allocate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tzkid, gender, action: "checkin" }),
      })

      const data = await response.json()

      if (response.ok) {
        showToast(data.message || "Room allocated successfully!", "success")
        setAllocation(data.allocation)

        setDashboardStats({
          teckId: tzkid,
          guestName: data.student?.guestName || "N/A",
          gender,
          checkInDate: new Date().toISOString().split('T')[0],
        })
      } 
      else {
        showToast(data.message || "Error during allocation process.", "error")
      }
    } catch (error) {
      console.error("Error during check-in process:", error)
      showToast("Something went wrong. Please try again.", "error")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md overflow-hidden rounded-lg bg-gray-800 bg-opacity-50 p-8 shadow-lg backdrop-blur-lg"
      >
        <h2 className="mb-6 text-center text-3xl font-bold text-white">Check-In</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Enter TZKID"
              value={tzkid}
              onChange={(e) => setTzkid(e.target.value)}
              required
              className="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex justify-center space-x-4">
            {["male", "female"].map((option) => (
              <motion.button
                key={option}
                type="button"
                onClick={() => setGender(option)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`rounded-md px-4 py-2 font-medium transition-colors ${
                  gender === option ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </motion.button>
            ))}
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full rounded-md bg-blue-600 py-2 font-medium text-white transition-colors hover:bg-blue-700"
          >
            Allocate Room
          </motion.button>
        </form>

        {allocation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6 rounded-md bg-gray-700 bg-opacity-50 p-4"
          >
            <h3 className="mb-2 text-xl font-semibold text-white">Allocation Details</h3>
            <p className="text-gray-300">
              <strong>Hostel:</strong> {allocation.hostel}
            </p>
            <p className="text-gray-300">
              <strong>Room No:</strong> {allocation.room}
            </p>
            <p className="text-gray-300">
              <strong>Bed No:</strong> {allocation.bed}
            </p>
          </motion.div>
        )}

        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed right-4 top-4 rounded-md p-4 text-white ${
              toast.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {toast.message}
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default Checkin

