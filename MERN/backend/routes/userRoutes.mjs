import express from "express";
const router = express.Router();
import tokenVerification from "../Middleware/tokenVerification.mjs";
import { createUser, getAllUsers, updateUser, deleteUser, login, getLoggedInUser,isEmployee } from "../controller/userController.mjs";

router.get("/user",tokenVerification, getAllUsers);
router.post("/user", createUser);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);
router.post("/user/login", login);
router.get("/user/me", tokenVerification, getLoggedInUser); // Fetch logged-in user's details
router.get('/isEmployee', tokenVerification, isEmployee);



export default router;