import express from "express";
import {
  createAdvertising,
  getAllAdvertising,
  updateAdvertising,
  deleteAdvertising,
} from "../controllers/advertisingController.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js"; // you already have this

const router = express.Router();

// Public
router.get("/", getAllAdvertising);

// Admin-only
router.post("/", verifyAdmin, createAdvertising);
router.put("/:id", verifyAdmin, updateAdvertising);
router.delete("/:id", verifyAdmin, deleteAdvertising);

export default router;
