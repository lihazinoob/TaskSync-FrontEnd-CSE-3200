import React from "react";

import {
  Button
} from "@/components/ui/button";
import CreateJobModal from "./CreateJobModal";



const JobSection = ({selectedCompany}) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const handleCreateJobClick = () => {
    setIsDialogOpen(true);
  };
  const handleDialogClose = () => {
    setIsDialogOpen(false);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Jobs</h2>
        <Button variant="outline" className="text-sm"
          onClick={handleCreateJobClick}>
          Create Job
        </Button>
        
      </div>

      <CreateJobModal
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        selectedCompany={selectedCompany}
        

      />
    </div>
  );
};

export default JobSection;
