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
  Check,
  CalendarDays as CalendarIcon,
  User as UserIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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
import TaskDetailModal from "./TaskDetalModal";
import CreateSubTaskModal from "../subtask/CreateSubTaskModal";

const TaskCard = ({ task, users = [], onTaskUpdated }) => {
  const { user } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const [isSubTaskCreateModalOpen, setIsSubTaskCreateModalOpen] =
    useState(false);

  // Debug logging
  console.log("TaskCard Debug:", {
    taskId: task.id,
    taskTitle: task.title,
    assignedToId: task.assignedToId,
    currentUserId: user?.id,
    isAssigned: user && task.assignedToId === user.id,
    taskStatus: task.status,
    shouldShowMenu: user && task.assignedToId === user.id && !task.status,
  });

  const getStatusColor = (status) => {
    return status
      ? "bg-emerald-100 text-emerald-700"
      : "bg-amber-100 text-amber-700";
  };

  const getStatusLabel = (status) => {
    return status ? "Done" : "ToDo";
  };

  const getStatusIcon = (status) => {
    return status ? (
      <CheckCircle className="w-4 h-4 text-emerald-600" />
    ) : (
      <Circle className="w-4 h-4 text-amber-500" />
    );
  };

  // Function to get user name by ID
  const getUserName = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.name || user.username || user.email : `User ${userId}`;
  };

  // Get user initials for avatar
  const getUserInitials = (userId) => {
    const userName = getUserName(userId);
    return userName
      .split(" ")
      .map((name) => name[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
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

  // Handle mark as complete
  const handleMarkAsComplete = async (e) => {
    e.stopPropagation(); // Prevent card click event
    if (task.status) {
      toast.info("Task is already completed!");
      return;
    }

    setIsUpdating(true);
    try {
      const updatedTaskData = {
        ...task,
        status: true,
        updatedAt: new Date().toISOString(),
      };

      console.log("Updating task:", task.id, "with data:", updatedTaskData);

      const response = await updateTask(task.id, updatedTaskData);

      if (response.success) {
        toast.success("Task marked as complete!");
        console.log("Task updated successfully:", response.data);
        // Call the callback to update the parent component
        if (onTaskUpdated) {
          onTaskUpdated(response.data);
        }
      } else {
        toast.error(response.message || "Failed to update task");
        console.error("Failed to update task:", response.message);
      }
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle card click
  const handleCardClick = (e) => {
    // Don't open modal if clicking on the three dots menu
    if (e.target.closest("[data-dropdown]")) {
      return;
    }
    setIsDetailModalOpen(true);
  };

  return (
    <>
      <Card
        className={`
          group relative overflow-hidden transition-all duration-200 ease-in-out
          hover:shadow-md hover:-translate-y-0.5 hover:scale-[1.01]
          border border-border/50 bg-muted/40 cursor-pointer
          ${task.status ? "opacity-75" : "opacity-100"}
          transform transition-all duration-500 ease-in-out
        `}
        onClick={handleCardClick}
      >
        <CardContent className="p-3">
          {/* Header with title and action button */}
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-medium text-sm line-clamp-1 flex-1 mr-2">
              {task.title}
            </h4>

            {/* Three dots menu - only show if user is assigned to this task */}
            {isAssignedToCurrentUser() && !task.status && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    disabled={isUpdating}
                    data-dropdown
                  >
                    <MoreHorizontal className="w-3 h-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={handleMarkAsComplete}
                    disabled={isUpdating}
                    className="flex items-center gap-2"
                  >
                    <Check className="w-3 h-3" />
                    {isUpdating ? "Updating..." : "Mark as Complete"}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={(event) => {
                      event.stopPropagation();
                      setIsSubTaskCreateModalOpen(true);
                    }}
                    className="flex items-center gap-2"
                  >
                    <Tag className="w-3 h-3" />
                    Create SubTask
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Description */}
          <p className="text-xs text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
            {task.description}
          </p>

          {/* Task details */}
          <div className="flex flex-col gap-1 mb-3">
            {/* Due date */}
            {task.dueDate && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <CalendarIcon className="w-3 h-3" />
                <span>Due: {format(new Date(task.dueDate), "MMM dd")}</span>
                {isOverdue() && (
                  <span className="text-red-500 font-medium ml-1">
                    (Overdue)
                  </span>
                )}
              </div>
            )}

            {/* Assigned user */}
            {task.assignedToId && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <UserIcon className="w-3 h-3" />
                <span>{getUserName(task.assignedToId)}</span>
              </div>
            )}
          </div>

          {/* Footer with status and creation date */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              {getStatusIcon(task.status)}
              <Badge
                className={`text-xs px-2 py-0.5 ${getStatusColor(task.status)}`}
              >
                {getStatusLabel(task.status)}
              </Badge>
            </div>

            <span className="text-xs text-muted-foreground">
              {format(new Date(task.createdAt), "MMM dd")}
            </span>
          </div>

          {/* Subtasks indicator */}
          {task.subTaskIds && task.subTaskIds.length > 0 && (
            <div className="flex items-center gap-1 mt-2 pt-2 border-t border-border/30">
              <Tag className="w-3 h-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {task.subTaskIds.length} subtask
                {task.subTaskIds.length !== 1 ? "s" : ""}
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Task Detail Modal */}
      <TaskDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        task={task}
        users={users}
        onTaskUpdated={onTaskUpdated}
      />

      <CreateSubTaskModal
        isOpen={isSubTaskCreateModalOpen}
        onClose={() => setIsSubTaskCreateModalOpen(false)}
        parentTask={task}
        
      />
    </>
  );
};

export default TaskCard;
