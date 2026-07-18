const axios = require("axios");

const sendEmail = async (options) => {
    try {

        console.log("Sending Email via Brevo API...");

        const attachments = [];

        if (options.attachments && options.attachments.length > 0) {
            const fs = require("fs");

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
                    "api-key": process.env.BREVO_API_KEY,
                    "Content-Type": "application/json"
                }
            }
        );

        console.log("✅ Email Sent");
        console.log(response.data);

    } catch (err) {
        console.error("Status:", err.response?.status);
        console.error("Data:", err.response?.data);
        console.error("Message:", err.message);
        throw err;
    }
};

module.exports = sendEmail;