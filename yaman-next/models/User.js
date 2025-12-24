import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // No duplicate emails allowed
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt automatically
);

const User = models.User || mongoose.model("User", userSchema);
export default User;