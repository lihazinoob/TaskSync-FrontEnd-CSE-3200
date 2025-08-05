import { Card, CardContent } from "@/components/ui/card";

const WorkflowStep = ({ number, icon, title, description }) => {
  return (
    <Card className="border shadow-sm hover:shadow-md transition-all duration-300 h-full">
      <CardContent className="p-6 flex flex-col h-full relative z-10">
        <div className="flex items-center mb-4">
          <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mr-3">
            {number}
          </div>
          <div className="text-primary">{icon}</div>
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default WorkflowStep;
