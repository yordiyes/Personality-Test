import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Oejts2 = ({ questions, onSubmitted, onChanged, answers }) => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmitted(e);
    navigate("/results");
  };
  return (
    <div className="m-4 sm:mb-0 pb-10 font-serif md:w-[60%] md:mx-auto sm:px-5 sm:m-8 sm:shadow-2xl md:px-10 lg:px-20">
      <h1 className="font-bold text-xl">Open Psychometrics Test</h1>
      <p className="my-4">
        <span className="font-bold">Instructions: </span>
        Please answer the following questions honestly by selecting a score from
        1 (left statement) to 5 (right statement). Your responses should reflect
        your true thoughts, feelings, and behaviors as accurately as possible.
      </p>
      <form onSubmit={handleSubmit}>
        <QuestionList questions={questions} onChanged={onChanged} />
        {/* <NavLink
          to="/OEJTSTest/oepage2"
          className="px-5 py-2 bg-blue-500 text-white rounded-md w-40 mx-[43%] my-10"
        >
          Next
        </NavLink> */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-5 py-2 bg-neutral-300 p-2 border-[1px] mt-5 my-10"
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
    <div className=" mx-auto">
      <div className=" text-right text-[13px] sm:text-sm sm:space-x-6 sm:mr-5 space-x-2 mr-2">
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
    <div className="my-2 grid grid-cols-3 bg-gray-200 items-center mx-1">
      <label className="text-sm sm:text-[15px] font-medium text-gray-700 col-span-2 px-1 pr-3">
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
