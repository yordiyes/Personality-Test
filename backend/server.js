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

  console.log(IE_norm, SN_norm, FT_norm, JP_norm); // Debugging output
  return {
    IE: IE_norm,
    SN: SN_norm,
    FT: FT_norm,
    JP: JP_norm,
  };
}

function calculateScores2(answers) {
  const Q = answers; // Array of answers

  // Calculate raw scores based on question assignments
  const IE_raw = 21 + Q[1] - Q[2] + Q[3] - Q[4] + Q[5] - Q[6] - Q[7];
  const SN_raw = 21 + Q[8] - Q[9] + Q[10] - Q[11] + Q[12] - Q[13] - Q[14];
  const FT_raw = 21 - Q[15] + Q[16] - Q[17] + Q[18] - Q[19] + Q[20] + Q[21];
  const JP_raw = 21 + Q[22] - Q[23] + Q[24] - Q[25] + Q[26] - Q[27] - Q[28];


  // Normalize scores to range [-2, 2]
  const normalize = (score) => (score - 21) / 10.5;

  const IE = normalize(IE_raw);
  const SN = normalize(SN_raw);
  const FT = normalize(FT_raw);
  const JP = normalize(JP_raw);


  console.log(IE, SN, FT, JP); // Debugging output
  return {
    IE,
    SN,
    FT,
    JP,
  };
}

function calculateAverage() {
  if (!result1 || !result2) {
    return { error: "Scores not available. Please submit both tests first." };
  }

  const IE = ((result1.IE + result2.IE) / 2).toFixed(2);
  const SN = ((result1.SN + result2.SN) / 2).toFixed(2);
  const FT = ((result1.FT + result2.FT) / 2).toFixed(2);
  const JP = ((result1.JP + result2.JP) / 2).toFixed(2);

  console.log(IE, SN, FT, JP); // Debugging output
  return {
    IE,
    SN,
    FT,
    JP,
    personality:
      (IE > 0 ? "E" : "I") +
      (SN > 0 ? "N" : "S") +
      (FT > 0 ? "T" : "F") +
      (JP > 0 ? "P" : "J"),
  };
}


// POST endpoint to receive answers and return the calculated scores and personality type.
app.post("/api/score", (req, res) => {
  const answers = req.body.answers;
  if (!answers || Object.keys(answers).length !== 32) {
    return res.status(400).json({ error: "Please provide all 32 answers." });
  }
  result1 = calculateScores(answers);
  res.json({ message: "Score 1 calculated", result: result1 });
});

app.post("/api/score2", (req, res) => {
  const answers = req.body.answers;
  if (!answers || Object.keys(answers).length !== 28) {
    return res.status(400).json({ error: "Please provide all 28 answers." });
  }
  result2 = calculateScores2(answers);
  res.json({ message: "Score 2 calculated", result: result2 });
});


app.get("/api/result", (req, res) => {
  const results = calculateAverage();
  res.json(results);
});
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
