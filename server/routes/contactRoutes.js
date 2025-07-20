import express from "express";
import {
  getAllMessages,
  createContact,
} from "../controllers/contactController.js";

const router = express.Router();

// POST - Save contact form submission
router.post("/", createContact);

// GET - Fetch all submissions (admin)
router.get("/", getAllMessages);

export default router;
