import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Oejts2 = ({ questions, onSubmitted, onChanged, answers }) => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmitted(e);
    if (Object.keys(answers).length === questions.length) {
      navigate("/results");
    }
    
  };
  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <QuestionList questions={questions} onChanged={onChanged} />
        {/* <NavLink
          to="/OEJTSTest/oepage2"
          className="px-5 py-2 bg-blue-500 text-white rounded-md w-40 mx-[43%] my-10"
        >
          Next
        </NavLink> */}
        <button
          type="submit"
          className="px-5 py-2 bg-blue-500 text-white rounded-md w-40 mx-[43%] my-10"
        >
          Submit Answers
        </button>
      </form>
    </div>
  );
};
function QuestionList({ questions, onChanged }) {
  return (
    <div className="md:w-[70%] lg:w-[50%] mx-auto p-1">
      <div className=" text-right text-sm space-x-6 mr-5">
        <span>Disagree</span>
        <span>Neutral</span>
        <span>Agree</span>
      </div>
      {questions.map((question) => (
        <Question key={question.id} question={question} onChanged={onChanged} />
      ))}
    </div>
  );
}

function Question({ question, onChanged }) {
  return (
    <div className="my-2 grid grid-cols-3 bg-gray-200 items-center">
      <label className="text-sm font-medium text-gray-700 col-span-2 px-1 pr-3">
        {question.text}
      </label>

      {/* Radio Buttons */}
      <div className="flex items-center justify-between sm:px-2">
        {[1, 2, 3, 4, 5].map((num) => (
          <input
            type="radio"
            name={`question-${question.id}`}
            value={num}
            onChange={(e) => onChanged(question.id, e.target.value)}
          />
        ))}
      </div>
    </div>
  );
}

export default Oejts2;
