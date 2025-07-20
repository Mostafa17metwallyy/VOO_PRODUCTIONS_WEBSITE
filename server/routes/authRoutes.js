import express from "express";
import { loginAdmin, seedAdmin } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.get("/seed", seedAdmin); // only first time

export default router;
