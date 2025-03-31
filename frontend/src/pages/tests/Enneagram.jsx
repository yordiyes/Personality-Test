import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import questions from "../data/Questions/EnneagramQuestions";
import enneagramTypes from "../data/EnneagramTypes";

const URL = import.meta.env.VITE_API_URL;

// Options now use text labels instead of numbers
const options = [
  { label: "No", value: 1 },
  { label: "Partly", value: 3 },
  { label: "Yes", value: 5 },
];

// Number of questions per page
const QUESTIONS_PER_PAGE = 9;

export default function Enneagram() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState(() => {
    return Object.keys(questions).reduce((acc, type) => {
      acc[type] = Array(questions[type].length).fill(null);
      return acc;
    }, {});
  });
  const [submitted, setSubmitted] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // Flatten all questions into a single array with their type info
  const allQuestions = Object.keys(questions).reduce((acc, type) => {
    questions[type].forEach((question, index) => {
      acc.push({
        text: question,
        type,
        index,
        category: enneagramTypes[type],
      });
    });
    return acc;
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(allQuestions.length / QUESTIONS_PER_PAGE);

  // Get questions for current page
  const currentQuestions = allQuestions.slice(
    currentPage * QUESTIONS_PER_PAGE,
    (currentPage + 1) * QUESTIONS_PER_PAGE
  );

  const handleSelect = (type, index, value) => {
    setAnswers((prevAnswers) => {
      const newAnswers = { ...prevAnswers };
      newAnswers[type] = [...prevAnswers[type]]; // Ensure a new array reference
      newAnswers[type][index] = value;
      return newAnswers;
    });
  };

  const isCurrentPageComplete = () => {
    return currentQuestions.every(
      (q) => answers[q.type] && answers[q.type][q.index] !== null // Use null check instead of undefined
    );
  };

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSubmit = async () => {
    setSubmitted(true);

    // Prepare the answers data to send to the backend
    const payload = {
      answers: Object.keys(answers).reduce((acc, type) => {
        questions[type].forEach((_, index) => {
          const answer = answers[type][index];
          if (answer !== null) {
            acc.push({
              questionId: index + 1,
              answer: answer,
              type: type,
            });
          }
        });
        return acc;
      }, []),
    };

    try {
      const response = await fetch(`${URL}/api/enneagram/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Result submitted successfully:", result.message);
      } else {
        throw new Error("Failed to fetch result");
      }
    } catch (error) {
      console.error("Error fetching the result: ", error);
    }
    navigate("/e-result");
  };

  return (
    <div className="m-4 sm:mb-0 pb-10 font-serif md:w-[60%] md:mx-auto sm:px-5 sm:m-8 sm:shadow-2xl md:px-10 lg:px-20">
      <h2 className="text-xl font-semibold mb-4 font-serif">Enneagram Test</h2>
      <p className="my-5">
        Honestly grade each statement: "Yes" for{" "}
        <em> "Yes, this is really me!"</em>, "Partly" for{" "}
        <em> "This is partly how I am"</em> and "No" for{" "}
        <em> "This is probably not how I am"</em>. (If you don't know whether it
        applies, it's usually best to check "No".)
      </p>
      {!submitted && (
        <div>
          {/* Progress indicator */}
          <div className="mb-5">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                Page {currentPage + 1} of {totalPages}
              </span>
              <span className="text-sm text-gray-600">
                Question {currentPage * QUESTIONS_PER_PAGE + 1}-
                {Math.min(
                  (currentPage + 1) * QUESTIONS_PER_PAGE,
                  allQuestions.length
                )}{" "}
                of {allQuestions.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
              <div
                className="bg-green-500 h-2.5 rounded-full"
                style={{
                  width: `${((currentPage + 1) / totalPages) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          {/* Current page questions */}
          {currentQuestions.map((q, i) => (
            <div key={`${q.type}-${q.index}`} className=" my-[2px]">
              <div className="flex items-stretch gap-[2px] text-[15px] md:text-[16px]">
                {/* Options */}
                <div className="p-2 pr-6 bg-gray-100">
                  {options.map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center gap-1"
                    >
                      <input
                        type="radio"
                        name={`${q.type}-${q.index}`}
                        value={option.value}
                        checked={answers[q.type][q.index] === option.value}
                        onChange={() =>
                          handleSelect(q.type, q.index, option.value)
                        }
                        className="mr-1 scale-90 sm:scale-100"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>

                {/* Question Text with Full Height Border */}
                <p className=" pl-4 flex-1 flex items-center bg-gray-100">
                  {q.text}
                </p>
              </div>
            </div>
          ))}

          {/* Navigation buttons */}
          <div className="flex justify-between mt-6">
            {currentPage < totalPages - 1 ? (
              <button
                onClick={goToNextPage}
                disabled={!isCurrentPageComplete()}
                className={`px-4 py-2 rounded ml-auto ${
                  !isCurrentPageComplete()
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
              >
                Next
              </button>
            ) : (
              isCurrentPageComplete() && (
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 ml-auto"
                >
                  Submit
                </button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
