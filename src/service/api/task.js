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