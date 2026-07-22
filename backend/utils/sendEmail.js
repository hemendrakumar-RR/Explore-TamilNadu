const axios = require("axios");
const fs = require("fs");

const sendEmail = async (options) => {
    try {

        console.log("📨 Sending Email via Brevo...");
        console.log("To:", options.email);

        const emailData = {

            sender: {
                name: "Explore Tamil Nadu",
                email: "exploretamilnadu8@gmail.com"
            },

            replyTo: {
                name: "Explore Tamil Nadu",
                email: "exploretamilnadu8@gmail.com"
            },

            to: [
                {
                    email: options.email
                }
            ],

            subject: options.subject,

            htmlContent: options.message

        };

        // Add attachments ONLY if provided
        if (options.attachments && options.attachments.length > 0) {

            emailData.attachment = options.attachments.map(file => ({
                name: file.filename,
                content: fs.readFileSync(file.path).toString("base64")
            }));

        }

        const response = await axios.post(

            "https://api.brevo.com/v3/smtp/email",

            emailData,

            {

                headers: {

                    accept: "application/json",

                    "api-key": process.env.BREVO_API_KEY,

                    "content-type": "application/json"

                }

            }

        );

        console.log("✅ Email Sent Successfully");
        console.log(response.data);

        return response.data;

    } catch (err) {

        console.error("❌ Email Sending Failed");

        if (err.response) {

            console.error("Status:", err.response.status);
            console.error("Response:", err.response.data);

        } else {

            console.error(err.message);

        }

        throw err;

    }
};

module.exports = sendEmail;