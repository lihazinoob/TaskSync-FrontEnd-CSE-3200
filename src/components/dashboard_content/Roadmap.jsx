import { Brain } from "lucide-react";
import { useState } from "react";
import DashboardHeader from "./common/DashboardHeader";
import TabTitle from "./common/TabTitle";
import RoadmapContent from "./roadmap/RoadmapContent";
import RoadmapForm from "./roadmap/RoadmapForm";

const Roadmap = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [roadmapData, setRoadmapData] = useState(null);

  const handleFormSubmit = (formData) => {
    setIsGenerating(true);

    // Simulate API call to generate roadmap
    setTimeout(() => {
      setRoadmapData({
        title: `${formData.goal} Roadmap (${formData.timeframe})`,
        description: `A personalized learning path for ${formData.experience} level learners to master ${formData.goal} within ${formData.timeframe}.`,
        timeframe: formData.timeframe,
        milestones: [
          {
            title: "Foundation Building",
            duration: "2 weeks",
            tasks: [
              "Learn core concepts and terminology",
              "Set up development environment",
              "Complete introductory tutorials",
              "Build a simple project",
            ],
          },
          {
            title: "Core Skills Development",
            duration: "4 weeks",
            tasks: [
              "Master fundamental techniques",
              "Study best practices and patterns",
              "Build intermediate projects",
              "Join community forums and groups",
            ],
          },
          {
            title: "Advanced Application",
            duration: "6 weeks",
            tasks: [
              "Learn advanced topics and tools",
              "Contribute to open source projects",
              "Build a comprehensive portfolio project",
              "Prepare for technical interviews",
            ],
          },
        ],
      });
      setIsGenerating(false);
    }, 2000);
  };

  const resetRoadmap = () => {
    setRoadmapData(null);
  };

  return (
    <>
      <DashboardHeader title="Roadmap" breadcrumb="Roadmap Generator" />
      <div className="flex flex-col gap-4 p-4 pt-0">
        <TabTitle title="AI Career Roadmap Generator" icon={<Brain />} />

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[calc(100vh-180px)]">
          {/* Left section - Form */}
          <div className="h-full overflow-y-auto">
            <RoadmapForm
              onSubmit={handleFormSubmit}
              isGenerating={isGenerating}
            />
          </div>

          {/* Right section - Roadmap Content */}
          <div className="h-full overflow-y-auto">
            <RoadmapContent roadmapData={roadmapData} onReset={resetRoadmap} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Roadmap;
