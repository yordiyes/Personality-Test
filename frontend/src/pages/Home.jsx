import React from "react";
import { NavLink } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";

const Home = () => {
  return (
    <div>
      <Header />

      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <SideBar />

        {/* Main Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">
                Welcome Back, Sarah!
              </h1>
              <p className="text-sm text-gray-500">
                Complete your personality assessment tests
              </p>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-sm text-gray-500">Tests Completed</p>
              <p className="text-lg font-bold text-green-600">2/4</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-sm text-gray-500">Time Remaining</p>
              <p className="text-lg font-bold text-orange-500">30 min</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-sm text-gray-500">Tests Pending</p>
              <p className="text-lg font-bold text-red-500">2</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-sm text-gray-500">Overall Progress</p>
              <p className="text-lg font-bold text-blue-500">50%</p>
            </div>
          </div>

          {/* Test Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg transition-all hover:shadow-xl">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-blue-600">
                  MBTI Test
                </h3>
                <p className="text-[12px] text-gray-700 bg-orange-200 rounded-full px-2 py-[1px]">
                  Not Started
                </p>
              </div>
              <p className="text-sm text-gray-500 mb-2">
                Understand preferences & interaction
              </p>
              <div className="flex justify-between items-center">
                <span className="text-[12px] text-gray-400">
                  <em>Est. time:</em> <br /> 15-20 minutes
                </span>
                <NavLink
                  to="/OEJTSTest"
                  className="bg-blue-500 text-white rounded-sm px-3 py-1 hover:bg-blue-600 transition-all"
                >
                  Start Test
                </NavLink>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg transition-all hover:shadow-xl">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-purple-600">
                  Enneagram Test
                </h3>
                <p className="text-[12px] text-gray-700 bg-orange-200 rounded-full px-2 py-[1px]">
                  Not Started
                </p>
              </div>
              <p className="text-sm text-gray-500 mb-2">
                Understand your fears and desires
              </p>
              <div className="flex justify-between items-center">
                <span className="text-[12px] text-gray-400">
                  <em>Est. time:</em> <br /> 20-25 minutes
                </span>
                <NavLink
                  to="/Enneagram"
                  className="bg-purple-500 text-white rounded-sm px-3 py-1 hover:bg-purple-600 transition-all"
                >
                  Start Test
                </NavLink>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg transition-all hover:shadow-xl">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-teal-600">
                  Big Five Test
                </h3>
                <p className="text-[12px] text-gray-700 bg-orange-200 rounded-full px-2 py-[1px]">
                  Not Started
                </p>
              </div>
              <p className="text-sm text-gray-500 mb-2">
                Evaluate 5 personality dimensions
              </p>
              <div className="flex justify-between items-center">
                <span className="text-[12px] text-gray-400">
                  <em>Estimation time:</em> <br /> 10-15 minutes
                </span>
                <NavLink
                  to="/BigFive"
                  className="bg-teal-500 text-white rounded-sm px-3 py-1 hover:bg-teal-600 transition-all"
                >
                  Start Test
                </NavLink>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg transition-all hover:shadow-xl">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-orange-600">
                  Holland Code Career Test
                </h3>
                <p className="text-[12px] text-gray-700 bg-orange-200 rounded-full px-2 py-[1px]">
                  Not Started
                </p>
              </div>
              <p className="text-sm text-gray-500 mb-2">
                Identify career interests
              </p>
              <div className="flex justify-between items-center">
                <span className="text-[12px] text-gray-400">
                  <em>Est. time:</em> <br /> 10-15 minutes
                </span>
                <NavLink
                  to="/reasec"
                  className="bg-orange-500 text-white rounded-sm px-3 py-1 hover:bg-orange-600 transition-all"
                >
                  Start Test
                </NavLink>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-10">
            <h4 className="font-semibold text-gray-700 mb-4">
              Recent Activity
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                ✅ Big Five Test Completed{" "}
                <span className="text-gray-400 ml-2">2 hours ago</span>
              </li>
              <li>
                ✅ Enneagram Test Completed{" "}
                <span className="text-gray-400 ml-2">3 hours ago</span>
              </li>
              <li>
                🔄 Assessment Started{" "}
                <span className="text-gray-400 ml-2">4 hours ago</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
