import axiosInstance from "./axiosInstance";

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("token");
  }
};

export const getAuthToken = () => {
  return localStorage.getItem("token");
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};

export const loginUser = async (formData) => {
  try {
    const res = await axiosInstance.post("/login", formData);

    if (res.data.token) {
      setAuthToken(res.data.token);
    }

    return { success: true, data: res.data };
  } catch (error) {
    const message =
      error.response?.data?.message || "Login failed. Please try again.";
    return { success: false, message };
  }
};

export const registerUser = async (formData) => {
  try {
    const res = await axiosInstance.post("/register", formData);

    if (res.data.token) {
      setAuthToken(res.data.token);
    }

    return { success: true, data: res.data };
  } catch (error) {
    const message =
      error.response?.data?.message || "Registration failed. Please try again.";
    return { success: false, message };
  }
};

export const logoutUser = () => {
  setAuthToken(null);
  return { success: true, message: "Logged out successfully" };
};
