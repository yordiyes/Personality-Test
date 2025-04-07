const express = require('express');
const router = express.Router();
const {
  calculateBigFive,
  getBigFiveResult
} = require('../controllers/bigfiveController');

// POST endpoint for calculations
router.post('/submit', calculateBigFive);

// GET endpoint for results
router.get('/results', getBigFiveResult);

module.exports = router;