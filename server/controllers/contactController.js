import Contact from "../schemas/Contact.js";

export const createContact = async (req, res) => {
  try {
    const { name, email, projectType, message, source } = req.body;

    if (!name || !email || !projectType || !message) {
      return res.status(400).json({ success: false, message: "All fields required" });
    }

    const newContact = new Contact({
      name,
      email,
      projectType,
      message,
      source: source || "unknown" // ✅ Track where it came from
    });

    await newContact.save();

    res.status(201).json({ success: true, message: "Message saved successfully" });
  } catch (error) {
    console.error("Error saving contact:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
