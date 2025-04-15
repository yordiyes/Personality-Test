import { NavLink } from "react-router-dom";

const TestCard = ({
  title,
  description,
  estimatedTime,
  status,
  link,
  isCompleted = false,
  color = "indigo",
}) => {
  return (
    <div className="relative group bg-white shadow-md rounded-xl p-6 flex flex-col justify-between h-full transition duration-300 hover:shadow-xl">
      {/* Title + Status */}
      <div>
        <h3 className={`text-lg font-semibold text-${color}-700`}>{title}</h3>

        <p className="text-sm text-gray-600 mt-3">{description}</p>
      </div>

      {/* Estimated Time */}
      <div className="mt-4 text-sm text-gray-500 font-semibold mb-1">
        Status:
        <span
          className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full ${
            status === "Completed"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {status}
        </span>
      </div>
      <p className="text-xs text-gray-500 ">
        <strong>Estimated Time:</strong> {estimatedTime}
      </p>

      {/* Hover Overlay Button */}
      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-80 transition-opacity rounded-xl flex items-center justify-center">
        <NavLink
          to={link}
          className={`text-white px-6 py-3 text-lg font-semibold rounded-md bg-${color}-600 hover:bg-${color}-700 transition transform hover:scale-105`}
        >
          {isCompleted ? "View Results" : "Start Test"}
        </NavLink>
      </div>
    </div>
  );
};

export default TestCard;
