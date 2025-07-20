import Film from "../schemas/Film.js";

// ✅ Add new film (Admin)
export const createFilm = async (req, res) => {
  try {
    const { title, description, rating, posterUrl, trailerUrl } = req.body;

    if (!title || !description || !rating || !posterUrl || !trailerUrl) {
      return res.status(400).json({ success: false, message: "All fields required" });
    }

    const newFilm = new Film({ title, description, rating, posterUrl, trailerUrl });
    await newFilm.save();

    return res.status(201).json({ success: true, message: "Film added successfully!" });
  } catch (error) {
    console.error("❌ Error adding film:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Get all films
export const getAllFilms = async (req, res) => {
  try {
    const films = await Film.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: films });
  } catch (error) {
    console.error("❌ Error fetching films:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
