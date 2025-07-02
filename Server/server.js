const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

dotenv.config();
connectDB();
console.log('MONGO_URI from .env:', process.env.MONGO_URI);


const app = express();

// ✅ CORS
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// ✅ Body parser
app.use(express.json());

// ✅ Route imports
const mockRoutes = require("./routes/mockRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const selectionRoutes = require("./routes/selectionRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const authRoutes = require("./routes/authRoutes");
const answerRoutes = require("./routes/answerRoutes");  // ✅ import added
const geminiRoutes = require("./routes/geminiRoutes");


// ✅ Route registrations
app.use("/api/mock", mockRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/selection", selectionRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/answers", answerRoutes); // ✅ route added
app.use("/api/gemini", geminiRoutes);


// ✅ Root status check (optional)
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
