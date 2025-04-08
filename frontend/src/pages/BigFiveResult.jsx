import React, { useEffect, useState } from "react";
import {
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const traitInfo = {
  O: { 
    name: "Openness", 
    color: "#8884d8", 
    description: "Openness to experience describes a person's tendency to think in abstract, complex ways, enjoy novel experiences, and seek variety."
  },
  C: { 
    name: "Conscientiousness", 
    color: "#82ca9d", 
    description: "Conscientiousness reflects a person's ability to exercise self-discipline, control, and aim for goal achievement. It involves being organized, reliable, and hardworking."
  },
  E: { 
    name: "Extraversion", 
    color: "#ff7300", 
    description: "Extraversion reflects how much a person seeks stimulation from the outside world. High extraversion is marked by sociability, assertiveness, and enthusiasm."
  },
  A: { 
    name: "Agreeableness", 
    color: "#ff6384", 
    description: "Agreeableness is characterized by compassion, cooperation, and a desire to maintain positive relationships with others. People high in agreeableness are empathetic and helpful."
  },
  N: { 
    name: "Neuroticism", 
    color: "#36a2eb", 
    description: "Neuroticism measures a person's tendency to experience negative emotions such as anxiety, fear, sadness, and mood swings. People high in neuroticism may be more sensitive to stress."
  }
};

const BigFiveResult = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${URL}/api/bigFiveTest/results`);
        if (!response.ok) throw new Error("Failed to fetch results.");
        const data = await response.json();
        if (data.error) throw new Error(data.error);
        
        // Ensure the data is in the correct format
        if (!data.raw || !data.normalized) {
          throw new Error("Invalid data format received from server");
        }
        
        setResults(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [URL]);  // Added URL to dependency array

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!results) return <p className="text-center text-red-500">No results found.</p>;

  const chartData = Object.keys(results.raw).map((trait) => ({
    name: traitInfo[trait].name,
    value: results.normalized[trait],
    color: traitInfo[trait].color
  }));

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg font-serif">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4">
        Your Big Five Personality Test Results
      </h1>

      <p className="text-center text-gray-600 mb-6">
        The Big Five model measures five key personality traits. Below are your scores based on your responses.
      </p>

      {/* Table */}
      <div className="overflow-x-auto mb-6">
        <table className="w-full table-auto border-collapse text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">Trait</th>
              <th className="p-3">Raw Score</th>
              <th className="p-3">Normalized (%)</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(results.raw).map((trait) => (
              <tr key={trait} className="border-t">
                <td className="p-3 font-medium">
                  <span style={{ color: traitInfo[trait].color }}>
                    {traitInfo[trait].name} ({trait})
                  </span>
                </td>
                <td className="p-3">{results.raw[trait]}</td>
                <td className="p-3">{results.normalized[trait]}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Chart */}
      <div className="flex justify-center items-center w-full mb-6">
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value, name) => [`${value}%`, name]} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Trait Descriptions */}
      <div className="space-y-6">
        {Object.keys(traitInfo).map((trait) => (
          <div key={trait} className="border-t pt-6">
            <h3 className="text-xl font-semibold" style={{ color: traitInfo[trait].color }}>
              {traitInfo[trait].name}
            </h3>
            <p className="text-gray-700 mt-2">{traitInfo[trait].description}</p>
          </div>
        ))}
      </div>

      {/* Footer Message */}
      <div className="text-center text-sm text-gray-600 mt-4">
        <p>
          These scores provide insights into your personality traits. Use them to understand yourself better or guide personal development.
        </p>
      </div>
    </div>
  );
};

export default BigFiveResult;