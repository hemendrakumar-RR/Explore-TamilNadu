const { Resend } = require("resend");
const fs = require("fs");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (options) => {
    try {

        console.log("📨 Sending Email via Resend...");

        const attachments = [];

        if (options.attachments && options.attachments.length > 0) {
            for (const file of options.attachments) {
                attachments.push({
                    filename: file.filename,
                    content: fs.readFileSync(file.path)
                });
            }
        }

        const { data, error } = await resend.emails.send({
            from: "Explore Tamil Nadu <onboarding@resend.dev>",
            to: options.email,
            subject: options.subject,
            html: options.message,
            attachments
        });

        if (error) {
            console.error(error);
            throw new Error(error.message);
        }

        console.log("✅ Email Sent");
        console.log(data);

    } catch (err) {
        console.error(err);
        throw err;
    }
};

module.exports = sendEmail;