import mongoose from 'mongoose';
const LeaveSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  startDate: String,
  endDate: String,
  leaveType: String,
  reason: String,
  status: { type: String, default: 'Pending' },
});

module.exports = mongoose.model('Leave', LeaveSchema);
