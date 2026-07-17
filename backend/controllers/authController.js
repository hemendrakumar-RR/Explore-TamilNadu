const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

// Register User
exports.register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });
    
    // Send Welcome Email
    try {
      await sendEmail({
        email: user.email,
        subject: "Welcome to Explore Tamil Nadu 🌴",
        message: `
          <div style="font-family:Arial,sans-serif;background:#f4f4f4;padding:30px;">
            <div style="max-width:600px;margin:auto;background:#fff;border-radius:10px;">
              <div style="background:#0d6efd;padding:20px;text-align:center;">
                <h1 style="color:#fff;">Explore Tamil Nadu</h1>
              </div>
    
              <div style="padding:30px;">
                <h2>Hello ${user.fullName}, 👋</h2>
    
                <p>Welcome to <strong>Explore Tamil Nadu</strong>.</p>
    
                <p>Your account has been created successfully.</p>
    
                <p>We hope you enjoy discovering amazing destinations across Tamil Nadu.</p>
    
                <hr>
    
                <p>Happy Travelling ❤️</p>
    
                <strong>Explore Tamil Nadu Team</strong>
              </div>
            </div>
          </div>
        `,
      });
    } catch (emailError) {
      console.error("Welcome email failed:", emailError);
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

// Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Email",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
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
    // Send Login Notification Email
try {
  const loginDate = new Date();

  await sendEmail({
    email: user.email,
    subject: "New Login to Your Explore Tamil Nadu Account",
    message: `
      <div style="font-family:Arial,sans-serif;background:#f4f4f4;padding:30px;">
        <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:10px;overflow:hidden;">

          <div style="background:#0d6efd;padding:20px;text-align:center;">
            <h1 style="color:#ffffff;margin:0;">Explore Tamil Nadu</h1>
          </div>

          <div style="padding:30px;">

            <h2>Hello ${user.fullName}, 👋</h2>

            <p>Your account has been logged in successfully.</p>

            <table style="width:100%;border-collapse:collapse;margin:20px 0;">
              <tr>
                <td style="padding:8px;"><strong>Email</strong></td>
                <td style="padding:8px;">${user.email}</td>
              </tr>

              <tr>
                <td style="padding:8px;"><strong>Date</strong></td>
                <td style="padding:8px;">${loginDate.toLocaleDateString()}</td>
              </tr>

              <tr>
                <td style="padding:8px;"><strong>Time</strong></td>
                <td style="padding:8px;">${loginDate.toLocaleTimeString()}</td>
              </tr>
            </table>

            <p>
              If this login was you, no further action is required.
            </p>

            <p style="color:red;">
              If you did NOT log in, please change your password immediately.
            </p>

            <hr>

            <p>Thank you for using Explore Tamil Nadu.</p>

            <strong>Explore Tamil Nadu Team</strong>

          </div>

        </div>
      </div>
    `,
  });

} catch (emailError) {
  console.error("Login email failed:", emailError);
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