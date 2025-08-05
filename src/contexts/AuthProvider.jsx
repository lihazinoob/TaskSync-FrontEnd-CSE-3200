import { isAuthenticated, logoutUser } from "@/service/api/auth";
import { getUserProfile } from "@/service/api/user";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);

  const fetchCurrentUser = async () => {
    try {
      if (!isAuthenticated()) {
        setUser(null);
        return false;
      }

      const response = await getUserProfile();
      if (response.success) {
       
        setUser(response.data);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error fetching user:", error);
      return false;
    } finally {
      setLoading(false);
      setAuthChecked(true);
    }
  };

  // Handle logout
  const logout = () => {
    // Call the logout API function
    logoutUser();

    // Clear user state
    setUser(null);

    // Set auth checked to true and loading to false
    setAuthChecked(true);
    setLoading(false);
  };

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      await fetchCurrentUser();
    };

    checkAuth();
  }, []);

  const value = {
    user,
    setUser,
    loading,
    authChecked,
    fetchCurrentUser,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
