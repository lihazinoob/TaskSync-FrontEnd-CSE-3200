import axiosInstance from "./axiosInstance";

export const generateRoadmap = async (topic) => {
  try {
    const response = await axiosInstance.post('/api/roadmap/generate', {
      topic: topic
    });
    
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error generating roadmap:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to generate roadmap'
    };
  }
}