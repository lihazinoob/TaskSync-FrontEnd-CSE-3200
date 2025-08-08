import axiosInstance from "./axiosInstance"

export const createPost = async (postData) => {
  try {
    const response = await axiosInstance.post("/api/posts", postData);

    return {
      success: true,
      data: response.data
    }
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to create post" // ✅ Changed from 'error' to 'message'
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

// ✅ New function to fetch posts with user information
export const fetchAllPostsWithUserInfo = async () => {
  try {
    // Import getAllUsers here to avoid circular dependency issues
    const { getAllUsers } = await import('./user');
    
    // Fetch posts and users concurrently
    const [postsResponse, usersResponse] = await Promise.all([
      fetchAllPosts(),
      getAllUsers()
    ]);

    if (!postsResponse.success) {
      return postsResponse;
    }

    if (!usersResponse.success) {
      console.warn('Failed to fetch users, posts will show without complete user info');
      return postsResponse; // Return posts anyway, even without user info
    }

    // Create a map of username -> user for quick lookup
    const usersMap = new Map();
    usersResponse.data.forEach(user => {
      usersMap.set(user.username, user);
    });

    // Enhance posts with complete user information
    const postsWithUserInfo = postsResponse.data.map(post => {
      const user = usersMap.get(post.username);
      
      return {
        ...post,
        id: post.postId, // ✅ Ensure we have an 'id' field for React keys
        author: user ? {
          id: user.id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          profileImage: user.profileImage,
          jobTitle: user.jobTitle || user.industry,
          email: user.email
        } : {
          // Fallback if user not found
          username: post.username,
          firstName: null,
          lastName: null,
          profileImage: null,
          jobTitle: 'User'
        }
      };
    });

    return {
      success: true,
      data: postsWithUserInfo
    };

  } catch (error) {
    console.error('Error fetching posts with user info:', error);
    return {
      success: false,
      message: 'Failed to fetch posts with user information'
    };
  }
};