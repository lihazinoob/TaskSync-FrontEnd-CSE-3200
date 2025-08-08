import axiosInstance from "./axiosInstance";

export async function createJob(jobData, companyId) {
  try {
    const response = await axiosInstance.post(
      `/api/companies/${companyId}/job-posts`,
      jobData
    );
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Error creating job:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to create job",
    };
  }
}

export async function fetchAllJobs() {
  try {
    const response = await axiosInstance.get("/api/job-posts");
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch jobs",
    };
  }
}


export async function fetchJobsByCompany(companyId) {
  try {
    const response = await axiosInstance.get(`/api/companies/${companyId}/job-posts`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Error fetching company jobs:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch company jobs",
    };
  }
}


