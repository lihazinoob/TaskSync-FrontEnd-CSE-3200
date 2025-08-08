import axiosInstance from "./axiosInstance";

export async function createJob(jobData,companyId) {
  try {
    const response = await axiosInstance.post(`/api/companies/${companyId}/job-posts`, jobData);
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
