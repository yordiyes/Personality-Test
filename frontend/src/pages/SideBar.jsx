import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, FileText, User } from "lucide-react";

const SideBar = ({ isOpen }) => {
  const location = useLocation();
  const isDashboard = location.pathname === "/home";

  const linkClass = (isActive) =>
    `flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
      isActive
        ? "bg-indigo-100 text-indigo-700 font-semibold"
        : "hover:bg-gray-100 hover:text-indigo-600"
    }`;

  return (
    <div>
      {isOpen && (
        <div className="fixed top-18 left-0 w-64 h-screen bg-white shadow-md p-6 sm:hidden flex flex-col justify-between transition-opacity duration-300">
          {/* Sidebar Content */}
          <div>
            <nav className="space-y-3 text-gray-700">
              <NavLink to="/home" className={linkClass(isDashboard)}>
                <LayoutDashboard className="w-5 h-5" />
                <span>Dashboard</span>
              </NavLink>
              <NavLink
                to="/tests"
                className={({ isActive }) => linkClass(isActive)}
              >
                <FileText className="w-5 h-5" />
                <span>Tests</span>
              </NavLink>
              <NavLink
                to="/profile"
                className={({ isActive }) => linkClass(isActive)}
              >
                <User className="w-5 h-5" />
                <span>Profile</span>
              </NavLink>
            </nav>
          </div>

          {/* Optional Footer */}
          <div className="text-sm text-gray-400 mt-8">© 2025 INSA Platform</div>
        </div>
      )}
      <div className="w-64 h-screen bg-white shadow-md p-6 hidden sm:flex sm:flex-col justify-between">
        {/* Sidebar Content */}
        <div>
          <nav className="space-y-3 text-gray-700">
            <NavLink to="/home" className={linkClass(isDashboard)}>
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </NavLink>
            <NavLink
              to="/tests"
              className={({ isActive }) => linkClass(isActive)}
            >
              <FileText className="w-5 h-5" />
              <span>Tests</span>
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) => linkClass(isActive)}
            >
              <User className="w-5 h-5" />
              <span>Profile</span>
            </NavLink>
          </nav>
        </div>

        {/* Optional Footer */}
        <div className="text-sm text-gray-400 mt-8">© 2025 INSA Platform</div>
      </div>
    </div>
  );
};

export default SideBar;
