// Corrected Mapping of questions to RIASEC categories
const questionMapping = {
  R: [1, 2, 3, 4, 5, 6, 7],
  I: [8, 9, 10, 11, 12, 13, 14],
  A: [15, 16, 17, 18, 19, 20, 21],
  S: [22, 23, 24, 25, 26, 27, 28],
  E: [29, 30, 31, 32, 33, 34, 35],
  C: [36, 37, 38, 39, 40, 41, 42],
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
