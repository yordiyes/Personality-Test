import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionList from "./QuestionList"; // This is where the individual questions are rendered

const QUESTIONS_PER_PAGE = 5;

const BigFive = ({ questions, onSubmitted }) => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({}); // Store the answers keyed by question id
  const [page, setPage] = useState(0); // Track the current page for multi-page questions

  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE); // Total number of pages

  // Function to handle changes in the answers for each question
  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value, // Update the answer for this question
    }));
  };

  // Submit function to process the answers and calculate the scores
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all questions are answered
    const unanswered = questions.filter((q) => !answers[q.id]);
    if (unanswered.length > 0) {
      alert("Please answer all questions before submitting.");
      return;
    }

    // Initialize the scores for each Big Five trait
    const traitScores = {
      Openness: [],
      Conscientiousness: [],
      Extraversion: [],
      Agreeableness: [],
      Neuroticism: [],
    };

    // Categorize the answers by trait
    questions.forEach((q) => {
      if (answers[q.id]) traitScores[q.trait].push(answers[q.id]);
    });

    // Calculate the average score for each trait
    const traitAverages = Object.entries(traitScores).map(([trait, scores]) => {
      const average = scores.reduce((sum, val) => sum + val, 0) / scores.length;
      return { trait, score: Math.round(average * 20) }; // Convert to a scale of 0-100
    });

    // Pass the results to the parent (if any)
    if (onSubmitted) onSubmitted(e);

    // Navigate to the result page with the calculated scores
    navigate("/bigfive-result", { state: { result: traitAverages } });
  };

  // Slice the questions to display only the current page's questions
  const currentQuestions = questions.slice(
    page * QUESTIONS_PER_PAGE,
    (page + 1) * QUESTIONS_PER_PAGE
  );

  return (
    <div className="max-w-3xl mx-auto py-10 px-5 font-serif">
      <h1 className="text-2xl md:text-3xl font-bold text-center text-indigo-700 mb-6">
        Big Five Personality Test
      </h1>
      <p className="text-center text-gray-600 mb-8 font-semibold">
        To take the Big Five personality assessment, rate each statement
        according to how well it describes you. Base your ratings on how you
        really are, not how you would like to be.
      </p>

      {/* Information about answering the questions */}
      <div className="bg-yellow-400 py-3 px-4 rounded-md text-center font-semibold text-black mb-5">
        INACCURATE • NEUTRAL • ACCURATE
      </div>

      <form onSubmit={handleSubmit}>
        {/* Render the current page's questions */}
        <QuestionList
          questions={currentQuestions}
          answers={answers}
          onChanged={handleAnswerChange}
        />

        {/* Step indicator and navigation buttons */}
        <div className="flex flex-col items-center mt-10 space-y-4">
          <p className="text-lg font-medium text-gray-700">
            Step {page + 1} of {totalPages}
          </p>

          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, idx) => (
              <span
                key={idx}
                className={`w-3 h-3 rounded-full transition ${
                  idx === page ? "bg-rose-400" : "bg-orange-200"
                }`}
              ></span>
            ))}
          </div>

          <div className="flex gap-4 mt-4">
            {page > 0 && (
              <button
                type="button"
                onClick={() => setPage(page - 1)}
                className="border border-slate-800 px-6 py-2 text-sm tracking-widest uppercase hover:bg-gray-100 transition duration-200"
              >
                &lt; Back
              </button>
            )}

            {page < totalPages - 1 ? (
              <button
                type="button"
                onClick={() => setPage(page + 1)}
                className="border border-slate-800 px-6 py-2 text-sm tracking-widest uppercase hover:bg-gray-100 transition duration-200"
              >
                Next Step &gt;
              </button>
            ) : (
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2 text-sm tracking-widest uppercase rounded-md hover:bg-green-700 transition duration-200"
              >
                Submit Answers
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default BigFive;
