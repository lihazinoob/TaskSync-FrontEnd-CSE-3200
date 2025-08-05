import {
  BarChart,
  Calendar,
  CheckCircle,
  ChevronRight,
  Download,
  Printer,
  Share2,
} from "lucide-react";

const RoadmapContent = ({ roadmapData, onReset }) => {
  if (!roadmapData) {
    return (
      <div className="bg-card border rounded-xl p-10 h-full flex flex-col items-center justify-center text-center">
        <div className="max-w-md">
          <h3 className="text-xl font-semibold mb-2">
            No Roadmap Generated Yet
          </h3>
          <p className="text-muted-foreground">
            Fill out the form on the left to generate your personalized career
            development roadmap.
          </p>
          <div className="mt-8 border-t border-dashed pt-8">
            <h4 className="font-medium mb-2">What you'll get:</h4>
            <ul className="space-y-2 text-sm text-muted-foreground text-left">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                <span>Customized learning milestones</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                <span>Detailed task breakdown for each stage</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                <span>Resource recommendations and schedule planning</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border rounded-xl p-6 h-full overflow-y-auto">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-bold">{roadmapData.title}</h2>
          <p className="text-muted-foreground mt-1">
            {roadmapData.description}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            className="text-sm text-primary font-medium hover:underline"
          >
            Create New
          </button>
          <div className="flex items-center border-l pl-2 ml-2">
            <button
              className="p-1.5 hover:bg-muted rounded-md"
              title="Download as PDF"
            >
              <Download size={16} />
            </button>
            <button
              className="p-1.5 hover:bg-muted rounded-md"
              title="Print Roadmap"
            >
              <Printer size={16} />
            </button>
            <button
              className="p-1.5 hover:bg-muted rounded-md"
              title="Share Roadmap"
            >
              <Share2 size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-8">
        {roadmapData.milestones.map((milestone, index) => (
          <div key={index} className="relative pl-8 pb-8">
            {/* Timeline connector */}
            {index < roadmapData.milestones.length - 1 && (
              <div className="absolute left-3.5 top-3 bottom-0 w-0.5 bg-muted" />
            )}

            {/* Milestone dot */}
            <div className="absolute left-0 top-0 bg-primary/10 rounded-full p-2">
              <CheckCircle className="h-3 w-3 text-primary" />
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{milestone.title}</h3>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                  {milestone.duration}
                </span>
              </div>

              <ul className="space-y-2 mt-3">
                {milestone.tasks.map((task, taskIndex) => (
                  <li key={taskIndex} className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t border-border/60 pt-6">
        <h3 className="text-lg font-semibold mb-4">Recommended Resources</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 border rounded-md">
            <div className="flex items-center gap-2 mb-2">
              <BarChart className="h-4 w-4 text-primary" />
              <h4 className="font-medium">Learning Platforms</h4>
            </div>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>Udemy - Comprehensive courses</li>
              <li>Coursera - University-backed programs</li>
              <li>YouTube - Free tutorials and guides</li>
            </ul>
          </div>

          <div className="p-3 border rounded-md">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-primary" />
              <h4 className="font-medium">Weekly Schedule</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Commit 10-15 hours per week focused on your roadmap milestones to
              stay on track with your {roadmapData.timeframe} goal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapContent;
