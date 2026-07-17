const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const generateTicket = (booking, user) => {
  return new Promise((resolve, reject) => {
    try {
      // Create tickets folder if it doesn't exist
      const ticketsDir = path.join(__dirname, "../tickets");

      if (!fs.existsSync(ticketsDir)) {
        fs.mkdirSync(ticketsDir);
      }

      // PDF file name
      const fileName = `Ticket-${booking._id}.pdf`;
      const filePath = path.join(ticketsDir, fileName);

      const doc = new PDFDocument({
        margin: 50,
        size: "A4",
      });

      const stream = fs.createWriteStream(filePath);

      doc.pipe(stream);

      // ===========================
      // HEADER
      // ===========================
      doc
        .fontSize(24)
        .fillColor("#0d6efd")
        .text("Explore Tamil Nadu", {
          align: "center",
        });

      doc.moveDown();

      doc
        .fontSize(18)
        .fillColor("black")
        .text("BOOKING TICKET", {
          align: "center",
        });

      doc.moveDown(2);

      // ===========================
      // CUSTOMER DETAILS
      // ===========================
      doc.fontSize(13);

      doc.text(`Booking ID : ${booking._id}`);
      doc.text(`Customer   : ${user.fullName}`);
      doc.text(`Email      : ${user.email}`);
      doc.text(`Destination: ${booking.destination}`);

      doc.moveDown();

      // ===========================
      // PLACES
      // ===========================
      doc.fontSize(15).text("Places");

      doc.moveDown(0.5);

      booking.places.forEach((place) => {
        doc.fontSize(12).text(`• ${place.name} (${place.tickets} Ticket(s))`);
      });

      doc.moveDown();

      // ===========================
      // HOTEL
      // ===========================
      doc.fontSize(15).text("Hotel");

      doc.fontSize(12).text(booking.hotel);

      doc.moveDown();

      // ===========================
      // TRANSPORT
      // ===========================
      doc.fontSize(15).text("Transport");

      doc.fontSize(12).text(booking.transport);

      doc.moveDown();

      // ===========================
      // PAYMENT
      // ===========================
      doc.fontSize(15).text("Payment");

      doc.fontSize(12).text(`Amount Paid : ₹${booking.amount}`);

      doc.text(
        `Booking Date : ${new Date(
          booking.createdAt
        ).toLocaleDateString()}`
      );

      doc.moveDown(2);

      doc
        .fontSize(14)
        .fillColor("green")
        .text("Thank you for choosing Explore Tamil Nadu!", {
          align: "center",
        });

      doc.end();

      stream.on("finish", () => resolve(filePath));

      stream.on("error", reject);
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = generateTicket;