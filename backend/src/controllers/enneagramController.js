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

exports.getScore = exports.postAnswers = (req, res) => {
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
};
