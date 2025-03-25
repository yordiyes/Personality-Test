import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Oejts1 = ({ questions, onSubmitted, onChanged, answers }) => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmitted(e);
    if (Object.keys(answers).length === questions.length) {
      navigate("/OEJTSTest/oepage2");
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
          Continue
        </button>
      </form>
    </div>
  );
};
function QuestionList({ questions, onChanged }) {
  return (
    <div className="md:w-[80%] lg:w-[70%] mx-auto p-1">
      {questions.map((question) => (
        <Question key={question.id} question={question} onChanged={onChanged} />
      ))}
    </div>
  );
}

function Question({ question, onChanged }) {
  return (
    <div className="mb-1 grid grid-cols-5 bg-gray-200 items-center">
      {/* Left Label */}
      <label className="text-sm font-medium text-gray-700 text-right pr-2 col-span-2">
        {question.left}
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

      {/* Right Label */}
      <label className="text-sm font-medium text-gray-700 text-left pl-2 col-span-2">
        {question.right}
      </label>
    </div>
  );
}

export default Oejts1;
