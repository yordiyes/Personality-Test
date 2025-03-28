import React, { useEffect } from "react";
const URL = import.meta.env.VITE_API_URL;

const EnneagramResult = () => {
  const [result, setResult] = React.useState(null);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await fetch(`${URL}/api/scores`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch results");
        }

        const data = await response.json();
        setResult(data);
      } catch (err) {
        console.error(err);
        alert("Error fetching your results.");
      }
    };

    fetchResult();
  }, []);

  if (!result) {
    return (
      <p className="text-center mt-10 text-gray-600">Loading results...</p>
    );
  }
  return (
    <div className="min-h-screen w-full font-serif p-4">
      <div className="sm:mb-0 pb-10  md:w-[60%] md:mx-auto sm:px-5 sm:m-8 sm:shadow-2xl md:px-10 lg:px-20">
        <h2 className="text-2xl font-bold text-gray-800">
          Enneagram Test Results
        </h2>

        <p className="mt-4 text-gray-700 text-[15px]">
          Your Enneagram type is a representation of your core motivations,
          fears, and desires. This test provides insights into your personality
          and how you relate to the world around you.
        </p>
        <h3 className="font-semibold text-lg mt-7">Your Type:</h3>
        <div className=" border-[1px]  p-6 mb-10 mt-4 mx-10 bg-gray-100">
          <p className="text-gray-700 text-[15px]">
            You are most likely a <strong>{result[0].type}</strong>.{" "}
            <em>{result[0].typeName}</em>.
          </p>
          <p className="text-[15px] mt-2">
            Taking wings into account, you seem to be a <strong>3w4</strong>
          </p>
          <div className="p-4 py-10 sm:px-8 md:px-20">
            {result.map(({ type, score }) => (
              <div key={type} className="mb-1 relative">
                <div className="w-full bg-white h-6 flex items-center">
                  <div
                    className="bg-gray-300 h-6 px-2 text-xs font-semibold"
                    style={{ width: `${score}%` }}
                  >
                    {type}: {score}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p>
          No personality test is completely accurate. Although several measures
          were taken to make this test as accurate as possible, there's always a
          chance that you are not typed correctly by it. Therefore, when
          deciding which Enneagram type and wing you are, you might also want to
          consider the types with the highest test scores on the lists below.
        </p>
      </div>
    </div>
  );
};

export default EnneagramResult;
