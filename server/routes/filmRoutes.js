import express from "express";
import {
  createFilm,
  getAllFilms,
  updateFilm,
  deleteFilm,
} from "../controllers/filmController.js";

const router = express.Router();

router.post("/", createFilm);       // ✅ Add new film
router.get("/", getAllFilms);       // ✅ Get all films
router.put("/:id", updateFilm);     // ✅ Update a film by ID
router.delete("/:id", deleteFilm);  // ✅ Delete a film by ID

export default router;
