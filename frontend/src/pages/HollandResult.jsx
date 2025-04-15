import React, { useEffect, useState } from "react";
import hollandDescriptions from "./data/Descriptions/HollandDescription";
import {
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LabelList,
} from "recharts";
import { NavLink } from "react-router-dom";

const typeNames = {
  R: "Realistic",
  I: "Investigative",
  A: "Artistic",
  S: "Social",
  E: "Enterprising",
  C: "Conventional",
};

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ff7300",
  "#ffc658",

  "#ff6384",
  "#36a2eb",
];

const HollandResult = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await fetch(`${URL}/api/riasec/calculate`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch results");
        }

        const data = await response.json();
        setResult(
          data.personalityScores.map((item) => ({
            ...item,
            percentage: Number(((item.score / 7) * 100).toFixed(2)), // Convert to number
          }))
        );
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
  const sortedScores = [...result].sort((a, b) => b.percentage - a.percentage);

  // Determine Holland Code (top 3 personality types)
  const hollandCode = sortedScores
    .slice(0, 3)
    .map((item) => item.type)
    .join("");

  // Determines degree of consistency from top 2 types
  const getConsistencyDegree = (first, second) => {
    const high = new Set([
      "RI",
      "RC",
      "IR",
      "IA",
      "AI",
      "AS",
      "SA",
      "SE",
      "ES",
      "EC",
      "CE",
      "CR",
    ]);
    const medium = new Set([
      "RA",
      "RE",
      "IS",
      "IC",
      "AR",
      "AE",
      "SI",
      "SC",
      "EA",
      "ER",
      "CS",
      "CI",
    ]);
    const low = new Set(["RS", "IE", "AC", "SR", "EI", "CA"]);

    const combo = first + second;
    const reverseCombo = second + first;

    if (high.has(combo) || high.has(reverseCombo)) return "High";
    if (medium.has(combo) || medium.has(reverseCombo)) return "Medium";
    if (low.has(combo) || low.has(reverseCombo)) return "Low";

    return "Unknown";
  };

  return (
    <div className="max-w-6xl mx-auto sm:p-6 py-6 bg-white shadow-lg rounded-lg font-serif">
      <h1 className=" text-xl sm:text-2xl font-bold mb-4 text-center">
        Your Holland Code (RIASEC) Results
      </h1>

      <div className="bg-gray-100 py-4 rounded-lg">
        <h2 className="text-xl font-semibold text-center mb-2">
          Your Personality Type:
        </h2>

        <p className="text-center text-xl sm:text-2xl font-bold text-gray-700">
          {sortedScores
            .slice(0, 3)
            .map((item) => typeNames[item.type])
            .join(", ")}
          <span className="text-gray-500"> ({hollandCode})</span>
        </p>
        <div className=" text-lg grid lg:grid-cols-2  items-center mt-4">
          <div className="m-5 mb-0 sm:mt-20">
            <div>
              <h2 className="text-xl font-bold">
                {typeNames[hollandCode[0]]} Personality Type:
              </h2>
              <p className="mt-4 ">
                {hollandDescriptions[hollandCode[0]]?.description}
              </p>
              {/* Degree of Consistency */}
              <div className="mt-6 border-l-4 border-blue-500 bg-blue-50 p-4 rounded-md shadow-sm">
                <h3 className="text-lg font-semibold text-blue-800 mb-1">
                  Degree of Consistency:
                </h3>
                <p className="text-gray-800">
                  Your top two personality types are{" "}
                  <strong>{typeNames[sortedScores[0].type]}</strong> and{" "}
                  <strong>{typeNames[sortedScores[1].type]}</strong> (
                  {sortedScores[0].type + sortedScores[1].type}
                  ), which indicates a{" "}
                  <strong>
                    {getConsistencyDegree(
                      sortedScores[0].type,
                      sortedScores[1].type
                    )}{" "}
                    degree of consistency
                  </strong>
                  .
                </p>
                <p className="text-sm text-gray-600 mt-2 italic">
                  {(() => {
                    const degree = getConsistencyDegree(
                      sortedScores[0].type,
                      sortedScores[1].type
                    );
                    if (degree === "High") {
                      return "You have a well-aligned and focused personality profile, which may lead to more consistent career preferences.";
                    } else if (degree === "Medium") {
                      return "Your personality types are moderately aligned. You may show flexibility in your career interests while maintaining some consistency.";
                    } else if (degree === "Low") {
                      return "Your top traits are less naturally aligned, suggesting broader interests or a more complex personality that may explore diverse career paths.";
                    } else {
                      return "Insufficient data to determine consistency.";
                    }
                  })()}
                </p>
              </div>

              <h3 className="mt-4 text-xl font-semibold">
                Career Suggestions:
              </h3>
              <ul className="mt-2 list-disc list-inside italic text-sm grid grid-cols-1 sm:grid-cols-2 gap-2">
                {hollandDescriptions[hollandCode[0]]?.careers.map(
                  (career, index) => (
                    <li key={index}>{career}</li>
                  )
                )}
              </ul>
            </div>
          </div>
          {/* Chart Section */}
          <div className=" sm:ml-[-1.5rem]">
            <div className="flex flex-col sm:flex-row items-center mt-[-3.2rem] sm:mt-0">
              {/* Pie Chart */}
              <ResponsiveContainer width={400} height={400}>
                <PieChart>
                  <Pie
                    className=" text-sm"
                    data={sortedScores.filter((item) => item.percentage > 0)} // Hide zero scores
                    dataKey="percentage"
                    nameKey="type"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#3b82f6"
                    label={
                      ({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%` // Display type and percentage inside the pie slices
                    }
                  >
                    {sortedScores
                      .filter((item) => item.percentage > 0)
                      .map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name, props) => [
                      `${value}%`,
                      typeNames[name],
                    ]} // Shows percentage & type in tooltip
                  />
                </PieChart>
              </ResponsiveContainer>

              {/* Legend (beside the chart) */}
              <div className="mt-4 sm:mt-0 hidden sm:block">
                <h3 className="text-md font-semibold mb-2 text-center">
                  Legend
                </h3>
                <ul className="space-y-1 fonmo">
                  {sortedScores
                    .filter((item) => item.percentage > 0)
                    .map((entry, index) => (
                      <li key={entry.type} className="flex items-center">
                        <span
                          className="w-4 h-4 inline-block mr-2 rounded"
                          style={{
                            backgroundColor: COLORS[index % COLORS.length],
                          }}
                        ></span>
                        <span className="text-sm">
                          {entry.type}: <em>{typeNames[entry.type]}</em>
                        </span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>{" "}
        </div>
        <div className="m-5">
          <NavLink to="/" className="bg-neutral-300 p-2 border-[1px] mt-3">
            Home Page
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default HollandResult;
