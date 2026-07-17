const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        console.log("Connecting to MongoDB...");
        console.log("URI:", process.env.MONGODB_URI);

        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000
        });

        console.log("✅ MongoDB Connected Successfully");
        console.log("Database:", conn.connection.name);

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectDB;