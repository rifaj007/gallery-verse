// models/Image.ts
import mongoose, { Schema, models } from "mongoose";

const ImageSchema = new Schema(
  {
    url: { type: String, required: true },
    title: { type: String },
    tag: { type: String },
  },
  { timestamps: true }
);

const Image = models.Image || mongoose.model("Image", ImageSchema);
export default Image;
