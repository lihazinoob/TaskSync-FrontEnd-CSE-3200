import axiosInstance from "./axiosInstance";

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