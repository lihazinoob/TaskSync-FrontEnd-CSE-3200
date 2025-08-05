import React, { useState } from "react";
import { format } from "date-fns";
import { 
  Calendar, 
  User, 
  Clock, 
  Tag, 
  CheckCircle, 
  Circle, 
  MoreHorizontal,
  CalendarDays,
  UserCircle,
  Clock3,
  Check
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthProvider";
import { updateTask } from "@/service/api/task";
import { toast } from "sonner";

const TaskCard = ({ task, users = [], onTaskUpdated }) => {
  const { user } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);

  const getStatusColor = (status) => {
    return status 
      ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
      : "bg-amber-50 text-amber-700 border-amber-200";
  };

  const getStatusLabel = (status) => {
    return status ? "Done" : "ToDo";
  };

  const getStatusIcon = (status) => {
    return status ? (
      <CheckCircle className="w-5 h-5 text-emerald-600" />
    ) : (
      <Circle className="w-5 h-5 text-amber-500" />
    );
  };

  // Function to get user name by ID
  const getUserName = (userId) => {
    const user = users.find(user => user.id === userId);
    return user ? user.name || user.username || user.email : `User ${userId}`;
  };

  // Get user initials for avatar
  const getUserInitials = (userId) => {
    const userName = getUserName(userId);
    return userName.split(' ').map(name => name[0]).join('').toUpperCase().slice(0, 2);
  };

  // Check if current user is assigned to this task
  const isAssignedToCurrentUser = () => {
    return user && task.assignedToId === user.id;
  };

  // Check if task is overdue
  const isOverdue = () => {
    if (!task.dueDate) return false;
    return new Date(task.dueDate) < new Date() && !task.status;
  };

  // Get priority color based on due date
  const getPriorityColor = () => {
    if (isOverdue()) return "border-red-200 bg-red-50";
    if (!task.dueDate) return "border-gray-200 bg-white";
    
    const daysUntilDue = Math.ceil((new Date(task.dueDate) - new Date()) / (1000 * 60 * 60 * 24));
    if (daysUntilDue <= 1) return "border-orange-200 bg-orange-50";
    if (daysUntilDue <= 3) return "border-yellow-200 bg-yellow-50";
    return "border-gray-200 bg-white";
  };

  // Handle mark as complete
  const handleMarkAsComplete = async () => {
    if (task.status) {
      toast.info("Task is already completed!");
      return;
    }

    setIsUpdating(true);
    try {
      const updatedTaskData = {
        ...task,
        status: true,
        updatedAt: new Date().toISOString()
      };

      const response = await updateTask(task.id, updatedTaskData);
      
      if (response.success) {
        toast.success("Task marked as complete!");
        // Call the callback to update the parent component
        if (onTaskUpdated) {
          onTaskUpdated(response.data);
        }
      } else {
        toast.error(response.message || "Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Card className={`
      group relative overflow-hidden transition-all duration-300 ease-in-out
      hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]
      border-2 ${getPriorityColor()}
      ${task.status ? 'opacity-75' : 'opacity-100'}
    `}>
      {/* Status indicator line */}
      <div className={`
        absolute top-0 left-0 w-1 h-full transition-all duration-300
        ${task.status ? 'bg-emerald-500' : 'bg-amber-500'}
      `} />
      
      <CardHeader className="pb-3 pt-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-semibold text-gray-900 truncate group-hover:text-gray-700 transition-colors">
              {task.title}
            </CardTitle>
            <div className="flex items-center gap-2 mt-2">
              {getStatusIcon(task.status)}
              <Badge className={`${getStatusColor(task.status)} border font-medium`}>
                {getStatusLabel(task.status)}
              </Badge>
              {isOverdue() && (
                <Badge className="bg-red-100 text-red-700 border-red-200 font-medium">
                  Overdue
                </Badge>
              )}
            </div>
          </div>
          
          {/* Three dots menu - only show if user is assigned to this task */}
          {isAssignedToCurrentUser() && !task.status && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  disabled={isUpdating}
                >
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem 
                  onClick={handleMarkAsComplete}
                  disabled={isUpdating}
                  className="flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  {isUpdating ? "Updating..." : "Mark as Complete"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
          {task.description}
        </p>
        
        {/* Task details */}
        <div className="space-y-3">
          {/* Due date with priority indicator */}
          {task.dueDate && (
            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
              <CalendarDays className="w-4 h-4 text-gray-500" />
              <div className="flex-1">
                <span className="text-sm font-medium text-gray-700">
                  Due: {format(new Date(task.dueDate), "MMM dd, yyyy")}
                </span>
                {isOverdue() && (
                  <span className="text-xs text-red-600 ml-2 font-medium">
                    Overdue
                  </span>
                )}
              </div>
            </div>
          )}
          
          {/* Assigned user */}
          {task.assignedToId && (
            <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg">
              <Avatar className="w-6 h-6">
                <AvatarImage src="" />
                <AvatarFallback className="text-xs bg-blue-100 text-blue-700">
                  {getUserInitials(task.assignedToId)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <span className="text-sm font-medium text-gray-700">
                  {getUserName(task.assignedToId)}
                </span>
                <span className="text-xs text-gray-500 block">Assigned</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Clock3 className="w-3 h-3" />
            <span>Created {format(new Date(task.createdAt), "MMM dd")}</span>
          </div>
          
          {task.subTaskIds && task.subTaskIds.length > 0 && (
            <div className="flex items-center gap-1">
              <Tag className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-500 font-medium">
                {task.subTaskIds.length} subtask{task.subTaskIds.length !== 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;