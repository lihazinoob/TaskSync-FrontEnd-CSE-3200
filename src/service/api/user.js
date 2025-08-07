import axiosInstance from "./axiosInstance";

export const getUserProfile = async () => {
  try {
    const response = await axiosInstance.get("/api/users/profile");
    
    return { success: true, data: response.data };
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to fetch user profile.";
    return { success: false, message };
  }
};

export const updateUserStatus = async(username, statusData) => {
  try {
    const response = await axiosInstance.put(`/api/users/profile/updatestatus/${username}`, statusData);
    
    return { success: true, data: response.data };
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to update user status.";
    return { success: false, message };
  }
}

// function to get all the user information
export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get("/api/users/all");
   
    return { success: true, data: response.data };
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to fetch users.";
    return { success: false, message };
  }
};

// function to uploda profile picture of a user
export const uploadProfilePicture = async (profileImageURL) => {
  console.log("Uploading profile picture from uploadProfilePicture function:", profileImageURL);

  // will write the sending information to the backend as soon as the API is created by turzo.


}

