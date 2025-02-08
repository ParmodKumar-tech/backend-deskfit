const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const ExerciseRoute = require("./routes/exercise");  // ✅ Ensure correct import
const UserRoute = require("./routes/user");  // ✅ Ensure correct import

const app = express();
const PORT = process.env.PORT || 3000;
const dbURL = process.env.ATLASDB_URL;

console.log("🚀 Server file is running...");

// ✅ Fix CORS Policy (Allow Frontend)
app.use(cors({
    origin: ["https://full-stack-desk-fit.vercel.app"],  // ✅ Your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());  // ✅ Enable JSON parsing

// ✅ Properly Handle MongoDB Connection Errors
async function connectDB() {
    try {
        await mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("✅ Connected with MongoDB");
    } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error.message);
        process.exit(1);  // ✅ Exit process if MongoDB connection fails
    }
}
connectDB();

// ✅ Define Routes
app.use("/api/exercise", ExerciseRoute);  // ✅ Fix missing route
app.use("/api/user", UserRoute);  // ✅ Fix missing route

app.get("/", (req, res) => {
    res.send("✅ Backend is running successfully!");
});

// ✅ Handle 404 Errors
app.use((req, res) => {
    res.status(404).json({ error: "Not Found" });
});

// ✅ Handle Internal Server Errors (Prevents Crashes)
app.use((err, req, res, next) => {
    console.error("❌ Internal Server Error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
});

// ✅ Export for Vercel (No `app.listen()`)
module.exports = app;
