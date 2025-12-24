import mongoose, { Schema, models } from "mongoose";

const bookingSchema = new Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },
    packageTitle: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Pending", // Pending, Confirmed, Cancelled
    },
  },
  { timestamps: true }
);

const Booking = models.Booking || mongoose.model("Booking", bookingSchema);
export default Booking;