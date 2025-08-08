import axiosInstance from "./axiosInstance"

export const createPost  = async (postData) => {
  try {
    const response = await axiosInstance.post("/api/posts", postData);

    return {
      success: true,
      data: response.data
    }
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || "Failed to create post"
    };
  }
  
}

export const fetchAllPosts = async () => {
  try {
    const response = await axiosInstance.get('/api/posts');
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch posts'
    };
  }
};