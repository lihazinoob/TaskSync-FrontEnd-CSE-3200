import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import CreateTaskModal from "./CreateTaskModal";
import TaskCard from "./TaskCard";
import { fetchTasksByProject } from "../../service/api/task";

import { toast } from "sonner";

const TaskPlaceholder = ({ employees = [], projectId }) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch tasks for the project
  useEffect(() => {
    const loadTasks = async () => {
      if (projectId) {
        setLoading(true);
        try {
          const response = await fetchTasksByProject(projectId);
          if (response.success) {
            setTasks(response.data);
          } else {
            console.error("Failed to fetch tasks:", response.message);
          }
        } catch (error) {
          console.error("Error fetching tasks:", error);
          toast.error("Failed to load tasks");
        } finally {
          setLoading(false);
        }
      }
    };

    loadTasks();
  }, [projectId]);

  const handleTaskCreated = (newTask) => {
    // Add the new task to the list
    setTasks(prevTasks => [newTask, ...prevTasks]);
    
    // Update the project's task count (this will be handled by the parent component)
    // You might want to emit an event or call a callback to update the project info
  };

  return (
    <div>
      <div className="flex items-center justify-between px-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mt-2 mb-2">
            Tasks ({tasks.length})
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Here are the tasks associated with this project.
          </p>
          {employees.length > 0 && (
            <p className="text-sm text-gray-500 mb-2">
              Available team members: {employees.length}
            </p>
          )}
        </div>
        <Button 
          variant={"outline"} 
          className="mb-4"
          onClick={() => setIsCreateModalOpen(true)}
        >
          Create a Task
        </Button>
      </div>
      
      {/* Tasks List */}
      {loading ? (
        <div className="px-4 py-8 text-center text-gray-500">
          Loading tasks...
        </div>
      ) : tasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : (
        <div className="px-4 py-8 text-center text-gray-500">
          No tasks yet. Create your first task!
        </div>
      )}

      {/* Create Task Modal */}
      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        projectId={projectId}
        employees={employees}
        onTaskCreated={handleTaskCreated}
      />
    </div>
  );
};

export default TaskPlaceholder;