import axiosInstance from "./axiosInstance";

export async function fetchAllSkills(){
  try {
    const response = await axiosInstance.get("/api/skills");
    return {
      success: true,
      data: response.data,  
    }
  } catch (error) {
    console.error("Error fetching skills:", error);
    throw error;
  }


}