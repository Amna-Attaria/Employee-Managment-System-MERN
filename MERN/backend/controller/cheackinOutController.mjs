import CheckInOut from '../models/CheakInOut/cheackinout.mjs';

// Controller for handling Check-In and Check-Out logs
export const logCheckIn = async (req, res) => {
  const { employeeName, checkInTime } = req.body;

  try {
    const newCheckIn = new CheckInOut({
      employeeName,
      checkInTime,
    });

    await newCheckIn.save();
    res.status(200).send({ message: 'Check-In data saved successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error saving Check-In data', error });
  }
};

export const logCheckOut = async (req, res) => {
  const { employeeName, checkOutTime } = req.body;

  try {
    const checkInData = await CheckInOut.findOne({ employeeName, checkOutTime: null });

    if (!checkInData) {
      return res.status(400).send({ message: 'No active Check-In found' });
    }

    checkInData.checkOutTime = checkOutTime;
    await checkInData.save();
    res.status(200).send({ message: 'Check-Out data saved successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error saving Check-Out data', error });
  }
};






// Use arrays to store history
let checkHistory = {};

export const logCheckInhis = (req, res) => {
  const { employeeName, checkInTime } = req.body;
  if (!checkHistory[employeeName]) {
    checkHistory[employeeName] = [];
  }

  checkHistory[employeeName].push({ checkInTime, checkOutTime: null });
  res.status(200).json({ message: "Check-In recorded." });
};

export const logCheckOuthis = (req, res) => {
  const { employeeName, checkOutTime } = req.body;

  const employeeLogs = checkHistory[employeeName];
  if (employeeLogs && employeeLogs.length > 0) {
    const lastLog = employeeLogs[employeeLogs.length - 1];
    if (!lastLog.checkOutTime) {
      lastLog.checkOutTime = checkOutTime;
      return res.status(200).json({ message: "Check-Out recorded." });
    }
  }

  res.status(400).json({ message: "No check-in found to check out from." });
};

export const getCheckHistory = (req, res) => {
    const { employeeName } = req.query;
  
    if (!employeeName) {
      return res.status(400).json({ message: "Employee name is required" });
    }
  
    // If history exists, return it
    const history = checkHistory[employeeName] || [];
  
    res.status(200).json(history);
  };
  


export const getCheckStatus = (req, res) => {
    const { employeeName } = req.query;
  
    const checkIn = checkInData[employeeName];
    const checkOut = checkOutData[employeeName];
  
    console.log(`Status requested for: ${employeeName}`);
    console.log(`Check-In: ${checkIn?.time}, Check-Out: ${checkOut?.time}`);
  
    res.status(200).json({
      checkInTime: checkIn?.time || null,
      checkOutTime: checkOut?.time || null,
    });
  };
  
