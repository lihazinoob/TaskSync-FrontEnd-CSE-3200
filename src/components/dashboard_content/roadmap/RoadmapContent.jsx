import React, { useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Download,
  Flag,
  Printer,
  RefreshCw,
  Share2,
  Target,
  PenTool,
  Users,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const RoadmapContent = ({ roadmapData, onReset }) => {
  const [expandedSections, setExpandedSections] = useState(new Set([0])); // First section expanded by default
  const [completedTasks, setCompletedTasks] = useState(new Set());

  const toggleSection = (index) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedSections(newExpanded);
  };

  const toggleTask = (taskId) => {
    const newCompleted = new Set(completedTasks);
    if (newCompleted.has(taskId)) {
      newCompleted.delete(taskId);
    } else {
      newCompleted.add(taskId);
    }
    setCompletedTasks(newCompleted);
  };

  if (!roadmapData) {
    return (
      <div className="bg-card border rounded-xl p-10 h-full flex flex-col items-center justify-center text-center">
        <div className="max-w-md">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">
            Ready to Generate Your Roadmap?
          </h3>
          <p className="text-muted-foreground mb-6">
            Enter your learning topic on the left to generate a personalized, 
            AI-powered roadmap tailored to your goals.
          </p>
          
          <div className="space-y-4 text-left">
            <div className="flex items-start gap-3">
              <Target className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-sm">Structured Learning Path</h4>
                <p className="text-xs text-muted-foreground">Get organized phases from basics to advanced topics</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Zap className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-sm">Actionable Steps</h4>
                <p className="text-xs text-muted-foreground">Clear tasks and practical exercises for each topic</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <PenTool className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-sm">Tools & Resources</h4>
                <p className="text-xs text-muted-foreground">Recommended tools and prerequisites for success</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border rounded-xl p-6 h-full overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">{roadmapData.title}</h2>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Flag className="h-4 w-4" />
              <span>{roadmapData.children?.length || 0} Phases</span>
            </div>
            <div className="flex items-center gap-1">
              <Target className="h-4 w-4" />
              <span>{roadmapData.milestones?.length || 0} Milestones</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            className="text-xs"
          >
            <RefreshCw className="h-3 w-3 mr-1" />
            New Topic
          </Button>
          
          <div className="flex items-center border-l pl-2 ml-2">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Download PDF">
              <Download className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Print">
              <Printer className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Share">
              <Share2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>

      {/* Overall Milestones */}
      {roadmapData.milestones && roadmapData.milestones.length > 0 && (
        <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
            <Flag className="h-4 w-4" />
            Overall Milestones
          </h3>
          <div className="grid gap-2">
            {roadmapData.milestones.map((milestone, index) => (
              <div key={index} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-blue-800">{milestone}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Learning Phases */}
      <div className="space-y-6">
        {roadmapData.children?.map((phase, phaseIndex) => (
          <div key={phaseIndex} className="border rounded-lg overflow-hidden">
            {/* Phase Header */}
            <Collapsible open={expandedSections.has(phaseIndex)}>
              <CollapsibleTrigger
                onClick={() => toggleSection(phaseIndex)}
                className="w-full p-4 bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold text-sm">
                      {phaseIndex + 1}
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-lg">{phase.title}</h3>
                      <p className="text-xs text-muted-foreground">
                        {phase.children?.length || 0} topics • {phase.milestones?.length || 0} milestones
                      </p>
                    </div>
                  </div>
                  {expandedSections.has(phaseIndex) ? (
                    <ChevronDown className="h-5 w-5" />
                  ) : (
                    <ChevronRight className="h-5 w-5" />
                  )}
                </div>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="p-4 space-y-4">
                  {/* Phase Prerequisites */}
                  {phase.prerequisites && phase.prerequisites.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-medium text-sm mb-2 text-orange-700">Prerequisites:</h4>
                      <div className="flex flex-wrap gap-1">
                        {phase.prerequisites.map((prereq, index) => (
                          <Badge key={index} variant="outline" className="text-xs bg-orange-50 border-orange-200 text-orange-700">
                            {prereq}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Topics */}
                  <div className="space-y-4">
                    {phase.children?.map((topic, topicIndex) => (
                      <div key={topicIndex} className="border border-border/50 rounded-lg p-4 bg-card">
                        <h4 className="font-medium mb-3 flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-primary" />
                          {topic.title}
                        </h4>

                        {/* Actionable Steps */}
                        {topic.actionableSteps && topic.actionableSteps.length > 0 && (
                          <div className="mb-4">
                            <h5 className="text-sm font-medium mb-2 text-green-700">Action Steps:</h5>
                            <div className="space-y-2">
                              {topic.actionableSteps.map((step, stepIndex) => {
                                const taskId = `${phaseIndex}-${topicIndex}-${stepIndex}`;
                                const isCompleted = completedTasks.has(taskId);
                                
                                return (
                                  <div 
                                    key={stepIndex} 
                                    className="flex items-start gap-2 cursor-pointer group"
                                    onClick={() => toggleTask(taskId)}
                                  >
                                    <CheckCircle2 
                                      className={`h-4 w-4 mt-0.5 flex-shrink-0 transition-colors ${
                                        isCompleted 
                                          ? 'text-green-600 fill-green-100' 
                                          : 'text-gray-400 group-hover:text-green-500'
                                      }`} 
                                    />
                                    <span className={`text-sm ${isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                                      {step}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Prerequisites and Tools */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Topic Prerequisites */}
                          {topic.prerequisites && topic.prerequisites.length > 0 && (
                            <div>
                              <h5 className="text-sm font-medium mb-2 text-orange-700 flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                Prerequisites:
                              </h5>
                              <div className="flex flex-wrap gap-1">
                                {topic.prerequisites.map((prereq, index) => (
                                  <Badge key={index} variant="outline" className="text-xs bg-orange-50 border-orange-200 text-orange-700">
                                    {prereq}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Tools */}
                          {topic.tools && topic.tools.length > 0 && (
                            <div>
                              <h5 className="text-sm font-medium mb-2 text-blue-700 flex items-center gap-1">
                                <PenTool className="h-3 w-3" />
                                Tools:
                              </h5>
                              <div className="flex flex-wrap gap-1">
                                {topic.tools.map((tool, index) => (
                                  <Badge key={index} variant="outline" className="text-xs bg-blue-50 border-blue-200 text-blue-700">
                                    {tool}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Phase Milestones */}
                  {phase.milestones && phase.milestones.length > 0 && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-medium text-green-900 mb-2 flex items-center gap-1">
                        <Flag className="h-4 w-4" />
                        Phase Milestones:
                      </h4>
                      <div className="space-y-1">
                        {phase.milestones.map((milestone, index) => (
                          <div key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-green-800">{milestone}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        ))}
      </div>

      {/* Progress Summary */}
      <div className="mt-8 p-4 bg-primary/5 border border-primary/20 rounded-lg">
        <h3 className="font-semibold mb-2">Progress Summary</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Completed Tasks:</span>
            <span className="ml-2 font-medium">{completedTasks.size}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Total Phases:</span>
            <span className="ml-2 font-medium">{roadmapData.children?.length || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapContent;