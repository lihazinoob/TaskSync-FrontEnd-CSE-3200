import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardHeader from "../dashboard_content/common/DashboardHeader";
import TabTitle from "../dashboard_content/common/TabTitle";
import { Presentation } from "lucide-react";
import { fetchProjectById } from "@/service/api/project";
import { toast } from "sonner";
import ProjectInformationCard from "./ProjectInformationCard";
import TaskCard from "../tasks/TaskCard";
import { Button } from "../ui/button";
import TaskPlaceholder from "../tasks/TaskPlaceholder";
import { getEmployeesOfCompany } from "@/service/api/company";
import ProjectTree from "./ProjectTree";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [taskCount, setTaskCount] = useState(0);

  useEffect(() => {
    const loadProject = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchProjectById(id);
        console.log("Project fetched successfully:", response.data);
        if (response.success) {
          toast.success("Project fetched successfully!");
          setProject(response.data);
        } else {
          setError("Failed to fetch project: " + response.message);
          toast.error("Failed to fetch project: " + response.message);
        }
      } catch (err) {
        setError("An error occurred while fetching project details.");
        toast.error("An error occurred while fetching project details.");
        console.error("Error fetching project:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [id]); // Add id to dependency array

  // useEffect hook to fetch all the employees of the company
  useEffect(() => {
    const fetchEmployees = async () => {
      if (project?.companyId) {
        try {
          const response = await getEmployeesOfCompany(project.companyId);
          if (response.success) {
            console.log("Employees fetched successfully:", response.data);
            setEmployees(response.data);
          } else {
            console.error("Failed to fetch employees:", response.message);
            toast.error("Failed to fetch employees: " + response.message);
          }
        } catch (err) {
          console.error("Error fetching employees:", err);
          toast.error("An error occurred while fetching employees.");
        }
      }
    };

    fetchEmployees();
  }, [project?.companyId]);

  const handleTaskCreated = (newTask) => {
    // Update the task count
    setTaskCount((prev) => prev + 1);

    // Update the project object to reflect the new task count
    if (project) {
      setProject((prev) => ({
        ...prev,
        totalTasks: (prev.totalTasks || 0) + 1,
      }));
    }
  };

  console.log("Project Details in Project Details Page:", project);

  if (loading) {
    return (
      <div>
        <DashboardHeader title="Project" breadcrumb="" />
        <div className="flex flex-col gap-4 p-4 pt-0">
          <TabTitle title="Project" icon={<Presentation />} />
          <div>Loading project details...</div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div>
        <DashboardHeader title="Project" breadcrumb="" />
        <div className="flex flex-col gap-4 p-4 pt-0">
          <TabTitle title="Project" icon={<Presentation />} />
          <div>{error || "Project not found."}</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <DashboardHeader
        title={project.name || "Project"}
        breadcrumb="Projects"
      />
      <div className="flex flex-col gap-4 p-4 pt-0">
        <TabTitle title="Project Details" icon={<Presentation />} />
        <ProjectInformationCard project={project} employees={employees} />
        {/* Tasks Placeholder */}
        <TaskPlaceholder
          employees={employees}
          projectId={id}
          onTaskCreated={handleTaskCreated}
        />

        <ProjectTree project={project} employees={employees} projectId={id} />
      </div>
    </div>
  );
};

export default ProjectDetails;
