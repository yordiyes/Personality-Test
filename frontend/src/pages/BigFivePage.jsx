import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const BigFivePage = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 font-serif">
      <div className="bg-white shadow-xl rounded-2xl p-8 md:p-12 text-gray-800">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-indigo-600">
          Big Five Personality Test
        </h1>

        <p className="text-lg leading-relaxed mb-4">
          Welcome to the interactive version of the{" "}
          <span className="font-bold text-indigo-700">
            Big Five Personality Test
          </span>
          , also known as the Five-Factor Model (FFM). This model is one of the
          most scientifically validated and widely used tools for understanding
          human personality.
        </p>

        <p className="text-lg leading-relaxed mb-6">
          <span className="font-bold text-indigo-700">Introduction:</span> This
          test assesses five core dimensions of personality:{" "}
          <span className="font-semibold text-indigo-500">
            Openness, Conscientiousness, Extraversion, Agreeableness,
          </span>{" "}
          and <span className="font-semibold text-indigo-500">Neuroticism</span>{" "}
          (collectively known as OCEAN). It helps you better understand your
          unique personality makeup. Each question is answered on a five-point
          scale, ranging from Inaccurate to Accurate.
        </p>

        <div className="flex justify-center">
          <NavLink
            to="/B-test/test"
            className="inline-block text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300 ease-in-out px-8 py-3 rounded-full shadow-md font-semibold text-lg"
          >
            Start the Test &rarr;
          </NavLink>
        </div>
      </div>

      <div className="mt-10">
        <Outlet />
      </div>
    </div>
  );
};

export default BigFivePage;
