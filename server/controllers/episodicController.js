import Episodic from "../schemas/Episodic.js";

// ✅ Add new episodic
export const createEpisodic = async (req, res) => {
  try {
    const { title, description, rating, posterUrl, trailerUrl } = req.body;

    if (!title || !description || !rating || !posterUrl || !trailerUrl) {
      return res.status(400).json({ success: false, message: "All fields required" });
    }

    const newEpisodic = new Episodic({ title, description, rating, posterUrl, trailerUrl });
    await newEpisodic.save();

    return res.status(201).json({ success: true, message: "Episodic added successfully!" });
  } catch (error) {
    console.error("❌ Error adding episodic:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Get all episodics
export const getAllEpisodics = async (req, res) => {
  try {
    const episodics = await Episodic.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: episodics });
  } catch (error) {
    console.error("❌ Error fetching episodics:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
