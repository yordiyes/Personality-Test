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
// Sample OEJTS Questions mapped to personality traits
const questions = [
  {
    id: 1,
    trait: "E",
    text: "I help other shoppers who are at a store and appear to be lost.",
  },
  {
    id: 2,
    trait: "I",
    text: "I obsessively recall recent/past encounters in my head.",
  },
  {
    id: 3,
    trait: "J",
    text: "I constantly overextend myself (make projects way bigger than needed).",
  },
  {
    id: 4,
    trait: "F",
    text: "I have extreme fear of failing or looking bad in front of everyone.",
  },
  {
    id: 5,
    trait: "I",
    text: "I ignore calls and messages, unless it's someone I really want to talk to.",
  },
  {
    id: 6,
    trait: "P",
    text: "I spend more time on learning about new things than focusing on the things that need to be done.",
  },
  {
    id: 7,
    trait: "S",
    text: "I think physical appearance counts as or reflects/correlates to personality.",
  },
  {
    id: 8,
    trait: "E",
    text: "I appear confident before presentations and tests.",
  },
  {
    id: 9,
    trait: "N",
    text: "I often come up with new ideas to make society better.",
  },
  {
    id: 10,
    trait: "T",
    text: "I will admit to being wrong in order to learn the truth.",
  },
  { id: 11, trait: "S", text: "I tend to trip over things often." },
  {
    id: 12,
    trait: "J",
    text: "I carry additional workload on team projects to achieve better results.",
  },
  {
    id: 13,
    trait: "I",
    text: "I have a small number of lifelong friends, instead of a large group of people to hang out with.",
  },
  {
    id: 14,
    trait: "P",
    text: "I am forgetful when it comes to personal history.",
  },
  {
    id: 15,
    trait: "F",
    text: "I refuse to do a job unless it is authentic and aligns with my purpose.",
  },
  {
    id: 16,
    trait: "T",
    text: "I do things usually attributed to men like fixing things and snowmobiling.",
  },
  {
    id: 17,
    trait: "N",
    text: "I recognize the interconnectedness of various subjects.",
  },
  {
    id: 18,
    trait: "P",
    text: "I'll take a different path home today because I went the other way last time.",
  },
  {
    id: 19,
    trait: "S",
    text: "I talk to trees, and feel that I can sense nature.",
  },
  {
    id: 20,
    trait: "P",
    text: "I'm often unaware of the physical environment.",
  },
  {
    id: 21,
    trait: "E",
    text: "When playing video games, I care more about socializing than achievements.",
  },
  {
    id: 22,
    trait: "I",
    text: "I dress in very unorthodox/unfashionable outfits because they reflect my personality.",
  },
  {
    id: 23,
    trait: "P",
    text: "I suffer from extreme Fear of Missing Out (FOMO).",
  },
  { id: 24, trait: "J", text: "I study how to hold on to my money." },
  {
    id: 25,
    trait: "I",
    text: "I get to know people through text or social media rather than in person.",
  },
  {
    id: 26,
    trait: "T",
    text: "I get very frustrated when others insist wrong facts are right.",
  },
  { id: 27, trait: "S", text: "I frequently check burners/locks." },
  {
    id: 28,
    trait: "F",
    text: "I hate watching people feel embarrassed / get rejected.",
  },
];

// Map of MBTI Traits
const traitsMap = {
  E: "Extraversion",
  I: "Introversion",
  S: "Sensing",
  N: "Intuition",
  T: "Thinking",
  F: "Feeling",
  J: "Judging",
  P: "Perceiving",
};

// Function to determine MBTI Type
const determineMBTI = (scores) => {
  let mbtiType = "";
  mbtiType += scores["E"] >= scores["I"] ? "E" : "I";
  mbtiType += scores["S"] >= scores["N"] ? "S" : "N";
  mbtiType += scores["T"] >= scores["F"] ? "T" : "F";
  mbtiType += scores["J"] >= scores["P"] ? "J" : "P";
  return mbtiType;
};

app.post("/submit", (req, res) => {
  const responses = req.body.responses;
  const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

  // Iterate through the responses to calculate scores
  questions.forEach((q, idx) => {
    const value = responses[idx];
    scores[q.trait] += value;
  });

  const mbtiType = determineMBTI(scores);

  // Extract only the scores for the traits in the MBTI type
  const relevantTraits = mbtiType.split(""); // e.g., ["I", "S", "T", "J"]
  const relevantScores = {};

  relevantTraits.forEach((trait) => {
    const fullTraitName = traitsMap[trait]; // e.g., "I" -> "Introversion"
    relevantScores[fullTraitName] = scores[trait];
  });

  res.json({
    type: mbtiType,
    scores: relevantScores,
    description: mbtiDescriptions[mbtiType] || "Unknown MBTI Type",
  });
});
const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
