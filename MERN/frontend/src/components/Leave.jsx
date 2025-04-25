import React, { useState } from 'react';

const Leave = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [leaveType, setLeaveType] = useState('Sick');
  const [reason, setReason] = useState('');
  const [leaveList, setLeaveList] = useState([]);
  const [statusMessage, setStatusMessage] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem("token"); // assuming auth token is needed
    const newLeave = {
      leaveType,
      startDate,
      endDate,
      reason,
    };
  
    try {
      const response = await fetch('http://localhost:5000/api/leave/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLeave), // send the form data properly
      });
      
  
      const textData = await response.text();  // Get response as plain text
      console.log("Response text:", textData);  // Log the text response
  
      // Try to parse the text data as JSON if it's valid JSON
      const data = textData ? JSON.parse(textData) : null;
      console.log("Leave applied response:", data);
  
      if (data && data.success) {
        setLeaveList([...leaveList, data.leave]); // push new leave to UI
        
        setStatusMessage("Leave request submitted successfully ✅");
  
        // reset form
        setStartDate('');
        setEndDate('');
        setLeaveType('Sick');
        setReason('');
      } else {
        setStatusMessage(`❌ ${data.message}`);
      }
  
    } catch (error) {
      console.error("Error submitting leave:", error);
      setStatusMessage("❌ Failed to apply for leave. Please try again.");
    }
  };
  


  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-teal-700">Leave Application</h2>

      {statusMessage && <p className="text-green-600 mb-2">{statusMessage}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            className="w-full border rounded p-2"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">End Date</label>
          <input
            type="date"
            className="w-full border rounded p-2"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Leave Type</label>
          <select
            className="w-full border rounded p-2"
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
          >
            <option>Sick</option>
            <option>Casual</option>
            <option>Travel</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Reason</label>
          <textarea
            className="w-full border rounded p-2"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 rounded"
        >
          Apply for Leave
        </button>
      </form>

      <hr className="my-6" />

      <h3 className="text-lg font-semibold text-teal-700 mb-2">Leave History</h3>
      {leaveList.length === 0 ? (
        <p className="text-gray-600">No leave applications submitted yet.</p>
      ) : (
        leaveList.map((leave) => (
          <div key={leave._id} className="p-3 mb-2 border rounded bg-gray-50">
            <p><strong>{leave.leaveType}</strong> Leave</p>
            <p>{leave.startDate} to {leave.endDate}</p>
            <p>Status: <span className="text-yellow-600">{leave.status}</span></p>
          </div>
        ))
      )}
    </div>
  );
};

export default Leave;
