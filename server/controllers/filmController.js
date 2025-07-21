import Film from "../schemas/Film.js";

// ✅ Create/Add new film (Admin)
export const createFilm = async (req, res) => {
  try {
    const { title, description, rating, posterUrl, trailerUrl } = req.body;

    // ✅ Validate required fields
    if (!title || !description || !rating || !posterUrl || !trailerUrl) {
      return res
        .status(400)
        .json({ success: false, message: "All fields required" });
    }

    // ✅ Create new film
    const newFilm = new Film({
      title,
      description,
      rating,
      posterUrl,
      trailerUrl,
    });

    await newFilm.save();

    return res.status(201).json({
      success: true,
      message: "✅ Film added successfully!",
      data: newFilm,
    });
  } catch (error) {
    console.error("❌ Error adding film:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error while adding film" });
  }
};

// ✅ Get all films
export const getAllFilms = async (req, res) => {
  try {
    const films = await Film.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      data: films,
    });
  } catch (error) {
    console.error("❌ Error fetching films:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error while fetching films" });
  }
};

// ✅ Update a film by ID
export const updateFilm = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Find and update film
    const updatedFilm = await Film.findByIdAndUpdate(id, req.body, {
      new: true, // return updated document
      runValidators: true, // validate before saving
    });

    if (!updatedFilm) {
      return res
        .status(404)
        .json({ success: false, message: "Film not found" });
    }

    return res.json({
      success: true,
      message: "✅ Film updated successfully",
      data: updatedFilm,
    });
  } catch (error) {
    console.error("❌ Error updating film:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error while updating film" });
  }
};

// ✅ Delete a film by ID
export const deleteFilm = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Find and delete film
    const deletedFilm = await Film.findByIdAndDelete(id);

    if (!deletedFilm) {
      return res
        .status(404)
        .json({ success: false, message: "Film not found" });
    }

    return res.json({
      success: true,
      message: "✅ Film deleted successfully",
    });
  } catch (error) {
    console.error("❌ Error deleting film:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error while deleting film" });
  }
};
