// Mapping of questions to Big Five traits
const questionMapping = {
  O: [2, 6, 21, 26, 28, 30, 36, 39, 41, 46, 51, 56],           // Openness
  C: [5, 11, 17, 22, 23, 25, 29, 31, 35, 40, 42, 47, 52, 57],  // Conscientiousness
  E: [7, 9, 13, 18, 27, 32, 34, 38, 43, 48, 53, 58],           // Extraversion
  A: [1, 4, 10, 12, 15, 33, 37, 44, 49, 54, 59],               // Agreeableness
  N: [3, 8, 14, 16, 19, 20, 24, 45, 50, 55, 60]                // Neuroticism
};
  // Reverse-scored questions (subtract from 6)
  const reverseScored = {
    O: [21, 26, 36],                 // Openness
    C: [17, 23, 25, 31, 47],         // Conscientiousness
    E: [18, 32, 38, 43, 48],         // Extraversion
    A: [15, 33, 54, 59],             // Agreeableness
    N: [20]                          // Neuroticism
  };
  let lastResult = null;
  
  // Calculate Big Five scores
  exports.calculateBigFive = (req, res) => {
    const { answers } = req.body;
  
    // Validate input
    if (!answers || typeof answers !== 'object') {
      return res.status(400).json({ 
        error: 'Invalid input. Provide answers object with question IDs as keys.' 
      });
    }
  
    // Initialize scores and counts
    const scores = { O: 0, C: 0, E: 0, A: 0, N: 0 };
    const counts = { O: 0, C: 0, E: 0, A: 0, N: 0 };
  
    // Calculate raw scores
    Object.entries(questionMapping).forEach(([trait, questions]) => {
      questions.forEach(qId => {
        const answer = answers[qId];
  
        if (typeof answer === 'number' && answer >= 1 && answer <= 5) {
          // Apply reverse scoring if needed
          const isReverse = reverseScored[trait]?.includes(qId);
          const adjustedScore = isReverse ? 6 - answer : answer;
  
          scores[trait] += adjustedScore;
          counts[trait]++;
        }
      });
    });
  
    // Calculate averages and normalize to 0-100 scale
    const normalized = {};
    Object.keys(scores).forEach(trait => {
      const avg = counts[trait] > 0 ? scores[trait] / counts[trait] : 0;
      normalized[trait] = Math.round(((avg - 1) / 4) * 100);
    });
  
    // Prepare result without traits section and sorting
    const result = {
      raw: scores,
      normalized
    };
  
    lastResult = result;
    res.json(result);
  };
  
  // Get last calculated result
  exports.getBigFiveResult = (req, res) => {
    if (!lastResult) {
      return res.status(404).json({ 
        error: "No results found. Submit answers first." 
      });
    }
    res.json(lastResult);
  };
  