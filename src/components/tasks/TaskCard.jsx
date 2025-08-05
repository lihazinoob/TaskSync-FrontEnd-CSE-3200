import React from "react";
import { format } from "date-fns";
import { Calendar, User, Clock, Tag, CheckCircle, Circle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TaskCard = ({ task }) => {
  const getStatusColor = (status) => {
    return status 
      ? "bg-green-100 text-green-800" 
      : "bg-gray-100 text-gray-800";
  };

  const getStatusLabel = (status) => {
    return status ? "Completed" : "Pending";
  };

  const getStatusIcon = (status) => {
    return status ? (
      <CheckCircle className="w-4 h-4 text-green-600" />
    ) : (
      <Circle className="w-4 h-4 text-gray-400" />
    );
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">
            {task.title}
          </CardTitle>
          <div className="flex items-center gap-2">
            {getStatusIcon(task.status)}
            <Badge className={getStatusColor(task.status)}>
              {getStatusLabel(task.status)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-gray-600 line-clamp-2">
          {task.description}
        </p>
        
        <div className="flex items-center gap-4 text-xs text-gray-500">
          {task.dueDate && (
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{format(new Date(task.dueDate), "MMM dd, yyyy")}</span>
            </div>
          )}
          
          {task.assignedToId && (
            <div className="flex items-center gap-1">
              <User className="w-3 h-3" />
              <span>Assigned to ID: {task.assignedToId}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>Created: {format(new Date(task.createdAt), "MMM dd, yyyy")}</span>
          {task.subTaskIds && task.subTaskIds.length > 0 && (
            <div className="flex items-center gap-1">
              <Tag className="w-3 h-3" />
              <span>{task.subTaskIds.length} subtasks</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;