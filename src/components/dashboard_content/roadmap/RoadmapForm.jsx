import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Brain, Lightbulb, Rocket, Target } from "lucide-react";

const RoadmapForm = ({ onSubmit, isGenerating }) => {
  const [topic, setTopic] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (topic.trim()) {
      onSubmit({ topic: topic.trim() });
    }
  };

  const predefinedTopics = [
    "Learn React and Laravel",
    "Master Full Stack Development",
    "Data Science with Python",
    "DevOps and Cloud Computing",
    "Mobile App Development",
    "Machine Learning Fundamentals"
  ];

  const handlePredefinedClick = (predefinedTopic) => {
    setTopic(predefinedTopic);
  };

  return (
    <div className="bg-card border rounded-xl p-6 h-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Brain className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">AI Roadmap Generator</h2>
          <p className="text-sm text-muted-foreground">
            Generate personalized learning paths
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-3">
            <Label htmlFor="topic" className="text-base font-medium flex items-center gap-2">
              <Target className="h-4 w-4" />
              What do you want to learn?
            </Label>
            <Textarea
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Learn React and Laravel, Master Data Science, Full Stack Development..."
              className="min-h-[100px] resize-none"
              required
            />
            <p className="text-xs text-muted-foreground">
              Be specific about technologies, frameworks, or skills you want to master
            </p>
          </div>

          <Button
            type="submit"
            disabled={isGenerating || !topic.trim()}
            className="w-full h-11 text-base font-medium"
            size="lg"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Generating Roadmap...
              </>
            ) : (
              <>
                <Rocket className="mr-2 h-4 w-4" />
                Generate AI Roadmap
              </>
            )}
          </Button>
        </form>

        {/* Predefined Topics */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Lightbulb className="h-4 w-4" />
            Popular Learning Paths
          </div>
          <div className="grid gap-2">
            {predefinedTopics.map((predefinedTopic, index) => (
              <button
                key={index}
                onClick={() => handlePredefinedClick(predefinedTopic)}
                className="text-left p-3 bg-muted/50 hover:bg-muted rounded-lg transition-colors text-sm border border-transparent hover:border-border"
                disabled={isGenerating}
              >
                {predefinedTopic}
              </button>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="space-y-3 pt-4 border-t">
          <h4 className="font-medium text-sm">What you'll get:</h4>
          <div className="space-y-2">
            {[
              "Structured learning phases",
              "Step-by-step actionable tasks",
              "Required tools and prerequisites",
              "Milestone tracking system"
            ].map((feature, index) => (
              <div key={index} className="flex items-start gap-2 text-xs text-muted-foreground">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapForm;