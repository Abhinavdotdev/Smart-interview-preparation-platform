const express = require("express");
const router = express.Router();
const { predictSelection } = require("../controllers/selectionController");

router.post("/predict-selection", predictSelection);

module.exports = router;
