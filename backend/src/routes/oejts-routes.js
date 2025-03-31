const express = require("express");
const router = express.Router();
const {
  postScores2,
  postResult,
  postScores1,
} = require("../controllers/oejtsController");

// POST endpoint to receive answers and return the calculated scores and personality type.
router.post("/score", postScores1);

router.post("/score2", postScores2);

router.get("/result", postResult);

module.exports = router;
