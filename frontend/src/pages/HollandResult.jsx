import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LabelList,
} from "recharts";
const hollandDescriptions = {
  RIA: {
    description:
      "Innovative problem-solvers who enjoy hands-on work and scientific exploration. They combine technical skills with analytical thinking.",
    careers: [
      "Engineer",
      "Lab Technician",
      "Archaeologist",
      "Automotive Designer",
    ],
  },
  RIS: {
    description:
      "Detail-oriented individuals who enjoy practical work while also helping others in structured ways.",
    careers: [
      "Physical Therapist",
      "Occupational Therapist",
      "Medical Technician",
    ],
  },
  RIE: {
    description:
      "Independent thinkers who love to experiment and create solutions with a strong business sense.",
    careers: ["Entrepreneur", "Product Designer", "Industrial Engineer"],
  },
  RIC: {
    description:
      "Technical and detail-focused individuals who enjoy structured tasks and data-driven decision-making.",
    careers: ["IT Specialist", "Systems Analyst", "Quality Control Inspector"],
  },
  RAS: {
    description:
      "Creative and hands-on workers who enjoy artistic expression in practical settings.",
    careers: ["Interior Designer", "Fashion Designer", "Craftsperson"],
  },
  RAE: {
    description:
      "Innovators who excel in leadership while applying practical and artistic skills.",
    careers: ["Marketing Director", "Art Director", "Advertising Manager"],
  },
  RAC: {
    description:
      "Efficient workers who prefer structured, hands-on tasks with a focus on organization.",
    careers: [
      "Construction Manager",
      "Architectural Drafter",
      "Project Coordinator",
    ],
  },
  RSE: {
    description:
      "Active and social individuals who like solving real-world problems while engaging with people.",
    careers: ["Coach", "Firefighter", "Police Officer"],
  },
  RSC: {
    description:
      "Hands-on workers who excel in structured environments and problem-solving roles.",
    careers: ["Mechanic", "Electrician", "Plumber"],
  },
  REC: {
    description:
      "Practical and logical thinkers who excel in technical work and data organization.",
    careers: ["Database Administrator", "Logistics Manager", "Surveyor"],
  },
  IAS: {
    description:
      "Curious and creative individuals who thrive in research and interpersonal engagement.",
    careers: ["Psychologist", "Research Scientist", "University Professor"],
  },
  IAE: {
    description:
      "Innovators who apply scientific thinking to leadership and communication.",
    careers: ["Business Consultant", "Market Research Analyst", "Economist"],
  },
  IAC: {
    description:
      "Detail-oriented thinkers who prefer structured research and technical analysis.",
    careers: ["Statistician", "Data Scientist", "Technical Writer"],
  },
  ISE: {
    description:
      "Empathetic and curious professionals who enjoy working with people and solving social issues.",
    careers: ["Social Worker", "Counselor", "Public Health Analyst"],
  },
  ISC: {
    description:
      "Logical and structured individuals who prefer research and administrative work.",
    careers: ["Librarian", "Accountant", "Records Manager"],
  },
  IEC: {
    description:
      "Methodical and data-driven professionals who focus on efficiency and structured research.",
    careers: ["Actuary", "Financial Analyst", "Compliance Officer"],
  },
  ASE: {
    description:
      "Outgoing and creative individuals who enjoy artistic expression and social engagement.",
    careers: ["Actor", "Musician", "Public Relations Specialist"],
  },
  ASC: {
    description:
      "Creative yet organized individuals who thrive in structured artistic roles.",
    careers: ["Graphic Designer", "Editor", "Event Planner"],
  },
  AEC: {
    description:
      "Visionary professionals who merge creativity with business acumen and organization.",
    careers: ["Art Director", "Creative Director", "Entrepreneur"],
  },
  SEC: {
    description:
      "Socially responsible individuals who enjoy working in organized, structured environments.",
    careers: ["Human Resources Manager", "Administrative Assistant", "Teacher"],
  },
};

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
  "#ffc658",
  "#ff7300",
  "#ff6384",
  "#36a2eb",
];

const HollandResult = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const URL = import.meta.env.VITE_API_URL; // API URL

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
            percentage: ((item.score / 7) * 100).toFixed(2), // Convert to percentage
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

  return (
    <div className="max-w-2xl mx-auto sm:p-6 py-6 px-3 bg-white shadow-lg rounded-lg">
      <h1 className=" text-xl sm:text-2xl font-bold mb-4 text-center">
        Your Holland Code (RIASEC) Results
      </h1>

      <div className="bg-gray-100 p-4 rounded-lg">
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

        {/* <h2 className="text-lg font-semibold mt-4 mb-2">Category Scores:</h2> */}
        {/* <ul className="list-disc pl-5">
        {sortedScores.map((item) => (
          <li key={item.type} className="text-lg">
            <span className="font-bold">{item.type}:</span> {item.percentage}%
          </li>
        ))}
      </ul> */}
        {hollandDescriptions[hollandCode] && (
          <div className="m-5 mt-20">
            <h2 className="text-xl font-bold">
              {hollandCode} Personality Type:
            </h2>
            <p className="mt-4 text-lg  italic">
              {hollandDescriptions[hollandCode].description}
            </p>

            <h3 className="mt-4 text-xl font-semibold">Career Suggestions:</h3>
            <ul className="mt-2 list-disc list-inside">
              {hollandDescriptions[hollandCode].careers.map((career, index) => (
                <li key={index} className="text-lg">
                  {career}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Chart Section */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold text-center mb-4">
          Personality Score Distribution
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={sortedScores}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="type" />
            <YAxis unit="%" />
            <Tooltip
              formatter={(value, name, props) => [
                `${value}%`,
                typeNames[props.payload.type] || name,
              ]}
            />
            <Bar dataKey="percentage" fill="#3b82f6" radius={[5, 5, 0, 0]}>
              <LabelList
                dataKey="percentage"
                position="top"
                fill="#000"
                fontSize={14}
                fontWeight="bold"
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HollandResult;
