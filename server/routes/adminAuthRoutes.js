import express from "express";
import { signupAdmin, loginAdmin } from "../controllers/adminAuthController.js";

const router = express.Router();

// Only for creating first admin
router.post("/signup", signupAdmin);

// Admin login
router.post("/login", loginAdmin);

export default router;
