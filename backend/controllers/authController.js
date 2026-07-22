const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

// ================= REGISTER =================
exports.register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    // Welcome Email
    try {
      console.log(" Sending Welcome Email to:", user.email);

      await sendEmail({
        email: user.email,
        subject: "🎉 Welcome to Explore Tamil Nadu",
        message: `
          <div style="font-family:Arial,sans-serif;background:#f5f5f5;padding:30px;">
            <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:10px;overflow:hidden;">

              <div style="background:#0d6efd;padding:20px;text-align:center;">
                <h1 style="color:#fff;margin:0;">
                  Explore Tamil Nadu
                </h1>
              </div>

              <div style="padding:30px;">

                <h2>Hello ${user.fullName}</h2>

                <p>Welcome to <b>Explore Tamil Nadu</b>.</p>

                <p>Your account has been created successfully.</p>

                <p>
                  You can now:
                </p>

                <ul>
                  <li>Explore destinations</li>
                  <li>Book hotels</li>
                  <li>Reserve transport</li>
                  <li>Plan complete trips</li>
                </ul>

                <br>

                <p>Happy Travelling </p>

                <b>Explore Tamil Nadu Team</b>

              </div>

            </div>
          </div>
        `,
      });

      console.log("✅ Welcome Email Sent Successfully");

    } catch (emailError) {

      console.error("❌ Welcome Email Failed");
      console.error(emailError.message);

    }

    res.status(201).json({
      success: true,
      message: "Registration Successful",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// ================= LOGIN =================
exports.login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // Login Email
    try {

      console.log("📧 Sending Login Email to:", user.email);

      const loginDate = new Date();

      await sendEmail({
        email: user.email,
        subject: " Login Alert - Explore Tamil Nadu",
        message: `
          <div style="font-family:Arial,sans-serif;background:#f5f5f5;padding:30px;">

            <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:10px;overflow:hidden;">

              <div style="background:#198754;padding:20px;text-align:center;">
                <h1 style="color:#ffffff;margin:0;">
                  Explore Tamil Nadu
                </h1>
              </div>

              <div style="padding:30px;">

                <h2>Hello ${user.fullName}</h2>

                <p>Your account has been logged in successfully.</p>

                <table style="width:100%;border-collapse:collapse;margin-top:20px;">

                  <tr>
                    <td><b>Email</b></td>
                    <td>${user.email}</td>
                  </tr>

                  <tr>
                    <td><b>Date</b></td>
                    <td>${loginDate.toLocaleDateString()}</td>
                  </tr>

                  <tr>
                    <td><b>Time</b></td>
                    <td>${loginDate.toLocaleTimeString()}</td>
                  </tr>

                </table>

                <br>

                <p>
                  If this login was performed by you, you can safely ignore this email.
                </p>

                <p style="color:red;">
                  If you didn't log in, please change your password immediately.
                </p>

                <br>

                <b>Explore Tamil Nadu Team</b>

              </div>

            </div>

          </div>
        `,
      });

      console.log("✅ Login Email Sent Successfully");

    } catch (emailError) {

      console.error("❌ Login Email Failed");
      console.error(emailError.message);

    }

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};