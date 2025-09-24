import Advertising from "../schemas/Advertising.js";

// ✅ Create
export const createAdvertising = async (req, res) => {
  try {
    const { title, description, rating, posterUrl, trailerUrl, category, client, order, isPublished } = req.body;

    if (!title || !description || rating == null || !posterUrl || !trailerUrl) {
      return res.status(400).json({ success: false, message: "All fields required" });
    }

    const ad = new Advertising({ title, description, rating, posterUrl, trailerUrl, category, client, order, isPublished });
    await ad.save();

    return res.status(201).json({ success: true, message: "Advertising item added successfully!", data: ad });
  } catch (error) {
    console.error("❌ Error adding advertising:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Read (all)
export const getAllAdvertising = async (req, res) => {
  try {
    const { category, q, published } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (typeof published !== "undefined") filter.isPublished = published === "true";
    if (q) {
      filter.$or = [
        { title: new RegExp(q, "i") },
        { description: new RegExp(q, "i") },
        { client: new RegExp(q, "i") },
      ];
    }

    const items = await Advertising.find(filter).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.error("❌ Error fetching advertising:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Update
export const updateAdvertising = async (req, res) => {
  try {
    const updated = await Advertising.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) return res.status(404).json({ success: false, message: "Advertising item not found" });

    return res.json({ success: true, message: "Advertising updated successfully", data: updated });
  } catch (error) {
    console.error("❌ Error updating advertising:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Delete
export const deleteAdvertising = async (req, res) => {
  try {
    const deleted = await Advertising.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ success: false, message: "Advertising item not found" });

    return res.json({ success: true, message: "Advertising deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting advertising:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
