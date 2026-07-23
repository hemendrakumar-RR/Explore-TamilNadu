const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    createBooking,
    getMyBookings,
    downloadTicket
} = require("../controllers/bookingController");

// Create Booking
router.post("/", authMiddleware, createBooking);

// Get My Bookings
router.get("/my", authMiddleware, getMyBookings);

// Download Ticket
router.get("/:id/ticket", authMiddleware, downloadTicket);

module.exports = router;