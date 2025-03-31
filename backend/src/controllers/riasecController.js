// Corrected Mapping of questions to RIASEC categories
const questionMapping = {
  R: [1, 7, 14, 22, 30, 32, 37],
  I: [2, 11, 18, 21, 26, 33, 39],
  A: [3, 8, 17, 23, 27, 31, 41],
  S: [4, 12, 13, 20, 28, 34, 40],
  E: [5, 10, 16, 19, 29, 36, 42],
  C: [6, 9, 15, 24, 25, 35, 38],
};

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
        // Ensure correct boolean check
        scores[type] += 1;
      }
    });
  });

  // Sort and get top 3 personality types
  const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const topThree = sortedScores.slice(0, 3).map((item) => item[0]);

  res.json({ personality: topThree });
};
