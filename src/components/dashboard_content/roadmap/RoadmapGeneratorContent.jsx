import {
  BarChart,
  Brain,
  Calendar,
  CheckCircle,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const RoadmapGeneratorContent = () => {
  const [goal, setGoal] = useState("");
  const [timeframe, setTimeframe] = useState("3 months");
  const [experience, setExperience] = useState("beginner");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedRoadmap, setGeneratedRoadmap] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsGenerating(true);

    // Simulate API call to generate roadmap
    setTimeout(() => {
      setGeneratedRoadmap({
        title: `${goal} Roadmap (${timeframe})`,
        description: `A personalized learning path for ${experience} level learners to master ${goal} within ${timeframe}.`,
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

  const resetForm = () => {
    setGeneratedRoadmap(null);
    setGoal("");
    setTimeframe("3 months");
    setExperience("beginner");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <Brain className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">AI Career Roadmap Generator</h1>
      </div>

      <p className="text-muted-foreground mb-8">
        Generate a personalized career development roadmap based on your goals,
        timeframe, and current experience level.
      </p>

      {!generatedRoadmap ? (
        <div className="bg-card border rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Create Your Roadmap</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="goal" className="block text-sm font-medium">
                What skill or technology do you want to master?
              </label>
              <input
                id="goal"
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="e.g. React, UX Design, Data Science"
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="timeframe" className="block text-sm font-medium">
                Timeframe
              </label>
              <select
                id="timeframe"
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="1 month">1 month</option>
                <option value="3 months">3 months</option>
                <option value="6 months">6 months</option>
                <option value="1 year">1 year</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="experience" className="block text-sm font-medium">
                Experience Level
              </label>
              <select
                id="experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isGenerating || !goal.trim()}
              className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-md font-medium disabled:opacity-50"
            >
              {isGenerating ? "Generating..." : "Generate Roadmap"}
            </button>
          </form>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-card border rounded-xl p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold">{generatedRoadmap.title}</h2>
                <p className="text-muted-foreground mt-1">
                  {generatedRoadmap.description}
                </p>
              </div>
              <button
                onClick={resetForm}
                className="text-sm text-primary font-medium"
              >
                Create New Roadmap
              </button>
            </div>

            <div className="mt-8 space-y-8">
              {generatedRoadmap.milestones.map((milestone, index) => (
                <div key={index} className="relative pl-8 pb-8">
                  {/* Timeline connector */}
                  {index < generatedRoadmap.milestones.length - 1 && (
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
          </div>

          <div className="bg-card border rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">
              Recommended Resources
            </h3>

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
                  Commit 10-15 hours per week focused on your roadmap milestones
                  to stay on track with your {timeframe} goal.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoadmapGeneratorContent;
