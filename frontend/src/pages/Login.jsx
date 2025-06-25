import React from "react";
import { Brain, User, TrendingUp, Mail, KeyRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/home");
  };

  return (
    <div className=" h-screen sm:h-auto flex flex-col mx-2 sm:m-10 shadow-2xl rounded-xl">
      <div className="flex flex-1">
        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 relative flex items-center justify-center p-6 overflow-hidden bg-gray-50">
          {/* Blurry Background Image */}
          <img
            src="/logo.png"
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover opacity-5 z-0 p-20"
          />

          {/* Content */}
          <div className="w-full max-w-md z-10 py-6 ">
            {/* Logo & Title */}
            <div className="text-center mb-8">
              <h2 className="mt-4 text-2xl font-extrabold text-gray-900">
                Welcome Back!
              </h2>
              <p className="text-sm font-medium text-gray-700 opacity-90">
                Enter your credentials to access your account
              </p>
            </div>

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    required
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 font-medium"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1">
                  Password
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 font-medium"
                  />
                </div>
              </div>

              {/* Checkbox + Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span className="text-sm font-medium text-gray-800">
                    Remember me
                  </span>
                </label>
                <a
                  href="#"
                  className="text-sm font-semibold text-blue-600 hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 px-4 rounded-lg font-semibold transition mt-10 shadow-md"
              >
                Login
              </button>
            </form>

            <p className="mt-6 text-sm font-semibold text-blue-600 text-right">
              <a href="#">Need help?</a>
            </p>
          </div>
        </div>

        {/* Left Side - Illustration */}
        <div className="hidden md:flex w-1/2 bg-[#0f172a] justify-center relative">
          <img
            src="/img6.jpg"
            alt="Brain Illustration"
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />

          <div className="z-10 text-left font-bold mb-4 text-gray-300 absolute bottom-10 left-10">
            <h2 className="text-2xl">Personality Testing Platform</h2>
            <p className="text-[12px] italic text-gray-400 max-w-lg mt-2">
              Unlock insights into your personality and career with tailored
              tests designed to help you grow, evolve, and make informed
              decisions.
            </p>

            {/* Icons Section */}
            <div className="flex items-center gap-6 mt-2">
              <div className="flex flex-col items-center">
                <Brain className="w-6 h-6 text-indigo-400" />
                <span className="text-[10px] text-gray-400 mt-1">
                  Cognitive
                </span>
              </div>

              <div className="flex flex-col items-center">
                <User className="w-6 h-6 text-indigo-400" />
                <span className="text-[10px] text-gray-400 mt-1">
                  Personality
                </span>
              </div>

              <div className="flex flex-col items-center">
                <TrendingUp className="w-6 h-6 text-indigo-400" />
                <span className="text-[10px] text-gray-400 mt-1">Growth</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
