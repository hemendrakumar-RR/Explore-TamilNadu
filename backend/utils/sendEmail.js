const nodemailer = require("nodemailer");
const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendEmail = async (options) => {
    try {

        console.log("📧 Connecting to Gmail...");

        await transporter.verify();

        console.log("✅ Gmail Connected");

        console.log("📨 Sending email...");

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

        console.error("❌ Email Error:");
        console.error(err);

        throw err;
    }
};

module.exports = sendEmail;