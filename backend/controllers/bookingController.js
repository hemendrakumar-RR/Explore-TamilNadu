const Booking = require("../models/Booking");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");
const generateTicket = require("../utils/generateTicket");

// =========================
// Create Booking
// =========================
exports.createBooking = async (req, res) => {
    try {

        console.log("===== CREATE BOOKING =====");
        console.log(req.body);

        const booking = await Booking.create({
            user: req.user.id,
            destination: req.body.destination,
            places: req.body.places,
            hotel: req.body.hotel,
            transport: req.body.transport,
            amount: req.body.amount,
            paymentId: req.body.paymentId,
            paymentStatus: req.body.paymentStatus
        });

        // Get logged-in user
        const user = await User.findById(req.user.id);

        // Generate PDF Ticket
        const pdfPath = await generateTicket(booking, user);

        // Save PDF path
        booking.ticketPath = pdfPath;
        await booking.save();

        // Send response immediately
        res.status(201).json({
            success: true,
            message: "Booking Created Successfully",
            booking
        });

        // Send email in background
        sendEmail({
            email: user.email,
            subject: "Your Booking is Confirmed - Explore Tamil Nadu",
            message: `
                <h2>Hello ${user.fullName},</h2>

                <p>Your booking has been confirmed successfully.</p>

                <p><strong>Destination:</strong> ${booking.destination}</p>

                <p><strong>Hotel:</strong> ${booking.hotel}</p>

                <p><strong>Transport:</strong> ${booking.transport}</p>

                <p><strong>Amount Paid:</strong> ₹${booking.amount}</p>

                <p>Your ticket is attached with this email.</p>

                <br>

                <strong>Thank you for choosing Explore Tamil Nadu ❤️</strong>
            `,
            attachments: [
                {
                    filename: "ExploreTamilNadu-Ticket.pdf",
                    path: pdfPath
                }
            ]
        }).catch(err => {
            console.error("Booking email failed:", err);
        });

    } catch (error) {

        console.error("BOOKING ERROR:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// =========================
// Get My Bookings
// =========================
exports.getMyBookings = async (req, res) => {

    try {

        const bookings = await Booking.find({
            user: req.user.id
        }).sort({
            createdAt: -1
        });

        res.json({
            success: true,
            bookings
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};
const path = require("path");
const fs = require("fs");

exports.downloadTicket = async (req, res) => {
    try {

        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        // Security: only the booking owner can download
        if (booking.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Access denied"
            });
        }

        if (!booking.ticketPath || !fs.existsSync(booking.ticketPath)) {
            return res.status(404).json({
                success: false,
                message: "Ticket not found"
            });
        }

        res.download(
            booking.ticketPath,
            "ExploreTamilNadu-Ticket.pdf"
        );

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};