import React from "react";

const Header = () => {
  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-sm">
      {/* Left - Logo/Title */}
      <div className="text-xl font-bold text-slate-700">
        <img
          src="/logo.png" // Replace with actual logo path
          alt="Logo"
          className="h-8 w-8 inline-block mr-2"
        />
        <span>INSA Personality Testing</span>
      </div>

      {/* Right - User Profile */}
      <div className="flex items-center space-x-3">
        <div className="text-right">
          <div className="font-semibold text-gray-700">Sarah Johnson</div>
          <div className="text-sm text-gray-500">Employee</div>
        </div>
        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover border border-gray-300 shadow-sm"
        />
      </div>
    </header>
  );
};

export default Header;
