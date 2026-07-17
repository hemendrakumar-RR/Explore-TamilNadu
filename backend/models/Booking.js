const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    destination: {
      type: String,
      required: true,
    },

    places: [
      {
        name: {
          type: String,
        },
        tickets: {
          type: Number,
        },
      },
    ],

    hotel: {
      type: String,
      required: true,
    },

    transport: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    // NEW: Payment ID
    paymentId: {
      type: String,
      default: "",
    },

    // NEW: Payment Status
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Paid",
    },

    bookingDate: {
      type: Date,
      default: Date.now,
    },

    // Booking Status
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled"],
      default: "Confirmed",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", bookingSchema);