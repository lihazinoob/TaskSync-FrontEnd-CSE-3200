import axiosInstance from "./axiosInstance";


// function to create a new Project
export const createProject = async (projectDataPayLoad) => {
  try {
    const response = await axiosInstance.post(
      "/api/projects/create",
      projectDataPayLoad
    );
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to create project.";
    return { success: false, message };
  }
};

// function to fetch all projects
export const fetchProjectsbyCompany = async (companyID) => {
  console.log("Fetching projects for company ID:", companyID);
  console.log("data type", typeof companyID);
  try {
    const response = await axiosInstance.get(`/api/projects/getall/${companyID}`);
    return { success: true, data: response.data };
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to fetch projects.";
    return { success: false, message };
  }
};

//function to fetch a project by ID
export const fetchProjectById = async (projectId) => {
  try {
    const response = await axiosInstance.get(`/api/projects/${projectId}`);
  
    return { success: true, data: response.data };
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to fetch project.";
    return { success: false, message };
  }
};



