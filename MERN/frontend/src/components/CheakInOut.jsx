import React, { useState, useEffect } from 'react';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_BASE_URL;
const CheckInOut = () => {
  const [employeeName, setEmployeeName] = useState('');
  const [status, setStatus] = useState("Not Checked In");
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');
  const [history, setHistory] = useState([]);

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleString(); // Format as "MM/DD/YYYY, HH:MM:SS AM/PM"
  };

  const handleCheckIn = async () => {
    const currentCheckInTime = new Date().toISOString();

    try {
      const response = await axios.post(`${apiUrl}/checkin`, {
        employeeName,
        checkInTime: currentCheckInTime,
      });

      console.log(response.data);

      localStorage.setItem('employeeName', employeeName);
      localStorage.setItem('checkInTime', currentCheckInTime);

      setStatus("Checked In");
      setIsCheckedIn(true);
      setCheckInTime(currentCheckInTime);

      // 🔄 Refresh history
      fetchHistory(employeeName);
    } catch (error) {
      console.error('Error during Check-In: ', error);
    }
  };

  const handleCheckOut = async () => {
    const currentCheckOutTime = new Date().toISOString();
    const employeeNameFromLocalStorage = localStorage.getItem('employeeName');

    try {
      const response = await axios.post(`${apiUrl}/checkout`, {
        employeeName: employeeNameFromLocalStorage,
        checkOutTime: currentCheckOutTime,
      });

      console.log(response.data);

      localStorage.setItem('checkOutTime', currentCheckOutTime);

      setStatus("Checked Out");
      setCheckOutTime(currentCheckOutTime);
      setIsCheckedIn(false);

      // 🔄 Refresh history
      fetchHistory(employeeNameFromLocalStorage);
    } catch (error) {
      console.error('Error during Check-Out: ', error);
    }
  };

 const fetchHistory = async (name) => {
    try {
      const response = await axios.get(`${apiUrl}/history?employeeName=${name}`);
      setHistory(response.data);
    } catch (err) {
      console.error('Error fetching history:', err);
    }
  };

  useEffect(() => {
    const employeeNameFromStorage = localStorage.getItem('employeeName');
    if (employeeNameFromStorage) {
      setEmployeeName(employeeNameFromStorage);
      fetchHistory(employeeNameFromStorage);
    }
  }, []);

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-xl shadow-md border border-teal-200">
      <h1 className="text-2xl font-bold text-center text-teal-700 mb-6">Check-In / Check-Out</h1>

      <div className="text-center text-lg font-medium text-gray-700 mb-4">
        Current Status: <span className="text-teal-600">{status}</span>
      </div>

      {isCheckedIn && (
        <div className="text-center text-lg font-medium text-teal-600 mb-4">
          Check-In Time: {checkInTime ? formatDateTime(checkInTime) : ''}
        </div>
      )}

      {status === "Checked Out" && (
        <div className="text-center text-lg font-medium text-red-600 mb-4">
          Check-Out Time: {checkOutTime ? formatDateTime(checkOutTime) : ''}
        </div>
      )}

      <div className="flex justify-center gap-4 mb-6">
        <input
          type="text"
          value={employeeName}
          onChange={(e) => setEmployeeName(e.target.value)}
          placeholder="Enter your name"
          className="p-2 border rounded-md"
        />
      </div>

      <div className="flex justify-center gap-4 mb-6">
        <button
          className={`bg-teal-600 hover:bg-teal-700 text-white font-semibold px-4 py-2 rounded transition ${isCheckedIn ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleCheckIn}
          disabled={isCheckedIn}
        >
          Check In
        </button>
        <button
          className={`bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded transition ${!isCheckedIn ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleCheckOut}
          disabled={!isCheckedIn}
        >
          Check Out
        </button>
      </div>

      <div className="text-center text-lg font-medium text-gray-700 mb-4">
  Current Status: <span className="text-teal-600">{status}</span>
</div>

{/* ✅ Added summary div to show check-in and check-out times */}
<div className="text-center text-sm font-medium text-gray-600 mb-4">
  {checkInTime && <p>Check-In Time: <span className="text-teal-600">{formatDateTime(checkInTime)}</span></p>}
  {checkOutTime && <p>Check-Out Time: <span className="text-red-600">{formatDateTime(checkOutTime)}</span></p>}
</div>

    </div>
  );
};

export default CheckInOut;

