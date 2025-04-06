import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";

const traitDescriptions = {
  Openness:
    "You are imaginative, curious, and open to new experiences and ideas. You appreciate art, enjoy philosophical discussions, and are open-minded in your thinking.",
  Conscientiousness:
    "You are organized, responsible, and good at planning. You likely keep things tidy, meet deadlines, and are goal-oriented.",
  Extraversion:
    "You are energetic, talkative, and enjoy being around others. You thrive in social situations and tend to be enthusiastic and outgoing.",
  Agreeableness:
    "You are compassionate, kind, and cooperative. You get along well with others and value helping and trusting people.",
  Neuroticism:
    "You tend to experience emotional ups and downs. You may often feel anxious, worried, or insecure, but also may be more emotionally aware.",
};

const BigFiveResult = () => {
  const location = useLocation();
  const traitAverages = location.state?.result || [];

  if (traitAverages.length === 0) {
    return (
      <div className="p-8 max-w-4xl mx-auto text-center">
        <h2 className="text-xl font-bold text-red-600">
          No results found. Please complete the test first.
        </h2>
      </div>
    );
  }

  const topTrait = traitAverages.reduce((max, current) =>
    current.score > max.score ? current : max
  );

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Your Personality Trait Scores</h2>
      <p className="mb-6 text-gray-700">
        This Big Five assessment measures your scores on five major dimensions
        of personality: Openness, Conscientiousness, Extraversion,
        Agreeableness, and Neuroticism (OCEAN).
      </p>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          layout="vertical"
          data={traitAverages}
          margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" domain={[0, 100]} />
          <YAxis type="category" dataKey="trait" />
          <Tooltip />
          <Bar dataKey="score" fill="#69b3a2" />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-2">Your Traits in Action</h3>
        <p className="text-gray-800 leading-relaxed">
          Your highest trait is <strong>{topTrait.trait}</strong>.{" "}
          {traitDescriptions[topTrait.trait]}
        </p>
      </div>
      <div className="m-5">
        <NavLink to="/" className="bg-neutral-300 p-2 border-[1px] mt-3">
          Home Page
        </NavLink>
      </div>
    </div>
  );
};

export default BigFiveResult;
