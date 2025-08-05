import { ArrowRight } from "lucide-react";

const StepConnector = () => {
  return (
    <div className="flex items-center px-2">
      <div className="h-0.5 w-6 bg-primary/30"></div>
      <ArrowRight className="w-5 h-5 text-primary mx-1" />
      <div className="h-0.5 w-6 bg-primary/30"></div>
    </div>
  );
};

export default StepConnector;
