import Header from "./Header";
import SideBar from "./SideBar";
import TestCard from "./TestCard";

const Tests = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header Section */}
      <Header />

      {/* Body Section */}
      <div className="flex flex-1 min-h-0 bg-gray-100">
        {/* Sidebar Section */}
        <div className="hidden md:block">
          <SideBar />
        </div>

        {/* Main Content Section */}
        <div className="flex-1 p-4 md:p-8 overflow-y-auto space-y-10">
          {/* Welcome Section */}
          <div className="bg-white shadow-xl rounded-lg p-6 border-l-5 border-indigo-600 text-sm">
            <h2 className="text-2xl  font-semibold text-indigo-700">
              Assessment Center
            </h2>
            <p className=" text-gray-600 mt-2 text-[14px]">
              Discover yourself through a variety of personality and career
              assessments designed to give insights into your behavior,
              preferences, and strengths. Whether you're making career decisions
              or exploring personal growth, these tests are a great place to
              start.
            </p>

            <div className="mt-4 text-base text-gray-700">
              <p className="font-semibold text-indigo-700">
                Unlock Your Full Potential
              </p>
              <p className="mt-2 text-[14px]">
                By taking these assessments, you're taking an important step
                toward personal growth. Each test is designed to challenge your
                self-perception and push you to explore new areas of your
                personality, preferences, and capabilities. Whether you uncover
                hidden strengths or recognize areas for improvement, this
                journey will help you build a deeper understanding of yourself
                and empower you to make more informed life and career decisions.
              </p>
              <p className="mt-2 text-[14px]">
                These assessments don't just offer a snapshot of who you
                are—they provide actionable insights that can guide your
                development and help you align your life goals with your natural
                inclinations. The more you challenge yourself through
                self-discovery, the more equipped you'll be to navigate life
                with confidence and clarity.
              </p>
            </div>
          </div>

          {/* Test Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <TestCard
              title="MBTI Personality Test"
              description="Understand how you perceive the world and interact with others through the 4-dimension MBTI framework."
              estimatedTime="15–20 minutes"
              status="Not Started"
              link="/OEJTSTest"
              color="green"
            />
            <TestCard
              title="Enneagram Test"
              description="Explore your core fears and desires to identify your Enneagram type."
              estimatedTime="20–25 minutes"
              status="Not Started"
              link="/Enneagram"
              color="purple"
            />
            <TestCard
              title="Big Five Personality Test"
              description="Measure Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism."
              estimatedTime="10–15 minutes"
              status="Not Started"
              link="/BigFive"
              color="blue"
            />
            <TestCard
              title="Holland Code Career Test"
              description="Discover which career paths align with your interests using the RIASEC model."
              estimatedTime="10–15 minutes"
              status="Not Started"
              link="/reasec"
              color="orange"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tests;
