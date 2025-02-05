require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const ExerciseRoute=require("./routes/exercise.js");
const UserRoute=require("./routes/user.js");
const app = express();
const PORT = process.env.PORT || 3000;
const dbURL = process.env.ATLASDB_URL;

console.log("🚀 Server file is running...");

// ✅ Fix CORS Policy
const corsConfig = {
    origin: ["https://full-stack-desk-fit.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(cors(corsConfig));
app.use(express.json());

// ✅ Properly Handle MongoDB Connection Errors
async function connectDB() {
    try {
        await mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("✅ Connected with MongoDB");
    } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error.message);
    }
}
connectDB();

app.use("/",ExerciseRoute);
app.use("/user",UserRoute);


// // ✅ Define Routes
// app.get("/", (req, res) => {
//     res.send("✅ Backend is running successfully!");
// });

// // ✅ Handle 404 Errors
// app.use((req, res) => {
//     res.status(404).json({ error: "Not Found" });
// });

// ✅ Handle Internal Server Errors (Prevents Crashes)
app.use((err, req, res, next) => {
    console.error("❌ Internal Server Error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
});

// ✅ Export for Vercel (No `app.listen()`)
module.exports = app;
