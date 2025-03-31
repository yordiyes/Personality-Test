import React, { useEffect, useState } from "react";

const HollandResult = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const URL = import.meta.env.VITE_API_URL; // API URL

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await fetch(`${URL}/api/calculate`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch results");
        }

        const data = await response.json();
        setResult(data.personalityScores);
      } catch (err) {
        console.error(err);
        alert("Error fetching your results.");
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [URL]);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (!result || result.length === 0)
    return <p className="text-center text-red-500">No results found.</p>;

  // Sort scores in descending order
  const sortedScores = [...result].sort((a, b) => b.score - a.score);

  // Determine Holland Code (top 3 personality types)
  const hollandCode = sortedScores
    .slice(0, 3)
    .map((item) => item.type)
    .join("");

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Your Holland Code (RIASEC) Results
      </h1>

      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold text-center mb-2">
          Your Personality Type:
        </h2>
        <p className="text-center text-2xl font-bold text-blue-600">
          {hollandCode}
        </p>
      </div>

      <h2 className="text-lg font-semibold mt-4 mb-2">Category Scores:</h2>
      <ul className="list-disc pl-5">
        {sortedScores.map((item) => (
          <li key={item.type} className="text-lg">
            <span className="font-bold">{item.type}:</span> {item.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HollandResult;
