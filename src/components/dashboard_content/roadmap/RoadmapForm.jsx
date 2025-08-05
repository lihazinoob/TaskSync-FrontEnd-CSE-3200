import { useState } from "react";

const RoadmapForm = ({ onSubmit, isGenerating }) => {
  const [goal, setGoal] = useState("");
  const [timeframe, setTimeframe] = useState("3 months");
  const [experience, setExperience] = useState("beginner");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ goal, timeframe, experience });
  };

  return (
    <div className="bg-card border rounded-xl p-6 h-full">
      <h2 className="text-xl font-semibold mb-4">Create Your Roadmap</h2>
      <p className="text-muted-foreground mb-4">
        Generate a personalized career development roadmap based on your goals,
        timeframe, and current experience level.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
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
          className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-md font-medium disabled:opacity-50 mt-6"
        >
          {isGenerating ? "Generating..." : "Generate Roadmap"}
        </button>
      </form>
    </div>
  );
};

export default RoadmapForm;
