import axiosInstance from "./axiosInstance";

// Send a connection request to a user
export const sendConnectionRequest = async (userId) => {
  try {
    const response = await axiosInstance.post(`/api/connection/add/${userId}`);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error sending connection request:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to send connection request'
    };
  }
};

//Get connection request to the currently logged in user
export const getConnectionRequests = async () => {
  try {
    const response = await axiosInstance.get('/api/connection/requests');
    return {
      success: true,
      data: response.data.content || [], // Extract only the content array
      pagination: {
        totalPages: response.data.totalPages,
        totalElements: response.data.totalElements,
        currentPage: response.data.number,
        pageSize: response.data.size,
        isLast: response.data.last,
        isFirst: response.data.first
      }
    };
  } catch (error) {
    console.error('Error fetching connection requests:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch connection requests'
    };
  }
};

// Accept a connection request - Updated to use connectionId
export const acceptConnectionRequest = async (connectionId) => {
  try {
    const response = await axiosInstance.post(`/api/connection/accept/${connectionId}`);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error accepting connection request:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to accept connection request'
    };
  }
};

// Get user's accepted connections - Updated to use correct API
export const getAcceptedConnections = async () => {
  try {
    const response = await axiosInstance.get('/api/connection');
    return {
      success: true,
      data: response.data.content || [], // Extract only the content array
      pagination: {
        totalPages: response.data.totalPages,
        totalElements: response.data.totalElements,
        currentPage: response.data.number,
        pageSize: response.data.size,
        isLast: response.data.last,
        isFirst: response.data.first
      }
    };
  } catch (error) {
    console.error('Error fetching connections:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch connections'
    };
  }
};

// Enhanced function to get accepted connections with user information
export const getAcceptedConnectionsWithUserInfo = async () => {
  try {
    // Import getAllUsers and get current user info
    const { getAllUsers } = await import('./user');
    const { getUserProfile } = await import('./user');
    
    // Fetch connections, users, and current user profile concurrently
    const [connectionsResponse, usersResponse, currentUserResponse] = await Promise.all([
      getAcceptedConnections(),
      getAllUsers(),
      getUserProfile()
    ]);

    if (!connectionsResponse.success) {
      return connectionsResponse;
    }

    if (!usersResponse.success) {
      console.warn('Failed to fetch users, connections will show without complete user info');
      return connectionsResponse; // Return connections anyway, even without user info
    }

    if (!currentUserResponse.success) {
      console.warn('Failed to fetch current user info');
      return connectionsResponse;
    }

    const currentUsername = currentUserResponse.data.username;

    // Create a map of username -> user for quick lookup
    const usersMap = new Map();
    usersResponse.data.forEach(user => {
      usersMap.set(user.username, user);
    });

    // Filter and enhance connections with user information
    const connectionsWithUserInfo = connectionsResponse.data
      .filter(connection => connection.status === 'ACCEPTED') // Only show accepted connections
      .map(connection => {
        // Determine which user is the connection (not the current user)
        const connectedUsername = connection.user1 === currentUsername ? connection.user2 : connection.user1;
        const connectedUser = usersMap.get(connectedUsername);
        
        return {
          ...connection,
          connectedUser: connectedUser ? {
            id: connectedUser.id,
            username: connectedUser.username,
            firstName: connectedUser.firstName,
            lastName: connectedUser.lastName,
            profileImage: connectedUser.profileImage,
            jobTitle: connectedUser.jobTitle || connectedUser.industry,
            email: connectedUser.email,
            company: connectedUser.company
          } : {
            username: connectedUsername,
            firstName: null,
            lastName: null,
            profileImage: null,
            jobTitle: 'User',
            company: null
          }
        };
      });

    return {
      success: true,
      data: connectionsWithUserInfo
    };

  } catch (error) {
    console.error('Error fetching connections with user info:', error);
    return {
      success: false,
      message: 'Failed to fetch connections with user information'
    };
  }
};