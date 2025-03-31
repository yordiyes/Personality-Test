const express = require("express");
const router = express.Router();
const { postResult, getResults } = require("../controllers/riasecController");

// Endpoint to calculate RIASEC personality
router.post("/calculate", postResult);
router.get("/calculate", getResults);

module.exports = router;
