import React, { useState } from "react";
import questions from "./data/Questions/RIASEC";
import { useNavigate } from "react-router-dom";

const HollandPage = () => {
  const navigate = useNavigate(); // Hook for navigation
  const totalQuestions = Object.values(questions).flat().length; // Total number of questions
  const [answers, setAnswers] = useState(Array(totalQuestions).fill(false)); // Default all answers to false
  const URL = import.meta.env.VITE_API_URL; // API URL

  const handleChange = (index) => {
    setAnswers(
      (prev) => prev.map((val, i) => (i === index ? !val : val)) // Toggle value at index
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${URL}/api/riasec/calculate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch results");
      }

      navigate("/h-result");
    } catch (err) {
      console.error(err);
      alert("Error submitting your answers.");
    }
  };

  // let globalIndex = 0; // Counter for numbering questions

  const questionCategories = Object.keys(questions);
  const maxQuestions = Math.max(
    ...Object.values(questions).map((q) => q.length)
  );
  const orderedQuestions = [];
  for (let i = 0; i < maxQuestions; i++) {
    questionCategories.forEach((category) => {
      if (questions[category][i]) {
        orderedQuestions.push({ question: questions[category][i], category });
      }
    });
  }
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg font-serif">
      <h1 className="text-2xl font-bold mb-4">
        Holland Code (RIASEC) Career Test
      </h1>
      <p className="mb-4 text-gray-700">
        Read each statement carefully. If you agree with the statement, select
        the checkbox. There are no wrong answers!
      </p>
      <div className="border rounded-lg p-4">
        {orderedQuestions.map(({ question }, index) => (
          <div
            key={index}
            className="flex items-center border-b last:border-0 p-2"
          >
            <span className="font-bold mr-2">{index + 1})</span>
            <span className="flex-1">{question}</span>
            <div className="border-l-[1px] border-gray-400 pl-5">
              <input
                type="checkbox"
                checked={answers[index]}
                onChange={() => handleChange(index)}
                className="w-5 h-5"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
      >
        Submit Answers
      </button>
    </div>
  );
};

export default HollandPage;
