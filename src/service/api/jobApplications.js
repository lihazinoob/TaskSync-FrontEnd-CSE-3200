import axiosInstance from './axiosInstance';

// Apply to a job
export const applyToJob = async (jobPostId) => {
  try {
    const response = await axiosInstance.post(`/api/jobs/${jobPostId}/apply`,{
      coverLetter: "Your cover letter here", // You can modify this to accept user input
    });
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error applying to job:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to apply to job'
    };
  }
};

// Get user's job applications
export const getUserJobApplications = async () => {
  try {
    const response = await axiosInstance.get('/api/jobs/applications/my');
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error fetching job applications:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch job applications'
    };
  }
};

// Check if user has already applied to a job
export const checkApplicationStatus = async (jobPostId) => {
  // try {
  //   const response = await axiosInstance.get(`/api/jobs/${jobPostId}/application-status`);
  //   return {
  //     success: true,
  //     data: response.data
  //   };
  // } catch (error) {
  //   console.error('Error checking application status:', error);
  //   return {
  //     success: false,
  //     message: error.response?.data?.message || 'Failed to check application status'
  //   };
  // }
};