import axiosInstance from './axiosInstance';

// Create a comment or reply on a post
export const createComment = async (postId, commentData) => {
  try {
    const response = await axiosInstance.post(`/api/posts/${postId}/comments`, commentData);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error creating comment:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to create comment'
    };
  }
};

// Fetch comments for a post
export const fetchPostComments = async (postId) => {
  try {
    const response = await axiosInstance.get(`/api/posts/${postId}/comments`);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error fetching comments:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch comments'
    };
  }
};

// Enhanced function to fetch comments with user information
export const fetchPostCommentsWithUserInfo = async (postId) => {
  try {
    // Import getAllUsers here to avoid circular dependency issues
    const { getAllUsers } = await import('./user');
    
    // Fetch comments and users concurrently
    const [commentsResponse, usersResponse] = await Promise.all([
      fetchPostComments(postId),
      getAllUsers()
    ]);

    if (!commentsResponse.success) {
      return commentsResponse;
    }

    if (!usersResponse.success) {
      console.warn('Failed to fetch users, comments will show without complete user info');
      return commentsResponse; // Return comments anyway, even without user info
    }

    // Create a map of username -> user for quick lookup
    const usersMap = new Map();
    usersResponse.data.forEach(user => {
      usersMap.set(user.username, user);
    });

    // Recursively enhance comments and replies with user information
    const enhanceCommentsWithUserInfo = (comments) => {
      return comments.map(comment => {
        const user = usersMap.get(comment.username);
        
        const enhancedComment = {
          ...comment,
          author: user ? {
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            profileImage: user.profileImage,
            jobTitle: user.jobTitle || user.industry,
            email: user.email
          } : {
            username: comment.username,
            firstName: null,
            lastName: null,
            profileImage: null,
            jobTitle: 'User'
          }
        };

        // Recursively enhance replies
        if (enhancedComment.replies && enhancedComment.replies.length > 0) {
          enhancedComment.replies = enhanceCommentsWithUserInfo(enhancedComment.replies);
        }

        return enhancedComment;
      });
    };

    const commentsWithUserInfo = enhanceCommentsWithUserInfo(commentsResponse.data);

    return {
      success: true,
      data: commentsWithUserInfo
    };

  } catch (error) {
    console.error('Error fetching comments with user info:', error);
    return {
      success: false,
      message: 'Failed to fetch comments with user information'
    };
  }
};