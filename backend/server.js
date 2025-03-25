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
  const Q = answers; // Array of answers

  // Calculate scores based on the adjusted question assignments
  const IE = 21 + Q[0] - Q[1] + Q[2] - Q[3] + Q[4] - Q[5] - Q[6];

  const SN = 21 + Q[7] - Q[8] + Q[9] - Q[10] + Q[11] - Q[12] - Q[13];

  const FT = 21 - Q[14] + Q[15] - Q[16] + Q[17] - Q[18] + Q[19] + Q[20];

  const JP = 21 + Q[21] - Q[22] + Q[23] - Q[24] + Q[25] - Q[26] - Q[27];

  // Determine personality type
  const IEType = IE > 21 ? "E" : "I";
  const SNType = SN > 21 ? "N" : "S";
  const FTType = FT > 21 ? "T" : "F";
  const JPType = JP > 21 ? "P" : "J";

  console.log(IE, SN, FT, JP); // Debugging output

  return {
    IE,
    SN,
    FT,
    JP,
    personality: IEType + SNType + FTType + JPType,
  };
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
