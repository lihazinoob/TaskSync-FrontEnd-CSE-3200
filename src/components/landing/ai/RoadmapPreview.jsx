import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const RoadmapPreview = () => {
  const roadmapSteps = [
    {
      title: "Web Development Fundamentals",
      completed: true,
      items: ["HTML5", "CSS3", "JavaScript ES6+"],
    },
    {
      title: "Frontend Frameworks",
      completed: true,
      items: ["React.js", "State Management", "Component Architecture"],
    },
    {
      title: "Backend Development",
      completed: false,
      items: ["Node.js", "Express", "RESTful APIs"],
    },
    {
      title: "Database Integration",
      completed: false,
      items: ["MongoDB", "Mongoose", "Data Modeling"],
    },
    {
      title: "DevOps & Deployment",
      completed: false,
      items: ["Git/GitHub", "CI/CD", "Cloud Deployment"],
    },
  ];

  return (
    <Card className="shadow-lg border-none overflow-hidden bg-gradient-to-br from-background to-muted">
      <CardContent className="p-0">
        <div className="p-4 bg-primary/10 border-b">
          <div className="flex justify-between items-center">
            <h3 className="font-bold">Frontend Developer Roadmap</h3>
            <Badge
              variant="outline"
              className="bg-primary/20 border-primary/30 text-xs"
            >
              AI Generated
            </Badge>
          </div>
        </div>
        <div className="p-4 max-h-[320px] overflow-y-auto">
          {roadmapSteps.map((step, index) => (
            <div key={index} className="mb-4 last:mb-0">
              <div className="flex items-center mb-2">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 ${
                    step.completed ? "text-green-500" : "text-muted-foreground"
                  }`}
                >
                  {step.completed ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <span className="text-xs">{index + 1}</span>
                  )}
                </div>
                <h4
                  className={`font-medium ${
                    step.completed ? "text-green-700 dark:text-green-400" : ""
                  }`}
                >
                  {step.title}
                </h4>
              </div>
              <div className="pl-7">
                <ul className="text-xs text-muted-foreground space-y-1">
                  {step.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center">
                      <span className="w-1 h-1 bg-muted-foreground rounded-full mr-2"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RoadmapPreview;
