const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const mockRoutes = require("./routes/mockRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const selectionRoutes = require("./routes/selectionRoutes");
const resumeRoutes = require("./routes/resumeRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", feedbackRoutes);
app.use("/api/mock", mockRoutes);
app.use("/api", resumeRoutes);
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use("/api/resume", resumeRoutes);
app.use("/api", selectionRoutes);

app.use("/api/auth", require("./routes/authRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

