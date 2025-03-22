import React, { useState } from "react";

const questions = [
  { id: 1, left: "makes lists", right: "relies on memory" },
  { id: 2, left: "sceptical", right: "wants to believe" },
  { id: 3, left: "bored by time alone", right: "needs time alone" },
  {
    id: 4,
    left: "accepts things as they are",
    right: "unsatisfied with the way things are",
  },
  { id: 5, left: "keeps a clean room", right: "just puts stuff where ever" },
  {
    id: 6,
    left: 'thinks "robotic" is an insult',
    right: "strives to have a mechanical mind",
  },
  { id: 7, left: "energetic", right: "mellow" },
  {
    id: 8,
    left: "prefer to take multiple choice test",
    right: "prefer essay answers",
  },
  { id: 9, left: "chaotic", right: "organized" },
  { id: 10, left: "easily hurt", right: "thick-skinned" },
  { id: 11, left: "works best in groups", right: "works best alone" },
  { id: 12, left: "focused on the present", right: "focused on the future" },
  { id: 13, left: "plans far ahead", right: "plans at the last minute" },
  { id: 14, left: "wants people's respect", right: "wants their love" },
  {
    id: 15,
    left: "gets worn out by parties",
    right: "gets fired up by parties",
  },
  { id: 16, left: "fits in", right: "stands out" },
  { id: 17, left: "keeps options open", right: "commits" },
  {
    id: 18,
    left: "wants to be good at fixing things",
    right: "wants to be good at fixing people",
  },
  { id: 19, left: "talks more", right: "listens more" },
  {
    id: 20,
    left: "when describing an event, will tell people what happened",
    right: "when describing an event, will tell people what it meant",
  },
  { id: 21, left: "gets work done right away", right: "procrastinates" },
  { id: 22, left: "follows the heart", right: "follows the head" },
  { id: 23, left: "stays at home", right: "goes out on the town" },
  { id: 24, left: "wants the big picture", right: "wants the details" },
  { id: 25, left: "improvises", right: "prepares" },
  {
    id: 26,
    left: "bases morality on justice",
    right: "bases morality on compassion",
  },
  {
    id: 27,
    left: "finds it difficult to yell very loudly",
    right: "yelling to others when they are far away comes naturally",
  },
  { id: 28, left: "theoretical", right: "empirical" },
  { id: 29, left: "works hard", right: "plays hard" },
  { id: 30, left: "uncomfortable with emotions", right: "values emotions" },
  {
    id: 31,
    left: "likes to perform in front of other people",
    right: "avoids public speaking",
  },
  {
    id: 32,
    left: 'likes to know "who?", "what?", "when?"',
    right: 'likes to know "why?"',
  },
];

function App() {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const handleChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: parseInt(value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(answers).length !== questions.length) {
      alert("Please answer all questions.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch results");
      }
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Error submitting your answers.");
    }
  };

  return (
    <div className="app-container">
      <h1>Open Extended Jungian Type Scales 1.2</h1>
      <p>
        This is an interactive version of the OEJTS – an open source alternative
        to the Myers-Briggs Type Indicator. Please answer the following 32
        questions by selecting a score from 1 (left statement) to 5 (right
        statement).
      </p>
      <form onSubmit={handleSubmit}>
        {questions.map((q) => (
          <div className="question" key={q.id}>
            <h3>Question {q.id}</h3>
            <p>
              <em>{q.left}</em> <strong>vs.</strong> <em>{q.right}</em>
            </p>
            <div className="options">
              {[1, 2, 3, 4, 5].map((num) => (
                <label key={num}>
                  <input
                    type="radio"
                    name={`question-${q.id}`}
                    value={num}
                    onChange={(e) => handleChange(q.id, e.target.value)}
                  />
                  {num}
                </label>
              ))}
            </div>
          </div>
        ))}
        <button type="submit">Submit Answers</button>
      </form>
      {result && (
        <div className="results">
          <h2>Your Results</h2>
          <p>
            <strong>IE Score:</strong> {result.IE}
          </p>
          <p>
            <strong>SN Score:</strong> {result.SN}
          </p>
          <p>
            <strong>FT Score:</strong> {result.FT}
          </p>
          <p>
            <strong>JP Score:</strong> {result.JP}
          </p>
          <h3>Your Personality Type: {result.personality}</h3>
          <p>
            Interpretation:{" "}
            {result.personality[0] === "E" ? "Extroverted" : "Introverted"},{" "}
            {result.personality[1] === "N" ? "Intuitive" : "Sensing"},{" "}
            {result.personality[2] === "T" ? "Thinking" : "Feeling"},{" "}
            {result.personality[3] === "P" ? "Perceiving" : "Judging"}.
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
