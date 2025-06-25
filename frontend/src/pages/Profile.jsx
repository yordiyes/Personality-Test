import { useNavigate } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";
import { LogOut } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Example: localStorage.removeItem("token")
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex">
        <SideBar />

        <div className="flex-1 p-8">
          {/* Profile Header */}
          <div className="md:flex items-center justify-between bg-white p-6 rounded-xl shadow mb-6">
            <div className="flex items-center space-x-4">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border border-gray-300 shadow-sm"
              />
              <div>
                <h2 className="text-2xl font-bold text-indigo-700">
                  Sarah Johnson
                </h2>
                <p className="text-sm text-gray-500">
                  Employee • Joined Jan 2024
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex md:items-center gap-3  md:space-y-0 mt-6 md:mt-0">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition">
                Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm bg-red-100 hover:bg-red-200 text-red-600 px-3 py-2 rounded-full transition"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>

          {/* Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Account Info */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Account Information
              </h3>
              <div className="text-sm text-gray-600 space-y-2">
                <p>
                  <strong>Email:</strong> sarah.johnson@example.com
                </p>
                <p>
                  <strong>Phone:</strong> +1 234 567 8901
                </p>
                <p>
                  <strong>Location:</strong> New York, USA
                </p>
                <p>
                  <strong>Role:</strong> Employee
                </p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Recent Activity
              </h3>
              <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                <li>Completed Enneagram Test</li>
                <li>Updated personal information</li>
                <li>Logged in from new device</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
