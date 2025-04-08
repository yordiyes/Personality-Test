import React, { useState, useEffect } from "react";
import questions from "./data/Questions/bigfive-questions";
import { useNavigate } from "react-router-dom";
const URL = import.meta.env.VITE_API_URL; // API URL

const BigFivePage = () => {
  const navigate = useNavigate();
  const QUESTIONS_PER_PAGE = 12;
  const [answers, setAnswers] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);

  const allQuestions = React.useMemo(() => {
    const flattened = Object.values(questions).flat();
    // Optional: Shuffle questions if needed
    // return [...flattened].sort(() => Math.random() - 0.5);
    return flattened;
  }, []);

  const totalQuestions = allQuestions.length;
  const totalPages = Math.ceil(totalQuestions / QUESTIONS_PER_PAGE);

  const currentQuestions = React.useMemo(() => {
    const startIndex = currentPage * QUESTIONS_PER_PAGE;
    const endIndex = startIndex + QUESTIONS_PER_PAGE;
    return allQuestions.slice(startIndex, endIndex);
  }, [currentPage, allQuestions]);

  useEffect(() => {
    // This ensures the form starts fresh on each page
  }, [currentPage]);

  useEffect(() => {
    const answeredCount = Object.keys(answers).filter(
      (id) => answers[id] !== undefined
    ).length;
    const totalPossible = Math.min(
      (currentPage + 1) * QUESTIONS_PER_PAGE,
      totalQuestions
    );
    setProgress(Math.round((answeredCount / totalPossible) * 100));
  }, [answers, currentPage, totalQuestions]);

  const handleChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: parseInt(value, 10),
    }));
  };

  const handleNextPage = () => {
    const currentQuestionIds = currentQuestions.map((q) => q.id);
    const allAnswered = currentQuestionIds.every(
      (id) => answers[id] !== undefined
    );

    if (!allAnswered) {
      alert("Please answer all questions on this page.");
      return;
    }

    setCurrentPage((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitAnswers();
  };

  const submitAnswers = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`${URL}/api/bigFiveTest/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });

      if (!response.ok) throw new Error("Failed to submit results");
      navigate("/B-result");
    } catch (err) {
      console.error("Submission error:", err);
      alert("Error submitting your answers. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const ProgressBar = () => (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
      <div
        className="bg-blue-600 h-2.5 rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg font-serif">
      <h1 className="text-2xl font-bold mb-2">Big Five Personality Test</h1>
      <p className="mb-6 text-gray-700">
        Read each statement carefully. Rate from 1 (Strongly Disagree) to 5
        (Strongly Agree).
      </p>

      <ProgressBar />

      <div className="flex justify-between mb-4 text-sm text-gray-600">
        <span>
          Page {currentPage + 1} of {totalPages}
        </span>
        <span>{progress}% Complete</span>
      </div>
      <form onSubmit={handleSubmit} key={`page-${currentPage}`}>
        <div className="space-y-4">
          {currentQuestions.map((question, index) => {
            const questionNumber = currentPage * QUESTIONS_PER_PAGE + index + 1;
            return (
              <div
                key={`${question.id}-${questionNumber}`}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="mb-3">
                  <span className="font-medium text-gray-800">
                    {questionNumber}. {question.text}
                  </span>
                </div>
                <div className="flex justify-between">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <label
                      key={`${question.id}-${num}`}
                      className="flex flex-col items-center cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={num}
                        onChange={(e) =>
                          handleChange(question.id, e.target.value)
                        }
                        checked={answers[question.id] === num}
                        className="w-5 h-5 text-blue-500 focus:ring-blue-400"
                      />
                      <span className="text-xs mt-1">
                        {num === 1
                          ? "IN ACCURATE"
                          : num === 5
                          ? "ACCURATE"
                          : num}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-between mt-8">
          {currentPage > 0 && (
            <button
              type="button"
              onClick={handlePreviousPage}
              className="bg-gray-300 text-gray-800 py-2 px-6 rounded-lg hover:bg-gray-400"
            >
              Previous
            </button>
          )}

          {currentPage < totalPages - 1 ? (
            <button
              type="button"
              onClick={handleNextPage}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg ml-auto"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className={`py-2 px-6 rounded-lg ml-auto ${
                isSubmitting
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white`}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default BigFivePage;
