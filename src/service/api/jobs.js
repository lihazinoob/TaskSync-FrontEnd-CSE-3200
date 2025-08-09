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

// Enhanced function to fetch jobs with user information (including creator details)
export const fetchAllJobsWithUserInfo = async () => {
  try {
    // Import getAllUsers here to avoid circular dependency issues
    const { getAllUsers } = await import('./user');
    
    // Fetch jobs and users concurrently
    const [jobsResponse, usersResponse] = await Promise.all([
      fetchAllJobs(),
      getAllUsers()
    ]);

    if (!jobsResponse.success) {
      return jobsResponse;
    }

    if (!usersResponse.success) {
      console.warn('Failed to fetch users, jobs will show without complete user info');
      return jobsResponse; // Return jobs anyway, even without user info
    }

    // Create a map of userId -> user for quick lookup
    const usersMap = new Map();
    usersResponse.data.forEach(user => {
      usersMap.set(user.id, user);
    });

    // Enhance jobs with creator information
    const jobsWithUserInfo = jobsResponse.data.map(job => {
      const creator = usersMap.get(job.createdBy || job.userId);
      
      return {
        ...job,
        creator: creator ? {
          id: creator.id,
          username: creator.username,
          firstName: creator.firstName,
          lastName: creator.lastName,
          profileImage: creator.profileImage,
          email: creator.email
        } : {
          id: job.createdBy || job.userId,
          username: 'Unknown',
          firstName: null,
          lastName: null,
          profileImage: null
        }
      };
    });

    return {
      success: true,
      data: jobsWithUserInfo
    };

  } catch (error) {
    console.error('Error fetching jobs with user info:', error);
    return {
      success: false,
      message: 'Failed to fetch jobs with user information'
    };
  }
};