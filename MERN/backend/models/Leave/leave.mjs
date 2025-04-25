// leave.mjs
import mongoose from 'mongoose';

const LeaveSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  startDate: String,
  endDate: String,
  leaveType: String,
  reason: String,
  status: { type: String, default: 'Pending' },
});

const Leave = mongoose.model('Leave', LeaveSchema);

export default Leave; // ✅ ES module export
