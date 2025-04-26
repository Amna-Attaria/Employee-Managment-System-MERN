import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
// } from "recharts";

// // ------------------ graph ----------------
// const sampleData = [
//   { date: "Apr 21", checkIn: 1, checkOut: 1 },
//   { date: "Apr 22", checkIn: 1, checkOut: 0 },
//   { date: "Apr 23", checkIn: 1, checkOut: 1 },
//   { date: "Apr 24", checkIn: 1, checkOut: 1 },
// ];
import axios from "axios"; // ✅ Imported axios

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const Dashbord = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // ✅ Helper to format time
  const formatTime = (dateTime) => {
    return dateTime ? new Date(dateTime).toLocaleString() : "N/A";
  };

  // ✅ Fetch user info
  const [checkInOut, setCheckInOut] = useState({ checkInTime: "", checkOutTime: "" });

  useEffect(() => {
    const storedCheckIn = localStorage.getItem("checkInTime");
    const storedCheckOut = localStorage.getItem("checkOutTime");
  
    setCheckInOut({
      checkInTime: storedCheckIn,
      checkOutTime: storedCheckOut,
    });
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(`${apiUrl}/auth/user/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setUser(data.user);
          console.log(data.user);
        } else {
          toast.error(data.message || "Failed to fetch user details");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("An error occurred while fetching user details");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [navigate]);

  // ✅ Fetch check-in/out history
    const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleString(); // Format as "MM/DD/YYYY, HH:MM:SS AM/PM"
  };
  const fetchHistory = async (name) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/history?employeeName=${name}`);
      const data = response.data;
      if (data && data.length > 0) {
        const latestEntry = data[data.length - 1];
        setCheckInOut({
          checkInTime: latestEntry.checkInTime || "",
          checkOutTime: latestEntry.checkOutTime || "",
        });
      }
    } catch (err) {
      console.error("Error fetching history:", err);
    }
  };

  // ✅ Fetch check-in/out after user is loaded
  useEffect(() => {
    if (user?.name) {
      fetchHistory(user.name);
    }
  }, [user]);

  return (
    <div className="flex gap-4 flex-wrap justify-center">
      {/* Profile Summary */}
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md border border-teal-200 mt-8">
        <h1 className="text-2xl font-bold text-teal-700 mb-4">Profile Summary</h1>
        <div className="mb-2 flex gap-2">
          <span className="font-semibold">Name:</span>
          <span>{user?.name}</span>
        </div>
        <div className="mb-2 flex gap-2">
          <span className="font-semibold">Email:</span>
          <span>{user?.email}</span>
        </div>
      </div>

      {/* CheckIn / CheckOut Summary */}
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md border border-teal-200 mt-8">
  <h1 className="text-2xl font-bold text-teal-700 mb-4">CheckIn / CheckOut</h1>

  <div className="text-sm font-medium text-gray-600 mb-4">
    {checkInOut.checkInTime && (
      <p>
        Check-In Time:{" "}
        <span className="text-teal-600">{formatDateTime(checkInOut.checkInTime)}</span>
      </p>
    )}
    {checkInOut.checkOutTime && (
      <p>
        Check-Out Time:{" "}
        <span className="text-red-600">{formatDateTime(checkInOut.checkOutTime)}</span>
      </p>
    )}
  </div>
</div>

{/* <div className="w-full max-w-4xl bg-white p-6 rounded-xl shadow-md mt-8">
  <h2 className="text-2xl font-bold text-teal-700 mb-4">CheckIn/CheckOut Summary</h2>
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={sampleData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis allowDecimals={false} />
      <Tooltip />
      <Legend />
      <Bar dataKey="checkIn" fill="#38b2ac" name="Check-In" />
      <Bar dataKey="checkOut" fill="#f56565" name="Check-Out" />
    </BarChart>
  </ResponsiveContainer>
</div> */}


    </div>


// ----------------------- GRAPH ----------------------

    
  );
};

export default Dashbord;
