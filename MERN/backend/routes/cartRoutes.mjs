import express from "express";
const router = express.Router();
import tokenVerification from "../Middleware/tokenVerification.mjs";
import {
  getCart
} from "../controller/cartController.mjs";

router.get("/",tokenVerification,getCart);

export default router