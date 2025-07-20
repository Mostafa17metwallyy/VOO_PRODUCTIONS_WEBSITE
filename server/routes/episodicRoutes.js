import express from "express";
import { createEpisodic, getAllEpisodics } from "../controllers/episodicController.js";

const router = express.Router();

router.post("/", createEpisodic);  // Admin adds episodic
router.get("/", getAllEpisodics);  // Users fetch all episodics

export default router;
