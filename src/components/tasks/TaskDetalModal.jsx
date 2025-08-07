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
  Building,
  FileText,
  CalendarDays as CalendarIcon,
  User as UserIcon,
  CheckCircle as CheckIcon
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

const TaskDetailModal = ({ 
  isOpen, 
  onClose, 
  task, 
  users = [], 
  onTaskUpdated,
  projectId
}) => {
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
    return user && task?.assignedToId === user.id;
  };

  // Check if task is overdue
  const isOverdue = () => {
    if (!task?.dueDate) return false;
    return new Date(task.dueDate) < new Date() && !task.status;
  };

  // Handle mark as complete
  const handleMarkAsComplete = async () => {
    if (!task || task.status) {
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
        if (onTaskUpdated) {
          onTaskUpdated(response.data);
        }
        onClose(); // Close modal after successful update
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

  if (!task) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-xl font-semibold text-gray-900 mb-2">
                {task.title}
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-600">
                Task Details
              </DialogDescription>
            </div>
            
            {/* Action Menu */}
            {isAssignedToCurrentUser() && !task.status && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
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
        </DialogHeader>

        <div className="space-y-6">
          {/* Status Section */}
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            {getStatusIcon(task.status)}
            <div className="flex-1">
              <Badge className={`${getStatusColor(task.status)} border font-medium`}>
                {getStatusLabel(task.status)}
              </Badge>
              {isOverdue() && (
                <Badge className="ml-2 bg-red-100 text-red-700 border-red-200 font-medium">
                  Overdue
                </Badge>
              )}
            </div>
          </div>

          {/* Description Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-gray-500" />
              <h3 className="font-medium text-gray-900">Description</h3>
            </div>
            <p className="text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-lg">
              {task.description}
            </p>
          </div>

          {/* Task Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Due Date */}
            {task.dueDate && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-gray-500" />
                  <h3 className="font-medium text-gray-900">Due Date</h3>
                </div>
                <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span className="text-blue-700 font-medium">
                    {format(new Date(task.dueDate), "EEEE, MMMM dd, yyyy")}
                  </span>
                  {isOverdue() && (
                    <Badge className="bg-red-100 text-red-700 border-red-200">
                      Overdue
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* Assigned User */}
            {task.assignedToId && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <UserCircle className="w-4 h-4 text-gray-500" />
                  <h3 className="font-medium text-gray-900">Assigned To</h3>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="" />
                    <AvatarFallback className="text-sm bg-green-100 text-green-700">
                      {getUserInitials(task.assignedToId)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <span className="text-green-700 font-medium">
                      {getUserName(task.assignedToId)}
                    </span>
                    <p className="text-xs text-green-600">Assigned</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Additional Details */}
          <div className="space-y-4">
            {/* Creation and Update Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Clock3 className="w-4 h-4 text-gray-500" />
                  <h3 className="font-medium text-gray-900">Created</h3>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">
                    {format(new Date(task.createdAt), "MMM dd, yyyy 'at' h:mm a")}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <h3 className="font-medium text-gray-900">Last Updated</h3>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">
                    {format(new Date(task.updatedAt), "MMM dd, yyyy 'at' h:mm a")}
                  </span>
                </div>
              </div>
            </div>

            {/* Subtasks */}
            {task.subTaskIds && task.subTaskIds.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-gray-500" />
                  <h3 className="font-medium text-gray-900">Subtasks</h3>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <span className="text-purple-700 font-medium">
                    {task.subTaskIds.length} subtask{task.subTaskIds.length !== 1 ? 's' : ''}
                  </span>
                  <p className="text-xs text-purple-600 mt-1">
                    This task has {task.subTaskIds.length} subtask{task.subTaskIds.length !== 1 ? 's' : ''} associated with it.
                  </p>
                </div>
              </div>
            )}

            
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Close
          </Button>
          {isAssignedToCurrentUser() && !task.status && (
            <Button
              onClick={handleMarkAsComplete}
              disabled={isUpdating}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              {isUpdating ? (
                <>
                  <CheckIcon className="w-4 h-4 mr-2" />
                  Updating...
                </>
              ) : (
                <>
                  <CheckIcon className="w-4 h-4 mr-2" />
                  Mark as Complete
                </>
              )}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDetailModal;