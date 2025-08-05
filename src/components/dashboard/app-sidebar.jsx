import React, { useState, useEffect } from "react";
import {
  AudioWaveform,
  Bell,
  BrainCircuit,
  Building,
  Command,
  Frame,
  GalleryVerticalEnd,
  LayoutDashboard,
  Map,
  Newspaper,
  PieChart,
  User,
} from "lucide-react";
import { NavMain } from "@/components/dashboard/nav-main";
import { NavProjects } from "@/components/dashboard/nav-projects";
import { NavUser } from "@/components/dashboard/nav-user";
import { TeamSwitcher } from "@/components/dashboard/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthProvider";
import ProjectCreationForm from "../projects/ProjectCreationForm";
import { createProject, fetchProjectsbyCompany } from "@/service/api/project";
import { fetchCompanyByUserID } from "@/service/api/company";
import { toast } from "sonner";
import { format } from "date-fns";

const data = {
  navMain: [
    {
      title: "Profile",
      url: "/profile",
      icon: User,
      isActive: true,
      items: [
        {
          title: "My Profile",
          url: "/profile",
          isActive: true,
        },
      ],
    },
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
      items: [
        {
          title: "Home",
          url: "/dashboard",
          isActive: true,
        },
      ],
    },
    {
      title: "AI",
      url: "/ai",
      icon: BrainCircuit,
      isActive: false,
      items: [
        {
          title: "Roadmap Generator",
          url: "/ai/roadmap-generator",
          isActive: false,
        },
        {
          title: "Interview",
          url: "/ai/interview",
          isActive: false,
        },
      ],
    },
    {
      title: "Activity",
      url: "/activity",
      icon: Bell,
      isActive: false,
      items: [
        {
          title: "Notifications",
          url: "/activity/notifications",
          isActive: false,
        },
      ],
    },
    {
      title: "Company",
      url: "/company",
      icon: Building,
      isActive: false,
      items: [
        {
          title: "All Companies",
          url: "/company/all",
          isActive: false,
        },
        {
          title: "My Company",
          url: "/company/my",
          isActive: false,
        },
      ],
    },
    {
      title: "Newsfeed",
      url: "/newsfeed",
      icon: Newspaper,
      isActive: false,
      items: [
        {
          title: "My Feed",
          url: "/newsfeed",
          isActive: false,
        },
      ],
    },
  ],
};

export function AppSidebar({ companyRefreshTrigger, ...props }) {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [isLoadingCompanies, setIsLoadingCompanies] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isCreateProjectModalOpen, setCreateProjectModalOpen] = useState(false);

  // Fetch projects
  useEffect(() => {
    const loadProjects = async () => {
      if (selectedCompany?.id) {
        // setIsLoadingProjects(true);
        try {
          console.log("Fetching projects for company ID:", selectedCompany.id);
          const response = await fetchProjectsbyCompany(selectedCompany.id);
          if (response.success) {
            const formattedProjects = response.data.map((project) => ({
              id: project.id,
              name: project.name,
              url: `/projects/${project.id}`,
              icon: Frame,
            }));
            setProjects(formattedProjects);
          } else {
            toast.error("Failed to fetch projects: " + response.message);
            console.error("Failed to fetch projects:", response.message);
            setProjects([]);
          }
        } catch (error) {
          console.error("Error fetching projects:", error);
          toast.error("An error occurred while fetching projects.");
          setProjects([]);
        } finally {
          // setIsLoadingProjects(false);
        }
      } else {
        setProjects([]); // Clear projects if no company is selected
      }
    };
    loadProjects();
  }, [selectedCompany?.id]);

  // Fetch companies
  useEffect(() => {
    const loadCompanies = async () => {
      if (user?.id) {
        setIsLoadingCompanies(true);
        try {
          const response = await fetchCompanyByUserID(user.id);
          if (response.success) {
            const formattedCompanies = response.data.map((company) => ({
              id: company.id,
              name: company.companyName,
              logo: Building,
              plan: company.industry || "N/A",
            }));
            setCompanies(formattedCompanies);
          } else {
            toast.error("Failed to fetch companies: " + response.message);
            console.error("Failed to fetch companies:", response.message);
          }
        } catch (error) {
          console.error("Error fetching companies:", error);
          toast.error("An error occurred while fetching companies.");
        } finally {
          setIsLoadingCompanies(false);
        }
      }
    };
    loadCompanies();
  }, [user?.id, companyRefreshTrigger]);

  // Handle company selection
  const handleSelectCompany = (company) => {
    setSelectedCompany(company);
  };

  // Modified to pass selectedCompany
  const handleOpenCreateProjectModal = () => {
    if (!selectedCompany) {
      toast.error("Please select a company before creating a project.");
      return;
    }
    setCreateProjectModalOpen(true);
  };

  const handleCloseCreateProjectModal = () => {
    setCreateProjectModalOpen(false);
  };

  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    startDate: undefined,
    endDate: undefined,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (key, date) => {
    setNewProject((prev) => ({ ...prev, [key]: date }));
  };

  const handleCreateProject = async () => {
    if (!selectedCompany) {
      toast.error("No company selected. Please select a company.");
      setCreateProjectModalOpen(false);
      return;
    }

    const formattedData = {
      name: newProject.name,
      description: newProject.description,
      startDate: format(newProject.startDate, "yyyy-MM-dd"),
      endDate: format(newProject.endDate, "yyyy-MM-dd"),
      completion: 0.0,
      deadline: format(newProject.endDate, "yyyy-MM-dd") + "T23:59:59",
      companyId: selectedCompany.id, // Include company ID
    };

    try {
      const response = await createProject(formattedData);
      if (response.success) {
        toast.success("Project created successfully!");
        setProjects((prev) => [
          ...prev,
          {
            id: response.data.id,
            name: formattedData.name,
            url: `/projects/${response.data.id}`,
            icon: Frame,
          },
        ]);
        setNewProject({
          name: "",
          description: "",
          startDate: undefined,
          endDate: undefined,
        });
      } else {
        toast.error("Failed to create project: " + response.message);
      }
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("An error occurred while creating the project.");
    }
    setCreateProjectModalOpen(false);
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher
          teams={companies}
          isLoading={isLoadingCompanies}
          onSelectCompany={handleSelectCompany}
        />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects
          projects={projects}
          onOpenCreateProjectModal={handleOpenCreateProjectModal}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
      <ProjectCreationForm
        isOpen={isCreateProjectModalOpen}
        onClose={handleCloseCreateProjectModal}
        formData={newProject}
        onInputChange={handleInputChange}
        onDateChange={handleDateChange}
        onSubmit={handleCreateProject}
      />
    </Sidebar>
  );
}