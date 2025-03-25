import React, { useEffect, useState } from "react";

const Result = () => {
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/result", {
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
        alert("Error submitting your answers.");
      }
    };

    fetchResult();
  }, []); // Empty array means this runs only once, when the component mounts.

  return (
    <div className="bg-amber-100 h-screen p-4 md:px-30 lg:px-50 w-full">
      <p>You have completed the personality test.</p>
      <p className="my-3">
        Jungian/Myers-Briggs Personality Type is based on four preferences, that
        when combined produce personality type. This page will first cover your
        scores for each of the preferences then finally give a description for
        the type that they produce.
      </p>
      {result && (
        <div className="results">
          <h2>Your Results</h2>
          <p>
            <strong>IE Score:</strong> {result.IE}
          </p>
          <p>
            <strong>SN Score:</strong> {result.SN}
          </p>
          <p>
            <strong>FT Score:</strong> {result.FT}
          </p>
          <p>
            <strong>JP Score:</strong> {result.JP}
          </p>
          <h3>
            Your Personality Type:{" "}
            <span className="font-bold"> {result.personality}</span>
          </h3>
        </div>
      )}
    </div>
  );
};

export default Result;
