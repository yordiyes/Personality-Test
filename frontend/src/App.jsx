import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Oejts1 from "./pages/tests/Oejts1";
import Oejts2 from "./pages/tests/Oejts2";
import Enneagram from "./pages/tests/Enneagram";
import Home from "./pages/Home";
import OejtsPage from "./pages/OejtsPage";
import Result from "./pages/Result";
import EnneagramPage from "./pages/EnneagramPage";
import EnneagramResult from "./pages/EnneagramResult";
import questions from "./pages/data/Questions/OEJTS_Question1";
import questions2 from "./pages/data/Questions/OEJTS_Question2";
import questions3 from "./pages/data/Questions/bigfive-questions";
import HollandPage from "./pages/HollandPage";
import HollandResult from "./pages/HollandResult";
import BigFivePage from "./pages/BigFivePage";
import BigFive from "./pages/tests/BigFive";
import BigFiveResult from "./pages/BigFiveResult";

const URL = import.meta.env.VITE_API_URL;

function App() {
  const [answers, setAnswers] = useState({});

  const handleChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: parseInt(value) }));
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    if (Object.keys(answers).length !== questions2.length) {
      alert("Please answer all questions.");
      return;
    }

    try {
      const response = await fetch(`${URL}/api/oejts/score2`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch results");
      }
      setAnswers({});
    } catch (err) {
      console.error(err);
      alert("Error submitting your answers.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(answers).length !== questions.length) {
      alert("Please answer all questions.");
      return;
    }

    try {
      const response = await fetch(`${URL}/api/oejts/score`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch results");
      }
      setAnswers({});
    } catch (err) {
      console.error(err);
      alert("Error submitting your answers.");
    }
  };

  // Flatten the questions3 object into a single array
  const flattenQuestions = (questions) => {
    const flattened = [];

    Object.keys(questions).forEach((trait) => {
      if (Array.isArray(questions[trait])) {
        questions[trait].forEach((question) => {
          flattened.push({ ...question, trait });
        });
      }
    });

    return flattened;
  };

  const flattenedQuestions = flattenQuestions(questions3);

  return (
    <div className="app-container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/OEJTSTest" element={<OejtsPage />} />
          <Route
            path="/OEJTSTest/oepage1"
            element={
              <Oejts1
                questions={questions}
                onSubmitted={handleSubmit}
                onChanged={handleChange}
                answers={answers}
              />
            }
          />
          <Route
            path="/OEJTSTest/oepage2"
            element={
              <Oejts2
                questions={questions2}
                onSubmitted={handleSubmit2}
                onChanged={handleChange}
                answers={answers}
              />
            }
          />
          <Route path="/E-test" element={<Enneagram />} />
          <Route path="/results" element={<Result />} />
          <Route path="/Enneagram" element={<EnneagramPage />} />
          <Route path="/e-result" element={<EnneagramResult />} />
          <Route path="/reasec" element={<HollandPage />} />
          <Route path="/h-result" element={<HollandResult />} />
          <Route path="/B-test" element={<BigFivePage />} />
          <Route
            path="/B-test/test"
            element={<BigFive questions={flattenedQuestions} />}
          />
          <Route path="/bigfive-result" element={<BigFiveResult />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
