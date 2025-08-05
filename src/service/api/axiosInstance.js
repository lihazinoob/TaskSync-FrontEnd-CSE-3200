import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8082",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding the JWT token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling token errors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle token expiration logic here if needed
    // For example, you could check for a 401 status and attempt to refresh the token

    return Promise.reject(error);
  }
);

export default axiosInstance;
