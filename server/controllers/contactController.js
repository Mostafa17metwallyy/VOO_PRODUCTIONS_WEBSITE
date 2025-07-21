import Contact from "../schemas/Contact.js";

// ✅ Create/Save a new contact message
export const createContact = async (req, res) => {
  try {
    const { name, email, projectType, message, source } = req.body;

    // Basic validation
    if (!name || !email || !projectType || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newContact = new Contact({
      name,
      email,
      projectType,
      message,
      source: source || "unknown", // ✅ Track where it came from
    });

    await newContact.save();

    return res.status(201).json({
      success: true,
      message: "Message saved successfully",
    });
  } catch (error) {
    console.error("❌ Error saving contact:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while saving contact",
    });
  }
};

// ✅ Fetch all saved messages (useful for admin dashboard later)
export const getAllMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 }); // newest first
    return res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    console.error("❌ Error fetching messages:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching messages",
    });
  }
  
};
// ✅ Delete a contact response
export const deleteMessage = async (req, res) => {
  try {
    const deletedMessage = await Contact.findByIdAndDelete(req.params.id);

    if (!deletedMessage) {
      return res.status(404).json({ success: false, message: "Response not found" });
    }

    return res.json({ success: true, message: "Response deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting response:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting response",
    });
  }
};

