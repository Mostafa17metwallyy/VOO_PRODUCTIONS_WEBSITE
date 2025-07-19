import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    projectType: { type: String, required: true },
    message: { type: String, required: true },
    source: { type: String, default: "homepage" } // ✅ Added source tracking
  },
  { timestamps: true }
);

export default mongoose.model("Contact", ContactSchema);
