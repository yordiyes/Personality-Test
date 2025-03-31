const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const MBTI_Descriptions = require("./src/data/descriptions");

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

  // console.log(IE_norm, SN_norm, FT_norm, JP_norm); // Debugging output
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

  // console.log(IE, SN, FT, JP); // Debugging output
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

  const personality =
    (IE > 0 ? "E" : "I") +
    (SN > 0 ? "N" : "S") +
    (FT > 0 ? "T" : "F") +
    (JP > 0 ? "P" : "J");

  return {
    IE,
    SN,
    FT,
    JP,
    personality,
    description: MBTI_Descriptions[personality] || "Unknown personality type",
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

//alphabatical orderd types
const enneagramTypes = {
  A: "The Reformer",
  B: "The Helper",
  C: "The Achiever",
  D: "The Individualist",
  E: "The Investigator",
  F: "The Loyalist",
  G: "The Enthusiast",
  H: "The Challenger",
  I: "The Peacemaker",
};

// POST route to calculate the result based on answers
let sortedScores = [];

app.post("/api/submit", (req, res) => {
  const answers = req.body.answers; // Answers from the frontend (array of objects)

  // Initialize scores for each Enneagram type
  const scores = Object.keys(enneagramTypes).reduce((acc, type) => {
    acc[type] = 0; // Start all types with a score of 0
    return acc;
  }, {});

  // Calculate the score for each Enneagram type
  answers.forEach((answer) => {
    const { type, answer: score } = answer; // Destructure answer object
    if (enneagramTypes[type]) {
      scores[type] += score; // Add the answer score to the corresponding type's score
    }
  });

  // Sort the scores from highest to lowest and include the type name
  sortedScores = Object.keys(scores)
    .map((type) => ({
      typeName: enneagramTypes[type], // Add the type name
      type: type, // The type code (e.g., "A")
      score: scores[type], // The score for the type
    }))
    .sort((a, b) => b.score - a.score); // Sort in descending order of score

  // Send a confirmation response
  res.status(200).json({ message: "Result calculated successfully" });
});

// GET route to fetch sorted scores
app.get("/api/scores", (req, res) => {
  if (sortedScores.length > 0) {
    res.json(sortedScores); // Send the sorted scores if available
  } else {
    res
      .status(404)
      .json({ message: "Scores not found. Please submit the answers first." });
  }
});

// Corrected Mapping of questions to RIASEC categories
const questionMapping = {
  R: [1, 7, 14, 22, 30, 32, 37],
  I: [2, 11, 18, 21, 26, 33, 39],
  A: [3, 8, 17, 23, 27, 31, 41],
  S: [4, 12, 13, 20, 28, 34, 40],
  E: [5, 10, 16, 19, 29, 36, 42],
  C: [6, 9, 15, 24, 25, 35, 38],
};

// Endpoint to calculate RIASEC personality
app.post("/calculate", (req, res) => {
  const { answers } = req.body;

  if (!Array.isArray(answers) || answers.length !== 42) {
    return res.status(400).json({
      error: "Invalid input. Please provide answers for all 42 questions.",
    });
  }

  // Initialize scores
  let scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };

  // Calculate scores based on answers
  Object.entries(questionMapping).forEach(([type, questions]) => {
    questions.forEach((q) => {
      if (answers[q - 1] === true) {
        // Ensure correct boolean check
        scores[type] += 1;
      }
    });
  });

  // Sort and get top 3 personality types
  const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const topThree = sortedScores.slice(0, 3).map((item) => item[0]);

  res.json({ personality: topThree });
});

// Start the server
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
