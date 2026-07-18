const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendEmail = async (options) => {
    try {

        console.log("📨 Sending Email...");

        const info = await transporter.sendMail({
            from: `"Explore Tamil Nadu" <${process.env.EMAIL_USER}>`,
            to: options.email,
            subject: options.subject,
            html: options.message,
            attachments: options.attachments || []
        });

        console.log("✅ Email Sent");
        console.log(info.messageId);

    } catch (err) {
        console.error(err);
        throw err;
    }
};

module.exports = sendEmail;