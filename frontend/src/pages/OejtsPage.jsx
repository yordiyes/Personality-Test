import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const OejtsPage = () => {
  return (
    <div className="md:w-[60%] md:mx-auto sm:m-8 m-5 font-serif ">
      <p>
        This is an interactive version of the
        <span className=" font-bold ml-1">
          Open Extended Jungian Type Scales 1.2,
        </span>{" "}
        an alternative to the Myers-Briggs Type Indicator.
      </p>
      <p className="my-4">
        <span className=" font-bold">Introduction: </span>
        Carl Jung (1875-1961) was Swiss psychiatrist who proposed a theory of
        psychological types. His theory was taken and extended by Katharine
        Briggs and her daughter, Isabel Myers, personality enthusiasts who had
        studied his work extensively. They developed the Myers-Briggs Type
        Indicator which classified people into 16 different types on the basis
        of four dichotomies: Introversion-Extroversion, Sensing-Intuition,
        Thinking-Feeling, and Judging-Perceiving. The first three were adapted
        from Jung and the last developed by Myers-Briggs. So, for example, a
        person could be Extroverted-Sensing-Feeling-Perceiving (ESFP) or
        Introverted-iNtuiting-Thinking-Judging (INTJ). The Myers-Briggs types
        are the most popular pop-psych system. The Open Extended Jungian Type
        Scales was developed as an open source alternative to the Myers-Briggs
        Type Indicator. A statistical comparison of the OEJTS with three other
        on-line MBTI alternatives found that the OEJTS was the most accurate.
      </p>

      <NavLink
        to="/OEJTSTest/oepage1"
        className="px-5 py-2 bg-neutral-300 p-2 border-[1px]"
      >
        Start Test &gt;&gt;
      </NavLink>

      <Outlet />
    </div>
  );
};

export default OejtsPage;
