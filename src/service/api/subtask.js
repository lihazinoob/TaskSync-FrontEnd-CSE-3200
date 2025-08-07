import axiosInstance from "./axiosInstance";


export const createSubTask = async(subTaskData,parentTaskId) => {
  try {
    const response = await axiosInstance
    .post(`/api/tasks/${parentTaskId}/subtasks`, subTaskData);
    return { success: true, data: response.data };
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to create subtask.";
    return { success: false, message };
  }
} 