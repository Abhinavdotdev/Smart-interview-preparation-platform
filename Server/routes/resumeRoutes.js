// routes/resumeRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { analyzeResume } = require("../controllers/resumeController");

// Use in-memory storage (so req.file.buffer works)
const storage = multer.memoryStorage();

// Allow only PDF and DOC/DOCX files
const fileFilter = (req, file, cb) => {
  const allowedTypes = /pdf|doc|docx/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only .pdf, .doc, and .docx files are allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Optional: max 5MB
});

// POST route using in-memory file upload
router.post("/analyze-resume", upload.single("resume"), analyzeResume);

module.exports = router;
