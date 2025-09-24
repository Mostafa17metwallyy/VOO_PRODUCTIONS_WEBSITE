import mongoose from "mongoose";

const advertisingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true, min: 0, max: 10 },
    posterUrl: { type: String, required: true },
    trailerUrl: { type: String, required: true },
    // optional fields (safe defaults)
    category: { type: String, enum: ["tv", "digital", "ooh"], default: "tv" },
    client: { type: String, default: "" },
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model("Advertising", advertisingSchema);
