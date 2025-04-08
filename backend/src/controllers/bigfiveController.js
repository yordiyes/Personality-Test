// Mapping of questions to Big Five traits
const questionMapping = {
    O: [2, 6, 21, 26, 28, 30, 36, 39, 41, 51, 57, 60],  // Openness
    C: [5, 11, 17, 23, 29, 31, 35, 40, 43, 50, 55, 58], // Conscientiousness
    E: [7, 9, 13, 18, 27, 32, 34, 38, 45, 47, 53, 59],  // Extraversion
    A: [1, 4, 10, 12, 15, 22, 33, 37, 44, 48, 54],      // Agreeableness
    N: [3, 8, 14, 16, 19, 20, 24, 25, 42, 46, 49, 52, 56] // Neuroticism
  };
  
  // Reverse-scored questions (subtract from 6)
  const reverseScored = {
    O: [21, 26, 36, 51],
    C: [17, 23, 31, 43, 55],
    E: [18, 32, 38, 47, 53, 59],
    A: [15, 33, 37, 44, 54],
    N: [20, 25, 46]
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
  