import React from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-gray-600 font-bold text-center font-serif">
      <h1 className="mb-16 text-3xl sm:text-5xl">INSA Personality Test</h1>
      <div className="space-y-4 font-mono">
        <NavLink
          to="/OEJTSTest"
          className="block p-6 bg-white shadow-lg rounded-2xl border border-gray-200 hover:shadow-xl transition duration-300"
        >
          Open Extended Jungian Type Scales
        </NavLink>
        <NavLink
          to="/Enneagram"
          className="block p-6 bg-white shadow-lg rounded-2xl border border-gray-200 hover:shadow-xl transition duration-300"
        >
          Enneagram Test
        </NavLink>
        <NavLink
          to="/reasec"
          className="block p-6 bg-white shadow-lg rounded-2xl border border-gray-200 hover:shadow-xl transition duration-300"
        >
          Holland Code Career Test
        </NavLink>
        <NavLink
          to="/BigFive"
          className="block p-6 bg-white shadow-lg rounded-2xl border border-gray-200 hover:shadow-xl transition duration-300"
        >
          Big Five Personality Test
        </NavLink>
      </div>
    </div>
  );
};

export default Home;
