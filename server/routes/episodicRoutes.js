import express from "express";
import {
  createEpisodic,
  getAllEpisodics,
  updateEpisodic,
  deleteEpisodic,
} from "../controllers/episodicController.js";

const router = express.Router();

router.post("/", createEpisodic);    // ✅ Create
router.get("/", getAllEpisodics);    // ✅ Read all
router.put("/:id", updateEpisodic);  // ✅ Update by ID
router.delete("/:id", deleteEpisodic); // ✅ Delete by ID

export default router;
