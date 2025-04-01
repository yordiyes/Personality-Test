// Corrected Mapping of questions to RIASEC categories
const questionMapping = {
  R: [1, 7, 13, 19, 25, 31, 37],
  I: [2, 8, 14, 20, 26, 32, 38],
  A: [3, 9, 15, 21, 27, 33, 39],
  S: [4, 10, 16, 22, 28, 34, 40],
  E: [5, 11, 17, 23, 29, 35, 41],
  C: [6, 12, 18, 24, 30, 36, 42],
};

let lastResult = null;

// Endpoint to calculate RIASEC personality
exports.postResult = (req, res) => {
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
        scores[type] += 1;
      }
    });
  });

  // Sort and return all personality types with scores
  const sortedScores = Object.entries(scores)
    .sort((a, b) => b[1] - a[1]) // Sort in descending order
    .map(([type, score]) => ({ type, score })); // Convert to array of objects

  lastResult = sortedScores; // Store the latest result

  res.json({ personalityScores: sortedScores });
};

exports.getResults = (req, res) => {
  if (!lastResult) {
    return res
      .status(404)
      .json({ error: "No results found. Please submit answers first." });
  }
  res.json({ personalityScores: lastResult });
};
