const express = require("express");
const router = express.Router();
const { handleMockInterview } = require("../controllers/mockController");

router.post("/mock-interview", handleMockInterview);

module.exports = router;
