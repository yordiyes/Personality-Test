const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const mbtiDescriptions = {
  ENTJ: "The Commander: Bold, imaginative, and strong-willed leaders, always finding a way.",
  ENTP: "The Debater: Smart and curious thinkers who love intellectual challenges.",
  ENFJ: "The Protagonist: Charismatic and inspiring leaders, able to mesmerize their audience.",
  ENFP: "The Campaigner: Enthusiastic, creative, and sociable free spirits.",
  ESTJ: "The Executive: Excellent organizers, driven to bring order to chaos.",
  ESTP: "The Entrepreneur: Smart, energetic, and perceptive risk-takers.",
  ESFJ: "The Consul: Extraordinarily caring, social, and popular people.",
  ESFP: "The Entertainer: Spontaneous, energetic, and enthusiastic individuals.",
  INTJ: "The Architect: Imaginative and strategic thinkers with a plan for everything.",
  INTP: "The Logician: Inventive thinkers with an unquenchable thirst for knowledge.",
  INFJ: "The Advocate: Quiet and mystical, yet inspiring and tireless idealists.",
  INFP: "The Mediator: Poetic, kind, and altruistic people, always eager to help a good cause.",
  ISTJ: "The Logistician: Practical and fact-minded individuals, reliable to the core.",
  ISTP: "The Virtuoso: Bold and practical experimenters, masters of all kinds of tools.",
  ISFJ: "The Defender: Very dedicated and warm protectors, always ready to defend loved ones.",
  ISFP: "The Adventurer: Flexible and charming artists, always ready to explore new things.",
};

// Updated calculation function for 28 questions
function calculateScores(answers) {
  const Q = answers;

  // Adjusted formula for 28 questions
  const IE = 12 - Q[0] - Q[4] + Q[8] + Q[12] - Q[16] + Q[20] - Q[24];
  const SN = 10 + Q[1] + Q[5] - Q[9] - Q[13] + Q[17] - Q[21] + Q[25];
  const FT = 12 - Q[2] + Q[6] + Q[10] - Q[14] + Q[18] - Q[22] + Q[26];
  const JP = 8 + Q[3] + Q[7] - Q[11] + Q[15] - Q[19] + Q[23] - Q[27];

  // Calculate personality type based on scores
  const IEType = IE > 5 ? "E" : "I";
  const SNType = SN > 4 ? "N" : "S";
  const FTType = FT > 5 ? "T" : "F";
  const JPType = JP > 4 ? "P" : "J";

  return { IE, SN, FT, JP, personality: IEType + SNType + FTType + JPType };
}

// POST endpoint to submit answers and calculate the MBTI type
app.post("/submit", (req, res) => {
  const answers = req.body.responses; // answers is an array with responses for the questions

  // Updated validation: Ensure all answers for 28 questions are provided
  if (!answers || answers.length !== 28) {
    return res
      .status(400)
      .json({ error: "Please provide answers for all 28 questions." });
  }

  const result = calculateScores(answers);
  res.json({
    type: result.personality,
    description: mbtiDescriptions[result.personality] || "Unknown MBTI Type",
    scores: result,
  });
});

const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
