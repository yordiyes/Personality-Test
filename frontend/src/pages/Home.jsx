import React from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-gray-600 font-bold text-center">
      <h1 className="mb-16 text-5xl">INSA Personality Test</h1>
      <div className="space-y-4">
        <NavLink
          to="/OEJTSTest"
          className="block p-6 bg-white shadow-lg rounded-2xl border border-gray-200 hover:shadow-xl transition duration-300"
        >
          Open Extended Jungian Type Scales
        </NavLink>
        <NavLink
          to="/OEJTS2"
          className="block p-6 bg-white shadow-lg rounded-2xl border border-gray-200 hover:shadow-xl transition duration-300"
        >
          Enneagram Test
        </NavLink>
      </div>
    </div>
  );
};

export default Home;
