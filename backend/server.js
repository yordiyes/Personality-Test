const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("./src/middleware/cors");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors);
// Scoring function for the OEJTS test.
function calculateScores(answers) {
  // 'answers' is expected to be an object where keys are question numbers (1 to 32)
  // and values are the selected numbers (1-5)
  const Q = answers;
  const IE = 30 - Q[3] - Q[7] - Q[11] + Q[15] - Q[19] + Q[23] + Q[27] - Q[31];
  const SN = 12 + Q[4] + Q[8] + Q[12] + Q[16] + Q[20] - Q[24] - Q[28] + Q[32];
  const FT = 30 - Q[2] + Q[6] + Q[10] - Q[14] - Q[18] + Q[22] - Q[26] - Q[30];
  const JP = 18 + Q[1] + Q[5] - Q[9] + Q[13] - Q[17] + Q[21] - Q[25] + Q[29];

  const IEType = IE > 24 ? "E" : "I";
  const SNType = SN > 24 ? "N" : "S";
  const FTType = FT > 24 ? "T" : "F";
  const JPType = JP > 24 ? "P" : "J";

  return { IE, SN, FT, JP, personality: IEType + SNType + FTType + JPType };
}

// POST endpoint to receive answers and return the calculated scores and personality type.
app.post("/api/score", (req, res) => {
  const answers = req.body.answers;
  // Verify that all 32 answers are provided.
  if (!answers || Object.keys(answers).length !== 32) {
    return res
      .status(400)
      .json({ error: "Please provide answers for all 32 questions." });
  }
  const result = calculateScores(answers);
  res.json(result);
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
