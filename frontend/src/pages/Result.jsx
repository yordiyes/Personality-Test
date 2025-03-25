import React, { useEffect, useState } from "react";
const URL = import.meta.env.VITE_API_URL;

const Result = () => {
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await fetch(`{${URL}/result`, {
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

  return (
    <div className="bg-amber-50 min-h-screen p-6 md:px-40 lg:px-70 w-full">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800">
          Personality Test Results
        </h2>
        <p className="mt-4 text-gray-700">
          Jungian/Myers-Briggs Personality Type is based on four preferences,
          that when combined, produce a personality type. This page will first
          cover your scores for each preference, then finally provide a
          description of your personality type.
        </p>

        <div className="space-y-6 px-16 mt-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 flex justify-between border-b-[1px] p-1">
              <span className={result.IE < 0 ? " text-red-600 font-bold" : ""}>
                Introversion (I)
              </span>{" "}
              <span className={result.IE > 0 ? " text-red-600 font-bold" : ""}>
                Extroversion (E)
              </span>
            </h3>
            <p className="text-gray-600 mt-2 px-5 text-sm">
              Introversion-Extroversion is your cognitive orientation.
              Introverts center themselves inside their bodies, while extroverts
              center their attention outside their bodies. Your score on I-E was{" "}
              <strong>{result.IE}</strong>
              (scores range from -2 to 2), which indicates your preference.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 flex justify-between border-b-[1px] p-1">
              <span className={result.SN < 0 ? " text-red-600 font-bold" : ""}>
                Sensing (S)
              </span>{" "}
              <span className={result.SN > 0 ? " text-red-600 font-bold" : ""}>
                Intuition (N)
              </span>
            </h3>
            <p className="text-gray-600 mt-2 px-5 text-sm">
              Sensing-Intuition determines how you process information—through
              your five senses or your subconscious. Your score on S-N was{" "}
              <strong>{result.SN}</strong> (scores range from -2 to 2), which
              indicates your preference.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 flex justify-between border-b-[1px] p-1">
              <span className={result.FT < 0 ? " text-red-600 font-bold" : ""}>
                Feeling (F)
              </span>{" "}
              <span className={result.FT > 0 ? " text-red-600 font-bold" : ""}>
                Thinking (T)
              </span>
            </h3>
            <p className="text-gray-600 mt-2 px-5 text-sm">
              Feeling-Thinking evaluates how you make decisions—through personal
              values or logical principles. Your score on F-T was{" "}
              <strong>{result.FT}</strong> (scores range from -2 to 2), which
              indicates your preference.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 flex justify-between border-b-[1px] p-1">
              <span className={result.JP < 0 ? " text-red-600 font-bold" : ""}>
                Judging (J)
              </span>{" "}
              <span className={result.JP > 0 ? " text-red-600 font-bold" : ""}>
                Perceiving (P)
              </span>
            </h3>
            <p className="text-gray-600 mt-2 px-5 text-sm">
              Judging-Perceiving determines your lifestyle preference—structured
              vs. flexible. Your score on J-P was <strong>{result.JP}</strong>
              (scores range from -2 to 2), which indicates your preference.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-gray-800">
            When combined, your personality type is{" "}
            <strong className="text-lg font-bold">{result.personality}</strong>.
            Below is a detailed description of your personality type:
          </p>
          <p className="mt-4 bg-black text-white p-4 shadow-xl text-sm">
            {result.description
              ? result.description
              : "No detailed description available."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Result;
