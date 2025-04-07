import React, { useEffect, useState } from "react";

const BigFiveResult = () => {
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch("/api/bigfive/results");
        if (!response.ok) {
          throw new Error("Failed to fetch results");
        }
        const data = await response.json();
        setResult(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchResults();
  }, []);

  if (!result) {
    return <div>Loading results...</div>;
  }

  return (
    <div className="big-five-results">
      <h2>Big Five Personality Test Results</h2>
      <div>
        <h3>Openness</h3>
        <p>Raw: {result.raw.O}</p>
        <p>Normalized: {result.normalized.O}%</p>
      </div>
      <div>
        <h3>Conscientiousness</h3>
        <p>Raw: {result.raw.C}</p>
        <p>Normalized: {result.normalized.C}%</p>
      </div>
      <div>
        <h3>Extraversion</h3>
        <p>Raw: {result.raw.E}</p>
        <p>Normalized: {result.normalized.E}%</p>
      </div>
      <div>
        <h3>Agreeableness</h3>
        <p>Raw: {result.raw.A}</p>
        <p>Normalized: {result.normalized.A}%</p>
      </div>
      <div>
        <h3>Neuroticism</h3>
        <p>Raw: {result.raw.N}</p>
        <p>Normalized: {result.normalized.N}%</p>
      </div>
    </div>
  );
};

export default BigFiveResult;
