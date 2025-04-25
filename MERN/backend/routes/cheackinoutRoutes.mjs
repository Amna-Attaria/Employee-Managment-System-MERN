import express from 'express';
import { logCheckIn, logCheckOut, getCheckStatus,getCheckHistory } from '../controller/cheackinOutController.mjs';

const router = express.Router();

// Route to log Check-In
router.post('/checkin', logCheckIn);

// Route to log Check-Out
router.post('/checkout', logCheckOut);

router.get('/history', getCheckHistory);

router.get('/checkstatus', getCheckStatus);
  
export default router;
