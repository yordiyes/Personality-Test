const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
let result1 = 0;
let result2 = 0;
// Scoring function for the OEJTS test with normalized results (-2 to 2)
function calculateScores(answers) {
  // 'answers' is expected to be an object where keys are question numbers (1 to 32)
  // and values are the selected numbers (from 1 to 5)
  const Q = answers;

  // Original raw scores based on the provided formula
  const IE = 30 - Q[3] - Q[7] - Q[11] + Q[15] - Q[19] + Q[23] + Q[27] - Q[31];
  const SN = 12 + Q[4] + Q[8] + Q[12] + Q[16] + Q[20] - Q[24] - Q[28] + Q[32];
  const FT = 30 - Q[2] + Q[6] + Q[10] - Q[14] - Q[18] + Q[22] - Q[26] - Q[30];
  const JP = 18 + Q[1] + Q[5] - Q[9] + Q[13] - Q[17] + Q[21] - Q[25] + Q[29];

  // The raw scores for each dimension range from 8 to 40, with a midpoint at 24.
  // We'll normalize them using a linear transformation so that:
  // 8 maps to -2, 24 maps to 0, and 40 maps to 2.
  const normalize = (score) => (score - 24) / 8;
  const IE_norm = normalize(IE);
  const SN_norm = normalize(SN);
  const FT_norm = normalize(FT);
  const JP_norm = normalize(JP);

  // Determine personality type based on normalized score (0 threshold)
  const IEType = IE_norm > 0 ? "E" : "I";
  const SNType = SN_norm > 0 ? "N" : "S";
  const FTType = FT_norm > 0 ? "T" : "F";
  const JPType = JP_norm > 0 ? "P" : "J";

  return {
    IE: IE_norm,
    SN: SN_norm,
    FT: FT_norm,
    JP: JP_norm,
    personality: IEType + SNType + FTType + JPType,
  };
}

function calculateScores2(answers) {
  const Q = answers; // Array of answers

  // Calculate raw scores based on question assignments
  const IE_raw = 21 + Q[0] - Q[1] + Q[2] - Q[3] + Q[4] - Q[5] - Q[6];
  const SN_raw = 21 + Q[7] - Q[8] + Q[9] - Q[10] + Q[11] - Q[12] - Q[13];
  const FT_raw = 21 - Q[14] + Q[15] - Q[16] + Q[17] - Q[18] + Q[19] + Q[20];
  const JP_raw = 21 + Q[21] - Q[22] + Q[23] - Q[24] + Q[25] - Q[26] - Q[27];

  // Normalize scores to range [-2, 2]
  const normalize = (score) => (score - 21) / 10.5;

  const IE = normalize(IE_raw);
  const SN = normalize(SN_raw);
  const FT = normalize(FT_raw);
  const JP = normalize(JP_raw);

  // Determine personality type
  const IEType = IE > 0 ? "E" : "I";
  const SNType = SN > 0 ? "N" : "S";
  const FTType = FT > 0 ? "T" : "F";
  const JPType = JP > 0 ? "P" : "J";

  console.log(IE, SN, FT, JP); // Debugging output

  return {
    IE,
    SN,
    FT,
    JP,
    personality: IEType + SNType + FTType + JPType,
  };
}

function calculateAverage() {
  const score = calculateScores();
  const score2 = calculateScores2();
  const IE = (score.IE + score2.IE) / 2;
  const SN = (score.SN + score2.SN) / 2;
  const FT = (score.FT + score2.FT) / 2;
  const JP = (score.JP + score2.JP) / 2;
  // Determine personality type
  const IEType = IE > 0 ? "E" : "I";
  const SNType = SN > 0 ? "N" : "S";
  const FTType = FT > 0 ? "T" : "F";
  const JPType = JP > 0 ? "P" : "J";

  console.log(IE, SN, FT, JP); // Debugging output

  return {
    IE,
    SN,
    FT,
    JP,
    personality: IEType + SNType + FTType + JPType,
  };
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
  result1 = calculateScores(answers);
});

app.post("/api/score2", (req, res) => {
  const answers = req.body.answers;
  // Verify that all 28 answers are provided.
  if (!answers || Object.keys(answers).length !== 28) {
    return res
      .status(400)
      .json({ error: "Please provide answers for all 28 questions." });
  }
  result2 = calculateScores2(answers);
});

app.get("/api/result", (req, res) => {
  const results = calculateAverage();
  res.json(results);
});
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
