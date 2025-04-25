import mongoose from 'mongoose';

// Mongoose schema for CheckIn/CheckOut logs
const checkInOutSchema = new mongoose.Schema({
  employeeName: String,
  checkInTime: String,
  checkOutTime: String,
}, { timestamps: true });

const CheckInOut = mongoose.model('CheckInOut', checkInOutSchema);

export default CheckInOut;
