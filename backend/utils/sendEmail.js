const axios = require("axios");
const fs = require("fs");

const sendEmail = async (options) => {
    try {

        console.log("📨 Sending Email via Brevo...");

        const attachments = [];

        if (options.attachments?.length) {
            for (const file of options.attachments) {
                attachments.push({
                    name: file.filename,
                    content: fs.readFileSync(file.path).toString("base64")
                });
            }
        }

        const response = await axios.post(
            "https://api.brevo.com/v3/smtp/email",
            {
                sender: {
                    name: "Explore Tamil Nadu",
                    email: "exploretamilnadu8@11694031.brevosend.com"
                },
                replyTo: {
                    email: "exploretamilnadu8@gmail.com"
                },
                to: [
                    {
                        email: options.email
                    }
                ],
                subject: options.subject,
                htmlContent: options.message,
                attachment: attachments
            },
            {
                headers: {
                    "accept": "application/json",
                    "api-key": process.env.BREVO_API_KEY,
                    "content-type": "application/json"
                }
            }
        );

        console.log("✅ Email Sent");
        console.log(response.data);

    } catch (err) {

        if (err.response) {
            console.error("❌ Brevo Error:");
            console.error(err.response.status);
            console.error(err.response.data);
        } else {
            console.error(err.message);
        }

        throw err;
    }
};

module.exports = sendEmail;