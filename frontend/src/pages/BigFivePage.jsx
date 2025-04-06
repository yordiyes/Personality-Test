import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const BigFivePage = () => {
  return (
    <div className="md:w-[60%] md:mx-auto sm:m-8 m-5 font-serif">
      <p>
        This is an interactive version of the
        <span className="font-bold ml-1">Big Five Personality Test</span>, also
        known as the Five-Factor Model (FFM). It is one of the most
        scientifically validated and widely used models to understand human
        personality.
      </p>

      <p className="my-4">
        <span className="font-bold">Introduction: </span>
        The Big Five Personality Test measures five key dimensions of
        personality:
        <span className="font-bold">
          {" "}
          Openness, Conscientiousness, Extraversion, Agreeableness,
        </span>{" "}
        and
        <span className="font-bold"> Neuroticism</span>—commonly referred to by
        the acronym OCEAN. These traits represent broad domains of human
        behavior and thought. The test helps individuals understand themselves
        better and is widely used in psychological research and career
        assessments. Each question is answered using a five-point scale, ranging
        from Inaccurate to Accurate, allowing users to reflect how well each
        statement describes them.
      </p>

      {/* Update the NavLink */}
      <NavLink
        to="/B-test/test"
        className="px-5 py-2 bg-neutral-300 p-2 border-[1px]"
      >
        Start Test &gt;&gt;
      </NavLink>

      <Outlet />
    </div>
  );
};

export default BigFivePage;
