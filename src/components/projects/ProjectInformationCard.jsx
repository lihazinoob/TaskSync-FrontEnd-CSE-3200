import React from "react";
import {
  CalendarDays,
  CheckCircle,
  Clock,
  Flag,
  Users,
  LayoutDashboard,
} from "lucide-react";
import { format } from "date-fns";

const formatDate = (dateStr) =>
  dateStr ? format(new Date(dateStr), "MMM dd, yyyy") : "N/A";

const statusColors = {
  IN_PROGRESS: "bg-gray-200 text-gray-800",
  COMPLETED: "bg-gray-300 text-gray-900",
  ON_HOLD: "bg-gray-100 text-gray-600",
};

const ProjectInformationCard = ({ project }) => {
  const {
    name,
    description,
    startDate,
    endDate,
    deadline,
    completion,
    noOfEmployees,
    status,
    totalTasks,
    tasksCompleted,
  } = project;

  const completionPercentage = (completion || 0) * 100;

  return (
    <div className="w-1/2 rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-white hover:shadow-xl transition-all duration-300 hover:scale-[1.01]">
      {/* Header */}
      <div className="bg-gray-100 p-5 flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 text-gray-800">
            <LayoutDashboard className="w-6 h-6" />
            <h2 className="text-xl font-bold">{name}</h2>
          </div>
          <p className="text-sm text-gray-600 mt-1">{description || "No description provided."}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${statusColors[status] || "bg-gray-100 text-gray-700"} shadow-sm`}
        >
          {status?.replace("_", " ")}
        </span>
      </div>

      {/* Body */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-800">
            <CalendarDays className="w-4 h-4 text-gray-500" />
            <span><strong>Start Date:</strong> {formatDate(startDate)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-800">
            <Flag className="w-4 h-4 text-gray-500" />
            <span><strong>End Date:</strong> {formatDate(endDate)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-800">
            <Clock className="w-4 h-4 text-gray-500" />
            <span><strong>Deadline:</strong> {formatDate(deadline)}</span>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-800">
            <Users className="w-4 h-4 text-gray-500" />
            <span><strong>Employees:</strong> {noOfEmployees}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-800">
            <CheckCircle className="w-4 h-4 text-gray-500" />
            <span><strong>Tasks:</strong> {tasksCompleted} / {totalTasks}</span>
          </div>
          <div className="text-sm text-gray-800">
            <strong>Completion:</strong> {completionPercentage.toFixed(2)}%
            <div className="w-full h-2 mt-1 bg-gray-200 rounded-full">
              <div
                className="h-2 rounded-full bg-gray-800 transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectInformationCard;
