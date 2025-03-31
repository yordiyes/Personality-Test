const express = require("express");
const router = express.Router();
const { postResult } = require("../controllers/riasecController");

// Endpoint to calculate RIASEC personality
router.post("/calculate", postResult);

module.exports = router;
