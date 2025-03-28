import React from "react";
import { NavLink } from "react-router-dom";

const EnneagramPage = () => {
  return (
    <div className="m-4  sm:mb-0 font-serif md:w-[60%] md:mx-auto sm:m-8 sm:shadow-2xl md:px-20">
      <div>
        <h1 className=" text-[23px] font-semibold my-5">
          Eclectic Energies Enneagram Tests
        </h1>
        <p className=" font-bold font-sans">
          These two Enneagram tests help you determine which personality type
          you are. Your wing will also be indicated.
        </p>
      </div>

      <div className="my-5 font-serif">
        <h2 className="font-semibold text-lg pb-3">Classical enneagram test</h2>
        <p>
          This test has pages with 9 questions or less (1 for each Enneagram
          type). You'll get less questions per page after having answered enough
          questions to establish which types you are not.
        </p>
        <div className="my-5">
          <NavLink
            to="/E-test"
            className="ml-[20%] bg-neutral-300 p-2 border-[1px] mt-3"
          >
            Enneagram test &gt;&gt;
          </NavLink>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="font-semibold pb-3">
          Enneagram test with instinctual variant
        </h2>
        <p>
          With this test you get pairs of character traits to rate. It is
          quicker than the other test, and indicates your instinctual subtype as
          well.
        </p>
        <div className="my-5 border-b-2 pb-13 border-gray-400">
          <NavLink className="ml-[20%] bg-neutral-300 p-2 border-[1px] mt-3">
            Enneagram test 2 &gt;&gt;
          </NavLink>
        </div>
      </div>

      <div>
        <h3 className=" font-semibold mb-3">
          Getting accurate results from these Enneagram tests
        </h3>
        <p className="mb-4">
          It's important to answer the questions honestly. Try not to answer
          them in terms of how you would like to see yourself, but in terms of
          how you actually are, or have tended to be in the past.
        </p>
        <p className="mb-4">
          Actually it is not so easy to answer the questions honestly, as we all
          want to see ourselves as better than we are, and we often have
          preconceived ideas about ourselves that are not really true.
        </p>
        <p className="mb-4">
          For instance, if you resent being fearful, you might have worked to
          develop courage to compensate, but the fear is still there beneath the
          surface. Sometimes a trait might be so inconsistent with our
          self-image, that we actually deny having it ourselves, but become
          annoyed by it when we see it in others. Also, we might falsely think
          that we possess some desirable quality that we admire in others
        </p>
        <p className="pb-6">
          To derive accurate results from any Enneagram test, it is important to
          be aware of these very natural tendencies, and to answer the questions
          honestly.
        </p>
      </div>
    </div>
  );
};

export default EnneagramPage;
