import { Brain } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import DashboardHeader from "./common/DashboardHeader";
import TabTitle from "./common/TabTitle";
import RoadmapContent from "./roadmap/RoadmapContent";
import RoadmapForm from "./roadmap/RoadmapForm";
import { generateRoadmap } from "@/service/api/roadmap";

const Roadmap = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [roadmapData, setRoadmapData] = useState(null);

  const handleFormSubmit = async (formData) => {
    setIsGenerating(true);

    try {
      console.log("Generating roadmap for:", formData.topic);
      
      const response = await generateRoadmap(formData.topic);
      
      if (response.success) {
        setRoadmapData(response.data);
        toast.success("Roadmap generated successfully!");
        console.log("Generated roadmap:", response.data);
      } else {
        toast.error(response.message || "Failed to generate roadmap");
        console.error("Failed to generate roadmap:", response.message);
      }
    } catch (error) {
      console.error("Error generating roadmap:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const resetRoadmap = () => {
    setRoadmapData(null);
  };

  return (
    <>
      <DashboardHeader title="Roadmap" breadcrumb="AI Career Roadmap Generator" />
      <div className="flex flex-col gap-4 p-4 pt-0">
        <TabTitle title="AI Career Roadmap Generator" icon={<Brain />} />

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-180px)]">
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