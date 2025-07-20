import express from "express";
import { createFilm, getAllFilms } from "../controllers/filmController.js";

const router = express.Router();

router.post("/", createFilm); // Admin adds film
router.get("/", getAllFilms); // Users fetch all films

export default router;
