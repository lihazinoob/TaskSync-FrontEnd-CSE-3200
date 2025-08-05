import { useAuth } from "@/contexts/AuthProvider";
import { isAuthenticated } from "@/service/api/auth";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const { user, loading, authChecked, fetchCurrentUser } = useAuth();
  const location = useLocation();

  // Double-check authentication on route access
  useEffect(() => {
    // If we have a token but no user, try to fetch user data
    if (isAuthenticated() && !user && authChecked) {
      fetchCurrentUser();
    }
  }, [location.pathname, user, authChecked, fetchCurrentUser]);

  // Show a loading indicator while checking authentication
  if (loading || !authChecked) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // Redirect to login if user is not authenticated
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Render the protected content
  return <Outlet />;
};

export default ProtectedRoute;
