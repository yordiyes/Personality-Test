import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
const URL = import.meta.env.VITE_API_URL;

const Result = () => {
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await fetch(`${URL}/api/result`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch results");
        }

        const data = await response.json();
        setResult(data);
      } catch (err) {
        console.error(err);
        alert("Error fetching your results.");
      }
    };

    fetchResult();
  }, []);

  if (!result) {
    return (
      <p className="text-center mt-10 text-gray-600">Loading results...</p>
    );
  }

  const getProgressStyle = (value) => {
    const percentage = (Math.abs(value) / 2) * 50; // Convert range -2 to 2 into 0-50%
    return {
      width: `${percentage}%`,
      left: value < 0 ? `${50 - percentage}%` : "50%", // Shift left or right from center
      backgroundColor: "red", // Tailwind's blue-500
    };
  };

  return (
    <div className="bg-amber-50 min-h-screen sm:px-6 py-5 px-2 lg:px-60 w-full text-[15px] font-serif">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800">
          Personality Test Results
        </h2>
        <p className="mt-4 text-gray-700 text-[15px]">
          Jungian/Myers-Briggs Personality Type is based on four preferences,
          that when combined, produce a personality type. This page will first
          cover your scores for each preference, then finally provide a
          description of your personality type.
        </p>

        <div className="space-y-4 sm:px-8 md:px-20 mt-4">
          {/* Function to create a preference section */}
          {[
            {
              label1: "Introversion (I)",
              label2: "Extroversion (E)",
              value: result.IE,
              description:
                "Introversion-Extroversion is your cognitive orientation. Introverts center themselves inside their bodies, while extroverts center their attention outside their bodies. Your score on I-E was ",
            },
            {
              label1: "Sensing (S)",
              label2: "Intuition (N)",
              value: result.SN,
              description:
                "Sensing-Intuition determines how you process information—through your five senses or your subconscious. Your score on S-N was ",
            },
            {
              label1: "Feeling (F)",
              label2: "Thinking (T)",
              value: result.FT,
              description:
                "Feeling-Thinking evaluates how you make decisions—through personal values or logical principles. Your score on F-T was ",
            },
            {
              label1: "Judging (J)",
              label2: "Perceiving (P)",
              value: result.JP,
              description:
                "Judging-Perceiving determines your lifestyle preference—structured vs. flexible. Your score on J-P was ",
            },
          ].map(({ label1, label2, value, description }, index) => (
            <div key={index}>
              <h3 className="sm:text-md font-semibold text-gray-800 flex justify-between p-1 items-center border-b-[1px] pt-2">
                <span className={value < 0 ? "text-red-600 font-bold" : ""}>
                  {label1}
                </span>{" "}
                <div className="relative h-5 w-[50%] ">
                  {/* Middle Vertical Line */}
                  <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-black transform -translate-x-1/2"></div>

                  {/* Blue Progress Bar */}
                  <div
                    className="absolute top-0 bottom-0"
                    style={getProgressStyle(value)}
                  ></div>
                </div>
                <span className={value > 0 ? "text-red-600 font-bold" : ""}>
                  {label2}
                </span>
              </h3>

              <p className="text-gray-600 mt-1 px-5 text-[12px]">
                {description}
                <strong>{value}</strong> (scores range from -2 to 2), which
                indicates your preference.
              </p>
            </div>
          ))}
        </div>

        {/* Personality Type Summary */}
        <div className="mt-8">
          <p className="text-gray-800">
            When combined, your personality type is{" "}
            <strong className="text-lg font-bold">{result.personality}</strong>.
            Below is a detailed description of your personality type:
          </p>
          <div className="mt-4 sm:px-6 sm:py-3 bg-gray-900/15">
            <div className="bg-black text-white p-4 shadow-xl text-sm font-mono">
              {result.description && result.description.length > 0 ? (
                result.description.map((desc, index) => (
                  <p key={index} className="mb-4">
                    {desc}
                  </p>
                ))
              ) : (
                <p>No detailed description available.</p>
              )}
            </div>
          </div>
          <div className="my-5">
            <NavLink to="/" className="bg-neutral-300 p-2 border-[1px] mt-3">
              Home Page
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
