const express = require("express");
const router = express.Router();
const { postAnswers, getScore } = require("../controllers/enneagramController");

router.post("/submit", postAnswers);

// GET route to fetch sorted scores
router.get("/scores", getScore);

module.exports = router;
