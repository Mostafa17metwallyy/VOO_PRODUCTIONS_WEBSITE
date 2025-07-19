import express from "express";
import { saveContactMessage, getAllMessages } from "../controllers/contactController.js";

const router = express.Router();

// POST - Save contact form submission
router.post("/", saveContactMessage);

// GET - Fetch all submissions (admin)
router.get("/", getAllMessages);

export default router;
