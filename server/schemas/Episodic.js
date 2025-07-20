import mongoose from "mongoose";

const episodicSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true, min: 0, max: 10 },
    posterUrl: { type: String, required: true },
    trailerUrl: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Episodic", episodicSchema);
