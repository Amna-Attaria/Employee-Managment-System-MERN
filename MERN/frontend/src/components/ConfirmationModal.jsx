import React, { useState } from 'react';
import axios from 'axios';

const CheckInOut = () => {
  const [employeeName, setEmployeeName] = useState('');
  const [status, setStatus] = useState("Not Checked In");
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  const handleCheckIn = () => {
    const checkInTime = new Date().toLocaleString();
    
    // Save employee name to localStorage
    localStorage.setItem('employeeName', employeeName);

    // Save Check-In data to the backend
    axios.post('http://localhost:5000/api/checkin', {
      employeeName: employeeName,
      checkInTime: checkInTime,
    })
    .then(response => {
      setStatus("Checked In");
      setIsCheckedIn(true);
    })
    .catch(error => {
      console.error("Error during Check-In:", error);
    });
  };

  const handleCheckOut = () => {
    const checkOutTime = new Date().toLocaleString();
    const employeeName = localStorage.getItem('employeeName');

    // Send Check-Out data to the backend
    axios.post('http://localhost:5000/api/checkout', {
      employeeName: employeeName,
      checkOutTime: checkOutTime,
    })
    .then(response => {
      setStatus("Checked Out");
      setIsCheckedIn(false);
    })
    .catch(error => {
      console.error("Error during Check-Out:", error);
    });
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-xl shadow-md border border-teal-200">
      <h1 className="text-2xl font-bold text-center text-teal-700 mb-6">Check-In / Check-Out</h1>

      <div className="text-center text-lg font-medium text-gray-700 mb-4">
        Current Status: <span className="text-teal-600">{status}</span>
      </div>

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
    </div>
  );
};

export default CheckInOut;
