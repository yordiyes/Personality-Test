import React from "react";

const QuestionList = ({ questions, answers, onChanged }) => {
  return (
    <div className="space-y-4">
      {" "}
      {/* reduced spacing between boxes */}
      {questions.map((q) => (
        <div
          key={q.id}
          className="bg-white shadow rounded-lg p-3 sm:p-4 border border-gray-200" // smaller padding & rounded
        >
          <h3 className="font-semibold text-base sm:text-lg text-gray-800 mb-3 text-center">
            {q.text}
          </h3>

          <div className="flex items-center justify-center gap-2 sm:gap-3 px-2">
            <span className="text-xs sm:text-sm text-gray-600 font-bold">
              Inaccurate
            </span>

            <div className="flex gap-2 sm:gap-3 justify-center">
              {[1, 2, 3, 4, 5].map((val) => (
                <label key={val} className="relative cursor-pointer">
                  <input
                    type="radio"
                    name={`question-${q.id}`}
                    value={val}
                    checked={answers[q.id] === val}
                    onChange={() => onChanged(q.id, val)}
                    className="sr-only"
                  />
                  <div
                    className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                      answers[q.id] === val
                        ? "bg-indigo-500 border-indigo-700"
                        : "border-gray-400"
                    }`}
                  ></div>
                </label>
              ))}
            </div>

            <span className="text-xs sm:text-sm text-gray-600 font-bold">
              Accurate
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionList;
