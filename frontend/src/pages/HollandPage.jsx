import React, { useState } from "react";

const HollandPage = () => {
  const [answers, setAnswers] = useState({});

  const questions = [
    "I like to work on cars",
    "I like to do puzzles",
    "I am good at working independently",
    "I like to work in teams",
    "I am an ambitious person, I set goals for myself",
    "I like to organize things, (files, desks/offices)",
    "I like to build things",
    "I like to read about art and music",
    "I like to have clear instructions to follow",
    "I like to try to influence or persuade people",
    "I like to do experiments",
    "I like to teach or train people",
    "I like trying to help people solve their problems",
    "I like to take care of animals",
    "I wouldn't mind working 8 hours per day in an office",
    "I like selling things",
    "I enjoy creative writing",
    "I enjoy science",
  ];

  const handleChange = (index) => {
    setAnswers((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">
        Holland Code (RIASEC) Career Test
      </h1>
      <p className="mb-4 text-gray-700">
        Read each statement carefully. If you agree with the statement, select
        the checkbox. There are no wrong answers!
      </p>
      <div className="border rounded-lg p-4">
        {questions.map((question, index) => (
          <div
            key={index}
            className="flex items-center border-b last:border-0 p-2"
          >
            <span className="font-bold mr-2">{index + 1})</span>
            <span className="flex-1">{question}</span>
            <div className=" border-l-[1px] border-gray-400 pl-5">
              <input
                type="checkbox"
                checked={answers[index] || false}
                onChange={() => handleChange(index)}
                className="w-5 h-5"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HollandPage;
