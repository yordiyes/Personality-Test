import React, { useState } from "react";
import "./App.css";

const questions = [
  // Introversion (I) vs. Extroversion (E) - 7 questions
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
    trait: "E",
    text: "I appear confident before presentations and tests.",
  },
  {
    id: 4,
    trait: "I",
    text: "I ignore calls and messages, unless it's someone I really want to talk to.",
  },
  {
    id: 5,
    trait: "E",
    text: "When playing video games, I care more about socializing than achievements.",
  },
  {
    id: 6,
    trait: "I",
    text: "I have a small number of lifelong friends, instead of a large group of people to hang out with.",
  },
  {
    id: 7,
    trait: "I",
    text: "I get to know people through text or social media rather than in person.",
  },

  // Sensing (S) vs. Intuition (N) - 7 questions
  {
    id: 8,
    trait: "S",
    text: "I think physical appearance counts as or reflects/correlates to personality.",
  },
  {
    id: 9,
    trait: "N",
    text: "I often come up with new ideas to make society better.",
  },
  { id: 10, trait: "S", text: "I tend to trip over things often." },
  {
    id: 11,
    trait: "N",
    text: "I recognize the interconnectedness of various subjects.",
  },
  {
    id: 12,
    trait: "S",
    text: "I talk to trees, and feel that I can sense nature.",
  },
  {
    id: 13,
    trait: "N",
    text: "I frequently imagine different possibilities for the future.",
  },
  { id: 14, trait: "S", text: "I frequently check burners/locks." },

  // Feeling (F) vs. Thinking (T) - 7 questions
  {
    id: 15,
    trait: "F",
    text: "I have extreme fear of failing or looking bad in front of everyone.",
  },
  {
    id: 16,
    trait: "T",
    text: "I will admit to being wrong in order to learn the truth.",
  },
  {
    id: 17,
    trait: "F",
    text: "I refuse to do a job unless it is authentic and aligns with my purpose.",
  },
  {
    id: 18,
    trait: "T",
    text: "I do things usually attributed to men like fixing things and snowmobiling.",
  },
  {
    id: 19,
    trait: "F",
    text: "I hate watching people feel embarrassed / get rejected.",
  },
  {
    id: 20,
    trait: "T",
    text: "I get very frustrated when others insist wrong facts are right.",
  },
  { id: 21, trait: "F", text: "I feel deeply affected when others are upset." },

  // Judging (J) vs. Perceiving (P) - 7 questions
  {
    id: 22,
    trait: "J",
    text: "I constantly overextend myself (make projects way bigger than needed).",
  },
  {
    id: 23,
    trait: "P",
    text: "I spend more time on learning about new things than focusing on the things that need to be done.",
  },
  {
    id: 24,
    trait: "J",
    text: "I carry additional workload on team projects to achieve better results.",
  },
  {
    id: 25,
    trait: "P",
    text: "I am forgetful when it comes to personal history.",
  },
  { id: 26, trait: "J", text: "I study how to hold on to my money." },
  {
    id: 27,
    trait: "P",
    text: "I'll take a different path home today because I went the other way last time.",
  },
  {
    id: 28,
    trait: "P",
    text: "I'm often unaware of the physical environment.",
  },
];


const App = () => {
  const [responses, setResponses] = useState(
    questions.reduce((acc, q) => ({ ...acc, [q.id]: 0 }), {})
  );
  const [result, setResult] = useState(null);

  const handleResponseChange = (questionId, value) => {
    setResponses((prev) => ({ ...prev, [questionId]: parseInt(value) }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ responses: Object.values(responses) }),
      });

      const resultData = await response.json();
      setResult(resultData);
    } catch (error) {
      console.error("Error submitting responses:", error);
    }
  };

  return (
    <div className="container">
      <h1>Personality Test</h1>
      <table className="question-table">
        <thead>
          <tr>
            <th>Question</th>
            <th>Strongly Disagree</th>
            <th>Disagree</th>
            <th>Neutral</th>
            <th>Agree</th>
            <th>Strongly Agree</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((q) => (
            <tr key={q.id}>
              <td className="bold">{q.text}</td>
              {[-2, -1, 0, 1, 2].map((val) => (
                <td key={val}>
                  <input
                    type="radio"
                    name={`question-${q.id}`}
                    value={val}
                    onChange={() => handleResponseChange(q.id, val)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleSubmit} className="submit-button">
        Submit
      </button>

      {result && (
        <div className="result">
          <h2>Your MBTI Type: {result.type}</h2>
          <p>{result.description}</p>
        </div>
      )}
    </div>
  );
};

export default App;
