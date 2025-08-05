import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Footer from "./components/custom/Footer";
import Navbar from "./components/custom/Navbar";
import AllCompany from "./components/dashboard_content/AllCompany";
import Home from "./components/dashboard_content/Home";
import Interview from "./components/dashboard_content/Interview";
import MyCompany from "./components/dashboard_content/MyCompany";
import Newsfeed from "./components/dashboard_content/Newsfeed";
import Notification from "./components/dashboard_content/Notification";
import Profile from "./components/dashboard_content/Profile";
import Roadmap from "./components/dashboard_content/Roadmap";
import DashboardLayout from "./components/layout/DashboardLayout";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProjectDetails from "./components/projects/ProjectDetails";

function App() {
  const location = useLocation();
  const isDashboardRoute =
    location.pathname.includes("/dashboard") ||
    location.pathname.includes("/ai") ||
    location.pathname.includes("/activity") ||
    location.pathname.includes("/company") ||
    location.pathname.includes("/profile") ||
    location.pathname.includes("/newsfeed")||
    location.pathname.includes("/projects");

  return (
    <div className="min-h-screen flex flex-col">
      {!isDashboardRoute && <Navbar />}

      <main className="flex-1">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Home />} />
              <Route path="/ai/roadmap-generator" element={<Roadmap />} />
              <Route path="/ai/interview" element={<Interview />} />
              <Route
                path="/activity/notifications"
                element={<Notification />}
              />
              <Route path="/company/all" element={<AllCompany />} />
              <Route path="/company/my" element={<MyCompany />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/newsfeed" element={<Newsfeed />} />
              
              <Route path="/projects/:id" element = {<ProjectDetails/>}/>
            </Route>
          </Route>
        </Routes>
      </main>

      {!isDashboardRoute && <Footer />}

      {/* Toast notifications */}
      <Toaster position="top-right" richColors closeButton />
    </div>
  );
}

export default App;
