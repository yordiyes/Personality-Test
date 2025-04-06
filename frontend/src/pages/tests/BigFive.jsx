import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BigFive = ({ questions, onSubmitted }) => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});

  // Handle when a radio input is changed
  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.keys(answers).length !== questions.length) {
      alert("Please answer all questions before submitting.");
      return;
    }

    // Compute trait averages
    const traitScores = {
      Openness: [],
      Conscientiousness: [],
      Extraversion: [],
      Agreeableness: [],
      Neuroticism: [],
    };

    questions.forEach((question) => {
      const trait = question.trait;
      if (trait && answers[question.id]) {
        traitScores[trait].push(answers[question.id]);
      }
    });

    const traitAverages = Object.entries(traitScores).map(([trait, scores]) => {
      const average = scores.reduce((sum, val) => sum + val, 0) / scores.length;
      return { trait, score: Math.round(average * 20) }; // scale 1–5 to 0–100
    });

    // Call parent submission if needed
    if (onSubmitted) onSubmitted(e);

    // Navigate to result page
    navigate("/bigfive-result", { state: { result: traitAverages } });
  };

  return (
    <div className="m-4 sm:mb-0 pb-10 font-serif md:w-[60%] md:mx-auto sm:px-5 sm:m-8 sm:shadow-2xl md:px-10 lg:px-20">
      <h1 className="font-bold text-xl">Big Five Personality Test</h1>
      <p className="my-4">
        <span className="font-bold">Instructions: </span>
        To take the Big Five personality assessment, rate each statement
        according to how well it describes you. Base your ratings on how you
        really are, not how you would like to be.
      </p>
      <form onSubmit={handleSubmit}>
        <QuestionList
          questions={questions}
          onChanged={handleAnswerChange}
          answers={answers}
        />
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-5 py-2 bg-blue-800 p-2 border-[1px] mt-5 my-10 text-white"
          >
            Submit Answers
          </button>
        </div>
      </form>
    </div>
  );
};

function QuestionList({ questions, onChanged }) {
  return (
    <div className="mx-auto">
      <div className="text-right text-[13px] sm:text-sm sm:space-x-6 sm:mr-5 space-x-2 mr-6">
        <span>Inaccurate</span>
        <span>Neutral</span>
        <span>Accurate</span>
      </div>
      {questions.map((question) => (
        <Question key={question.id} question={question} onChanged={onChanged} />
      ))}
    </div>
  );
}

function Question({ question, onChanged }) {
  return (
    <div className="my-2 grid grid-cols-3 bg-gray-200 items-center mx-1">
      <label className="text-sm sm:text-[15px] font-medium text-gray-700 col-span-2 px-1 pr-3">
        {question.text}
      </label>

      {/* Radio Buttons */}
      <div className="flex items-center justify-between sm:px-2 -ml-1">
        {[1, 2, 3, 4, 5].map((num) => (
          <input
            type="radio"
            name={`question-${question.id}`}
            key={num}
            value={num}
            onChange={(e) => onChanged(question.id, parseInt(e.target.value))}
          />
        ))}
      </div>
    </div>
  );
}

export default BigFive;
