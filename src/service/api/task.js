import axiosInstance from "./axiosInstance";

// Function to fetch tasks for a specific project
export const fetchTasksByProject = async (projectId) => {
  try {
    const response = await axiosInstance.get(`/api/tasks/project/${projectId}`);
    return { success: true, data: response.data };
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to fetch tasks.";
    return { success: false, message };
  }
};

// Function to create a new task
export const createTask = async (taskData) => {
  try {
    const response = await axiosInstance.post("/api/tasks", taskData);
    
    return { success: true, data: response.data };
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to create task.";
    return { success: false, message };
  }
};

// function to update a task
export const updateTask = async (taskId, taskData) => {
  try {
    const response = await axiosInstance.put(`/api/tasks/${taskId}`, taskData);
    return { success: true, data: response.data };
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to update task.";
    return { success: false, message };
  }
};