import mongoose, { Schema } from "mongoose";

const packageSchema = new Schema(
  {
    title: String,
    image: String,
    description: String,
    price: String,
    duration: String,
    group: String,
  },
  {
    timestamps: true,
  }
);

const Package = mongoose.models.Package || mongoose.model("Package", packageSchema);

export default Package;