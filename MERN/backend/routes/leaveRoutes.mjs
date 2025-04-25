import express from 'express';
import { applyLeave } from '../controller/leavecontroller.mjs';
// import { verifyToken } from '../middleware/auth.js'; // adjust the path if needed

const router = express.Router();

// router.post('/apply', verifyToken, applyLeave);
// try removing verifyToken if you suspect JWT is causing issues
router.post('/apply', applyLeave);

export default router;
