import mongoose, { Schema } from "mongoose";

const destinationSchema = new Schema(
  {
    name: String,
    image: String,
    description: String,
    tag: String,
  },
  {
    timestamps: true, // This adds createdAt and updatedAt automatically
  }
);

const Destination = mongoose.models.Destination || mongoose.model("Destination", destinationSchema);

export default Destination;