// routes/leaveroutes.mjs
import express from 'express';
const router = express.Router();

import { applyLeave } from '../controller/leavecontroller.mjs';
import { verifyToken } from '../middleware/auth.js';  // Import the JWT verification middleware


router.post('/apply', verifyToken, applyLeave);
// router.post('/apply', applyLeave);  
export default router;
