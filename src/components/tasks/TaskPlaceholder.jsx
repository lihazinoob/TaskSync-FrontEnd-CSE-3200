import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import CreateTaskModal from "./CreateTaskModal";
import TaskCard from "./TaskCard";
import { fetchTasksByProject } from "../../service/api/task";
import { getAllUsers } from "../../service/api/user";

import { toast } from "sonner";

const TaskPlaceholder = ({ employees = [], projectId }) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch tasks for the project
  useEffect(() => {
    const loadTasks = async () => {
      if (projectId) {
        setLoading(true);
        try {
          const [tasksResponse, usersResponse] = await Promise.all([
            fetchTasksByProject(projectId),
            getAllUsers()
          ]);
          
          if (tasksResponse.success) {
            setTasks(tasksResponse.data);
          } else {
            console.error("Failed to fetch tasks:", tasksResponse.message);
          }
          
          if (usersResponse.success) {
            setUsers(usersResponse.data);
          } else {
            console.error("Failed to fetch users:", usersResponse.message);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
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

  const handleTaskUpdated = (updatedTask) => {
    // Update the task in the list
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  // Separate tasks by status
  const todoTasks = tasks.filter(task => !task.status);
  const doneTasks = tasks.filter(task => task.status);

  return (
    <div>
      <div className="flex items-center justify-between px-4 mb-6">
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
      
      {/* Tasks Kanban Board */}
      {loading ? (
        <div className="px-4 py-8 text-center text-gray-500">
          Loading tasks...
        </div>
      ) : tasks.length > 0 ? (
        <div className="flex justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl w-full px-4">
            {/* ToDo Column */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                  ToDo ({todoTasks.length})
                </h3>
              </div>
              
              <div className="space-y-3 min-h-[400px]">
                {todoTasks.length > 0 ? (
                  todoTasks.map((task) => (
                    <TaskCard 
                      key={task.id} 
                      task={task} 
                      users={users}
                      employees={employees}
                      onTaskUpdated={handleTaskUpdated}
                    />
                  ))
                ) : (
                  <div className="flex items-center justify-center h-32 text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
                    <div className="text-center">
                      <div className="text-4xl mb-2">📝</div>
                      <p className="text-sm">No tasks to do</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Done Column */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  Done ({doneTasks.length})
                </h3>
              </div>
              
              <div className="space-y-3 min-h-[400px]">
                {doneTasks.length > 0 ? (
                  doneTasks.map((task) => (
                    <TaskCard 
                      key={task.id} 
                      task={task} 
                      users={users}
                      employees={employees}
                      onTaskUpdated={handleTaskUpdated}
                    />
                  ))
                ) : (
                  <div className="flex items-center justify-center h-32 text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🎉</div>
                      <p className="text-sm">No completed tasks</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="px-4 py-8 text-center text-gray-500">
          <div className="text-center">
            <div className="text-6xl mb-4">📋</div>
            <p className="text-lg font-medium mb-2">No tasks yet</p>
            <p className="text-sm text-gray-400 mb-4">Create your first task to get started!</p>
            <Button 
              variant={"outline"} 
              onClick={() => setIsCreateModalOpen(true)}
            >
              Create a Task
            </Button>
          </div>
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